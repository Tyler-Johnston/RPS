import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AchievementService } from '../../achievement.service';

@Component({
  selector: 'app-easter-egg',
  imports: [RouterModule, CommonModule],
  templateUrl: './easter-egg.component.html',
  styleUrl: './easter-egg.component.css'
})
export class EasterEggComponent {
  constructor(private achievementService: AchievementService) {
    this.achievementService.unlockAchievement('misc_secretFinder');
  }
}
