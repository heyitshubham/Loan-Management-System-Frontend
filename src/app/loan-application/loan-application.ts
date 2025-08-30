import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Loan } from '../loan/loan';
import { LoanApplication as LoanApplicationModel } from '../models/loan.model';

@Component({
  selector: 'app-loan-application',
  imports: [CommonModule, FormsModule],
  templateUrl: './loan-application.html',
  styleUrl: './loan-application.css'
})
export class LoanApplication {
  application: LoanApplicationModel = {
    applicantName: '',
    loanAmount: 0,
    tenure: 0,
    income: 0,
    contactDetails: ''
  };
  
  error = '';
  success = '';
  loading = false;

  constructor(private loanService: Loan, private router: Router) {}

  onSubmit(): void {
    if (!this.validateForm()) {
      return;
    }

    this.loading = true;
    this.error = '';
    this.success = '';

    this.loanService.submitApplication(this.application)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.success = 'Loan application submitted successfully!';
            setTimeout(() => {
              this.router.navigate(['/dashboard']);
            }, 2000);
          } else {
            this.error = response.message;
          }
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to submit application. Please try again.';
          this.loading = false;
        }
      });
  }

  validateForm(): boolean {
    if (!this.application.applicantName.trim()) {
      this.error = 'Applicant name is required';
      return false;
    }
    if (!this.application.loanAmount || this.application.loanAmount < 1000) {
      this.error = 'Loan amount must be at least 1000';
      return false;
    }
    if (!this.application.tenure || this.application.tenure < 1 || this.application.tenure > 360) {
      this.error = 'Tenure must be between 1-360 months';
      return false;
    }
    if (!this.application.income || this.application.income <= 0) {
      this.error = 'Income must be a positive number';
      return false;
    }
    if (!this.application.contactDetails.trim()) {
      this.error = 'Contact details are required';
      return false;
    }
    return true;
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
