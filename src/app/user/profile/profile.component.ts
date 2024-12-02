import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {ApiLogrosService} from '../../services/api-logros.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, NgIf, NgForOf],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  token: any = "";
  userInfo: any = {};
  selectedCards: any = [];

  constructor(private readonly apiLogrosService: ApiLogrosService, private dialog: MatDialog) {}

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      window.location.href = '/login';
    } else {
      this.token = localStorage.getItem('token');
    }

    this.getUserInfo();
  }

  getUserInfo() {
    this.apiLogrosService.getMyUser(this.token).subscribe({
      next: (data) => {
        this.userInfo = data;
        console.log(this.userInfo);

        if (this.userInfo.photoCardSelected) {
          this.selectedCards = this.userInfo.photoCardSelected;
        }

        console.log(this.selectedCards);

      },
      error: (error) => {
        console.log('Error getting user info');
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  myCards() {
    window.location.href = '/user/' + this.userInfo.username;
  }
}
