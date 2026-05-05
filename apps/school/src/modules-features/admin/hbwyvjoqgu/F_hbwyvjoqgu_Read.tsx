"use client";
import { MyButton } from "@/components/Buttons/Button/MyButton";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import MySelect from "@/components/Combobox/Select/MySelect";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import { Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import {
    AQButtonCreateByImportFile,
    AQButtonExportData,
} from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_hbwyvjoqgu_Create from "./F_hbwyvjoqgu_Create";
import F_hbwyvjoqgu_Delete from "./F_hbwyvjoqgu_Delete";
import F_hbwyvjoqgu_Update from "./F_hbwyvjoqgu_Update";

export interface I_hbwyvjoqgu {
  id?: number;
  studentCode?: string; // Mã học sinh
  surname?: string; // họ lót
  name?: string; // tên
  birthDate?: Date; //Ngày sinh
  sex?: string; //Giới tính
  bloodGroud?: string; //Nhóm máu
  medicalHistory?: string; //Tiền sử bệnh lý
  conclude?: string; //Kết luận y tế
  hospitalDate?: Date; //Ngày khám
  healthStatus?: string; //Tình trạng sức khỏe
  diagnosis?: string; //Chuẩn đoán cơ sở
  medic?: string; // Chỉ định thuốc
  suggestion?: string; // đề nghị y tế
  result?: string; //Kết quả xử lý đề nghị
  nguoiCapNhat?: string;
  ngayCapNhat?: Date | undefined;
}

export default function F_hbwyvjoqgu_Read() {
  const [fileData, setFileData] = useState<any[]>([]);
  const form_multiple = useForm<any>({
    initialValues: {
      importedData: [],
    },
  });
  const bookJourneyScheduleQuery = useQuery<I_hbwyvjoqgu[]>({
    queryKey: [`ListOfReasons`],
    queryFn: async () => [
      {
        id: 1,
        studentCode: "HS000001",
        surname: "Tô Ngọc",
        name: "Lâm",
        birthDate: new Date("2000-01-01"),
        sex: "Nam",
        bloodGroud: "D",
        medicalHistory: "Dị ứng nước",
        conclude: "Cần theo dõi",
        hospitalDate: new Date("2024-02-06"),
        healthStatus: "Nôn sau ăn",
        diagnosis: "Rối loạn tiêu hóa do sinh hoạt tại nhà",
        medic: "Nhóm boxit 1 ngày 2 lần",
        suggestion: "khám chuyên khoa",
        result: "",
        nguoiCapNhat: "Quản trị viên",
        ngayCapNhat: new Date("2024-12-23"),
      },
    ],
  });

  const exportConfig = {
    fields: [
      { fieldName: "studentCode", header: "Mã học sinh" },
      { fieldName: "surname", header: "Họ" },
      { fieldName: "name", header: "Tên" },
      { fieldName: "birthDate", header: "Ngày sinh" },
      { fieldName: "sex", header: "Giới tính" },
      { fieldName: "bloodGroud", header: "Nhóm máu" },
      { fieldName: "medicalHistory", header: "Tiền sử bệnh" },
      { fieldName: "conclude", header: "Kết luận" },
      { fieldName: "hospitalDate", header: "Ngày khám" },
      { fieldName: "healthStatus", header: "Tình trạng sức khỏe" },
      { fieldName: "diagnosis", header: "Chẩn đoán" },
      { fieldName: "medic", header: "Thuốc/Chỉ định" },
      { fieldName: "suggestion", header: "Đề xuất" },
      { fieldName: "result", header: "Kết quả" },
      { fieldName: "nguoiCapNhat", header: "Người cập nhật" },
      { fieldName: "ngayCapNhat", header: "Ngày cập nhật" },
    ],
  };

  const columns = useMemo<MRT_ColumnDef<I_hbwyvjoqgu>[]>(
    () => [
      {
        header: "Mã học sinh",
        accessorKey: "studentCode",
      },
      {
        header: "Họ lót",
        accessorKey: "surname",
      },
      {
        header: "Tên",
        accessorKey: "name",
      },
      {
        header: "Ngày sinh",
        accessorKey: "birthDate",
        accessorFn(originalRow) {
          return utils_date_dateToDDMMYYYString(
            new Date(originalRow.birthDate!)
          );
        },
      },
      {
        header: "Giới tính",
        accessorKey: "sex",
      },

      {
        header: "Nhóm máu",
        accessorKey: "bloodGroud",
      },
      {
        header: "Tiền sử bệnh lý",
        accessorKey: "medicalHistory",
      },
      {
        header: "Kết luận y tế",
        accessorKey: "conclude",
      },
      {
        header: "Ngày khám",
        accessorKey: "hospitalDate",
        accessorFn(originalRow) {
          return utils_date_dateToDDMMYYYString(
            new Date(originalRow.hospitalDate!)
          );
        },
      },
      {
        header: "Tình trạng sức khỏe",
        accessorKey: "healthStatus",
      },
      {
        header: "Chuẩn đoán cơ sở",
        accessorKey: "diagnosis",
      },
      {
        header: "Chỉ định thuốc",
        accessorKey: "medic",
      },
      {
        header: "Đề nghị y tế",
        accessorKey: "suggestion",
      },
      {
        header: "Kết quả xử lý đề nghị",
        accessorKey: "result",
      },
      {
        header: "Người cập nhật",
        accessorKey: "nguoiCapNhat",
      },
      {
        header: "Ngày cập nhật",
        accessorKey: "ngayCapNhat",
        accessorFn(originalRow) {
          return utils_date_dateToDDMMYYYString(
            new Date(originalRow.ngayCapNhat!)
          );
        },
      },
    ],
    []
  );

  if (bookJourneyScheduleQuery.isLoading) return "Đang tải dữ liệu...";
  if (bookJourneyScheduleQuery.isError) return "Không có dữ liệu...";

  return (
    <>
      <Group mb={20} ml={20}>
        <MySelect
          label="Chọn lớp"
          placeholder="Chọn lớp"
          data={["10A1", "10A2", "11A6", "12B3"]}
          defaultValue="11A6"
          styles={{ input: { width: 100 } }}
        />
      </Group>

      <MyFieldset mt="20" title="Danh sách chăm sóc sức khỏe hằng ngày">
        <MyDataTable
          enableRowNumbers
          enableRowSelection={true}
          columns={columns}
          data={bookJourneyScheduleQuery.data!}
          renderTopToolbarCustomActions={() => (
            <>
              <F_hbwyvjoqgu_Create />
              <AQButtonCreateByImportFile
                setImportedData={setFileData}
                onSubmit={() => console.log("data: ")}
                form={form_multiple}
              />
              <AQButtonExportData
                objectName="dmTHPB"
                data={bookJourneyScheduleQuery.data!}
                exportConfig={exportConfig}
              />
              <MyButton crudType="delete">Xóa</MyButton>
            </>
          )}
          renderRowActions={({ row }) => (
            <MyCenterFull>
              <F_hbwyvjoqgu_Update data={row.original} />
              <F_hbwyvjoqgu_Delete
                id={row.original.id!}
                studentCode={row.original.studentCode!}
              />
            </MyCenterFull>
          )}
        />
      </MyFieldset>
    </>
  );
}
