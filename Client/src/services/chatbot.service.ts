import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private apiUrl = environment.apiUrl + '/Chat'; 

  constructor(private http: HttpClient) { }

  sendMessage(message: string): Observable<any> {
    const body = { message: message };
    return this.http.post<any>(this.apiUrl, body);
  }
}