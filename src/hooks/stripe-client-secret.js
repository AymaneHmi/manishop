import { create } from "zustand";

export const useStripeClientSecret = create((set) => ({
    clientSecret: '',
    handleClientSecret: (clientSecret) => set({ clientSecret })
}));