'use client'
import { useForm } from "@mantine/form";
import { AQButtonCreateByImportFile, MyButton, MyCenterFull, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import PartnerCreate from "./PartnerCreate";
import PartnerDelete from "./PartnerDelete";
import PartnerUpdate from "./PartnerUpdate";

export interface Partner {
    id: number;
    code: string;
    name: string;
    type: string;
    region: string;
    cooperationType: string;
    contactInfo: string;
    notes?: string
}

export default function PartnerLayout() {

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    const columns = useMemo<MRT_ColumnDef<Partner>[]>(() => [
        {
            header: "Mã đối tác",
            accessorKey: "code",
        },
        {
            header: "Tên đối tác",
            accessorKey: "name",
        },
        {
            header: "Loại đối tác",
            accessorKey: "type",
        },
        {
            header: "Quốc gia",
            accessorKey: "region",
        },
        {
            header: "Lĩnh vực hợp tác",
            accessorKey: "cooperationType",
        },
        {
            header: "Thông tin liên hệ",
            accessorKey: "contactInfo",
        }
    ], []);

    return (
        <MyFieldset title="Danh sách đối tác" >
            <MyDataTable
                enableRowSelection
                enableRowNumbers={false}
                columns={columns}
                data={mockPartners || []}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <PartnerCreate />
                            <AQButtonCreateByImportFile onSubmit={() => { }} form={form_multiple} />
                            <MyButton crudType="export" />
                            <MyButton crudType="delete">Xóa</MyButton>
                        </>
                    )
                }}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <PartnerUpdate values={row.original} />
                            <PartnerDelete id={row.original.id || 0} code={row.original.code} />
                        </MyCenterFull>
                    )
                }}
            />
        </MyFieldset>
    )
}


export const mockPartners: Partner[] = [
    {
        id: 1,
        code: "DTQT-001",
        name: "University of Technology Sydney",
        type: "Trường đại học",
        region: "Úc",
        cooperationType: "Công nghệ thông tin",
        contactInfo: "webpage.com",
    },
    {
        id: 2,
        code: "DTQT-002",
        name: "National University of Singapore",
        type: "Trường đại học",
        region: "Singapore",
        cooperationType: "Y sinh",
        contactInfo: "webpage.com",
    },
    {
        id: 3,
        code: "DTQT-003",
        name: "Siemens AG",
        type: "Doanh nghiệp",
        region: "Đức",
        cooperationType: "Năng lượng tái tạo",
        contactInfo: "webpage.com",
    },
];
