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

  onSubmit(form:NgForm){
    this.service.login(form.value).subscribe(
      (res:any)=>{
        localStorage.setItem('token',res.token);
        this.router.navigateByUrl('/home');
        localStorage.setItem('loggedIn', 'true');
        this.service.isLoggedIn$.next(true);
      },
      err=>{
        if(err.status == 400)
        {
          localStorage.setItem('loggedIn','false');
          this.service.isLoggedIn$.next(false);
        }
        else
          console.log(err);
      }
    )
  }
}
