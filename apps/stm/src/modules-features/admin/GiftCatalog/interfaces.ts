export interface IGiftCatalog {
  code?: string; // Mã Quà
  giftName?: string; // Tên Quà
  description?: string; // Mô tả
  imageUrl?: string; // Ảnh minh họa
  quantity?: number; // Số lượng
  ticketConversionAmount?: number; // Số lượng Ticker quy đổi
  estimatedValue?: number; // Giá trị ước tính (VND)
  unit?: string; // Đơn vị tính
}
