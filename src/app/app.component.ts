import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  username: string = 'admin';
  password: string = 'password';
  actors: any[];
  films: any[];
  access_token: string = '';
  refresh_token: string = '';
  constructor(public authService: AuthService) {
    this.actors = [];
    this.films = [];
  }

  ngOnInit() {
    this.authService
      .login(this.username, this.password)
      .subscribe((response: any) => {
        if (response) {
          const { access_token, refresh_token } = response;
          this.access_token = access_token;
          this.refresh_token = refresh_token;
          this.authService.saveAccessToken(this.access_token);
          this.authService.saveRefreshToken(this.refresh_token);

          this.loadActors();
          this.loadFilms();
        }
      });
  }

  refreshToken() {
    this.authService.refreshToken().subscribe(
      (response: any) => {
        if (response) {
          const { access_token, refresh_token } = response;
          this.access_token = access_token;
          this.refresh_token = refresh_token;
          this.authService.saveAccessToken(this.access_token);
          this.authService.saveRefreshToken(this.refresh_token);

          this.loadActors();
          this.loadFilms();
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  loadActors() {
    this.authService.getActors().subscribe(
      (response: any) => {
        this.actors = response;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  loadFilms() {
    this.authService.getFilms().subscribe(
      (response) => {
        this.films = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
