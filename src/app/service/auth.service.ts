import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as jwt from 'jsonwebtoken';
import { Observable } from 'rxjs';


// Rest of your code...
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private SERVERB_URL = 'http://127.0.0.1:5000'; // Thay thế bằng URL thực tế của máy chủ

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<any>(`${this.SERVERB_URL}/login`, { username: username, password: password });
  }

  refreshToken(): Observable<any> {
    // Gửi yêu cầu refresh token đến máy chủ và nhận lại access token mới
    return this.http.post<any>(`${this.SERVERB_URL}/refresh`, null);
  }


  saveToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  // getDecodedToken() {
  //   const token = localStorage.getItem('access_token');
  //   if (token) {
  //     return jwt_decode(token);
  //   }
  //   return null;
  // }

  isAuthenticated() {
    const token = localStorage.getItem('access_token');
    return token !== null;
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  getActors() {
    return this.http.get<any[]>(`${this.SERVERB_URL}/actors`);
  }

  getFilms() {
    return this.http.get<any[]>(`${this.SERVERB_URL}/films`);
  }
}
