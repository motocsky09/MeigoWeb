import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartService } from 'src/services/shopping-cart.service';
import { UserService } from 'src/services/user.service';
import {ProfileService} from "../../services/profile.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  isPasswordVisible: boolean = false;
  isConfirmPasswordVisible: boolean = false;

  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    public service: UserService,
    private router:Router,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.service.formModel.reset();
  }

  onSubmit() {
    this.service.register().subscribe(
      (res: any) => {
        
        this.successMessage = 'Successful registration!';
        this.errorMessage = ''; 
        
        
        this.profileService.createDefaultProfile(res.profile).subscribe();
        this.service.formModel.reset(); 
  
        
        setTimeout(() => {
          this.router.navigateByUrl('/user/login');
        }, 2000); 
      },
      err => {
        
        if (err.status === 400) {
          this.errorMessage = 'Username or email already exists!';
        } else {
          this.errorMessage = 'The password does not meet the conditions.!';
        }
        this.successMessage = ''; 
        console.log(err); 
      }
    );
  }
  
  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  toggleConfirmPasswordVisibility() {
    this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
  }
}
