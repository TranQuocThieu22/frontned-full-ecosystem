"use client";

import { Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import {
  AQButtonCreateByImportFile,
  AQButtonExportData,
  MyButton,
  MyCenterFull,
  MyCheckbox,
  MyDataTable,
  MyFieldset
} from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import EstablishCouncilRoleButtonCreate from "./EstablishCouncilRoleButtonCreate";
import EstablishCouncilRoleButtonDelete from "./EstablishCouncilRoleButtonDelete";
import EstablishCouncilRoleButtonUpdate from "./EstablishCouncilRoleButtonUpdate";
import { IEstablishCouncilRole } from "./interface/EstablishCouncilRoleViewModel";

export default function EstablishCouncilTable() {
  const [importData, setImportData] = useState(false);
  const form_multiple = useForm<any>({
    initialValues: {
      importedData: [],
    },
  });
  const EstablishCouncilRoleTable = useQuery<
    IEstablishCouncilRole[]
  >({
    queryKey: ["EstablishCouncilRoleTableData"],
    queryFn: async () => {
      return sampleData;
    },
    refetchOnWindowFocus: false,
  });

  const columns = useMemo<MRT_ColumnDef<IEstablishCouncilRole>[]>(() => [
    {
      header: "Mã vai trò",
      accessorKey: "roleCode",
    },
    {
      header: "Tên vai trò",
      accessorKey: "roleName",
    },
    {
      header: "Ngừng sử dụng",
      accessorKey: "isDisabled",
      accessorFn: (row) => <MyCenterFull>
        <MyCheckbox checked={row.isDisabled} readOnly />
      </MyCenterFull>
    },
    {
      header: "Ghi chú",
      accessorKey: "note",
    },
  ], []);
  const exportConfig = {
    fields: [
      { "fieldName": "roleCode", "header": "Mã vai trò" },
      { "fieldName": "roleName", "header": "Tên vai trò" },
      { "fieldName": "isDisabled", "header": "Ngừng sử dụng" },
      { "fieldName": "note", "header": "Ghi chú" },
    ]
  };

  return (
    <MyFieldset title={`Danh mục vai trò tham gia hội đồng`}>
      <MyDataTable
        isLoading={EstablishCouncilRoleTable.isLoading}
        isError={EstablishCouncilRoleTable.isError}
        data={EstablishCouncilRoleTable.data || []}
        enableRowSelection={true}
        enableRowNumbers={false}
        columns={columns}
        renderTopToolbarCustomActions={() => (
          <Group>
            <EstablishCouncilRoleButtonCreate />

            <AQButtonCreateByImportFile onSubmit={() => { console.log("import data: ", importData) }} form={form_multiple}
              setImportedData={setImportData}></AQButtonCreateByImportFile>
            <AQButtonExportData objectName={""} data={sampleData} exportConfig={exportConfig}></AQButtonExportData>
            <MyButton color="red" leftSection={<IconTrash />}>
              Xóa
            </MyButton>
          </Group>
        )}
        renderRowActions={({ row }) => (
          <MyCenterFull>
            <EstablishCouncilRoleButtonUpdate values={row.original} />
            <EstablishCouncilRoleButtonDelete establishCouncilRole={row.original} />
          </MyCenterFull>
        )}
      />
    </MyFieldset>
  );
}

// sample data
const sampleData: IEstablishCouncilRole[] = [
  {
    id: 1,
    roleCode: "CT",
    roleName: "Chủ tịch hội đồng",
    isDisabled: false,
    note: "",

  },
  {
    id: 2,
    roleCode: "TK",
    roleName: "Thư ký hội đồng",
    isDisabled: false,
    note: "",

  },
  {
    id: 3,
    roleCode: "UVP",
    roleName: "Ủy viên phản biện",
    isDisabled: false,
    note: "",

  },
  {
    id: 4,
    roleCode: "UV",
    roleName: "Ủy viên",
    isDisabled: false,
    note: "",

  },

];