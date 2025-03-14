import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/services/profile.service';
import {UserService} from "../services/user.service";
import { Location } from '@angular/common';

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
    private userService: UserService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit() {
    if (localStorage.getItem('token') != null) {
      this.userService.getUserName().subscribe(
        (res: any) => {
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
  goBack() {
    this.location.back(); // Navighează înapoi
  }

  showBackButton(): boolean {
    return this.router.url !== '/home' && window.innerWidth <= 768; // Afișează doar pe mobile și în afara paginii home
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
