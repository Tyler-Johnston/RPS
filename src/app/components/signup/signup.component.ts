import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../supabase.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GameDataService } from '../../game-data.service';
@Component({
  selector: 'app-login',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: '../login/login.component.css'
})
export class SignupComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(public gameData: GameDataService, private supabaseService: SupabaseService, private router: Router) {}

  async onSignUp(): Promise<void> {
    
    if (!this.isValidEmail(this.email)) {
      this.errorMessage = 'Please enter a valid email address.';
      return;
    }  
      
    const { error } = await this.supabaseService.signUp(this.email, this.password);

    if (error) {
      this.errorMessage = error.message;
    } else {
      this.errorMessage = '';
      this.gameData.isLoggedIn = true;

      try {
        await this.gameData.transferLocalSaveToCloud();
        console.log('Local save transferred to cloud.');
      } catch (transferError) {
        console.error('Failed to transfer local save to cloud.', transferError);
      }
      
      this.router.navigate(['/']);
    }
  }

  isValidEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  
}