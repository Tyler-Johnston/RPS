import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AchievementService } from '../../achievement.service';
import { GameDataService } from '../../game-data.service';

@Component({
  selector: 'app-easter-egg',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './easter-egg.component.html',
  styleUrl: './easter-egg.component.css'
})
export class EasterEggComponent implements OnInit {

  constructor(
    private gameData: GameDataService,
    private achievementService: AchievementService
  ) {}

  ngOnInit() {
    this.achievementService.unlockAchievement('misc_secretFinder');
    this.gameData.saveGameData();
  }
}
