import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public service: UserService , private router:Router) { }

  ngOnInit(): void {
    this.service.formModel.reset();
  }

  onSubmit()
  {
    this.service.register().subscribe(
      (res:any) => {
        {
          this.service.formModel.reset();
          this.router.navigateByUrl('/user/login');
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}
