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
        // Înregistrare cu succes
        this.successMessage = 'Successful registration!';
        this.errorMessage = ''; // Curăță mesajul de eroare dacă există
        
        // Creează profilul implicit și redirecționează către login
        this.profileService.createDefaultProfile(res.profile).subscribe();
        this.service.formModel.reset(); // Resetează formularul
  
        // Redirecționează după 2 secunde
        setTimeout(() => {
          this.router.navigateByUrl('/user/login');
        }, 2000); // 2 secunde pentru a afișa mesajul
      },
      err => {
        // Afișează un mesaj de eroare corespunzător
        if (err.status === 400) {
          this.errorMessage = 'Username or email already exists!';
        } else {
          this.errorMessage = 'The password does not meet the conditions.!';
        }
        this.successMessage = ''; // Curăță mesajul de succes dacă există
        console.log(err); // Debugging suplimentar
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
