export enum EnumOpportunityType {
	StudentExchange = "TT_SV", // Trao đổi Sinh viên
	LecturerExchange = "TT_GV", // Trao đổi Giảng viên
	ScientificResearch = "NCCK", // Nghiên cứu Khoa học
	ResourceSharing = "CSDV", // Chia sẻ Dịch vụ/Tài nguyên
	Scholarship = "HP" // Học bổng
}

export const EnumOpportunityTypeLabel: Record<EnumOpportunityType, string> = {
	[EnumOpportunityType.StudentExchange]: "Trao đổi Sinh viên",
	[EnumOpportunityType.LecturerExchange]: "Trao đổi Giảng viên",
	[EnumOpportunityType.ScientificResearch]: "Nghiên cứu Khoa học",
	[EnumOpportunityType.ResourceSharing]: "Chia sẻ Dịch vụ/Tài nguyên",
	[EnumOpportunityType.Scholarship]: "Học bổng"
}

export const EnumOpportunityTypeDescription: Record<EnumOpportunityType, string> = {
	[EnumOpportunityType.StudentExchange]: "Cơ hội hợp tác về trao đổi sinh viên (inbound/outbound).",
	[EnumOpportunityType.LecturerExchange]: "Cơ hội hợp tác về trao đổi giảng viên/nghiên cứu.",
	[EnumOpportunityType.ScientificResearch]: "Cơ hội hợp tác trong các dự án nghiên cứu khoa học.",
	[EnumOpportunityType.ResourceSharing]: "Cơ hội chia sẻ cơ sở vật chất phòng thí nghiệm thư viện.",
	[EnumOpportunityType.Scholarship]: "Cơ hội cấp/nhận học bổng cho sinh viên/giảng viên."
}
