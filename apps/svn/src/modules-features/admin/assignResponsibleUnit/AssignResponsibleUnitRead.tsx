"use client"

import { Group, MultiSelect, Textarea } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { AQButtonExportData, MyButton, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";

interface ActivityGroup {
    code: string;                // Mã Hoạt động
    name: string;                // Tên Nhóm Hoạt động
    leadUnits: string[];         // Đơn vị Chủ trì
    coordinateUnits: string;   // Đơn vị Phối hợp
}


export default function AssignResponsibleUnitRead() {

    const AllQuery = useQuery<ActivityGroup[]>({
        queryKey: [`ActivityGroups_List`],
        queryFn: async () => {
            return mockActivityGroups
        }
    });

    const exportConfig = {
        fields: [
            {
                header: "Mã Hoạt động",
                fieldName: "code",
            },
            {
                header: "Tên Nhóm Hoạt động",
                fieldName: "name",
            },
            {
                header: "Đơn vị chủ trì",
                fieldName: "leadUnits",
            },
            {
                header: "Đơn vị phối hợp",
                fieldName: "coordinateUnits",
            },
        ]
    };

    const columns: MRT_ColumnDef<ActivityGroup>[] = [
        {
            header: "Mã Hoạt động",
            accessorKey: "code",
        },
        {
            header: "Tên Nhóm Hoạt động",
            accessorKey: "name",
        },
        {
            header: "Đơn vị chủ trì",
            accessorKey: "leadUnits",
            accessorFn: (row) => (
                <MultiSelect defaultValue={row.leadUnits} data={uniqueLeadUnits} />
            ),
        },
        {
            header: "Đơn vị phối hợp",
            accessorKey: "coordinateUnits",
            accessorFn: (row) => (
                <Textarea minRows={2} defaultValue={row.coordinateUnits} />
            ),
        },
    ];


    return (
        <MyFieldset title="Danh sách nhóm hoạt động">
            <MyDataTable
                isLoading={AllQuery.isLoading}
                isError={AllQuery.isError}
                enableRowSelection={true}
                enableRowNumbers={false}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <Group>
                                <MyButton crudType="save">Lưu</MyButton>
                                <AQButtonExportData
                                    objectName="dm_mh"
                                    data={AllQuery.data || []}
                                    exportConfig={exportConfig}
                                />
                                <MyButton crudType="delete">Xóa</MyButton>
                            </Group>
                        </>
                    )
                }}
                columns={columns}
                data={AllQuery.data || []}
            />
        </MyFieldset>
    )
}

export const uniqueLeadUnits = [
    "Ban Kế hoạch chiến lược",
    "Các đơn vị quản lý đào tạo",
    "Các Khoa",
    "Phòng Khảo thí",
    "Phòng CTSV & Truyền thông",
    "Phòng Hợp tác & Quản lý khoa học",
    "Phòng Hành chính - Quản trị",
    "Thư viện",
    "Trung tâm học liệu",
    "Trung tâm Quản lý hệ thống thông tin",
    "Trung tâm Đào tạo trực tuyến",
    "Trạm Y tế"
];




export const mockActivityGroups: ActivityGroup[] = [
    {
        code: "KHSCL",
        name: "Kế hoạch chiến lược của Trường; sứ mạng; tầm nhìn; giá trị cốt lõi và triết lý giáo dục",
        leadUnits: ["Ban Kế hoạch chiến lược"],
        coordinateUnits: "Các đơn vị liên quan",
    },
    {
        code: "CTDT",
        name: "Xây dựng; rà soát chương trình đào tạo",
        leadUnits: ["Các đơn vị quản lý đào tạo", "Các Khoa"],
        coordinateUnits: "Các đơn vị liên quan",
    },
    {
        code: "HDDH",
        name: "Hoạt động dạy và học; phương pháp giảng dạy",
        leadUnits: ["Các đơn vị quản lý đào tạo", "Các Khoa"],
        coordinateUnits: "Các đơn vị liên quan",
    },
    {
        code: "KTGD",
        name: "Hoạt động khảo thí; phương pháp đánh giá",
        leadUnits: ["Phòng Khảo thí"],
        coordinateUnits: "Các Khoa; Các đơn vị liên quan",
    },
    {
        code: "TSTTQC",
        name: "Chính sách tuyển sinh; truyền thông và hoạt động quảng bá tuyển sinh",
        leadUnits: ["Các đơn vị quản lý đào tạo", "Phòng CTSV & Truyền thông"],
        coordinateUnits: "Các Khoa; Các đơn vị liên quan",
    },
    {
        code: "KHCN",
        name: "Hoạt động khoa học công nghệ",
        leadUnits: ["Phòng Hợp tác & Quản lý khoa học"],
        coordinateUnits: "Các Khoa; Các nhóm nghiên cứu",
    },
    {
        code: "HTQT",
        name: "Hoạt động hợp tác quốc tế",
        leadUnits: ["Phòng Hợp tác & Quản lý khoa học"],
        coordinateUnits: "Các đơn vị liên quan",
    },
    {
        code: "CSVC",
        name: "Cơ sở vật chất; trang thiết bị",
        leadUnits: ["Phòng Hành chính - Quản trị"],
        coordinateUnits: "Các Khoa; Các đơn vị liên quan",
    },
    {
        code: "TV",
        name: "Thư viện; Trung tâm học liệu",
        leadUnits: ["Thư viện", "Trung tâm học liệu"],
        coordinateUnits: "Các Khoa; Các đơn vị liên quan",
    },
    {
        code: "HTTT",
        name: "Hệ thống công nghệ thông tin",
        leadUnits: [
            "Trung tâm Quản lý hệ thống thông tin",
            "Trung tâm Đào tạo trực tuyến",
        ],
        coordinateUnits: "Các đơn vị liên quan",
    },
    {
        code: "MTQC",
        name: "Môi trường; cảnh quan",
        leadUnits: ["Phòng Hành chính - Quản trị"],
        coordinateUnits: "Các Khoa; Các đơn vị liên quan",
    },
    {
        code: "SK",
        name: "Sức khỏe (y tế; tư vấn tâm lý)",
        leadUnits: ["Trạm Y tế"],
        coordinateUnits: "Các Khoa; Phòng CTSV & Truyền thông",
    },
];

