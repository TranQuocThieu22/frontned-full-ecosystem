export enum EnumPartnerType {
	University = "DHT", // Đại học/Học viện
	Corporation = "CT", // Công ty/Tập đoàn
	NGO = "TC", // Tổ chức Phi chính phủ
	Government = "CP", // Cơ quan Chính phủ
	ResearchInstitute = "VN" // Viện nghiên cứu
}

export const EnumPartnerTypeLabel: Record<EnumPartnerType, string> = {
	[EnumPartnerType.University]: "Đại học/Học viện",
	[EnumPartnerType.Corporation]: "Công ty/Tập đoàn",
	[EnumPartnerType.NGO]: "Tổ chức Phi chính phủ",
	[EnumPartnerType.Government]: "Cơ quan Chính phủ",
	[EnumPartnerType.ResearchInstitute]: "Viện nghiên cứu"
}

export const EnumPartnerTypeDescription: Record<EnumPartnerType, string> = {
	[EnumPartnerType.University]: "Các cơ sở giáo dục đại học trong và ngoài nước",
	[EnumPartnerType.Corporation]: "Các doanh nghiệp tập đoàn công nghệ sản xuất",
	[EnumPartnerType.NGO]: "Các tổ chức phi lợi nhuận tổ chức quốc tế",
	[EnumPartnerType.Government]: "Các bộ ngành cơ quan nhà nước",
	[EnumPartnerType.ResearchInstitute]: "Các viện trung tâm nghiên cứu khoa học"
}
