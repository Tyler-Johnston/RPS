import { Routes } from '@angular/router';
import { GameComponent } from './components/game/game.component';
import { ShopComponent } from './components/shop/shop.component';
import { Shop2Component } from './components/shop2/shop2.component';
import { AchievementsComponent } from './components/achievements/achievements.component';
import { Achievements2Component } from './components/achievements2/achievements2.component';
import { Achievements3Component } from './components/achievements3/achievements3.component';
import { Achievements4Component } from './components/achievements4/achievements4.component';

export const routes: Routes = [
  { path: '', component: GameComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'shop2', component: Shop2Component },
  { path: 'achievements', component: AchievementsComponent},
  { path: 'achievements2', component: Achievements2Component},
  { path: 'achievements3', component: Achievements3Component},
  { path: 'achievements4', component: Achievements4Component}
];