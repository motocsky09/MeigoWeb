import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiUrl = 'http://localhost:5098/api'; // URL-ul corect

  constructor(
    private fb:FormBuilder,
    private http:HttpClient,
    private router:Router
  ) {
  }
  readonly BaseURI = 'http://localhost:5098/api';

  getProfiles(): Observable<any>{
    return this.http.get(this.BaseURI+'/Profile/GetProfiles');
  }
  getProfileByUserName(userName: any): Observable<any> {

    return this.http.get(this.BaseURI + '/Profile/GetProfileByUserName?userName=' + userName);
  }

  updateProfile(profile: any): Observable<any> {
    return this.http.put(this.BaseURI + '/Profile/UpdateProfile', profile);
  }

  createDefaultProfile(userName: string , email: string): Observable<any> {
    let body = new HttpParams({
      fromObject : {
        'userName' : userName,
        'email' : email
      }
    })
    return this.http.post(this.BaseURI + '/Profile/CreateDefaultProfile?userName=' + userName + '&email=' + email,body);
  }
}
