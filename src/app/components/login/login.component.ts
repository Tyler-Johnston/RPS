import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../supabase.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private supabaseService: SupabaseService, private router: Router) {}

  async onLogin(): Promise<void> {
    const { error } = await this.supabaseService.signIn(this.email, this.password);

    if (error) {
      this.errorMessage = error.message;
    } else {
      this.errorMessage = '';
      this.router.navigate(['/']);
    }
  }
}