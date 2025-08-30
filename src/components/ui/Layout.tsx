import React from "react";
import { Search, Bell, HelpCircle } from "lucide-react";
import { Toast } from "./Toast";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">DemoApp</h1>
          <div className="flex items-center space-x-4">
            <Search className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-900 transition-colors" />
            <HelpCircle className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-900 transition-colors" />
            <Bell className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-900 transition-colors" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">{children}</div>
      </main>

      {/* Toast Notifications */}
      <Toast />
    </div>
  );
};
