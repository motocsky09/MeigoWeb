import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from 'src/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  newProfileForm: FormGroup;
  profilesList: any[] = [];
  profile: any = {};

  constructor(
    private service: ProfileService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.newProfileForm = this.fb.group({
      userName: [''],
      firstName: [''],
      lastName: [''],
      address: [''],
      email: [''],
      phoneNumber: ['']
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('token') != null) {
      this.router.navigateByUrl('/user/profile');
      this.getUserProfile();
    }
  }

  getUserProfile() {
    this.service.getUserProfile().subscribe(
      (res: any) => {
        this.profilesList = res;
        console.log(this.profilesList);
      },
      (err: any) => {
        console.error('Eroare la obținerea profilului:', err);
      }
    );
  }

  addNewProfile() {
    const newProfile = this.newProfileForm.value;
    this.service.createProfile(newProfile).subscribe(
      (res: any) => {
        console.log('Profil creat:', res);
        this.getUserProfile(); // Reîncarcă lista pentru a include noul profil
        this.newProfileForm.reset(); // Resetează formularul după creare
      },
      (err: any) => {
        console.error('Eroare creare profil:', err);
      }
    );
  }


  editItem(item: any) {
    item.editing = true;
  }

  saveProfile(item: any) {
    this.service.updateProfile(item).subscribe(
      (res: any) => {
        console.log('Profil salvat:', res);
        item.editing = false; // Poate vrei să oprești modul de editare după salvare
      },
      (err: any) => {
        console.error('Eroare salvare profil:', err);
      }
    );
  }  

  cancelEdit(item: any) {
    item.editing = false;
    this.getUserProfile(); // Reîncarcă lista pentru a reveni la starea anterioară
  }


  }

