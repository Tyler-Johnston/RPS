import { Injectable } from '@angular/core';
import { GameDataService } from './game-data.service';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AchievementService {
  private achievements: Achievement[] = [
    // Progression
    { id: 'prog_firstChoice', title: 'The First Move', description: 'Make your first Rock, Paper, or Scissors choice', unlocked: false },
    { id: 'prog_firstWin', title: 'First Win!', description: 'Win your first match', unlocked: false },
    { id: 'prog_hundredWins', title: 'Centurion', description: 'Win 100 matches', unlocked: false },
    { id: 'prog_thousandPoints', title: 'Scorer', description: 'Reach 1,000 points', unlocked: false },
    { id: 'prog_millionaire', title: 'Millionaire', description: 'Reach 1,000,000 points', unlocked: false },
    { id: 'prog_combo10', title: 'Chain Reaction', description: 'Get a 10-win streak', unlocked: false },
    { id: 'prog_combo50', title: 'Unstoppable', description: 'Get a 50-win streak', unlocked: false },
  
    // Upgrades
    { id: 'upg_rockEfficiencyMax', title: 'Rocked Out', description: 'Max out Rock efficiency', unlocked: false },
    { id: 'upg_paperEfficiencyMax', title: 'Sharp Mind', description: 'Max out Paper efficiency', unlocked: false },
    { id: 'upg_scissorEfficiencyMax', title: 'Cut Above', description: 'Max out Scissor efficiency', unlocked: false },
    { id: 'upg_activeMax', title: 'Reflex Master', description: 'Max out all Active upgrade levels', unlocked: false },
    { id: 'upg_intervalMin', title: 'Speed Demon', description: 'Reach minimum interval on any generator', unlocked: false },
  
    // Mechanics
    { id: 'mech_ppw100', title: 'Points-Per-Win', description: 'Achieve a PPW of 100', unlocked: false },
    { id: 'mech_firstSniper', title: 'Automagic', description: 'Unlock Your First Sniper', unlocked: false },
    { id: 'mech_tripleSniper', title: 'Triple Threat', description: 'Unlock All Snipers', unlocked: false },
    { id: 'mech_firstGenerator', title: 'Efficiency I', description: 'Unlock Your First Generator', unlocked: false },
    { id: 'mech_fullProduction', title: 'Full Production', description: 'Unlock All Generators', unlocked: false },
    { id: 'mech_snipeChain', title: 'Precision', description: 'Have 3 snipes hit in a row', unlocked: false },
    { id: 'mech_sniperOverload', title: 'Overclocked', description: 'Fire all 3 snipers in one round', unlocked: false },
    { id: 'mech_generatorStorm', title: 'Boom Boom Boom', description: 'All 3 generators active at once for 1 minute', unlocked: false },
    { id: 'mech_tripleClick', title: 'Triple Tap', description: 'Click all three resource types in one second', unlocked: false },
  
    // Miscellaneous
    { id: 'misc_fuelHoarder1', title: 'Hoarder', description: 'Store 200 rocks, papers, or scissors', unlocked: false },
    { id: 'misc_idleHero', title: 'Break Time', description: 'Earn 1000 resources without clicking anything', unlocked: false },
    { id: 'misc_clickFrenzy', title: 'Finger Workout', description: 'Click 50 times in one minute', unlocked: false },
    { id: 'misc_secretFinder', title: '???', description: 'Discover a hidden feature or easter egg', unlocked: false },
    { id: 'misc_themeShift', title: 'Perspective Shift', description: 'Switch between active and interval branches for all types', unlocked: false },
    { id: 'misc_achievementHunter', title: 'Collector', description: 'Unlock 10 achievements', unlocked: false },
    { id: 'misc_completionist', title: 'Completionist', description: 'Unlock all achievements', unlocked: false }
  ];
  
  

  constructor() {
    this.loadAchievements();
  }

  getAchievements(): Achievement[] {
    return this.achievements;
  }

  isUnlocked(id: string): boolean {
    return this.achievements.find(a => a.id === id)?.unlocked ?? false;
  }

  unlockAchievement(id: string): void {
    const achievement = this.achievements.find(a => a.id === id);
    if (achievement && !achievement.unlocked) {
      achievement.unlocked = true;
      this.saveAchievements();
      console.log(`Achievement unlocked: ${achievement.title}`);
    }
  }

  saveAchievements(): void {
    localStorage.setItem('achievements', JSON.stringify(this.achievements));
  }

  loadAchievements(): void {
    const saved = localStorage.getItem('achievements');
    if (saved) {
      const parsed = JSON.parse(saved);
      this.achievements = this.achievements.map(a => ({
        ...a,
        unlocked: parsed.find((savedA: Achievement) => savedA.id === a.id)?.unlocked ?? a.unlocked
      }));
    }
  }

  evaluateFromGameData(gameData: GameDataService): void {
    if (gameData.pointsPerWin >= 100) this.unlockAchievement('ppw100');
    if (gameData.rockSniperActive || gameData.paperSniperActive || gameData.scissorSniperActive) this.unlockAchievement('firstSniper');
    if (gameData.rockSniperActive && gameData.paperSniperActive && gameData.scissorSniperActive) this.unlockAchievement('tripleSniper');
    if (gameData.rockGeneratorActive || gameData.paperGeneratorActive || gameData.scissorGeneratorActive) this.unlockAchievement('firstGenerator')
    if (gameData.rockGeneratorActive && gameData.paperGeneratorActive && gameData.scissorGeneratorActive) this.unlockAchievement('fullProduction')
    if (gameData.rocks >= 200 || gameData.papers >= 200 || gameData.scissors >= 200) this.unlockAchievement("fuelHoarder1")
  }
}
