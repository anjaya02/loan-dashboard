import React from "react";
import { Phone, Mail, MessageCircle } from "lucide-react";
import { useStore } from "../../store/useStore";
import { formatCurrency } from "../../utils/cn";

export const BrokerOverview: React.FC = () => {
  const {
    brokerInfo,
    workflowSteps,
    assistantEnabled,
    toggleAssistant,
    addToast,
  } = useStore();

  if (!brokerInfo) {
    return (
      <div className="bg-white rounded-lg border shadow-sm p-6">
        <div className="text-center text-gray-500">
          Loading broker information...
        </div>
      </div>
    );
  }

  const handleContact = (method: string) => {
    addToast(`Contacting ${brokerInfo.name} via ${method}`, "info");
  };

  return (
    <div className="bg-white rounded-lg border shadow-sm p-6">
      <div className="space-y-6">
        {/* Broker Info */}
        <div className="space-y-4">
          <h3 className="font-medium">Broker Overview</h3>
          <div className="space-y-2">
            <h4 className="text-lg font-semibold">{brokerInfo.name}</h4>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-1">
                <p className="text-2xl font-bold text-blue-600">
                  {brokerInfo.deals}
                </p>
                <p className="text-sm text-gray-600">Deals</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-green-600">
                  {brokerInfo.approval_rate}
                </p>
                <p className="text-sm text-gray-600">Approval Rate</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-orange-600">
                  {formatCurrency(brokerInfo.pending)}
                </p>
                <p className="text-sm text-gray-600">Pending</p>
              </div>
            </div>
          </div>

          {/* Contact Buttons */}
          <div className="flex space-x-2">
            <button
              onClick={() => handleContact("phone")}
              className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm">Call</span>
            </button>
            <button
              onClick={() => handleContact("email")}
              className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <Mail className="w-4 h-4" />
              <span className="text-sm">Email</span>
            </button>
            <button
              onClick={() => handleContact("chat")}
              className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm">Chat</span>
            </button>
          </div>
        </div>

        {/* Onboarding Workflow */}
        <div className="space-y-4">
          <h3 className="font-medium">Onboarding Workflow</h3>
          <div className="space-y-3">
            {workflowSteps.map((step, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </div>
                <span className="text-sm">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Assistant Toggle */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">
              AI Assistant (E Ardsassist)
            </span>
            <button
              onClick={toggleAssistant}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                assistantEnabled ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  assistantEnabled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          <p className="text-xs text-gray-600">
            Enable AI-powered assistance for loan processing
          </p>
        </div>
      </div>
    </div>
  );
};
