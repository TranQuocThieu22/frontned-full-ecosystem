'use client'
import { Textarea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import {
  MyActionIconUpload,
  MyButton,
  MyButtonModal,
  MyButtonViewPDF,
  MyCenterFull,
  MyDataTable,
  MyDateInput,
  MyFieldset,
  MyFlexRow,
  MyNumberInput,
  MySelect
} from "aq-fe-framework/components";
import { MRT_Cell, MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import { mockDataButtonDanhGia, mockDataQuyetDinhBuocNay } from "./mockData";

export interface IButtonDanhGiaInfoViewModel {
  maKetQuaDanhGia?: string; // Mã kết quả đánh giá
  maHoSo?: string; // Mã hồ sơ
  maBuocXetDuyet?: string; // Mã bước xét duyệt
  nguoiDanhGia?: string; // Người đánh giá
  ngayDanhGia?: string; // Ngày đánh giá
  diemSo?: number; // Điểm số
  nhanXet?: string; // Nhận xét
  quyetDinhBuocNay?: string; // Quyết định bước này
  taiLieuKemTheo?: string; // Tài liệu kèm theo
}

export default function F9_8_6ButtonDanhGiaCandidateProfileEvaluation() {
  const disc = useDisclosure();
  const query = useQuery<IButtonDanhGiaInfoViewModel[]>({
    queryKey: ['F9_8_8MonitorExchange'],
    queryFn: async () => mockDataButtonDanhGia,
  });

  const [tableData, setTableData] = useState<IButtonDanhGiaInfoViewModel[]>([]);

  useEffect(() => {
    if (query.data) {
      setTableData(query.data);
    }
  }, [query.data]);

  const handleSaveCell = (cell: MRT_Cell<IButtonDanhGiaInfoViewModel>, value: any) => {
    const updatedData = [...tableData];

    if(!updatedData[cell.row.index]) {
      return
    }
    
    updatedData[cell.row.index]![cell.column.id as keyof IButtonDanhGiaInfoViewModel] = value;
    setTableData(updatedData);
  };

  const columns = useMemo<MRT_ColumnDef<IButtonDanhGiaInfoViewModel>[]>(
    () => [
      {
        header: "Mã kết quả đánh giá",
        accessorKey: "maKetQuaDanhGia",
      },
      {
        header: "Mã hồ sơ",
        accessorKey: "maHoSo",
      },
      {
        header: "Mã bước xét duyệt",
        accessorKey: "maBuocXetDuyet",
      },
      {
        header: "Người đánh giá",
        accessorKey: "nguoiDanhGia",
      },
      {
        header: "Ngày đánh giá",
        accessorKey: "ngayDanhGia",
        Cell: ({ cell }) => (
          <MyDateInput
            value={cell.getValue<string>()}
            onChange={(value) => {
              handleSaveCell(cell, value);
            }}
          />
        ),
      },
      {
        header: "Điểm số",
        accessorKey: "diemSo",
        Cell: ({ cell }) => (
          <MyNumberInput
            value={cell.getValue<number>()}
            onChange={(value) => {
              handleSaveCell(cell, value);
            }}
          />
        ),
      },
      {
        header: "Nhận xét",
        accessorKey: "nhanXet",
        Cell: ({ cell }) => (
          <Textarea
            label=""
            defaultValue={cell.getValue<string>()}
          // onChange={(event) => {
          //   handleSaveCell(cell, event.target.value);
          // }}
          />
        ),
      },
      {
        header: "Quyết định bước này",
        accessorKey: "quyetDinhBuocNay",
        Cell: ({ cell }) => (
          <MySelect
            data={mockDataQuyetDinhBuocNay}
            value={cell.getValue<string>()}
            onChange={(value) => {
              handleSaveCell(cell, value);
            }}
          />
        ),
      },
      {
        header: "Tài liệu kèm theo",
        accessorKey: "taiLieuKemTheo",
        Cell: ({ cell }) => (
          <MyFlexRow gap={5}>
            <MyActionIconUpload />
            <MyButtonViewPDF />
          </MyFlexRow>
        ),
      },
    ],
    [tableData]
  );
  return (
    <MyButtonModal variant="transparent" color="blue" modalSize={"90%"} disclosure={disc} label="Đánh giá">
      <MyFieldset title="Danh sách theo dõi đăng ký bảo hộ">
        <MyDataTable
          isError={query.isError}
          isLoading={query.isLoading}
          columns={columns}
          enableRowSelection
          data={tableData} // Sử dụng state làm nguồn dữ liệu
          renderTopToolbarCustomActions={() => (
            <MyCenterFull>
              <MyButton crudType="save">Lưu</MyButton>
              <MyButton crudType="export">Export</MyButton>
              <MyButton crudType="delete">Xóa</MyButton>
            </MyCenterFull>
          )}
        />
      </MyFieldset>
    </MyButtonModal>
  );
}
