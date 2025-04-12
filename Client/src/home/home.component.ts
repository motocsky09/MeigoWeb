import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartService } from 'src/services/shopping-cart.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
// home.component.ts
export class HomeComponent implements OnInit {
  userName: any;

  testimonials = [
    {
      name: 'Alex Johnson',
      text: `"This platform made shopping so easy! Great support and fast delivery. Highly recommend it!"`
    },
    {
      name: 'Maria Lopez',
      text: `"Fantastic experience. I love how intuitive everything is. Definitely using it again!"`
    },
    {
      name: 'Daniel Smith',
      text: `"The best shopping experience I’ve had in a long time. Amazing customer service!"`
    }
  ];

  currentTestimonialIndex = 0;

  constructor(
    private userService: UserService,
    private router: Router,
    private shoppingCartService: ShoppingCartService,
  ) {}

  ngOnInit() {
    if (localStorage.getItem('token') != null) {
      this.userService.getUserName().subscribe(
        (res: string) => {
          this.userName = res;
          this.shoppingCartService.createFirstShoppingCartByUsername(this.userName).subscribe();
        },
        error => {
          console.error('Error fetching username:', error);
        }
      );
    }
  }

  prevTestimonial() {
    this.currentTestimonialIndex =
      (this.currentTestimonialIndex - 1 + this.testimonials.length) % this.testimonials.length;
  }

  nextTestimonial() {
    this.currentTestimonialIndex =
      (this.currentTestimonialIndex + 1) % this.testimonials.length;
  }
}