import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginUser = {
    email:'', 
    password:''}


    emailFormControl = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);
    
    passwordFormControl = new FormControl('', [
      Validators.required
    ]);
    matcher = new MyErrorStateMatcher();

  constructor( private Auth: AuthService, private router: Router, private toastr: ToastrService) {
    
   }

  ngOnInit(): void {
    
  }

  showError(){
    this.toastr.error('Введён неверный пароль и/или логин');
    this.router.navigate(['/login'])
  }

  login(){
    this.Auth.login(this.loginUser)
    .subscribe(result => 
      {
        localStorage.setItem('token', result.token)
    }, error => this.showError()
    );
  }


}
