import { Component, inject, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidationMessageComponent } from "../validation-message/validation-message.component";
import { CommonModule } from '@angular/common';
import { FormContactService } from 'services/form-contact-service/form-contact-service.service';
import { ContactUsFormData, ContactUsResponse } from '@interfaces/Contact-Form.interface';
import { NotificationService } from 'services/notification/notification.service';
import { Notification, NotificationType } from '@interfaces/Notification.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modal-contact-us',
  standalone: true,
  imports: [ReactiveFormsModule, ValidationMessageComponent, CommonModule],
  templateUrl: './modal-contact-us.component.html',
  styleUrl: './modal-contact-us.component.scss'
})
export class ModalContactUsComponent implements OnDestroy {

  activeModal = inject(NgbActiveModal);
  formSubmitSubscription = new Subscription();

  phoneNumberRegex = new RegExp("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$");
  isLoading: boolean = false;
  commonClasses: string = "text-white rounded-md p-3 w-72";

  contactUsFormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.pattern(this.phoneNumberRegex)]),
    subject: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required, Validators.maxLength(200)])
  })

  constructor(private formContactService: FormContactService, private notificationService: NotificationService) {}

  onSubmitForm() {
    console.log(this.contactUsFormGroup.valid);
    if(this.contactUsFormGroup.valid && !this.isLoading) {
      this.isLoading = true;
      this.formSubmitSubscription = this.formContactService.sendContactFormData(this.contactUsFormGroup.value as ContactUsFormData).subscribe({
        next: response => this.onSuccess(response),
        error: error => this.onError(error),
        complete: () => this.isLoading = false
      })
    }
  }

  onSuccess(response: ContactUsResponse) {
    if(response.success) {
      const notification: Notification = {
        message: "We received your message. Thank you",
        title: "",
        type: NotificationType.SUCCESS,
        class: "bg-green-500 " + this.commonClasses
      }
      this.notificationService.setNotification(notification);
      this.activeModal.close();
    }
  }

  onError(error: HttpErrorResponse) {
    const notification = {
      type: NotificationType.DANGER,
      message: error.error.message,
      title: "Something went wrong",
      class: "bg-red-500 " + this.commonClasses,
    }

    this.notificationService.setNotification(notification);
    this.isLoading = false;
  }

  ngOnDestroy() {
    this.formSubmitSubscription.unsubscribe();
  }
}
