export interface Criteria {
	id: number;
	type: number; // 1 = "bắt buộc", 0 = "không bắt buộc"
	/**Có vượt qua kiểm tra hay không ? hoàn thành hay chưa hoàn thành */
	isPass: boolean;
	/** Title */
	title: string;
	/** Nội dung */
	content: string;
	/** Tiến độ của criteria */
	criteriaProgress: number;
	/** Ngày bắt đầu thanh tra */
	dateStart: Date | null;
	/** Ngày kết thúc thanh tra */
	dateEnd: Date | null;
	/** Đối tượng kiểm tra (Khoa)*/
	targetDepartment: string[];
	/** Đối tượng kiểm tra (Khóa học  || Chương trình đào tạo || Bậc đào tạo)*/
	targetCurriculum: string[];
	/** Người kiểm tra */
	inspectors: string[];
	/** Ngày hoàn thành */
	dateComplete: Date | null;
	criteriaDetails?: CriteriaDetail[];
}
export interface qmesDashboardData {
	id: number;
	categoryCode: number;
	criteria: Criteria[];
}

//categoryCode
//     1| "Chương trình đào tạo"
//     2| "Phương pháp giảng dạy"
//     3| "Nghiên cứu khoa học"
//     4| "Cơ sở vật chất"
//     5| "Công nghệ thông tin"
//     6| "Hợp tác quốc tế"
//     7| "Quản lý & điều hành"
//     8| "Học sinh/Sinh viên & hỗ trợ"
//     9| "Khác";

export interface CriteriaDetail {
	id: number;
	type: number;
	// loại tiêu chí:
	// 1: đo không ngưỡng
	// 2: đo có ngưỡng
	// 3: đạt/không đạt;
	name: string;
	description: string;
	value: number | null;
	threshold: number | null;
	isPass: boolean | null;
}

