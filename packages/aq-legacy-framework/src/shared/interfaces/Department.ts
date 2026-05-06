import { BaseEntity } from './BaseEntity';
import { User } from './User';

export interface Department extends BaseEntity {
  /** Thông tin tài khoản
   */
  user?: User
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
  unit?: Department | null;
  /**
   * Đơn vị ngoài trường
   */
  isWorkingUnit?: boolean;
}


