import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from '../auth/auth';
import { Loan } from '../loan/loan';
import { LoanApplication } from '../models/loan.model';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  user: any = null;
  applications: LoanApplication[] = [];
  loading = false;
  error = '';

  constructor(
    private auth: Auth,
    private loanService: Loan,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.auth.user$.subscribe(user => {
      this.user = user;
    });
    this.loadApplications();
  }

  loadApplications(): void {
    this.loading = true;
    this.error = '';
    
    // Load all applications if admin, otherwise just user's applications
    const isAdmin = this.auth.isAdmin();
    const serviceCall = isAdmin ? 
      this.loanService.getAllApplications() : 
      this.loanService.getMyApplications();
    
    serviceCall.subscribe({
      next: (response) => {
        if (response.success) {
          this.applications = response.data;
        } else {
          this.error = response.message;
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load applications';
        this.loading = false;
      }
    });
  }

  newApplication(): void {
    this.router.navigate(['/apply']);
  }

  viewApplication(id: number): void {
    this.router.navigate(['/approval-workflow', id]);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'APPROVED': return 'status-approved';
      case 'REJECTED': return 'status-rejected';
      case 'IN_PROGRESS': return 'status-in-progress';
      default: return 'status-submitted';
    }
  }

  isAdmin(): boolean {
    return this.auth.isAdmin();
  }
}
