import { Component, Inject, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {FormGroupDirective, NgForm} from '@angular/forms'; 
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupUser = {
    lname:'', 
    fname:'', 
    patronymic: '',
    email:'',
    login:'',
    password: ''
  };
  lnameFormControl = new FormControl('', [
    Validators.required
  ]);
  fnameFormControl = new FormControl('', [
    Validators.required
  ]);
  patronymicFormControl = new FormControl('', [
    Validators.required
  ]);
  loginFormControl = new FormControl('', [
    Validators.required
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required
  ]);
  //formSignUp: FormGroup;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  matcher = new MyErrorStateMatcher();
  constructor(private toastr: ToastrService,
    private router: Router,
    private Auth: AuthService) { }
  public data: any
  ngOnInit(): void {
  }

  showError(){
    this.toastr.error('Введены невеные данные');
    this.router.navigate(['/signup'])
  }

  register() {
    this.Auth.signupUser(this.signupUser)
    .subscribe(result => {
      localStorage.setItem('token', result.token)
    }, error => this.showError()
    );
  }


}
