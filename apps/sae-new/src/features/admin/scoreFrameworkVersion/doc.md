7.3.8. US-A-01 – Cấu hình khung điểm Điểm Rèn luyện (ĐRL)
1. THÔNG TIN CHUNG
#	Thuộc tính	Nội dung
1	FR ID	FR-A-01
2	Tên chức năng	Cấu hình khung điểm ĐRL
3	User Story	US-A-01
4	Module	MFE-ADMIN
5	Actor chính	System Admin
6	Actor phụ	RL Service, Audit Service
7	Mức ưu tiên	Rất cao
8	Sprint	Sprint 1
9	Phiên bản	v1.0
2. MÔ TẢ NGHIỆP VỤ (BUSINESS DESCRIPTION)
Chức năng cho phép System Admin cấu hình khung điểm ĐRL theo từng năm học (version hóa).
Khung điểm gồm:
    • 5 tiêu chí chính (Điều I–V)
    • Điểm tối đa từng tiêu chí
    • (Tùy chọn) Các mục con trong từng tiêu chí
    • Tổng điểm tối đa = 100
Mỗi năm học phải gắn với một version khung điểm cố định, không thay đổi sau khi kích hoạt.
3. PHẠM VI ÁP DỤNG
Áp dụng cho:
    • Tạo mới version khung điểm
    • Cập nhật version khi ở trạng thái Draft
    • Kích hoạt (Publish) version
Không áp dụng:
    • Chỉnh sửa version đã được gắn vào năm học Active
    • Xóa version đã có dữ liệu sử dụng
4. TIỀN ĐIỀU KIỆN (PRE-CONDITIONS)
    1. User có Role = System Admin
    2. User có Scope = System-wide
    3. Không có transaction cấu hình đang mở
5. HẬU ĐIỀU KIỆN (POST-CONDITIONS)
Nếu tạo thành công:
    • Version mới ở trạng thái Draft
    • Lưu đầy đủ cấu trúc tiêu chí
    • Ghi Audit log
Nếu Publish:
    • Version chuyển trạng thái = Published
    • Không cho phép chỉnh sửa
6. CẤU TRÚC KHUNG ĐIỂM
6.1 Cấu trúc cấp 1 (Bắt buộc)
#	Code	Tên tiêu chí	Max Score
1	C1	Ý thức học tập	30
2	C2	Chấp hành nội quy	25
3	C3	Hoạt động phong trào	20
4	C4	Công dân & cộng đồng	15
5	C5	Phẩm chất & quan hệ	10
Tổng bắt buộc = 100
6.2 Cấu trúc cấp 2 (Tùy chọn)
Ví dụ:
C1 có thể chia:
    • C1.1 – Đi học đầy đủ (10)
    • C1.2 – Kết quả học tập (20)
Tổng cấp 2 ≤ Max tiêu chí cha
7. LUỒNG XỬ LÝ CHÍNH (MAIN FLOW)
Step 1
Admin truy cập “Cấu hình khung điểm”
Step 2
Chọn “Tạo version mới”
Step 3
Nhập:
    • Mã version (VD: RL-2026)
    • Tên hiển thị
    • Năm áp dụng
Step 4
Cấu hình:
    • Thêm/sửa/xóa tiêu chí
    • Nhập điểm tối đa
    • (Tùy chọn) thêm tiêu chí con
Step 5
Hệ thống validate:
    • Tổng điểm cấp 1 = 100
    • Điểm cấp 2 ≤ cấp 1
    • Không trùng mã tiêu chí
Step 6
Lưu trạng thái Draft
Step 7
Admin chọn “Publish”
→ Chuyển trạng thái Published
→ Lock chỉnh sửa
8. LUỒNG THAY THẾ / NGOẠI LỆ
8.1 Tổng điểm ≠ 100
→ Không cho lưu
8.2 Trùng mã tiêu chí
→ Báo lỗi duplicate code
8.3 Version đã được gắn vào năm học
→ Disable chỉnh sửa
8.4 User không đủ quyền
→ 403 Forbidden
9. QUY TẮC NGHIỆP VỤ (BUSINESS RULES)
#	BR ID	Mô tả
1	BR-01	Tổng điểm cấp 1 phải = 100
2	BR-02	Điểm tiêu chí con ≤ điểm tiêu chí cha
3	BR-03	Version Published không được chỉnh sửa
4	BR-04	Mỗi năm học chỉ gắn 1 version
5	BR-05	Không xóa version đã được sử dụng
6	BR-06	Ghi audit mọi thay đổi cấu hình
10. MÔ HÌNH TRẠNG THÁI VERSION
Draft → Published → Archived
    • Draft: Cho phép chỉnh sửa
    • Published: Read-only
    • Archived: Không sử dụng cho năm mới
11. DỮ LIỆU VÀO / RA
11.1 Input
#	Field	Type	Required	Rule
1	versionCode	String	✅	Unique
2	versionName	String	✅	Not empty
3	criteria	JSON	✅	Validate sum = 100
4	action	Enum	✅	SAVE / PUBLISH
Example Input
{
  "versionCode": "RL-2026",
  "criteria": [
    {"code": "C1", "maxScore": 30},
    {"code": "C2", "maxScore": 25},
    {"code": "C3", "maxScore": 20},
    {"code": "C4", "maxScore": 15},
    {"code": "C5", "maxScore": 10}
  ],
  "action": "PUBLISH"
}
11.2 Output
{
  "status": "SUCCESS",
  "versionId": "VER-2026",
  "state": "Published"
}
12. THIẾT KẾ DỮ LIỆU
Table: RLVersion
#	Field	Type
1	VersionID	UUID
2	Code	String (Unique)
3	Name	String
4	State	Enum
5	CreatedAt	DateTime
6	PublishedAt	DateTime
Table: RLCriterion
#	Field	Type
1	CriterionID	UUID
2	VersionID	UUID
3	ParentID	UUID (nullable)
4	Code	String
5	Name	String
6	MaxScore	Integer
7	Level	Integer
Unique constraint:
(VersionID, Code)
13. YÊU CẦU GIAO DIỆN (UI REQUIREMENT)
    • Danh sách version
    • Badge trạng thái
    • Form cấu hình dynamic (tree structure)
    • Hiển thị tổng điểm realtime
    • Nút:
        ◦ Lưu nháp
        ◦ Publish
        ◦ Archive
14. YÊU CẦU PHI CHỨC NĂNG (NFR)
#	NFR ID	Yêu cầu
1	NFR-01	Validate realtime ≤ 200ms
2	NFR-02	Không mất dữ liệu khi chỉnh sửa
3	NFR-03	Audit đầy đủ before/after JSON
4	NFR-04	Phân quyền chỉ Admin
5	NFR-05	Version phải immutable sau Publish
15. TÍCH HỢP
#	Service	Vai trò
1	IAM Service	Kiểm tra role Admin
2	AcademicYear Service	Gắn version vào năm học
3	Audit Service	Ghi log thay đổi
16. RỦI RO & KIỂM SOÁT
#	Rủi ro	Giải pháp
1	Sửa nhầm cấu hình năm cũ	Lock khi Published
2	Tổng điểm sai	Validate bắt buộc
3	Thay đổi giữa kỳ	Version hóa & immutable
17. TRACEABILITY
User Story	FR	BR	NFR
US-A-01	FR-A-01	BR-01~06	NFR-01~05
