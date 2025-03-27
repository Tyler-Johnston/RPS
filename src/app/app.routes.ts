import { Routes } from '@angular/router';
import { GameComponent } from './components/game/game.component';
import { ShopComponent } from './components/shop/shop.component';
import { Shop2Component } from './components/shop2/shop2.component';

export const routes: Routes = [
  { path: '', component: GameComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'shop2', component: Shop2Component }
];