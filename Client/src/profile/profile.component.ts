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
  profile: any = null;
  newProfileForm: FormGroup;

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
    this.getUserProfile();
  }

  getUserProfile() {
    this.service.getUserProfile().subscribe(
      (res: any) => {
        this.profile = res;
      },
      (err: any) => {
        if (err.status === 404) {
          this.profile = null;
        } else {
          console.error('Eroare la obținerea profilului:', err);
        }
      }
    );
  }

  addNewProfile() {
    if (this.newProfileForm.valid) {
      const newProfile = this.newProfileForm.value;
      this.service.createProfile(newProfile).subscribe(
        (res: any) => {
          console.log('Profil creat:', res);
          this.profile = res;
          this.newProfileForm.reset();
        },
        (err: any) => {
          console.error('Eroare creare profil:', err);
        }
      );
    } else {
      console.warn('Formularul nu este valid');
    }
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

  deleteProfile(profileId: number) {
    this.service.deleteProfile(profileId).subscribe(
      () => {
        console.log('Profil șters');
        this.getUserProfile(); // Reîncarcă lista pentru a reflecta ștergerea
      },
      (err: any) => {
        console.error('Eroare ștergere profil:', err);
      }
    );
  }
}
