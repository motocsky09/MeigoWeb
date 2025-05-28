import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ShoppingCartService } from 'src/services/shopping-cart.service';
import { UserService } from 'src/services/user.service';
import { jwtDecode } from 'jwt-decode'; // Asigură-te că ai instalat jwt-decode

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

      // ✅ Decode token și verifică rolul
      const decodedToken: any = jwtDecode(res.token);
      const roles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

      if (roles === 'Admin' || (Array.isArray(roles) && roles.includes('Admin'))) {
        this.router.navigateByUrl('/admin/dashboard');
      } else {
        this.router.navigateByUrl('/home');
      }
    },
    err => {
      if (err.status === 400 || err.status === 401) {
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
