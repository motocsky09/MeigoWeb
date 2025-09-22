import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private apiUrl = 'http://localhost:5098/api/Chat'; // <-- Atenție: Aici trebuie să pui URL-ul backend-ului tău. Poate fi diferit.

  constructor(private http: HttpClient) { }

  sendMessage(message: string): Observable<any> {
    const body = { message: message };
    return this.http.post<any>(this.apiUrl, body);
  }
}