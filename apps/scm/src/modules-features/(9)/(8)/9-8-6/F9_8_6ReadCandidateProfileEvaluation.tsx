'use client'
import { useQuery } from "@tanstack/react-query";
import {
  MyCenterFull,
  MyDataTable,
  MyFieldset
} from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F9_8_6ButtonDanhGiaCandidateProfileEvaluation from "./F9_8_6ButtonDanhGiaCandidateProfileEvaluation";
import { mockDataRead } from "./mockData";

export interface ICandidateProfileEvaluationInfoViewModel {
  maHoSo?: string; //Mã Hồ Sơ
  tenNguoiDangKy?: string; //Tên Người Đăng Ký
  chuongTrinh?: string; //Chương trình
  doiTac?: string; //Đối tác
  chieuDangKy?: string; //Chiều Đăng Ký
  trangThaiHoSo?: string; //Trạng Thái Hồ Sơ
  ngayDangKy?: string; //Ngày Đăng Ký
}

export default function F9_8_6ReadCandidateProfileEvaluation() {
  const query = useQuery<ICandidateProfileEvaluationInfoViewModel[]>({
    queryKey: ['F9_8_6ReadCandidateProfileEvaluation'],
    queryFn: async () => mockDataRead
  });

  const columns = useMemo<MRT_ColumnDef<ICandidateProfileEvaluationInfoViewModel>[]>(
    () => [
        {
            header: "Mã hồ sơ",
            accessorKey: "maHoSo",
        },
        {
            header: "Tên người đăng ký",
            accessorKey: "tenNguoiDangKy",
        },
        {
            header: "Chương trình",
            accessorKey: "chuongTrinh",
        },
        {
            header: "Đối tác",
            accessorKey: "doiTac",
        },
        {
            header: "Chiều đăng ký",
            accessorKey: "chieuDangKy",
        },
        {
            header: "Trạng thái hồ sơ",
            accessorKey: "trangThaiHoSo",
        },
        {
            header: "Ngày đăng ký",
            accessorKey: "ngayDangKy",
            accessorFn: (row) => utils_date_dateToDDMMYYYString(new Date(row.ngayDangKy!)),
        },
    ],
    []
);


  return (
    <MyFieldset title="Danh sách hồ sơ">
      <MyDataTable
        isError={query.isError}
        isLoading={query.isLoading}
        columns={columns}
        data={query.data || []}
        enableRowSelection={false}
        exportAble
        renderRowActions={({ row }) => (
          <MyCenterFull>
            <F9_8_6ButtonDanhGiaCandidateProfileEvaluation />
          </MyCenterFull>
        )}
      />
    </MyFieldset>
  );
}
