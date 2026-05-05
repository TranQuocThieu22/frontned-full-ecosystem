import { Category, Circular } from "./IqmesViewModel";
import { co_so_vat_chat } from "./qmesCoSoVatChatData";
import { giang_vien } from "./qmesGiangVienData";
import { nghien_cuu_va_doi_moi } from "./qmesNghienCuuVaDoiMoiData";
import { tai_chinh } from "./qmesTaiChinhData";
import { to_chuc_va_quan_tri } from "./qmesToChucVaQuanTriData";
import { tuyen_sinh_va_dao_tao } from "./qmesTuyenSinhVaDaoTaoData";

export const schoolData: Category[] = [
    to_chuc_va_quan_tri,
    giang_vien,
    co_so_vat_chat,
    tai_chinh,
    tuyen_sinh_va_dao_tao,
    nghien_cuu_va_doi_moi
];

export const circular_01_2024: Circular = {
  id: 1,
  name: "Thông tư 01/2024/TT-BGDĐT",
  issueDate: new Date("2024-01-15"),
  qaCategories: schoolData
};

export const circulars: Circular[] = [ circular_01_2024 ];
