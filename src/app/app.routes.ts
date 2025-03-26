import { Routes } from '@angular/router';
import { GameComponent } from './components/game/game.component';
import { ShopComponent } from './components/shop/shop.component';

export const routes: Routes = [
  { path: '', component: GameComponent },
  { path: 'shop', component: ShopComponent }
];