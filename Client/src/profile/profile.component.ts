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

  constructor(
    private service: ProfileService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getProfiles();
  }

  getProfiles() {
    this.service.getProfiles().subscribe(
      (res: any) => {
        this.profilesList = res;
        console.log(this.profilesList);
      }
    );
  }

  editItem(item: any) {
    item.editing = true;
  }

  saveItem(item: any) {
    this.service.updateProfile(item).subscribe(
      (res: any) => {
        item.editing = false;
        console.log('Profil salvat:', res);
        this.getProfiles();
      },
      (err: any) => {
        console.error('Eroare salvare profil:', err);
      }
    );
  }

  cancelEdit(item: any) {
    item.editing = false;
    this.getProfiles(); // Reîncarcă datele pentru a anula modificările
  }
}
