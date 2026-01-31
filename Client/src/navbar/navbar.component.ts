import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isSidebarOpen = false; 
  user: any = null;

  constructor(private service: UserService, private router: Router) { }

  ngOnInit(): void {
    if (this.isLog()) {
      
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('userProfile');
      let userProfile: any = null;
      if (userStr) {
        try {
          userProfile = JSON.parse(userStr);
        } catch {
          userProfile = null;
        }
      }
      
      if (!userProfile || !userProfile.userName) {
        this.user = { userName: '' };
        this.service.getUserName().subscribe({
          next: (username: string) => {
            this.user.userName = username;
            localStorage.setItem('userProfile', JSON.stringify(this.user));
          },
          error: () => {
            this.user.userName = '';
          }
        });
      } else {
        this.user = userProfile;
        if (!this.user.userName) {
          this.user.userName = this.user.username || this.user.name || this.user.email || '';
        }
      }
    }
  }

  
  isLog(): boolean {
    return this.service.isLogged();
  }

  
  onLogout(): void {
    this.service.logout();
    localStorage.removeItem('userProfile'); 
    this.router.navigate(['/user/login']);
    this.isSidebarOpen = false; 
  }

  
  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen; 
  }

  
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const sidebar = document.querySelector('.sidebar');
    const navRight = document.querySelector('.nav-right');
    if (this.isSidebarOpen && !sidebar?.contains(event.target as Node) && !navRight?.contains(event.target as Node)) {
      this.isSidebarOpen = false;
    }
  }

  getUserDisplayName(user: any): string {
    if (!user) return 'Guest';
    if (typeof user === 'string') return user;
    if (user.userName && typeof user.userName === 'string') return user.userName;
    if (user.username && typeof user.username === 'string') return user.username;
    if (user.fullName && typeof user.fullName === 'string') return user.fullName;
    if (user.name && typeof user.name === 'string') return user.name;
    
    for (const key of ['userName','username','fullName','name']) {
      if (user[key] && typeof user[key] === 'object') {
        const val = Object.values(user[key]).find(v => typeof v === 'string');
        if (val) return val as string;
      }
    }
    return 'Guest';
  }
}