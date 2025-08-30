export interface LoanApplication {
  id?: number;
  applicantName: string;
  loanAmount: number;
  tenure: number;
  income: number;
  contactDetails: string;
  status?: string;
  submissionDate?: string;
  submittedBy?: any;
}

export interface ApprovalStep {
  id: number;
  stepName: string;
  status: string;
  comments?: string;
  createdDate: string;
  updatedDate?: string;
  stepOrder: number;
  updatedBy?: any;
}