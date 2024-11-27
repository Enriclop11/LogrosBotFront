import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiLogrosService {

  private apiUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl + 'users');
  }

  getUserInfo(user: string): Observable<any> {
    return this.http.get(this.apiUrl + 'users/' + user);
  }
}
