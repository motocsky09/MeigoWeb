import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profilesList: any[] = [];
  profile: any = {};

  constructor(
    private service: ProfileService,
    private router: Router
  ) {}
 

  ngOnInit() {
    this.getUserProfile();
  }
  
  getUserProfile() {
    this.service.getUserProfile().subscribe(
      (res: any) => {
        this.profile = res;
        console.log(this.profile);
      },
      (err: any) => {
        console.error('Eroare la obținerea profilului:', err);
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
