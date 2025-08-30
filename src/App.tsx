import React, { useEffect } from "react";
import { ApiService } from "./services/api";
import { useStore } from "./store/useStore";
import { BorrowerPipeline } from "./components/ui/BorrowerPipeline";
import { BorrowerDetail } from "./components/ui/BorrowerDetail";
import { BrokerOverview } from "./components/ui/BrokerOverview";
import { Layout } from "./components/ui/Layout";

// Main App Component
const DashboardApp: React.FC = () => {
  const {
    setActiveBorrower,
    setPipelineData,
    setBrokerInfo,
    setWorkflowSteps,
    setLoading,
    loading,
  } = useStore();

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);

        const [pipelineData, brokerInfo, workflowSteps] = await Promise.all([
          ApiService.getPipeline(),
          ApiService.getBrokerInfo(),
          ApiService.getWorkflowSteps(),
        ]);

        setPipelineData(pipelineData);
        setBrokerInfo(brokerInfo);
        setWorkflowSteps(workflowSteps);

        // Set first borrower as active by default
        if (pipelineData.new.length > 0) {
          setActiveBorrower(pipelineData.new[0]);
        } else if (pipelineData.in_review.length > 0) {
          setActiveBorrower(pipelineData.in_review[0]);
        }
      } catch (error) {
        console.error("Error loading initial data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, [
    setPipelineData,
    setBrokerInfo,
    setWorkflowSteps,
    setActiveBorrower,
    setLoading,
  ]);

  if (loading) {
    return (
      <Layout>
        <div className="col-span-3 flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="lg:col-span-1">
        <BorrowerPipeline />
      </div>
      <div className="lg:col-span-1">
        <BorrowerDetail />
      </div>
      <div className="lg:col-span-1">
        <BrokerOverview />
      </div>
    </Layout>
  );
};

// Main App with Provider
const App: React.FC = () => {
  return <DashboardApp />;
};

export default App;
