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

  getToken(username: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl + 'token', { username, password }, { responseType: 'json' });
  }

  getMyUser(token: string): Observable<any> {
    return this.http.post(this.apiUrl + 'myuser',"" , {headers: {Authorization: 'Bearer ' + token}});
  }

  setPassword(token: string, password: string): Observable<any> {
    console.log('setting password ' + password + ' ' + token);
    return this.http.post(this.apiUrl + 'changePassword', {password}, {headers: {Authorization: 'Bearer ' + token}, responseType: 'json'});
  }

  deleteCard(token: string, cardId: number): Observable<any> {
    return this.http.delete(this.apiUrl + 'achievements/' + cardId, {headers: {Authorization: 'Bearer ' + token}});
  }

  sendLoginTwitch(code: string): Observable<any> {
    return this.http.post(this.apiUrl + 'loginTwitch', {code}, { responseType: 'json' });
  }
}
