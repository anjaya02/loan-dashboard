import React from "react";
import { Radio } from "lucide-react";
import { useStore } from "../../store/useStore";
import { formatCurrency, getStatusColor } from "../../utils/cn";

export const BorrowerPipeline: React.FC = () => {
  const {
    activeTab,
    pipelineData,
    activeBorrower,
    setActiveBorrower,
    setActiveTab,
  } = useStore();

  const tabs = [
    { key: "new" as const, label: "New", count: pipelineData.new.length },
    {
      key: "in_review" as const,
      label: "In Review",
      count: pipelineData.in_review.length,
    },
    {
      key: "approved" as const,
      label: "Approved",
      count: pipelineData.approved.length,
    },
  ];

  const currentBorrowers = pipelineData[activeTab];

  return (
    <div className="bg-white rounded-lg border shadow-sm p-6">
      <div className="space-y-4">
        {/* Tabs */}
        <div className="border-b">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.key
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </nav>
        </div>

        {/* Borrower List */}
        <div className="space-y-3">
          {currentBorrowers.map((borrower) => (
            <div
              key={borrower.id}
              onClick={() => setActiveBorrower(borrower)}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                activeBorrower?.id === borrower.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="font-medium">{borrower.name}</h3>
                  <p className="text-sm text-gray-600">{borrower.loan_type}</p>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      borrower.status
                    )}`}
                  >
                    {borrower.status}
                  </span>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    {formatCurrency(borrower.amount)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Radio Section */}
        <div className="pt-4 border-t">
          <div className="flex items-center space-x-2">
            <Radio className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-900 uppercase tracking-wide">
              F-SANITISED ACTIVE
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
