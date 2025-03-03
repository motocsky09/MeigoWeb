import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartService } from 'src/services/shopping-cart.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userName:any;

  constructor(
    private userService: UserService,
    private router: Router,
    private shoppingCartService: ShoppingCartService,
    private renderer: Renderer2,
  ) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null) {
      this.userService.getUserName().subscribe(
        (res: string) => {
          this.userName = res; // Setează userName cu răspunsul primit
          this.shoppingCartService.createFirstShoppingCartByUsername(this.userName).subscribe();
        },
        error => {
          console.error('Error fetching username:', error);
        }
      );
    }
  }
  ngAfterViewInit() {
    const accordionHeaders = document.querySelectorAll(".accordion-header");

    accordionHeaders.forEach(header => {
      this.renderer.listen(header, 'click', () => {
        const accordionItem = header.parentElement as HTMLElement;
        if (!accordionItem) return;

        const description = accordionItem.querySelector(".description") as HTMLElement;
        const icon = accordionItem.querySelector("i") as HTMLElement;

        if (!description || !icon) return;

        accordionItem.classList.toggle("open");

        if (accordionItem.classList.contains("open")) {
          description.style.maxHeight = description.scrollHeight + "px";
          icon.classList.replace("fa-plus", "fa-minus");
        } else {
          description.style.maxHeight = "0";
          icon.classList.replace("fa-minus", "fa-plus");
        }

        this.closeOtherAccordions(accordionItem);
      });
    });
  }

  closeOtherAccordions(currentAccordion: HTMLElement) {
    const accordionItems = document.querySelectorAll(".accordion-item");

    accordionItems.forEach(item => {
      if (item !== currentAccordion && item.classList.contains("open")) {
        item.classList.remove("open");
        const description = item.querySelector(".description") as HTMLElement;
        const icon = item.querySelector("i") as HTMLElement;

        if (!description || !icon) return;

        description.style.maxHeight = "0";
        icon.classList.replace("fa-minus", "fa-plus");
      }
    });
  }

}
