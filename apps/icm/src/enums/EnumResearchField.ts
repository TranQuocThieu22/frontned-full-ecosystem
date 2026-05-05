export enum EnumResearchField {
	CNTT = "CNTT", // Công nghệ Thông tin
	CK = "CK", // Kỹ thuật Cơ khí
	DL = "DL", // Du lịch & Khách sạn
	SX = "SX", // Khoa học Sản xuất
	NL = "NL", // Năng lượng
	YT = "YT", // Y tế & Dược phẩm
	MT = "MT", // Môi trường
	NN = "NN", // Nông nghiệp
	VL = "VL", // Vật liệu
	QT = "QT" // Quản trị
}

export const EnumResearchFieldLabel: Record<EnumResearchField, string> = {
	[EnumResearchField.CNTT]: "Công nghệ Thông tin",
	[EnumResearchField.CK]: "Kỹ thuật Cơ khí",
	[EnumResearchField.DL]: "Du lịch & Khách sạn",
	[EnumResearchField.SX]: "Khoa học Sản xuất",
	[EnumResearchField.NL]: "Năng lượng",
	[EnumResearchField.YT]: "Y tế & Dược phẩm",
	[EnumResearchField.MT]: "Môi trường",
	[EnumResearchField.NN]: "Nông nghiệp",
	[EnumResearchField.VL]: "Vật liệu",
	[EnumResearchField.QT]: "Quản trị"
}

export const EnumResearchFieldDescription: Record<EnumResearchField, string> = {
	[EnumResearchField.CNTT]:
		"Bao gồm Khoa học Máy tính; Kỹ thuật Phần mềm; Trí tuệ Nhân tạo; Khoa học dữ liệu; An ninh mạng.",
	[EnumResearchField.CK]: "Nghiên cứu về robot; tự động hóa; cơ điện tử; vật liệu mới trong cơ khí.",
	[EnumResearchField.DL]: "Nghiên cứu về quản lý du lịch; phát triển điểm đến; trải nghiệm khách hàng.",
	[EnumResearchField.SX]: "Nghiên cứu về tối ưu hóa quy trình sản xuất; quản lý chuỗi cung ứng.",
	[EnumResearchField.NL]: "Nghiên cứu về năng lượng tái tạo; hiệu quả năng lượng; công nghệ pin.",
	[EnumResearchField.YT]: "Nghiên cứu về y học; dược lý; công nghệ sinh học y tế; chăm sóc sức khỏe cộng đồng.",
	[EnumResearchField.MT]: "Nghiên cứu về biến đổi khí hậu; quản lý tài nguyên nước; xử lý ô nhiễm.",
	[EnumResearchField.NN]: "Nghiên cứu về nông nghiệp công nghệ cao; an ninh lương thực; phát triển nông thôn.",
	[EnumResearchField.VL]: "Nghiên cứu và phát triển vật liệu tiên tiến; vật liệu nano.",
	[EnumResearchField.QT]: "Nghiên cứu về quản trị kinh doanh; quản lý công; quản trị dự án; quản trị nguồn nhân lực."
}
