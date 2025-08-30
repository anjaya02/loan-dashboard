export interface Borrower {
  id: string;
  name: string;
  loan_type: string;
  amount: number;
  status: "New" | "In Review" | "Renew" | "Approved";
  email?: string;
  phone?: string;
  loan_amount?: number;
  employment?: string;
  income?: number;
  existing_loan?: number;
  credit_score?: number;
  source_of_funds?: string;
  risk_signal?: string;
  ai_flags?: string[];
}

export interface BrokerInfo {
  name: string;
  deals: number;
  approval_rate: string;
  pending: number;
}

export interface PipelineData {
  new: Borrower[];
  in_review: Borrower[];
  approved: Borrower[];
}

export interface ApiResponse {
  success: boolean;
  message: string;
}

export interface AppState {
  activeBorrower: Borrower | null;
  activeTab: "new" | "in_review" | "approved";
  pipelineData: PipelineData;
  brokerInfo: BrokerInfo | null;
  workflowSteps: string[];
  loading: boolean;
  assistantEnabled: boolean;
}
