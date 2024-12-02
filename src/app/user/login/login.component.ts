import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {ApiLogrosService} from '../../services/api-logros.service';

@Component({
  selector: 'app-login',
  standalone: true,
    imports: [
        FormsModule,
        NgIf,
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  username: any;
  password: any;
  errorMessage: any;

  constructor(
    private readonly apiLogrosService: ApiLogrosService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      window.location.href = '/profile';
    }

    const hash = window.location.hash.substring(1);
    const urlParams = new URLSearchParams(hash);
    const accessToken = urlParams.get('access_token');
    if (accessToken) {

      this.apiLogrosService.sendLoginTwitch(accessToken).subscribe({
        next: (data) => {
          console.log('Got token:', data.token);
          localStorage.setItem('token', data.token);
          window.location.href = 'profile';
        },
        error: (error) => {
          console.error('Error:', error);
          this.errorMessage = error.error.message;
        }
      });
    }

  }


  login() {
    this.apiLogrosService.getToken(this.username, this.password).subscribe({
      next: (data) => {
        console.log('Got token:', data.token);
        localStorage.setItem('token', data.token);

        window.location.href = 'profile';
      },
      error: (error) => {
        console.error('Error:', error);
        this.errorMessage = error.error.message;
      }
    });
  }

  twitchLogin() {
    const client_id = 'v75aqwwhpedv4xd9bhwuc500tmgytr';
    const redirect_uri = `${window.location.origin}/login`;
    const response_type = 'token';
    const scope = 'user:read:email';

    window.location.href = `https://id.twitch.tv/oauth2/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}&scope=${scope}`;
  }
}
