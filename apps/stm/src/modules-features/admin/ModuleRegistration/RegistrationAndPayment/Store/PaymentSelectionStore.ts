import { create } from 'zustand'

interface IPaymentSelectionStore {
    paymentSelection: number | null,
    discountId: number | null,
    discountAmount: number | null,
    finalPaymentPrice: number | null,

    setPaymentSelection: (Payment: any) => void,
    setFinalPaymentPrice: (finalPaymentPrice: number) => void,
    setDiscountId: (discountId: number | null) => void,
    setDiscountAmount: (discountAmount: number | null) => void,
}

export const usePaymentSelectionStore = create<IPaymentSelectionStore>((set) => ({
    paymentSelection: null,
    finalPaymentPrice: null,
    discountId: null,
    discountAmount: null,
    
    setPaymentSelection: (paymentSelection: any) => set((state: any) => ({ paymentSelection: paymentSelection })),
    setFinalPaymentPrice: (finalPaymentPrice: number) => set((state: any) => ({ finalPaymentPrice: finalPaymentPrice })),
    setDiscountId: (discountId: number | null) => set((state: any) => ({ discountId: discountId })),
    setDiscountAmount: (discountAmount: number | null) => set((state: any) => ({ discountAmount: discountAmount }))
}))