import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public isLoggedIn$!: BehaviorSubject<boolean>;
  
  constructor(
    private fb:FormBuilder,
    private http:HttpClient,
    private router:Router
  ) {
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    this.isLoggedIn$ = new BehaviorSubject(isLoggedIn);
   }

   readonly BaseURI = 'http://localhost:5098/api';

   formModel = this.fb.group({
    UserName :['',Validators.required],
    Email :['',Validators.email],
    Passwords : this.fb.group({
      Password :['',[Validators.required,Validators.minLength(4)]],
      ConfirmPassword :['',Validators.required]
    },{validator : this.comparePasswords})
  });

  comparePasswords(fb: FormGroup) {
    const confirmPswrdCtrl = fb.get('ConfirmPassword');
    const passwordCtrl = fb.get('Password');
  
    if (confirmPswrdCtrl && passwordCtrl) {
      // Verifică dacă există deja alte erori în afară de 'passwordMismatch'
      const errors = confirmPswrdCtrl.errors;
  
      if (!errors || errors['passwordMismatch']) {
        if (passwordCtrl.value !== confirmPswrdCtrl.value) {
          confirmPswrdCtrl.setErrors({ passwordMismatch: true });
        } else {
          confirmPswrdCtrl.setErrors(null);
        }
      }
    }
  }
  
  register()
  {
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      Password: this.formModel.value.Passwords.Password
    };
    return this.http.post(this.BaseURI+'/Authenticate/register',body);
  }

   login(formData: any)
  {
    return this.http.post(this.BaseURI+'/Authenticate/login',formData);
  }

  logout()
  {
    localStorage.setItem('loggedIn', 'false');
    this.isLoggedIn$.next(false);

    localStorage.removeItem('token');
  }

  getUserName()
  {
    var tokenHeader = new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('token')})
    return this.http.get(this.BaseURI+'/UserProfile',{headers : tokenHeader});
  }

  isLogged(): boolean
  {
    return this.isLoggedIn$.value;
  }
}
