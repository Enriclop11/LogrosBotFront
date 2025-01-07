import {Component, OnInit} from '@angular/core';
import {ApiLogrosService} from '../../services/api-logros.service';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-leaderboard',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './leaderboard.component.html',
  standalone: true,
  styleUrl: './leaderboard.component.css'
})
export class LeaderboardComponent implements OnInit {

  public users: any;

  constructor(
    private readonly apiLogrosService: ApiLogrosService,
  ) { }

  ngOnInit(): void {
    this.apiLogrosService.getUsers().subscribe((data) => {
      this.users = data;
      this.sortUsers();
    });
  }

  openInventory(user: any) {
    window.location.href = `/user/${user}`;
  }

  sortUsers() {
    this.users.sort((a: any, b: any) => {
      return b.achievements - a.achievements;
    });
  }
}
