import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalContactUsComponent } from '@components/modal-contact-us/modal-contact-us.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-contact-us-section',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact-us-section.component.html',
  styleUrl: './contact-us-section.component.scss'
})
export class ContactUsSectionComponent {
  private modalService = inject(NgbModal);

  openContactModal() {
    this.modalService.open(ModalContactUsComponent, {backdropClass: "!z-10", windowClass: "!z-20"});
  }
}
