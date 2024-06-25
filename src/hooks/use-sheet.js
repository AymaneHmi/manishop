import { create } from "zustand";

export const useSheet = create((set) => ({
    sheetType: null,
    data: {},
    showSheet: false,
    isOpen: true,
    onOpen: (sheetType, data) => {
        set({ isOpen: true, sheetType, data });
        setTimeout(() => {
            set({ showSheet: true});
        },50);
    },
    onClose: () => {
        set({ showSheet: false });
        setTimeout(() => {
            set({ isOpen: false, sheetType: null, data: {} });
        },300);
    }
}));