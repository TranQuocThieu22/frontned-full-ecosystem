export interface IScientificResearchTopicRegistrationAnnouncement {
    id: number;
    notificationCode: string;
    notificationTitle: string;
    mainContent: string;
    attachmentFile: string;
    issueDate: string;
    proposalStartDate: string;
    proposalEndDate: string;
    hasNotificationSent: boolean;
}