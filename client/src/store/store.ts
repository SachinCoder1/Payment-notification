import { create } from "zustand";

interface TransactionState {
  transaction: {};
  setTransaction: (by: {}) => void;
  play: boolean;
}

export const useTransactionStore = create<TransactionState>()((set) => ({
  transaction: {},
  play: false,
  setTransaction: (by) => set((state: {}) => ({ transaction: by })),
  setPlay: () => set((state) => ({ play: !state.play })),
}));
