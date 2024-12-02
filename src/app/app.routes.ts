import { Routes } from '@angular/router';
import {IndexComponent} from './index/index.component';
import {LeaderboardComponent} from './user/leaderboard/leaderboard.component';
import {InventarioComponent} from './user/inventario/inventario.component';
import {LoginComponent} from './user/login/login.component';
import {ProfileComponent} from './user/profile/profile.component';

export const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'user/:user', component: InventarioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent }
];
