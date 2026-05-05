'use client'
import AQButtonExportData from "@/components/ui/Buttons/ButtonCRUD/AQButtonExportData";
import MyCenterFull from "@/components/ui/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/ui/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/ui/Layouts/FlexColumn/MyFlexColumn";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Button, Fieldset, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { AQButtonCreateByImportFile } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_t2gufmu9g3_Create from "./F_tffo45cric_Create";
import F_t2gufmu9g3_Delete from "./F_tffo45cric_Delete";
import F_t2gufmu9g3_Update from "./F_tffo45cric_Update";





export interface I_tffo45cric_Read {
    id?: number;
    documentType?: string;
    status?: string;
    documentNumber?: string;
    issueDate?: Date;
    institution?: string;
    webLink?: string;
    nguoiCapNhat?: string; // Người cập nhật
    ngayCapNhat?: Date;   // Ngày cập nhật
}


export default function F_tffo45cric_Read() {
    const [importData, setImportData] = useState(false);
    const form_multiple = useForm<I_tffo45cric_Read>({
        initialValues: {
        },
    })

    // Query to fetch the mock menuData
    const AllUserQuery = useQuery<I_tffo45cric_Read[]>({
        queryKey: ["F_tffo45cric_Read"],
        queryFn: async () => data,
    });

    const columns = useMemo<MRT_ColumnDef<I_tffo45cric_Read>[]>(() => [
        { header: "Loại văn bản", accessorKey: "documentType" },
        { header: "Tình trạng", accessorKey: "status" },
        { header: "Số văn bản", accessorKey: "documentNumber" },
        {
            header: "Ngày ban hành",
            accessorKey: "issueDate",
            accessorFn: (row) => (row.issueDate ? U0DateToDDMMYYYString(new Date(row.issueDate)) : ""),
        },
        { header: "Tên văn bản của cơ sở đào tạo", accessorKey: "institution" },
        {
            header: "Link Website",
            accessorKey: "webLink",
        },
        { header: "Người cập nhật", accessorKey: "nguoiCapNhat" },
        {
            header: "Ngày cập nhật",
            accessorKey: "ngayCapNhat",
            accessorFn: (originalRow) =>
                originalRow.ngayCapNhat ? U0DateToDDMMYYYString(new Date(originalRow.ngayCapNhat)) : "",
        },
    ], []);


    const exportConfig = {
        fields: [
            { fieldName: "id", header: "STT" },
            { fieldName: "documentType", header: "Loại văn bản" },
            { fieldName: "status", header: "Tình trạng" },
            { fieldName: "documentNumber", header: "Số văn bản" },
            { fieldName: "issueDate", header: "Ngày ban hành" },
            { fieldName: "institution", header: "Tên văn bản của cơ sở đào tạo" },
            { fieldName: "webLink", header: "Link Websiew" },
            { fieldName: "nguoiCapNhat", header: "Người cập nhật" },
            { fieldName: "ngayCapNhat", header: "Ngày cập nhật" },
        ],
    };


    if (AllUserQuery.isLoading) return "Loading...";

    return (
        <Fieldset legend={`Danh sách văn bản theo quy định của luật Giáo dục Đại học`}>
            <MyFlexColumn>

                <MyDataTable
                    enableRowSelection={true}
                    enableRowNumbers={true}
                    renderTopToolbarCustomActions={({ table }) => {
                        return (
                            <>
                                <Group>
                                    <F_t2gufmu9g3_Create />
                                    <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple} onSubmit={() => {
                                        console.log(form_multiple.values);

                                    }} >s</AQButtonCreateByImportFile>
                                    <AQButtonExportData
                                        isAllData={true}
                                        objectName="dsKhoa"
                                        data={data}
                                        exportConfig={exportConfig}
                                    />
                                    <Button color="red" leftSection={<IconTrash />}>Xóa</Button>

                                </Group>
                            </>
                        )
                    }}
                    columns={columns}
                    data={AllUserQuery.data || []}
                    renderRowActions={({ row }) => {
                        return (

                            <MyCenterFull>
                                <F_t2gufmu9g3_Update values={row.original} />
                                <F_t2gufmu9g3_Delete id={row.original.id!} />
                            </MyCenterFull>
                        )
                    }}
                />
            </MyFlexColumn>
        </Fieldset>
    );
}

const data: I_tffo45cric_Read[] = [
    {
        id: 1, documentType: "Chiến lược kế hoạch phát triển", status: "Đã ban hành", documentNumber: "CL/PT-256", issueDate: new Date("2022-04-03"), institution: "Định hướng chiến lược tầm nhìn 10 năm", nguoiCapNhat: "Admin",
        ngayCapNhat: new Date("2023-12-31"),
    },
    {
        id: 2, documentType: "Quy chế tổ chức và hoạt động", status: "Đã ban hành", documentNumber: "CL/PT-256", issueDate: new Date("2022-04-03"), institution: "", nguoiCapNhat: "Admin",
        ngayCapNhat: new Date("2023-12-31"),
    },
    {
        id: 3, documentType: "Quy chế tài chính", status: "Đã ban hành", documentNumber: "CL/PT-256", issueDate: new Date("2022-04-03"), institution: "", nguoiCapNhat: "Admin",
        ngayCapNhat: new Date("2023-12-31"),
    },
    {
        id: 4, documentType: "Quy chế dân chủ", status: "Đã ban hành", documentNumber: "CL/PT-256", issueDate: new Date("2022-04-03"), institution: "", nguoiCapNhat: "Admin",
        ngayCapNhat: new Date("2023-12-31"),
    },
    {
        id: 5, documentType: "Danh mục vị trí việc làm", status: "Đã ban hành", documentNumber: "CL/PT-256", issueDate: new Date("2022-04-03"), institution: "", nguoiCapNhat: "Admin",
        ngayCapNhat: new Date("2023-12-31"),
    },
    {
        id: 6, documentType: "Quy định về công tác cán bộ, nhân sự", status: "Đã ban hành", documentNumber: "CL/PT-256", issueDate: new Date("2022-04-03"), institution: "", nguoiCapNhat: "Admin",
        ngayCapNhat: new Date("2023-12-31"),
    },
    {
        id: 7, documentType: "Quy định về đảm bảo chất lượng", status: "Chưa ban hành", documentNumber: "CL/PT-256", issueDate: new Date("2022-04-03"), institution: "", nguoiCapNhat: "Admin",
        ngayCapNhat: new Date("2023-12-31"),
    },
];