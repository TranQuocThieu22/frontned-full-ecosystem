import { IGiftCatalog } from "./interfaces";

export const mockData: IGiftCatalog[] = [
  {
    code: "QUA001", // Mã Quà
    giftName: "Bút chì màu cao cấp", // Tên Quà
    description: "Bộ 12 bút chì màu chất lượng cao", // Mô tả
    imageUrl: "https://example.com/gift/qu001", // Ảnh minh họa
    ticketConversionAmount: 50, // Số lượng Ticker quy đổi
    estimatedValue: 25000, // Giá trị ước tính (VND)
    unit: "Bộ", // Đơn vị tính
  },
  {
    code: "QUA002",
    giftName: "Sổ tay A5 có bìa cứng",
    description: "Sổ tay bìa cứng; 100 trang, kẻ ngang",
    imageUrl: "https://example.com/gift/qu002",
    ticketConversionAmount: 75,
    estimatedValue: 35000,
    unit: "Cuốn",
  },
  {
    code: "QUA003",
    giftName: "Bộ đồ dùng học tập",
    description: "Gồm thước; tẩy; gọt bút chì; keo dán",
    imageUrl: "https://example.com/gift/qu003",
    ticketConversionAmount: 100,
    estimatedValue: 45000,
    unit: "Bộ",
  },
  {
    code: "QUA004",
    giftName: "Bình nước giữ nhiệt 500ml",
    description: "Bình nước inox giữ nhiệt; nhiều màu",
    imageUrl: "https://example.com/gift/qu004",
    ticketConversionAmount: 150,
    estimatedValue: 80000,
    unit: "Cái",
  },
  {
    code: "QUA005",
    giftName: "Móc khóa hình thú dễ thương",
    description: "Móc khóa bằng silicon; nhiều hình dáng",
    imageUrl: "https://example.com/gift/qu005",
    ticketConversionAmount: 20,
    estimatedValue: 10000,
    unit: "Cái",
  },
  {
    code: "QUA006",
    giftName: "Sách truyện thiếu nhi",
    description: "Truyện tranh hoặc truyện chữ phù hợp lứa tuổi",
    imageUrl: "https://example.com/gift/qu006",
    ticketConversionAmount: 120,
    estimatedValue: 60000,
    unit: "Cuốn",
  },
  {
    code: "QUA007",
    giftName: "Tai nghe chụp tai",
    description: "Tai nghe có dây; âm thanh rõ nét",
    imageUrl: "https://example.com/gift/qu007",
    ticketConversionAmount: 300,
    estimatedValue: 150000,
    unit: "Cái",
  },
  {
    code: "QUA008",
    giftName: "Balo học sinh",
    description: "Balo chống thấm nước; có nhiều ngăn",
    imageUrl: "https://example.com/gift/qu008",
    ticketConversionAmount: 500,
    estimatedValue: 250000,
    unit: "Cái",
  },
  {
    code: "QUA009",
    giftName: "Voucher mua sách 50k",
    description: "Phiếu mua hàng tại nhà sách X",
    imageUrl: "https://example.com/gift/qu009",
    ticketConversionAmount: 100,
    estimatedValue: 50000,
    unit: "Voucher",
  },
  {
    code: "QUA010",
    giftName: "Đồ chơi xếp hình Lego nhỏ",
    description: "Bộ xếp hình Lego cơ bản",
    imageUrl: "https://example.com/gift/qu010",
    ticketConversionAmount: 250,
    estimatedValue: 120000,
    unit: "Bộ",
  },
];
