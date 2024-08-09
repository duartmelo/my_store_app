import { NgClass } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationMessageComponent } from '@components/index';
import { LoginInterface } from '@interfaces/Login.interface';
import { NotificationType } from '@interfaces/Notification.interface';
import { finalize, shareReplay, Subscription } from 'rxjs';
import { AuthenticationService } from 'services/authentication/authentication.service';
import { NotificationsComponent } from "../../components/notifications/notifications.component";
import { NotificationService } from 'services/notification/notification.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, ValidationMessageComponent, NotificationsComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {
  isInvalid = true;
  isLoading = false;
  formErrors = {
    usernameField: false,
    passwordField: false
  }
  showPassword = false;
  loginFormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })
  commonClasses: string = "text-white rounded-md p-3 w-72"
  loginSubscription = new Subscription();

  constructor(
    private authentication: AuthenticationService,
    private router: Router,
    private notificationService: NotificationService) {}

  ngOnInit() {
    const isAuthenticated = localStorage.getItem("auth") === "true";

    if (isAuthenticated) {

      this.notificationService.setNotification({
        type: NotificationType.SUCCESS,
        message: "You are already logged In",
        class: "bg-green-500 " + this.commonClasses,
        title: "",
      });

      this.router.navigateByUrl("/products")
    }
  }

  tooglePassword() {
    this.showPassword = !this.showPassword;
  }

  validateForm() {
    this.formErrors.usernameField = this.loginFormGroup.controls.username.getError("required");
    this.formErrors.passwordField = this.loginFormGroup.controls.password.getError("required");

    this.isInvalid = this.formErrors.usernameField || this.formErrors.passwordField;
  }

  getCredentials(): LoginInterface {
    return {
      username: this.loginFormGroup.controls.username.value || "",
      password: this.loginFormGroup.controls.password.value || "",
    }
  }

  loginSuccessfull() {
    const notification = {
      type: NotificationType.SUCCESS,
      message: "Logged in with success",
      class: "bg-green-500 " + this.commonClasses,
      title: "",
    }

    this.notificationService.setNotification(notification);
    localStorage.setItem("auth", "true");
    this.router.navigate(["/checkout"]);
  }

  loginFail(error: HttpErrorResponse) {
    const notification = {
      type: NotificationType.DANGER,
      message: error.error.message,
      title: "Something went wrong",
      class: "bg-red-500 " + this.commonClasses,
    }

    this.notificationService.setNotification(notification);
  }

  onSubmit() {
    const credentials: LoginInterface = this.getCredentials();
    if(credentials.username && credentials.password) {
      this.isLoading=true
      this.loginSubscription = this.authentication.login(credentials).pipe(shareReplay(), finalize(()=>this.isLoading = false)).subscribe({
        next: response => {
          this.authentication.setUserId(response.id);
          this.loginSuccessfull();
        },
        error: error => this.loginFail(error),
      })
    }
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
  }
}
