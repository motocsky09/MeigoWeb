import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:5098/api/Profile'; // URL-ul corect

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { }

  readonly BaseURI = 'http://localhost:5098/api';

  // Obține token-ul de autentificare
  private getAuthToken(): string | null {
    return localStorage.getItem('authToken'); // Exemplu: token-ul este stocat în localStorage
  }

  // Metodă pentru a crea antetul HTTP cu token-ul de autentificare
  private getHeaders(): HttpHeaders {
    const token = this.getAuthToken();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  getUserProfile(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/GetUserProfile`, { headers: this.getHeaders() });
  }
  
  createProfile(profile: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/CreateProfile`, profile, { headers: this.getHeaders() });
  }  

  updateProfile(profile: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/UpdateProfile`, profile, { headers: this.getHeaders() });
  }

  deleteProfile(profileId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/DeleteProfile/${profileId}`, { headers: this.getHeaders() });
  }
}
