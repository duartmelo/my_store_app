import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationMessageComponent } from '@components/index';
import { LoginInterface } from '@interfaces/Login.interface';
import { finalize, shareReplay } from 'rxjs';
import { AutenticationService } from 'services/autentication.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, ValidationMessageComponent, ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  isInvalid = true;
  isLoading = false;
  formErrors = {
    usernameField: false,
    passwordField: false
  }
  loginFormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  constructor(private authentication: AutenticationService, private router: Router) {}

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

  onSubmit() {
    const credentials: LoginInterface = this.getCredentials();
    if(credentials.username && credentials.password) {
      this.isLoading=true
      this.authentication.login(credentials).pipe(shareReplay(), finalize(()=>this.isLoading = false)).subscribe({
        next: response => {
          console.log("Response: ", response);
          this.router.navigate(['/']);
        },
        error: error => console.error(error),
      })
    }
  }
}
