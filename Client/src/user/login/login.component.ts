import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ShoppingCartService } from 'src/services/shopping-cart.service';
import { UserService } from 'src/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  passwordFieldType: string = 'password'; // Inițial setat pe "password"
  successMessage: string = '';
  errorMessage: string = '';

  formModel={
    UserName : '',
    Password : ''
  }

  constructor(
    private service:UserService,
    private router:Router,
    private shoppingCartService: ShoppingCartService
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem('token') != null ){
      this.router.navigateByUrl('/home');
    }
  }

  onSubmit(form: NgForm) {
    this.service.login(form.value).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('loggedIn', 'true');
        this.service.isLoggedIn$.next(true);
  
        this.successMessage = 'Login successful!';
        this.errorMessage = '';
        
        setTimeout(() => {
          this.router.navigateByUrl('/home');
        }, 2000);
      },
      err => {
        if (err.status === 400) {
          this.errorMessage = 'Incorrect name or password';
        } else if (err.status === 401) {
          this.errorMessage = 'Incorrect name or password';
        } else {
          this.errorMessage = 'An error occurred. Please try again.';
        }
        this.successMessage = '';
      }
    );
  }  

  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}
