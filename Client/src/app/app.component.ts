import { Component } from '@angular/core';
import {LoadingService} from "../services/loading.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoading$ = this.loadingService.loading$; // Observabil pentru starea de loading

  constructor(private loadingService: LoadingService) {}
  title = 'Client';
}
