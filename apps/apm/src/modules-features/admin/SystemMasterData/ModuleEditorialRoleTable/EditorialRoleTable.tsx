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
import EditorialRoleButtonCreate from "./EditorialRoleButtonCreate";
import EditorialRoleButtonDelete from "./EditorialRoleButtonDelete";
import EditorialRoleButtonUpdate from "./EditorialRoleButtonUpdate";
import { IEditorialRole, } from "./interface/EditorialRoleViewModel";

export default function EditorialRoleTable() {
    const [importData, setImportData] = useState(false);
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: [],
        },
    });

    // query data
    const EditorialRoleTable = useQuery<
        IEditorialRole[]
    >({
        queryKey: ["EditorialRoleTableData"],
        queryFn: async () => {
            return sampleData;
        },
        refetchOnWindowFocus: false,
    });

    const columns = useMemo<MRT_ColumnDef<IEditorialRole>[]>(() => [
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
        <MyFieldset title={`Danh mục vai trò thực hiện biên soạn sách, giáo trình`}>
            <MyDataTable
                isError={EditorialRoleTable.isError}
                isLoading={EditorialRoleTable.isLoading}
                data={EditorialRoleTable.data || []}
                enableRowSelection={true}
                enableRowNumbers={false}
                columns={columns}
                renderTopToolbarCustomActions={() => (
                    <Group>
                        <EditorialRoleButtonCreate />

                        <AQButtonCreateByImportFile onSubmit={() => { console.log("import data: ", importData) }} form={form_multiple}
                            setImportedData={setImportData}></AQButtonCreateByImportFile>
                        <AQButtonExportData objectName={"Danh mục vai trò thực hiện biên soạn, giáo trình"} data={sampleData} exportConfig={exportConfig}></AQButtonExportData>
                        <MyButton color="red" leftSection={<IconTrash />}>
                            Xóa
                        </MyButton>
                    </Group>
                )}
                renderRowActions={({ row }) => (
                    <MyCenterFull>
                        <EditorialRoleButtonUpdate values={row.original} />
                        <EditorialRoleButtonDelete EditorialRole={row.original} />
                    </MyCenterFull>
                )}
            />
        </MyFieldset>
    );
}

const sampleData: IEditorialRole[] = [
    {
        id: 1,
        roleCode: "CB",
        roleName: "Chủ biên",
        isDisabled: false,
        note: "",

    },
    {
        id: 2,
        roleCode: "DB",
        roleName: "Đồng chủ biên",
        isDisabled: false,
        note: "",

    },
    {
        id: 3,
        roleCode: "TG",
        roleName: "Tác giả",
        isDisabled: false,
        note: "",

    },
    {
        id: 4,
        roleCode: "ND",
        roleName: "Người dịch",
        isDisabled: false,
        note: "",

    },
    {
        id: 5,
        roleCode: "BT",
        roleName: "Biên tập",
        isDisabled: false,
        note: "",

    },

];