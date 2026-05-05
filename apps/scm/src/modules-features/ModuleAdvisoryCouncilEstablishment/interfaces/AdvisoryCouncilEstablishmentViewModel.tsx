export interface IAdvisoryCouncilEstablishment {
    id: number;
    councilCode: string;
    councilName: string;
    meetingDate: string; // YYYY-MM-DD
    meetingTime: string; // HH:MM - HH:MM
    location: string;
    chairman: string;
    secretary: string;
    memberList: string;
    registeredProposalCodes: string;
    councilStatus: string;
    approvalFile: string;
}