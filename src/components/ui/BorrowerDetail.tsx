import React, { useState } from "react";
import { AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";
import { useStore } from "../../store/useStore";
import { ApiService } from "../../services/api";
import { formatCurrency } from "../../utils/cn";

export const BorrowerDetail: React.FC = () => {
  const { activeBorrower, addToast } = useStore();
  const [explainabilityExpanded, setExplainabilityExpanded] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!activeBorrower) {
    return (
      <div className="bg-white rounded-lg border shadow-sm p-6">
        <div className="text-center text-gray-500 py-12">
          Select a borrower to view details
        </div>
      </div>
    );
  }

  const handleAction = async (action: string) => {
    setLoading(true);
    try {
      let response;
      switch (action) {
        case "request_documents":
          response = await ApiService.requestDocuments(activeBorrower.id);
          break;
        case "send_valuer":
          response = await ApiService.sendToValuer(activeBorrower.id);
          break;
        case "approve":
          response = await ApiService.approveLoan(activeBorrower.id);
          break;
        case "escalate":
          response = await ApiService.escalateToCommittee(activeBorrower.id);
          break;
      }
      if (response) {
        addToast(response.message, "success");
      }
    } catch (error) {
      console.error(`Error with ${action}:`, error);
      addToast("An error occurred. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border shadow-sm p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">{activeBorrower.name}</h2>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                activeBorrower.status === "In Review"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {activeBorrower.status}
            </span>
          </div>
          <div className="text-sm text-gray-600 space-y-1">
            <p>{activeBorrower.email}</p>
            <p>{activeBorrower.phone}</p>
            <p className="font-medium text-gray-900">
              Loan Amount:{" "}
              {formatCurrency(
                activeBorrower.loan_amount || activeBorrower.amount
              )}
            </p>
          </div>
        </div>

        {/* AI Explainability Section */}
        <div className="border rounded-lg">
          <button
            onClick={() => setExplainabilityExpanded(!explainabilityExpanded)}
            className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50"
          >
            <h3 className="font-medium">AI Explainability</h3>
            {explainabilityExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          {explainabilityExpanded && (
            <div className="p-4 pt-0 border-t">
              {activeBorrower.ai_flags &&
                activeBorrower.ai_flags.length > 0 && (
                  <div className="space-y-2 mb-4">
                    {activeBorrower.ai_flags.map((flag, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 text-red-600"
                      >
                        <AlertTriangle className="w-4 h-4" />
                        <span className="text-sm">{flag}</span>
                      </div>
                    ))}
                  </div>
                )}

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleAction("request_documents")}
                  disabled={loading}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                >
                  Request Documents
                </button>
                <button
                  onClick={() => handleAction("send_valuer")}
                  disabled={loading}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                >
                  Send to Valuer
                </button>
                <button
                  onClick={() => handleAction("approve")}
                  disabled={loading}
                  className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  Approve
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Loan Summary */}
        <div className="space-y-4">
          <h3 className="font-medium">Loan Summary</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Employment:</span>
              <p className="font-medium">{activeBorrower.employment}</p>
            </div>
            <div>
              <span className="text-gray-600">Income:</span>
              <p className="font-medium">
                {activeBorrower.income
                  ? formatCurrency(activeBorrower.income)
                  : "N/A"}
              </p>
            </div>
            <div>
              <span className="text-gray-600">Existing Loan:</span>
              <p className="font-medium">
                {activeBorrower.existing_loan
                  ? formatCurrency(activeBorrower.existing_loan)
                  : "None"}
              </p>
            </div>
            <div>
              <span className="text-gray-600">Credit Score:</span>
              <p className="font-medium">{activeBorrower.credit_score}</p>
            </div>
            <div className="col-span-2">
              <span className="text-gray-600">Source of Funds:</span>
              <p className="font-medium">{activeBorrower.source_of_funds}</p>
            </div>
          </div>

          {activeBorrower.risk_signal && (
            <div className="flex items-start space-x-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-yellow-800">
                  Risk Signal
                </p>
                <p className="text-sm text-yellow-700">
                  {activeBorrower.risk_signal}
                </p>
              </div>
            </div>
          )}

          <button
            onClick={() => handleAction("escalate")}
            disabled={loading}
            className="w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
          >
            Escalate to Credit Committee
          </button>
        </div>
      </div>
    </div>
  );
};
