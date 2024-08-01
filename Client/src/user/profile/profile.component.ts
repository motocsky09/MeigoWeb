import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
isLog(): any {
}
  profilesList: any;
  
  constructor(
    private service:ProfileService,
    private router:Router
  ){}

  
  ngOnInit(){
    this.service.getProfilesList().subscribe(
        (res:any) => {
            this.profilesList = res;
            console.log(this.profilesList);
        }
    );
}
getProfilesList(){
  this.service.getProfilesList().subscribe(
      (res:any) => {
          this.profilesList = res;
      }
  );
}
}
