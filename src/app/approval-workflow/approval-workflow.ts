import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Loan } from '../loan/loan';
import { Auth } from '../auth/auth';
import { LoanApplication, ApprovalStep } from '../models/loan.model';

@Component({
  selector: 'app-approval-workflow',
  imports: [CommonModule, FormsModule],
  templateUrl: './approval-workflow.html',
  styleUrl: './approval-workflow.css'
})
export class ApprovalWorkflow implements OnInit {
  applicationId!: number;
  application: LoanApplication | null = null;
  approvalSteps: ApprovalStep[] = [];
  loading = false;
  error = '';
  success = '';
  
  selectedStep: ApprovalStep | null = null;
  updateStatus = '';
  updateComments = '';
  updating = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loanService: Loan,
    private auth: Auth
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.applicationId = +params['id'];
      this.loadApplicationDetails();
      this.loadApprovalSteps();
    });
  }

  loadApplicationDetails(): void {
    this.loanService.getApplicationById(this.applicationId)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.application = response.data;
          }
        },
        error: (err) => {
          this.error = 'Failed to load application details';
        }
      });
  }

  loadApprovalSteps(): void {
    this.loading = true;
    this.loanService.getApprovalSteps(this.applicationId)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.approvalSteps = response.data;
          } else {
            this.error = response.message;
          }
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load approval steps';
          this.loading = false;
        }
      });
  }

  openUpdateModal(step: ApprovalStep): void {
    if (step.status === 'PENDING') {
      this.selectedStep = step;
      this.updateStatus = '';
      this.updateComments = '';
    }
  }

  closeUpdateModal(): void {
    this.selectedStep = null;
    this.updateStatus = '';
    this.updateComments = '';
  }

  updateStep(): void {
    if (!this.selectedStep || !this.updateStatus) {
      return;
    }

    this.updating = true;
    this.loanService.updateApprovalStep(
      this.selectedStep.id, 
      this.updateStatus, 
      this.updateComments
    ).subscribe({
      next: (response) => {
        if (response.success) {
          this.success = 'Approval step updated successfully';
          this.closeUpdateModal();
          this.loadApprovalSteps();
          this.loadApplicationDetails();
        } else {
          this.error = response.message;
        }
        this.updating = false;
      },
      error: (err) => {
        this.error = 'Failed to update approval step';
        this.updating = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'APPROVED': return 'status-approved';
      case 'REJECTED': return 'status-rejected';
      case 'PENDING': return 'status-pending';
      default: return 'status-pending';
    }
  }

  isAdmin(): boolean {
    return this.auth.isAdmin();
  }
}
