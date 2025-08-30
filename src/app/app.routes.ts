import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { Login } from './auth/login/login';
import { Dashboard } from './dashboard/dashboard';
import { LoanApplication } from './loan-application/loan-application';
import { ApprovalWorkflow } from './approval-workflow/approval-workflow';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard, canActivate: [AuthGuard] },
  { path: 'apply', component: LoanApplication, canActivate: [AuthGuard] },
  { path: 'approval-workflow/:id', component: ApprovalWorkflow, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login' }
];
