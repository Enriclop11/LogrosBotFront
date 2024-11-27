import {Component, OnInit} from '@angular/core';
import {ApiLogrosService} from '../../services/api-logros.service';
import {NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-leaderboard',
  imports: [
    NgForOf,
    NgOptimizedImage,
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
    });
  }

  openInventory(user: any) {
    window.location.href = `/user/${user}`;
  }
}
