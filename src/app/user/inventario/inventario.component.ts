import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiLogrosService} from '../../services/api-logros.service';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-inventario',
  imports: [
    NgForOf
  ],
  templateUrl: './inventario.component.html',
  standalone: true,
  styleUrl: './inventario.component.css'
})
export class InventarioComponent implements OnInit {

  user: string = '';
  data: any = {
  }

  constructor(
    private readonly apiLogrosService: ApiLogrosService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.user = params.get('user') || '';

      if (this.user === 'LOGIN') {
        this.router.navigate(['/login']);
        return;
      }

      this.apiLogrosService.getUserInfo(this.user).subscribe(
        (data) => {
          if (Array.isArray(data.achievements)) {
            this.data = data;
            this.data.achievements = data.achievements.map((item: any, index: number) => ({
              ...item,
              initialIndex: index
            }));

          } else {
            console.error('photoCards is not an array:', data.photoCards);
          }
        },
        (error) => {
          console.error('Failed to fetch user info:', error);
          this.router.navigate(['/']);
        }
      );
    });
  }

}
