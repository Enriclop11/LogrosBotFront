import {Component, OnInit} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatAnchor} from "@angular/material/button";
import {Router, RouterLink} from "@angular/router";
import {ApiLogrosService} from '../services/api-logros.service';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbar,
    MatAnchor,
    RouterLink
  ],
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  username: string = 'LOGIN';

  constructor(
    private readonly router: Router,
    private readonly apiLogrosService: ApiLogrosService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      let token = localStorage.getItem('token') ?? '';
      this.apiLogrosService.getMyUser(token).subscribe({
        next: (data) => {
          this.username = data.username;
        },
        error: (error) => {
          console.error('Failed to fetch user info:', error);
        }
      });
    }
  }

  toInventory() {

    if (this.username === 'LOGIN') {
      this.router.navigate(['/login']);
    }

    this.router.navigate(['/user', this.username]);
  }
}
