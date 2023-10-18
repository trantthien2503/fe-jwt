import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private SERVERB_URL = 'http://127.0.0.1:5000'; // Thay thế bằng URL thực tế của máy chủ

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<any>(`${this.SERVERB_URL}/login`, {
      username: username,
      password: password,
    });
  }

  refreshToken(): Observable<any> {
    const refresh_token = localStorage.getItem('refresh_token');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + refresh_token,
    });
    return this.http.post<any>(`${this.SERVERB_URL}/refresh`, null, {
      headers,
    });
  }

  saveAccessToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  saveRefreshToken(token: string) {
    localStorage.setItem('refresh_token', token);
  }

  isAuthenticated() {
    const token = localStorage.getItem('access_token');
    return token !== null;
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  getActors() {
    const access_token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + access_token,
    });
    return this.http.get<any[]>(`${this.SERVERB_URL}/actors`, { headers });
  }

  getFilms() {
    const access_token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + access_token,
    });
    return this.http.get<any[]>(`${this.SERVERB_URL}/films`, { headers });
  }
}