export const mockData: qmesDashboardData[] = [
	{
		id: 7,
		categoryCode: 7,
		criteria: [
			{
				id: 1,
				type: 1,
				isPass: false,
				title: "Tỉ lệ nhập học trên chỉ tiêu công bố của 3 năm gần nhất",
				content: `Thống kê tỷ lệ nhập học của 3 năm gần nhất dựa trên các hình thức: 
        1. Kỳ Thi tốt nghiệp THPT 
        2. Thi ĐGNL do ĐH Quốc gia TPHCM tổ chức 
        3. Xét tuyển học bạ. Thống kê tỷ lệ nhập học của 3 năm gần nhất dựa trên các hình thức: 
        1. Kỳ Thi tốt nghiệp THPT 
        2. Thi ĐGNL do ĐH Quốc gia TPHCM tổ chức 
        3. Xét tuyển học bạ. Thống kê tỷ lệ nhập học của 3 năm gần nhất dựa trên các hình thức: 
        1. Kỳ Thi tốt nghiệp THPT 
        2. Thi ĐGNL do ĐH Quốc gia TPHCM tổ chức 
        3. Xét tuyển học bạ.`,
				criteriaProgress: 55,
				dateStart: new Date("2023-08-01"),
				dateEnd: new Date("2023-08-31"),
				dateComplete: null,
				targetDepartment: [
					"Khoa Công nghệ thông tin",
					"Khoa Quản trị kinh doanh",
					"Khoa Điện - Điện tử",
					"Khoa Cơ khí",
					"Khoa Xây dựng",
					"Khoa Ngoại ngữ",
					"Khoa Kinh tế",
					"Khoa Luật",
					"Khoa Y Dược",
					"Khoa Môi trường",
					"Khoa Khoa học xã hội và Nhân văn",
					"Khoa Du lịch",
				],
				targetCurriculum: ["Chương trình 1", "Chương trình 2"],
				inspectors: ["Bộ GDĐT TPHCM", "Hiệu trưởng nhà trường"],
				criteriaDetails: [
					{
						id: 1,
						type: 2,
						name: "Tỉ lệ nhập học Năm 2023",
						description:
							"Tỉ lệ nhập học Năm 2023 lấy từ CSDL của trường",
						value: 97.97,
						threshold: null,
						isPass: null,
					},
					{
						id: 2,
						type: 2,
						name: "Tỉ lệ nhập học Năm 2024",
						description:
							"Tỉ lệ nhập học Năm 2024 lấy từ CSDL của trường",
						value: 85,
						threshold: null,
						isPass: null,
					},
					{
						id: 3,
						type: 2,
						name: "Tỉ lệ nhập học Năm 2025",
						description:
							"Tỉ lệ nhập học Năm 2025 lấy từ CSDL của trường",
						value: 93.45,
						threshold: null,
						isPass: null,
					},
				],
			},
			{
				id: 2,
				type: 1,
				isPass: false,
				title: "Tỉ lệ thôi học của 3 năm gần nhất",
				content: `Thống kê tỷ lệ thôi học của 3 năm gần nhất của từng khoa.`,
				criteriaProgress: 90,
				dateStart: new Date("2023-08-01"),
				dateEnd: new Date("2023-08-07"),
				dateComplete: null,
				targetDepartment: [
					"Khoa Công nghệ thông tin",
					"Khoa Quản trị kinh doanh",
					"Khoa Điện - Điện tử",
					"Khoa Cơ khí",
					"Khoa Xây dựng",
					"Khoa Ngoại ngữ",
					"Khoa Kinh tế",
					"Khoa Luật",
					"Khoa Y Dược",
					"Khoa Môi trường",
					"Khoa Khoa học xã hội và Nhân văn",
					"Khoa Du lịch",
				],
				targetCurriculum: ["Chương trình 1", "Chương trình 2"],
				inspectors: ["Bộ GDĐT TPHCM", "Hiệu trưởng nhà trường"],
				criteriaDetails: [
					{
						id: 1,
						type: 2,
						name: "Tỉ lệ thôi học Năm 2023",
						description:
							"Tỉ lệ thôi học Năm 2023 theo báo cáo của phòng Đào tạo",
						value: 5.3,
						threshold: 10,
						isPass: true,
					},
					{
						id: 2,
						type: 2,
						name: "Tỉ lệ thôi học Năm 2024",
						description:
							"Tỉ lệ thôi học Năm 2024 theo báo cáo của phòng Đào tạo",
						value: 6.8,
						threshold: 10,
						isPass: true,
					},
					{
						id: 3,
						type: 2,
						name: "Tỉ lệ thôi học Năm 2025",
						description:
							"Tỉ lệ thôi học Năm 2025 theo báo cáo của phòng Đào tạo",
						value: 4.2,
						threshold: 10,
						isPass: true,
					},
				],
			},
		],
	},
	{
		id: 1,
		categoryCode: 7,
		criteria: [
			{
				id: 3,
				type: 1,
				isPass: true,
				title: "Chương trình đào tạo được đánh giá và cập nhật định kỳ",
				content: "Đánh giá việc rà soát và cập nhật chương trình đào tạo theo chu kỳ 2 năm/lần",
				criteriaProgress: 85,
				dateStart: new Date("2023-07-01"),
				dateEnd: new Date("2023-08-15"),
				dateComplete: null,
				targetDepartment: [
					"Khoa Công nghệ thông tin",
					"Khoa Quản trị kinh doanh",
					"Khoa Điện - Điện tử",
					"Khoa Ngoại ngữ",
					"Khoa Kinh tế",
				],
				targetCurriculum: ["Đại học", "Cao học"],
				inspectors: ["Hội đồng Khoa học Đào tạo", "Phòng Đào tạo"],
				criteriaDetails: [
					{
						id: 1,
						type: 4,
						name: "Quy trình cập nhật CTĐT",
						description:
							"Có quy trình rõ ràng và được thực hiện",
						value: null,
						threshold: null,
						isPass: true,
					},
					{
						id: 2,
						type: 2,
						name: "Tỉ lệ môn học được cập nhật",
						description:
							"Tỉ lệ môn học được cập nhật nội dung trong 2 năm qua",
						value: 72.5,
						threshold: null,
						isPass: null,
					},
				],
			},
			{
				id: 4,
				type: 1,
				isPass: false,
				title: "Chuẩn đầu ra phù hợp với nhu cầu xã hội",
				content: "Khảo sát doanh nghiệp và cựu sinh viên về mức độ phù hợp của chuẩn đầu ra",
				criteriaProgress: 65,
				dateStart: new Date("2023-09-01"),
				dateEnd: new Date("2023-10-31"),
				dateComplete: null,
				targetDepartment: [
					"Khoa Công nghệ thông tin",
					"Khoa Quản trị kinh doanh",
					"Khoa Điện - Điện tử",
					"Khoa Cơ khí",
					"Khoa Xây dựng",
				],
				targetCurriculum: ["Đại học"],
				inspectors: [
					"Trung tâm Đảm bảo chất lượng",
					"Phòng Quan hệ doanh nghiệp",
				],
				criteriaDetails: [
					{
						id: 1,
						type: 2,
						name: "Tỉ lệ hài lòng của doanh nghiệp",
						description:
							"Tỉ lệ doanh nghiệp đánh giá sinh viên đạt chuẩn đầu ra",
						value: 68.2,
						threshold: null,
						isPass: null,
					},
				],
			},
		],
	},
	{
		id: 2,
		categoryCode: 2,
		criteria: [
			{
				id: 5,
				type: 1,
				isPass: true,
				title: "Áp dụng phương pháp giảng dạy tích cực",
				content: "Đánh giá mức độ áp dụng phương pháp giảng dạy tích cực của giảng viên",
				criteriaProgress: 78,
				dateStart: new Date("2023-08-15"),
				dateEnd: new Date("2023-09-15"),
				dateComplete: null,
				targetDepartment: ["Tất cả các khoa"],
				targetCurriculum: ["Đại học", "Cao học"],
				inspectors: [
					"Phòng Đào tạo",
					"Trung tâm Đảm bảo chất lượng",
				],
				criteriaDetails: [
					{
						id: 1,
						type: 2,
						name: "Tỉ lệ GV áp dụng phương pháp tích cực",
						description:
							"Tỉ lệ giảng viên áp dụng ít nhất 2 phương pháp giảng dạy tích cực",
						value: 83.5,
						threshold: null,
						isPass: null,
					},
					{
						id: 2,
						type: 2,
						name: "Tỉ lệ môn học có hoạt động thực hành",
						description:
							"Tỉ lệ môn học có tối thiểu 30% thời lượng thực hành",
						value: 75.2,
						threshold: 60,
						isPass: true,
					},
				],
			},
			{
				id: 6,
				type: 1,
				isPass: false,
				title: "Ứng dụng công nghệ trong dạy học",
				content: "Đánh giá việc ứng dụng công nghệ số trong dạy học",
				criteriaProgress: 62,
				dateStart: new Date("2023-07-01"),
				dateEnd: new Date("2023-08-31"),
				dateComplete: null,
				targetDepartment: ["Tất cả các khoa"],
				targetCurriculum: ["Đại học", "Cao học"],
				inspectors: ["Phòng Đào tạo", "Trung tâm E-learning"],
				criteriaDetails: [
					{
						id: 1,
						type: 2,
						name: "Tỉ lệ môn học có tài liệu số",
						description:
							"Tỉ lệ môn học có đầy đủ tài liệu số trên hệ thống LMS",
						value: 56.8,
						threshold: 85,
						isPass: false,
					},
				],
			},
		],
	},
	{
		id: 3,
		categoryCode: 3,
		criteria: [
			{
				id: 7,
				type: 1,
				isPass: false,
				title: "Số lượng bài báo quốc tế",
				content: "Thống kê số lượng bài báo quốc tế được công bố trong các tạp chí thuộc danh mục ISI/Scopus",
				criteriaProgress: 45,
				dateStart: new Date("2023-01-01"),
				dateEnd: new Date("2023-12-31"),
				dateComplete: null,
				targetDepartment: ["Tất cả các khoa"],
				targetCurriculum: ["Tất cả các chương trình"],
				inspectors: ["Phòng Khoa học Công nghệ", "Ban Giám hiệu"],
				criteriaDetails: [
					{
						id: 1,
						type: 3,
						name: "Số bài báo ISI/Scopus Q1-Q2",
						description:
							"Số lượng bài báo được công bố trong các tạp chí Q1-Q2",
						value: 42,
						threshold: 60,
						isPass: false,
					},
					{
						id: 2,
						type: 1,
						name: "Số bài báo bình quân/giảng viên",
						description:
							"Số bài báo quốc tế bình quân/giảng viên/năm",
						value: 0.18,
						threshold: 0.25,
						isPass: false,
					},
				],
			},
			{
				id: 8,
				type: 1,
				isPass: true,
				title: "Số lượng đề tài NCKH các cấp",
				content: "Thống kê số lượng đề tài nghiên cứu khoa học các cấp được phê duyệt và nghiệm thu",
				criteriaProgress: 92,
				dateStart: new Date("2023-01-01"),
				dateEnd: new Date("2023-12-31"),
				dateComplete: null,
				targetDepartment: ["Tất cả các khoa"],
				targetCurriculum: ["Tất cả các chương trình"],
				inspectors: ["Phòng Khoa học Công nghệ", "Bộ GD&ĐT"],
				criteriaDetails: [
					{
						id: 1,
						type: 3,
						name: "Số đề tài cấp Nhà nước",
						description:
							"Số đề tài cấp Nhà nước đang thực hiện",
						value: 5,
						threshold: 3,
						isPass: true,
					},
					{
						id: 2,
						type: 3,
						name: "Số đề tài cấp Bộ/Tỉnh",
						description:
							"Số đề tài cấp Bộ/Tỉnh đang thực hiện",
						value: 18,
						threshold: 15,
						isPass: true,
					},
				],
			},
		],
	},
	{
		id: 4,
		categoryCode: 4,
		criteria: [
			{
				id: 9,
				type: 1,
				isPass: true,
				title: "Đánh giá cơ sở vật chất phục vụ đào tạo",
				content: "Đánh giá mức độ đáp ứng của cơ sở vật chất phục vụ đào tạo theo tiêu chuẩn kiểm định",
				criteriaProgress: 88,
				dateStart: new Date("2023-06-01"),
				dateEnd: new Date("2023-07-15"),
				dateComplete: null,
				targetDepartment: [
					"Ban Quản lý cơ sở vật chất",
					"Các Khoa",
				],
				targetCurriculum: ["Tất cả các chương trình"],
				inspectors: [
					"Trung tâm Đảm bảo chất lượng",
					"Ban Giám hiệu",
				],
				criteriaDetails: [
					{
						id: 1,
						type: 2,
						name: "Diện tích học tập/sinh viên",
						description:
							"Diện tích sàn xây dựng trực tiếp phục vụ đào tạo/sinh viên",
						value: 5.8,
						threshold: 5.5,
						isPass: true,
					},
					{
						id: 2,
						type: 2,
						name: "Tỉ lệ phòng học có trang thiết bị hiện đại",
						description:
							"Tỉ lệ phòng học được trang bị máy chiếu, âm thanh hiện đại",
						value: 92.5,
						threshold: 85,
						isPass: true,
					},
				],
			},
			{
				id: 10,
				type: 1,
				isPass: false,
				title: "Thư viện và học liệu",
				content: "Đánh giá mức độ đáp ứng của thư viện và học liệu phục vụ đào tạo và nghiên cứu",
				criteriaProgress: 72,
				dateStart: new Date("2023-06-01"),
				dateEnd: new Date("2023-07-31"),
				dateComplete: null,
				targetDepartment: ["Thư viện", "Các Khoa"],
				targetCurriculum: ["Tất cả các chương trình"],
				inspectors: [
					"Trung tâm Thư viện",
					"Trung tâm Đảm bảo chất lượng",
				],
				criteriaDetails: [
					{
						id: 1,
						type: 2,
						name: "Tỉ lệ đầu sách/sinh viên",
						description: "Số đầu sách bình quân/sinh viên",
						value: 8.2,
						threshold: 10,
						isPass: false,
					},
					{
						id: 2,
						type: 4,
						name: "Cơ sở dữ liệu học thuật quốc tế",
						description:
							"Có ít nhất 3 CSDL học thuật quốc tế được đăng ký",
						value: 1,
						threshold: 1,
						isPass: true,
					},
				],
			},
		],
	},
	{
		id: 5,
		categoryCode: 5,
		criteria: [
			{
				id: 11,
				type: 1,
				isPass: true,
				title: "Hệ thống CNTT phục vụ quản lý",
				content: "Đánh giá hiệu quả của hệ thống CNTT phục vụ quản lý đào tạo và nghiên cứu",
				criteriaProgress: 100,
				dateStart: new Date("2023-05-01"),
				dateEnd: new Date("2023-06-30"),
				dateComplete: new Date("2023-06-25"),
				targetDepartment: ["Trung tâm CNTT", "Các đơn vị quản lý"],
				targetCurriculum: ["Tất cả các chương trình"],
				inspectors: ["Ban Giám hiệu", "Chuyên gia CNTT"],
				criteriaDetails: [
					{
						id: 1,
						type: 4,
						name: "Phần mềm quản lý đào tạo tích hợp",
						description:
							"Có phần mềm quản lý đào tạo tích hợp đầy đủ các chức năng",
						value: 1,
						threshold: 1,
						isPass: true,
					},
					{
						id: 2,
						type: 2,
						name: "Tỉ lệ quy trình được số hóa",
						description:
							"Tỉ lệ quy trình hành chính được số hóa",
						value: 88.5,
						threshold: 70,
						isPass: true,
					},
				],
			},
			{
				id: 12,
				type: 1,
				isPass: false,
				title: "Chuyển đổi số trong giáo dục",
				content: "Đánh giá mức độ chuyển đổi số trong hoạt động đào tạo và nghiên cứu",
				criteriaProgress: 60,
				dateStart: new Date("2023-04-01"),
				dateEnd: new Date("2023-09-30"),
				dateComplete: null,
				targetDepartment: ["Tất cả đơn vị"],
				targetCurriculum: ["Tất cả các chương trình"],
				inspectors: ["Ban Chuyển đổi số", "Bộ GD&ĐT"],
				criteriaDetails: [
					{
						id: 1,
						type: 2,
						name: "Tỉ lệ học liệu số",
						description:
							"Tỉ lệ học liệu được số hóa và đưa lên nền tảng trực tuyến",
						value: 65.2,
						threshold: 80,
						isPass: false,
					},
					{
						id: 2,
						type: 2,
						name: "Tỉ lệ khóa học trực tuyến",
						description:
							"Tỉ lệ khóa học có hỗ trợ học tập trực tuyến",
						value: 72.8,
						threshold: 90,
						isPass: false,
					},
				],
			},
		],
	},
	{
		id: 6,
		categoryCode: 6,
		criteria: [
			{
				id: 13,
				type: 1,
				isPass: true,
				title: "Hợp tác quốc tế trong đào tạo",
				content: "Đánh giá hiệu quả hoạt động hợp tác quốc tế trong đào tạo",
				criteriaProgress: 82,
				dateStart: new Date("2023-01-01"),
				dateEnd: new Date("2023-12-31"),
				dateComplete: null,
				targetDepartment: ["Phòng Hợp tác quốc tế", "Các Khoa"],
				targetCurriculum: ["Tất cả các chương trình"],
				inspectors: ["Ban Giám hiệu", "Bộ GD&ĐT"],
				criteriaDetails: [
					{
						id: 1,
						type: 3,
						name: "Số chương trình liên kết quốc tế",
						description:
							"Số chương trình đào tạo liên kết với đối tác quốc tế",
						value: 8,
						threshold: 5,
						isPass: true,
					},
					{
						id: 2,
						type: 3,
						name: "Số lượng sinh viên trao đổi",
						description:
							"Số lượng sinh viên tham gia chương trình trao đổi quốc tế",
						value: 145,
						threshold: 100,
						isPass: true,
					},
				],
			},
			{
				id: 14,
				type: 1,
				isPass: false,
				title: "Hợp tác quốc tế trong nghiên cứu",
				content: "Đánh giá hiệu quả hoạt động hợp tác quốc tế trong nghiên cứu khoa học",
				criteriaProgress: 65,
				dateStart: new Date("2023-01-01"),
				dateEnd: new Date("2023-12-31"),
				dateComplete: null,
				targetDepartment: ["Phòng Hợp tác quốc tế", "Phòng KHCN"],
				targetCurriculum: ["Tất cả các chương trình"],
				inspectors: ["Ban Giám hiệu", "Bộ GD&ĐT"],
				criteriaDetails: [
					{
						id: 1,
						type: 3,
						name: "Số dự án nghiên cứu quốc tế",
						description:
							"Số dự án nghiên cứu hợp tác quốc tế đang triển khai",
						value: 4,
						threshold: 8,
						isPass: false,
					},
					{
						id: 2,
						type: 3,
						name: "Số bài báo đồng tác giả quốc tế",
						description: "Số bài báo có đồng tác giả quốc tế",
						value: 28,
						threshold: 40,
						isPass: false,
					},
				],
			},
		],
	},
	{
		id: 8,
		categoryCode: 8,
		criteria: [
			{
				id: 15,
				type: 1,
				isPass: true,
				title: "Hoạt động hỗ trợ sinh viên",
				content: "Đánh giá hiệu quả của các hoạt động hỗ trợ sinh viên",
				criteriaProgress: 88,
				dateStart: new Date("2023-07-01"),
				dateEnd: new Date("2023-08-31"),
				dateComplete: null,
				targetDepartment: [
					"Phòng Công tác Sinh viên",
					"Đoàn Thanh niên",
					"Hội Sinh viên",
				],
				targetCurriculum: ["Tất cả các chương trình"],
				inspectors: ["Ban Giám hiệu", "Đoàn Thanh niên"],
				criteriaDetails: [
					{
						id: 1,
						type: 2,
						name: "Tỉ lệ sinh viên tham gia hoạt động ngoại khóa",
						description:
							"Tỉ lệ sinh viên tham gia ít nhất 1 hoạt động ngoại khóa/năm",
						value: 78.5,
						threshold: 70,
						isPass: true,
					},
					{
						id: 2,
						type: 3,
						name: "Số câu lạc bộ sinh viên",
						description:
							"Số lượng câu lạc bộ sinh viên đang hoạt động hiệu quả",
						value: 25,
						threshold: 20,
						isPass: true,
					},
				],
			},
			{
				id: 16,
				type: 1,
				isPass: true,
				title: "Hoạt động tư vấn và hỗ trợ việc làm",
				content: "Đánh giá hiệu quả hoạt động tư vấn và hỗ trợ việc làm cho sinh viên",
				criteriaProgress: 78,
				dateStart: new Date("2023-01-01"),
				dateEnd: new Date("2023-12-31"),
				dateComplete: null,
				targetDepartment: ["Trung tâm Hỗ trợ việc làm", "Các Khoa"],
				targetCurriculum: ["Tất cả các chương trình"],
				inspectors: ["Ban Giám hiệu", "Hội Cựu sinh viên"],
				criteriaDetails: [
					{
						id: 1,
						type: 2,
						name: "Tỉ lệ sinh viên có việc làm sau 6 tháng tốt nghiệp",
						description:
							"Tỉ lệ sinh viên có việc làm sau 6 tháng tốt nghiệp",
						value: 92.8,
						threshold: 85,
						isPass: true,
					},
					{
						id: 2,
						type: 3,
						name: "Số doanh nghiệp tham gia ngày hội việc làm",
						description:
							"Số lượng doanh nghiệp tham gia ngày hội việc làm",
						value: 85,
						threshold: 70,
						isPass: true,
					},
				],
			},
		],
	},
	{
		id: 9,
		categoryCode: 9,
		criteria: [
			{
				id: 17,
				type: 1,
				isPass: true,
				title: "Trách nhiệm xã hội",
				content: "Đánh giá các hoạt động thể hiện trách nhiệm xã hội của nhà trường",
				criteriaProgress: 100,
				dateStart: new Date("2023-01-01"),
				dateEnd: new Date("2023-12-31"),
				dateComplete: new Date("2023-12-30"),
				targetDepartment: ["Tất cả đơn vị"],
				targetCurriculum: ["Tất cả các chương trình"],
				inspectors: ["Ban Giám hiệu", "Công đoàn"],
				criteriaDetails: [
					{
						id: 1,
						type: 3,
						name: "Số hoạt động cộng đồng",
						description:
							"Số hoạt động phục vụ cộng đồng được tổ chức",
						value: 18,
						threshold: 15,
						isPass: true,
					},
					{
						id: 2,
						type: 2,
						name: "Tỉ lệ sinh viên tham gia hoạt động tình nguyện",
						description:
							"Tỉ lệ sinh viên tham gia ít nhất 1 hoạt động tình nguyện/năm",
						value: 68.5,
						threshold: 60,
						isPass: true,
					},
				],
			},
			{
				id: 18,
				type: 1,
				isPass: true,
				title: "Phát triển bền vững",
				content: "Đánh giá các hoạt động phát triển bền vững của nhà trường",
				criteriaProgress: 100,
				dateStart: new Date("2023-01-01"),
				dateEnd: new Date("2023-12-31"),
				dateComplete: new Date("2024-01-02"),
				targetDepartment: [
					"Ban Quản lý cơ sở vật chất",
					"Tất cả đơn vị",
				],
				targetCurriculum: ["Tất cả các chương trình"],
				inspectors: ["Ban Giám hiệu", "Trung tâm Môi trường"],
				criteriaDetails: [
					{
						id: 1,
						type: 4,
						name: "Chứng nhận môi trường xanh",
						description:
							"Có chứng nhận trường học xanh - sạch - đẹp",
						value: 1,
						threshold: 1,
						isPass: true,
					},
					{
						id: 2,
						type: 2,
						name: "Tỉ lệ tiết kiệm năng lượng",
						description:
							"Tỉ lệ tiết kiệm năng lượng so với năm trước",
						value: 12.5,
						threshold: 10,
						isPass: true,
					},
				],
			},
		],
	},
];
