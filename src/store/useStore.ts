import { create } from "zustand";
import { Borrower, BrokerInfo, PipelineData } from "../types";

interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

interface AppStore {
  // State
  activeBorrower: Borrower | null;
  activeTab: "new" | "in_review" | "approved";
  pipelineData: PipelineData;
  brokerInfo: BrokerInfo | null;
  workflowSteps: string[];
  loading: boolean;
  assistantEnabled: boolean;
  toasts: Toast[];

  // Actions
  setActiveBorrower: (borrower: Borrower | null) => void;
  setActiveTab: (tab: "new" | "in_review" | "approved") => void;
  setPipelineData: (data: PipelineData) => void;
  setBrokerInfo: (info: BrokerInfo) => void;
  setWorkflowSteps: (steps: string[]) => void;
  setLoading: (loading: boolean) => void;
  toggleAssistant: () => void;
  addToast: (message: string, type: "success" | "error" | "info") => void;
  removeToast: (id: string) => void;
  reset: () => void;
}

export const useStore = create<AppStore>((set, get) => ({
  // Initial state
  activeBorrower: null,
  activeTab: "new",
  pipelineData: { new: [], in_review: [], approved: [] },
  brokerInfo: null,
  workflowSteps: [],
  loading: false,
  assistantEnabled: false,
  toasts: [],

  // Actions
  setActiveBorrower: (borrower) => set({ activeBorrower: borrower }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setPipelineData: (data) => set({ pipelineData: data }),
  setBrokerInfo: (info) => set({ brokerInfo: info }),
  setWorkflowSteps: (steps) => set({ workflowSteps: steps }),
  setLoading: (loading) => set({ loading }),
  toggleAssistant: () =>
    set((state) => ({ assistantEnabled: !state.assistantEnabled })),
  addToast: (message, type) => {
    const id = Date.now().toString();
    set((state) => ({
      toasts: [...state.toasts, { id, message, type }],
    }));
    // Auto-remove toast after 5 seconds
    setTimeout(() => {
      get().removeToast(id);
    }, 5000);
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
  reset: () =>
    set({
      activeBorrower: null,
      activeTab: "new",
      pipelineData: { new: [], in_review: [], approved: [] },
      brokerInfo: null,
      workflowSteps: [],
      loading: false,
      assistantEnabled: false,
      toasts: [],
    }),
}));
