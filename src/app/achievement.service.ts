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
    { id: 'prog_firstWin', title: 'First Win!', description: 'Win your first match', unlocked: false },
    { id: 'prog_hundredWins', title: 'Centurion', description: 'Win 100 matches', unlocked: false },
    { id: 'prog_thousandPoints', title: 'One Small Step', description: 'Reach 1,000 points', unlocked: false },
    { id: 'prog_millionaire', title: 'Millionaire', description: 'Reach 1,000,000 points', unlocked: false },
    { id: 'prog_billionaire', title: 'Billionaire', description: 'Reach 1,000,000,000 points', unlocked: false },
    { id: 'prog_combo100', title: 'Chain Reaction', description: 'Get a 100-win streak', unlocked: false },
    { id: 'prog_combo1000', title: 'Unstoppable', description: 'Get a 1,000-win streak', unlocked: false },
    { id: 'prog_combo50000', title: 'Take a Shower?', description: 'Get a 50,000-win streak', unlocked: false },
  
    // Upgrades
    { id: 'upg_firstSniper', title: 'Automagic', description: 'Unlock Your First Sniper', unlocked: false },
    { id: 'upg_tripleSniper', title: 'Triple Threat', description: 'Unlock All Snipers', unlocked: false },
    { id: 'upg_firstGenerator', title: 'Baby Steps', description: 'Unlock Your First Generator', unlocked: false },
    { id: 'upg_fullProduction', title: 'Full Production', description: 'Unlock All Generators', unlocked: false },
    { id: 'upg_firstEfficiencyMax', title: 'Full Steam Ahead', description: 'Max out any Sniper\'s efficiency', unlocked: false },
    { id: 'upg_tripleEfficiencyMax', title: 'Global Warmer', description: 'Max out every Sniper\'s efficiency', unlocked: false },
    { id: 'upg_intervalMin', title: 'Counterfeit Mark I', description: 'Maximize the amount of fuel you can generate for any generator', unlocked: false },
    { id: 'upg_intervalMin', title: 'Overachiever', description: 'Maximize the amount of fuel you can generate for every generator', unlocked: false },
    { id: 'upg_intervalCompletionist', title: 'Counterfeit Mark II', description: 'Reduce any generators interval to 1 second', unlocked: false },
    { id: 'upg_intervalMin', title: 'No Lifer', description: 'Reduce every generator interval to 1 second', unlocked: false },
  
    // Mechanics
    { id: 'mech_ppw1000', title: 'Points-Per-Win', description: 'Achieve a PPW of 1,000', unlocked: false },
    { id: 'mech_ppw10000', title: 'Harmonic Symphony', description: 'Achieve a PPW of 10,000', unlocked: false },
    { id: 'mech_ppw100000', title: 'RPS Tycoon', description: 'Achieve a PPW of 100,000', unlocked: false },
  
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

  getCompletionPercentage(): number {
    const total = this.achievements.length;
    const unlocked = this.achievements.filter(a => a.unlocked).length;
    return total === 0 ? 0 : Math.floor((unlocked / total) * 100);
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
    if (gameData.pointsPerWin >= 1000) this.unlockAchievement('mech_ppw1000');
    if (gameData.rockSniperActive || gameData.paperSniperActive || gameData.scissorSniperActive) this.unlockAchievement('mech_firstSniper');
    if (gameData.rockSniperActive && gameData.paperSniperActive && gameData.scissorSniperActive) this.unlockAchievement('mech_tripleSniper');
    if (gameData.rockGeneratorActive || gameData.paperGeneratorActive || gameData.scissorGeneratorActive) this.unlockAchievement('mech_firstGenerator')
    if (gameData.rockGeneratorActive && gameData.paperGeneratorActive && gameData.scissorGeneratorActive) this.unlockAchievement('mech_fullProduction')
    if (gameData.rocks >= 200 || gameData.papers >= 200 || gameData.scissors >= 200) this.unlockAchievement("misc_fuelHoarder1")
  }
}
