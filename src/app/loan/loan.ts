import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { LoanApplication, ApprovalStep } from '../models/loan.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Loan {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getMyApplications(): Observable<ApiResponse<LoanApplication[]>> {
    return this.http.get<ApiResponse<LoanApplication[]>>(`${this.baseUrl}/loans/my-applications`);
  }

  getAllApplications(): Observable<ApiResponse<LoanApplication[]>> {
    return this.http.get<ApiResponse<LoanApplication[]>>(`${this.baseUrl}/loans/all`);
  }

  getApplicationById(id: number): Observable<ApiResponse<LoanApplication>> {
    return this.http.get<ApiResponse<LoanApplication>>(`${this.baseUrl}/loans/${id}`);
  }

  submitApplication(application: LoanApplication): Observable<ApiResponse<LoanApplication>> {
    return this.http.post<ApiResponse<LoanApplication>>(`${this.baseUrl}/loans/apply`, application);
  }

  getApprovalSteps(applicationId: number): Observable<ApiResponse<ApprovalStep[]>> {
    return this.http.get<ApiResponse<ApprovalStep[]>>(`${this.baseUrl}/approval/${applicationId}/steps`);
  }

  updateApprovalStep(stepId: number, status: string, comments: string): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.baseUrl}/approval/step/${stepId}`, {
      status,
      comments
    });
  }
}
