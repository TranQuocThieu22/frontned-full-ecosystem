'use client'

import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { AQButtonCreateByImportFile, MyButton, MyButtonDeleteList, MyCenterFull, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import E_LectureEstablishmentEditorialCreate from "./E_LectureEstablishmentEditorialCreate";
import E_LectureEstablishmentEditorialDelete from "./E_LectureEstablishmentEditorialDelete";
import E_LectureEstablishmentEditorialUpdate from "./E_LectureEstablishmentEditorialUpdate";
import { E_LectureEstablishmentEditorialViewModel } from "./interfaces/E_LectureEstablishmentEditorialViewModel";

export default function E_LectureEstablishmentEditorialTable() {

  const query = useQuery({
    queryKey: ["e-lecture-establishment-editorial"],
    queryFn: () => { return mockData; },
  });

  const form_multiple = useForm<any>({
    initialValues: {
      importedData: []
    },
  });

  const columns = useMemo<MRT_ColumnDef<E_LectureEstablishmentEditorialViewModel>[]>(() => [
    {
      header: "Mã Ban Biên soạn",
      accessorKey: "code",
      size: 150,
    },
    {
      header: "Tên Ban Biên soạn",
      accessorKey: "name",
      size: 250,
    },
    {
      header: "Trưởng Ban Biên soạn",
      accessorKey: "boardLeader",
      size: 200,
    },
    {
      header: "Danh sách Thành viên Ban Biên soạn",
      accessorFn: (row) => row.members?.map(member => `${member.name} (${member.role})`).join("; ") || "",
      size: 300,
    },
    {
      header: "Bài giảng được phụ trách (Mã - Tên)",
      accessorFn: (row) => `${row.lectureCode} - ${row.lectureName}`,
      size: 300,
    },
    {
      header: "Ngày thành lập Ban",
      accessorKey: "establishmentDate",
      size: 150,
    },
    {
      header: "Trạng thái Ban Biên soạn",
      accessorFn: (row) => getStatusDisplay(row.status || "1"),
      size: 150,
    },
  ], []);

  return (
    <MyFieldset
      title="Dánh sách ban biên soạn"
    >
      <MyDataTable
        columns={columns}
        enableRowSelection={true}
        renderTopToolbarCustomActions={({ table }) => {
          return (
            <>
              <E_LectureEstablishmentEditorialCreate />
              <AQButtonCreateByImportFile onSubmit={() => { }} form={form_multiple} />
              <MyButton crudType="export" />
              <MyButtonDeleteList onSubmit={() => { }} contextData={table.getSelectedRowModel().flatRows.flatMap(item => item.original).map(item => item.code).join(", ")} />
            </>
          )
        }}
        renderRowActions={({ row }) => {
          return (
            <MyCenterFull>
              <E_LectureEstablishmentEditorialUpdate data={row.original} />
              <E_LectureEstablishmentEditorialDelete id={row.original.id || 0} code={row.original.code || ""} />
            </MyCenterFull>
          )
        }}
        data={query.data || []}
      />
    </MyFieldset>
  );
}

function getStatusDisplay(status: string): string {
  switch (status) {
    case "1":
      return "Đang hoạt động";
    case "2":
      return "Tạm dừng";
    case "3":
      return "Đã hoàn thành";
    default:
      return "Không xác định";
  }
}

const mockData: E_LectureEstablishmentEditorialViewModel[] = [
  {
    id: 1,
    code: "BBBGDT-2025-001",
    name: "Ban Biên soạn Bài giảng Python Cơ bản",
    boardLeader: "TS. Nguyễn Văn A",
    lectureCode: "PYB-2025-001",
    lectureName: "Lập trình Python cơ bản",
    establishmentDate: "2025-09-22",
    status: "1",
    members: [
      { id: 1, code: "GV001", name: "Lê Thị B", unit: "Khoa CNTT", role: "Thư ký" },
      { id: 2, code: "GV002", name: "Trần Văn C", unit: "Khoa CNTT", role: "Thành viên" },
      { id: 3, code: "GV003", name: "ThS. Phạm Thị F", unit: "Khoa CNTT", role: "Thành viên" },
    ],
    tagret: "Nghiên cứu nầy để xuất một thuật toán mới sử dụng học sâu, *, 'Sách trình bày toàn diện về kinh tế vi mô.",
    notes: "Nghiên cứu nầy để xuất một thuật toán mới sử dụng học sâu, *, 'Sách trình bày toàn diện về kinh tế vi mô.",
  },
  {
    id: 2,
    code: "BBBGDT-2025-002",
    name: "Nhóm Phát triển AI trong Y học",
    boardLeader: "PGS.TS. Trần Thị D",
    lectureCode: "AIH-2025-002",
    lectureName: "Trí tuệ nhân tạo trong Y học",
    establishmentDate: "2025-10-01",
    status: "1",
    members: [
      { id: 4, code: "GV004", name: "TS.Phạm Quang E", unit: "Khoa Y", role: "Thành viên" },
      { id: 5, code: "GV005", name: "ThS. Ngô Minh I", unit: "Khoa Y", role: "Thành viên" },
    ],
    tagret: "Nghiên cứu nầy để xuất phương pháp mới trong y học",
    notes: "Nghiên cứu nầy để xuất phương pháp mới trong y học",
  },
  {
    id: 3,
    code: "BBBGDT-2025-003",
    name: "Ban Biên soạn Lịch sử Văn học VN",
    boardLeader: "PGS.TS. Bùi Minh K",
    lectureCode: "VLIT-2025-006",
    lectureName: "Lịch sử Văn học Việt Nam",
    establishmentDate: "2025-10-15",
    status: "1",
    members: [
      { id: 6, code: "GV006", name: "TS.Đào Thị L", unit: "Khoa Văn", role: "Thư ký" },
      { id: 7, code: "GV007", name: "ThS. Cao Xuân M", unit: "Khoa Văn", role: "Thành viên" },
    ],
    tagret: "Nghiên cứu nầy để xuất đề xuất bài giảng mới",
    notes: "Nghiên cứu nầy để xuất đề xuất bài giảng mới",
  },
];