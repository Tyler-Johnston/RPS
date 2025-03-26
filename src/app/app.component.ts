import { Component } from '@angular/core';
import { GameComponent } from './components/game/game.component';
import { ShopComponent } from './components/shop/shop.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,  // Mark as standalone
  imports: [RouterModule, GameComponent, ShopComponent],
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent {
  title = 'rock-paper-scissors';
}
