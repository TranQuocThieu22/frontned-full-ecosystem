export interface IExchangeProgram {
    id: number;
    exchangeCode: string;
    exchangeName: string;
    mainPartner: string;
    targetType: string;
    direction: string;
    submissionDeadline: string; 
    publishDate: string;       
    status: string;
    maxSlots?: number;
    supportCostVND?: number;
    approvalType: string;
}