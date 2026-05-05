'use client'
import { CustomButton } from '@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton';
import { CustomColumnDef, CustomDataTable } from '@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable';
import { CustomFieldset } from '@aq-fe/core-ui/shared/components/layout/CustomFieldset';
import { dateUtils } from '@aq-fe/core-ui/shared/utils/dateUtils';
import { useMemo } from 'react';
import CourseApprovalDecisionsUpdate from './CourseApprovalDecisionsUpdate';
import { CourseApprovalDecision } from './interfaces';
import { mockCourseApprovalDecisions } from './mockData';

export default function CourseApprovalDecisionsTable() {
  const data = mockCourseApprovalDecisions;

  const columns = useMemo<CustomColumnDef<CourseApprovalDecision>[]>(() => [
    { header: 'Mã học viên', accessorKey: 'maHocVien' },
    { header: 'Họ tên', accessorKey: 'hoTen' },
    { header: 'Giới tính', accessorKey: 'gioiTinh' },
    {
      header: 'Ngày sinh',
      accessorFn: (row) => (row.ngaySinh ? dateUtils.toDDMMYYYY(row.ngaySinh) : ''),
    },
    { header: 'Số điện thoại', accessorKey: 'soDienThoai' },
    { header: 'Email', accessorKey: 'email' },
    { header: 'Mã khóa học', accessorKey: 'maKhoaHoc' },
    { header: 'Tên khóa học', accessorKey: 'tenKhoaHoc' },
    { header: 'Cụm thời gian', accessorKey: 'cumThoiGian' },
    { header: 'Chi nhánh', accessorKey: 'chiNhanh' },
    { header: 'Loại quyết định', accessorKey: 'loaiQuyetDinh' },
    {
      header: 'Ngày quyết định',
      accessorFn: (row) =>
        row.ngayQuyetDinh ? dateUtils.toDDMMYYYY(row.ngayQuyetDinh) : '',
    },
    { header: 'Tên quyết định', accessorKey: 'tenQuyetDinh' },
    { header: 'Ghi chú', accessorKey: 'ghiChu' },
    {
      header: 'Minh chứng quyết định',
      accessorKey: 'minhChungQuyetDinh',
      Cell: () => <CustomButton variant="subtle">Xem</CustomButton>,
    },
    {
      header: 'Biên lai chuyển khoản',
      accessorKey: 'bienLaiChuyenKhoan',
      Cell: () => <CustomButton variant="subtle">Xem</CustomButton>,
    },
  ], []);

  return (
    <CustomFieldset title="Danh sách quyết định khóa học">
      <CustomDataTable
        enableRowSelection
        enableRowNumbers
        columns={columns}
        data={data}
        exportProps={{ fileName: "Danh sách quyết định khóa học" }}
        renderRowActions={({ row }) => (
          <CourseApprovalDecisionsUpdate values={row.original} />
        )}
      />
    </CustomFieldset>
  );
}

