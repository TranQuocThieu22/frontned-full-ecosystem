"use client";
import { MyDataTable } from "@/components/ui/DataDisplay/DataTable/MyDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { Checkbox, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

import { canDeletePLORankingSystemData, canUpdatePLORankingSystemData } from "@/features/auth/PageAuthorization/PLO-ranking-system-data.auth";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import F_PLORankingSystemCreate from "./F_PLORankingSystemCreate";
import F_PLORankingSystemDelete from "./F_PLORankingSystemDelete";
import F_PLORankingSystemUpdate from "./F_PLORankingSystemUpdate";

export interface I_PLORankingSystemTable {
  order: number | null;
  note: string;
  nameEg: string;
  point: number | null;
  isFailed: boolean;
  id: number;
  code: string | null;
  name: string;
  concurrencyStamp: string;
  isEnabled: boolean;

  nguoiCapNhat?: string;
  ngayCapNhat?: Date;
}

export default function F_PLORankingSystemTable() {
  const userStore = useAuthenticateStore().state;
  const userPermissionStore = usePermissionStore().state;
  const AllQuery = useQuery<I_PLORankingSystemTable[]>({
    queryKey: ["F_f0oia066vb_Read"],
    queryFn: async () => {
      const result = await baseAxios.get("/COERatingPLO/GetAll");
      return result.data?.data || [];
    },
  });
  const form_multiple = useForm<any>({
    initialValues: {
      importedData: [],
    },
  });

  // Query to fetch the mock data
  // const AllUserQuery = useQuery<I_f0oia066vb_Read[]>({
  //     queryKey: ["F_f0oia066vb_Read"],
  //     queryFn: async () => data,
  // });

  const columns = useMemo<MRT_ColumnDef<I_PLORankingSystemTable>[]>(
    () => [
      { header: "Thứ tự", accessorKey: "order" },
      { header: "Xếp loại", accessorKey: "name" },
      { header: "Xếp loại tiếng Anh", accessorKey: "nameEg" },
      { header: "Điểm >=", accessorKey: "point" },
      {
        header: "Không đạt",
        accessorKey: "isFailed",
        accessorFn: (row) => {
          return (
            <Checkbox
              checked={row.isFailed ?? false}
              onChange={(event) => {
                // Cập nhật state nếu có
                // console.log("Checkbox changed:", event.currentTarget.checked);
              }}
            />
          );
        },
      },
    ],
    []
  );
  const exportConfig = {
    fields: [
      { fieldName: "id", header: "STT" },
      { fieldName: "order", header: "Thứ tự" },
      { fieldName: "name", header: "Xếp loại" },
      { fieldName: "nameEg", header: "Xếp loại tiếng Anh" },
      { fieldName: "point", header: "Điểm >= " },
      { fieldName: "isFailed", header: "Không Đạt" },
      { fieldName: "updatedBy", header: "Người cập nhật" },
      { fieldName: "updatedAt", header: "Ngày cập nhật" },
    ],
  };

  if (AllQuery.isLoading) return "Loading...";
  function setImportData(data: any): void {
    throw new Error("Function not implemented.");
  }

  return (
    <CustomFlexColumn>
      <MyDataTable
        enableRowSelection={true}
        enableRowNumbers={true}
        renderTopToolbarCustomActions={({ table }) => {
          return (
            <>
              <Group>
                {canDeletePLORankingSystemData(userStore, userPermissionStore) && <F_PLORankingSystemCreate />}
                {/* <PrototypeImportButton/>
                    <PrototypeExportButton/>
                    <PrototypeDeleteAllButton/> */}
              </Group>
            </>
          );
        }}
        columns={columns}
        data={AllQuery.data || []}
        renderRowActions={({ row }) => {
          return (
            <CustomCenterFull>
              {canUpdatePLORankingSystemData(userStore, userPermissionStore) && <F_PLORankingSystemUpdate values={row.original} />}
              {canDeletePLORankingSystemData(userStore, userPermissionStore) && <F_PLORankingSystemDelete values={row.original!} />}
            </CustomCenterFull>
          );
        }}
      />
    </CustomFlexColumn>
  );
}

// const data: I_f0oia066vb_Read[] = [
//     {
//         id: 1,
//         code: 1,
//         name: "Xuất sắc",
//         nameEg: "Perfect",
//         gradeEnglish: "",
//         scoreThreshold: 9,
//         notPassed: false,
//         updatedBy: "Nguyễn Văn A",
//         updatedAt: new Date("2024-01-15"),
//     },
//     {
//         id: 2,
//         code: 2,
//         name: "Tốt",
//         nameEg: "Excelent",
//         gradeEnglish: "",
//         scoreThreshold: 8,
//         notPassed: false,
//         updatedBy: "Nguyễn Văn A",
//         updatedAt: new Date("2024-01-15"),
//     },
//     {
//         id: 3,
//         code: 3,
//         name: "Khá",
//         nameEg: "Good",
//         gradeEnglish: "",
//         scoreThreshold: 7,
//         notPassed: false,
//         updatedBy: "Nguyễn Văn A",
//         updatedAt: new Date("2024-01-15"),
//     },
//     {
//         id: 4,
//         code: 4,
//         name: "Đạt",
//         nameEg: "Pass",
//         gradeEnglish: "",
//         scoreThreshold: 5,
//         notPassed: false,
//         updatedBy: "Nguyễn Văn A",
//         updatedAt: new Date("2024-01-15"),
//     },
//     {
//         id: 5,
//         code: 5,
//         name: "Không đạt",
//         nameEg: "Not pass",
//         gradeEnglish: "",
//         scoreThreshold: 0,
//         notPassed: true,
//         updatedBy: "Nguyễn Văn A",
//         updatedAt: new Date("2024-01-15"),
//     },

// ];
