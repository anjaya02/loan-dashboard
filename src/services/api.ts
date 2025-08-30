import { Borrower, PipelineData, BrokerInfo, ApiResponse } from "../types";

export class ApiService {
  private static baseUrl = process.env.REACT_APP_API_BASE_URL || "";

  // Mock data for demonstration
  private static mockBorrowers: PipelineData = {
    new: [
      {
        id: "1",
        name: "Sarah Dunn",
        loan_type: "Home Loan",
        amount: 300000,
        status: "Renew",
        email: "sarah.dunn@example.com",
        phone: "(355)123-4557",
        loan_amount: 300000,
        employment: "At Tech Company",
        income: 120000,
        existing_loan: 240000,
        credit_score: 720,
        source_of_funds: "Declared",
        risk_signal: "Missing Source of Funds declaration",
        ai_flags: [
          "Income Inconsistent with Bank statements",
          "High Debt-to-Income Ratio detected",
        ],
      },
      {
        id: "3",
        name: "Lisa Carter",
        loan_type: "Home Loan",
        amount: 450000,
        status: "New",
        email: "lisa.carter@example.com",
        phone: "(355)987-6543",
        loan_amount: 450000,
        employment: "Senior Manager",
        income: 95000,
        existing_loan: 180000,
        credit_score: 680,
        source_of_funds: "Savings",
        risk_signal: "High loan-to-income ratio",
        ai_flags: ["Credit score below average"],
      },
    ],
    in_review: [
      {
        id: "2",
        name: "Alan Matthews",
        loan_type: "Personal Loan",
        amount: 20000,
        status: "In Review",
        email: "alan.matthews@example.com",
        phone: "(355)456-7890",
        loan_amount: 20000,
        employment: "Freelancer",
        income: 65000,
        existing_loan: 5000,
        credit_score: 750,
        source_of_funds: "Income",
        risk_signal: "Irregular income pattern",
        ai_flags: ["Employment verification needed"],
      },
    ],
    approved: [],
  };

  static async getPipeline(): Promise<PipelineData> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.mockBorrowers), 300);
    });
  }

  static async getBorrowerDetail(id: string): Promise<Borrower | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const allBorrowers = [
          ...this.mockBorrowers.new,
          ...this.mockBorrowers.in_review,
          ...this.mockBorrowers.approved,
        ];
        const borrower = allBorrowers.find((b) => b.id === id);
        resolve(borrower || null);
      }, 200);
    });
  }

  static async requestDocuments(id: string): Promise<ApiResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: "Documents requested successfully.",
        });
      }, 500);
    });
  }

  static async sendToValuer(id: string): Promise<ApiResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: "Valuer has been notified." });
      }, 500);
    });
  }

  static async approveLoan(id: string): Promise<ApiResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: "Loan approved successfully." });
      }, 500);
    });
  }

  static async escalateToCommittee(id: string): Promise<ApiResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: "Case escalated to Credit Committee.",
        });
      }, 500);
    });
  }

  static async getBrokerInfo(): Promise<BrokerInfo> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          name: "Robert Turner",
          deals: 16,
          approval_rate: "75%",
          pending: 7660,
        });
      }, 200);
    });
  }

  static async getWorkflowSteps(): Promise<string[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          "Deal Intake",
          "IDV & Credit Check",
          "Document Upload",
          "AI Validation",
          "Credit Committee",
          "Approval & Docs",
          "Funder Syndication",
        ]);
      }, 200);
    });
  }
}
