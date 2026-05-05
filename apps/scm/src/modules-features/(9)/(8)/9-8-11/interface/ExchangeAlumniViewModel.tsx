export interface IExchangeAlumni {
    id: number;
    userCode: string;
    userName: string;
    email: string;
    position: string;
    hasExchangeExperience: string; // 'Có' / 'Không'
    direction: string;
    partner: string;
    expertise: string;
    isWillingToSupport: string; // 'Có' / 'Không áp dụng'
    notes: string;
}