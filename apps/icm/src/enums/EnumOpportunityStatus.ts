export enum EnumOpportunityStatus {
	New = "MOI", // Mới
	Evaluating = "DD", // Đang đánh giá
	Proposed = "DBV", // Đã gửi đề xuất
	Negotiating = "DG", // Đang đàm phán
	Approved = "DAT" // Đã chấp thuận
}

export const EnumOpportunityStatusLabel: Record<EnumOpportunityStatus, string> = {
	[EnumOpportunityStatus.New]: "Mới",
	[EnumOpportunityStatus.Evaluating]: "Đang đánh giá",
	[EnumOpportunityStatus.Proposed]: "Đã gửi đề xuất",
	[EnumOpportunityStatus.Negotiating]: "Đang đàm phán",
	[EnumOpportunityStatus.Approved]: "Đã chấp thuận"
}

export const EnumOpportunityStatusDescription: Record<EnumOpportunityStatus, string> = {
	[EnumOpportunityStatus.New]: "Cơ hội mới được phát hiện chưa có hành động.",
	[EnumOpportunityStatus.Evaluating]: "Đang trong quá trình xem xét nội bộ.",
	[EnumOpportunityStatus.Proposed]: "Đã gửi đề xuất hợp tác đến đối tác.",
	[EnumOpportunityStatus.Negotiating]: "Đang trong quá trình thương thảo với đối tác.",
	[EnumOpportunityStatus.Approved]: "Cơ hội đã được chấp thuận về mặt nguyên tắc."
}
