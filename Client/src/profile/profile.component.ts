import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/services/profile.service';
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: any;
  userName: any;

  constructor(
    private service: ProfileService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    if (localStorage.getItem('token') != null) {
      this.userService.getUserName().subscribe(
        (res: string) => {
          this.userName = res; // Setează userName cu răspunsul primit
          this.service.getProfileByUserName(this.userName).subscribe(
            (res: any) => {
              this.profile = res;
            },
            error => {
              console.error('Error fetching username:', error);
            }
          )
        })
    }
  }

  editItem(item: any) {
    item.editing = true;
  }

  saveItem(item: any) {
    this.service.updateProfile(item).subscribe(
      (res: any) => {
        item.editing = false;
        console.log('Profil salvat:', res);
        this.service.getProfileByUserName(this.userName).subscribe();
      },
      (err: any) => {
        console.error('Eroare salvare profil:', err);
      }
    );
  }

  cancelEdit(item: any) {
    item.editing = false;
    this.service.getProfileByUserName(this.userName); // Reîncarcă datele pentru a anula modificările
  }
}
