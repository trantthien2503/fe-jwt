import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  username: string='admin';
  password: string='password';
  actors: any[];
  films: any[];

  constructor(public authService: AuthService) {
    this.actors= [];
    this.films = []
  }

  ngOnInit() {
    this.authService.login(this.username, this.password).subscribe((response: any)=>{
      if(response){
        const { access_token } = response;
        this.authService.saveToken(access_token);
        this.loadActors();
        this.loadFilms();
      }
    });

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
