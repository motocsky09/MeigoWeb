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
  passwordFieldType: string = 'password'; // Inițial setat pe "password"
  constructor(
    public service: UserService,
    private router:Router,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.service.formModel.reset();
  }

  onSubmit()
  {
    this.service.register().subscribe(
      (res:any) => {
        {
          console.log(res);
          console.log("test");
          this.profileService.createDefaultProfile(res.profile).subscribe();
          this.service.formModel.reset();

          this.router.navigateByUrl('/user/login');
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}
