import { IAccount } from './IAccount';
import { IBaseEntity } from './IBaseEntity';

export interface IDepartment extends IBaseEntity {
  /** Thông tin tài khoản
   */
  user?: IAccount
  /**
 * Loại đơn vị
 * 1: "Khoa"
 * 2: "Bộ môn"
 * 3: "Phòng"
 * 4: "Trung tâm"
 */
  type?: number | null;
  /**
   * Id của đơn vị trực thuộc
   */
  unitId?: number | null;
  /**
   * Ghi chú
   */
  note?: string;
  /**
   * Thông tin của đơn vị trực thuộc
   */
  unit?: IDepartment | null;
  /**
   * Đơn vị ngoài trường
   */
  isWorkingUnit?: boolean;
}


