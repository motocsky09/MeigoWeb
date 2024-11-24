import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private isLoading = new BehaviorSubject<boolean>(false);
  loading$ = this.isLoading.asObservable();

  show() {
    this.isLoading.next(true); // Afișează loading
  }

  hide() {
    this.isLoading.next(false); // Ascunde loading
  }
}
