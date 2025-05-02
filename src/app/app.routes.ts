import { Routes } from '@angular/router';
import { GameComponent } from './components/game/game.component';
import { ShopComponent } from './components/shop/shop.component';
import { Shop2Component } from './components/shop2/shop2.component';
import { Shop3Component } from './components/shop3/shop3.component';
import { AchievementsComponent } from './components/achievements/achievements.component';
import { Achievements2Component } from './components/achievements2/achievements2.component';
import { Achievements3Component } from './components/achievements3/achievements3.component';
import { Achievements4Component } from './components/achievements4/achievements4.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HelpComponent } from './components/help/help.component';
import { Help2Component } from './components/help2/help2.component';

export const routes: Routes = [
  { path: '', component: GameComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'shop2', component: Shop2Component },
  { path: 'shop3', component: Shop3Component },
  { path: 'achievements', component: AchievementsComponent},
  { path: 'achievements2', component: Achievements2Component},
  { path: 'achievements3', component: Achievements3Component},
  { path: 'achievements4', component: Achievements4Component},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'help', component: HelpComponent},
  { path: 'help2', component: Help2Component}
];