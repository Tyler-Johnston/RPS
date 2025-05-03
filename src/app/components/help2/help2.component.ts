import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GameDataService } from '../../game-data.service';

@Component({
  selector: 'app-help2',
  imports: [RouterModule, CommonModule],
  templateUrl: './help2.component.html',
  styleUrl: '../help/help.component.css'
})
export class Help2Component {

  constructor(public gameData: GameDataService) {}
}
