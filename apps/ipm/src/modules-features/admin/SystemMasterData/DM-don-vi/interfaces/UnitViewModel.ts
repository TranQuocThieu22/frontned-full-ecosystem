export interface IUnitViewModel {
  id?: number; // STT
  code?: string; //Mã đơn vị
  name?: string; //Tên đơn vị
  type?: string; //Loại đơn vị
  affiliatedOf?: string; //Trực thuộc
  nguoiCapNhat?: string;
  ngayCapNhat?: Date | undefined;
  note?: string;
}
