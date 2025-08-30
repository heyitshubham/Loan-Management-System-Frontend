import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth } from '../auth';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  username = '';
  password = '';
  error = '';
  loading = false;

  constructor(private auth: Auth, private router: Router) {}

  onSubmit(): void {
    if (!this.username || !this.password) {
      this.error = 'Please enter both username and password';
      return;
    }

    this.loading = true;
    this.error = '';

    this.auth.login({ username: this.username, password: this.password })
      .subscribe({
        next: (response) => {
          console.log(response);
          if (response.success) {
            this.router.navigate(['/dashboard']);
          } else {
            this.error = response.message;
          }
          this.loading = false;
        },
        error: (err) => {
          console.log(err);
          if (err.message) {
            this.error = err.error.message;
          } else{
            this.error = 'Login failed. Please try again.';
          }
          this.loading = false;
        }
      });
  }
}
