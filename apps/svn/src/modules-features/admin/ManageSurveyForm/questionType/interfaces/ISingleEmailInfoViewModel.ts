export interface ISingleEmailInfoViewModel {
    question: string;
    email: string;
    description: string;
    image: File | null;
    defaultEmail: string;
}
export interface SingleEmailSetting {
    isHasImage: boolean;
}
