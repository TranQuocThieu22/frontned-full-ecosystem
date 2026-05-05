import { Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { AQButtonExportData, MyButton, MyCenterFull, MyDataTable } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import ScientificResearchTopicRegistrationAnnouncementTab2CreateButton from "./ScientificResearchTopicRegistrationAnnouncementCreateButtonTab2";
import ScientificResearchTopicRegistrationAnnouncementButtonDelete from "../ScientificResearchTopicRegistrationAnnouncementDeleteButton";

export default function ScientificResearchTopicRegistrationAnnouncementTab2() {

    // query data
    const ScientificResearchTopicRegistrationAnnouncementab2Data = useQuery<
        IStaffData[]
    >({
        queryKey: ["ScientificResearchTopicRegistrationAnnouncementab2Data"],
        queryFn: async () => {
            return staffSampleData;
        },
        refetchOnWindowFocus: false,
    });

    const staffColumns: MRT_ColumnDef<IStaffData>[] = useMemo(() => [
        { header: "Mã viên chức", accessorKey: "staffCode" },
        { header: "Họ tên", accessorKey: "fullName" },
        { header: "Ngày sinh", accessorKey: "dateOfBirth" },
        { header: "Giới tính", accessorKey: "gender" },
        { header: "Đơn vị", accessorKey: "unit" },
        { header: "Chức vụ", accessorKey: "position" },
        { header: "Email", accessorKey: "email" },
        { header: "Số điện thoại", accessorKey: "phoneNumber" },
    ], []);


    return (
        <MyDataTable
            isError={ScientificResearchTopicRegistrationAnnouncementab2Data.isError}
            isLoading={ScientificResearchTopicRegistrationAnnouncementab2Data.isLoading}
            renderTopToolbarCustomActions={() => (
                <Group>
                    <ScientificResearchTopicRegistrationAnnouncementTab2CreateButton />
                    {/* <AQButtonExportData isAllData={true} objectName={"Danh sách người nhận"} data={staffSampleData} exportConfig={staffExportConfig}></AQButtonExportData> */}
                    <MyButton crudType="delete">Xóa</MyButton>
                </Group>
            )}

            enableRowSelection={false}
            columns={staffColumns}
            data={staffSampleData || []}
            renderRowActions={({ row }) => (<MyCenterFull>
                <ScientificResearchTopicRegistrationAnnouncementButtonDelete code={row.original.staffCode} />
            </MyCenterFull>
            )}
        />
    )
}

export interface IStaffData {
    id: number;
    staffCode: string; // Mã viên chức
    fullName: string; // Họ tên
    dateOfBirth: string; // Ngày sinh (DD/MM/YYYY)
    gender: string; // Giới tính
    unit: string; // Đơn vị
    position: string; // Chức vụ
    email: string; // Email
    phoneNumber: string; // Số điện thoại
}


export const staffExportConfig = {
    fields: [
        { fieldName: "staffCode", header: "Mã viên chức" },
        { fieldName: "fullName", header: "Họ tên" },
        { fieldName: "dateOfBirth", header: "Ngày sinh" },
        { fieldName: "gender", header: "Giới tính" },
        { fieldName: "unit", header: "Đơn vị" },
        { fieldName: "position", header: "Chức vụ" },
        { fieldName: "email", header: "Email" },
        { fieldName: "phoneNumber", header: "Số điện thoại" },
    ]
};

export const staffSampleData: IStaffData[] = [
    {
        id: 1,
        staffCode: "VC001",
        fullName: "Nguyễn Thị Thảo",
        dateOfBirth: "15/03/1980",
        gender: "Nữ",
        unit: "Khoa Công nghệ thông tin",
        position: "Giảng viên chính",
        email: "thao.nt@example.edu.vn",
        phoneNumber: "0901234567",
    },
    {
        id: 2,
        staffCode: "VC002",
        fullName: "Lê Văn Hùng",
        dateOfBirth: "22/11/1975",
        gender: "Nam",
        unit: "Phòng Tổ chức Cán bộ",
        position: "Trưởng phòng",
        email: "hung.lv@example.edu.vn",
        phoneNumber: "0987654321",
    },
    {
        id: 3,
        staffCode: "VC003",
        fullName: "Phạm Thu Lan",
        dateOfBirth: "05/07/1988",
        gender: "Nữ",
        unit: "Khoa Kinh tế",
        position: "Chuyên viên",
        email: "lan.pt@example.edu.vn",
        phoneNumber: "0919876543",
    },
    {
        id: 4,
        staffCode: "VC004",
        fullName: "Trần Đình Nam",
        dateOfBirth: "10/01/1970",
        gender: "Nam",
        unit: "Khoa Vật lý",
        position: "Giảng viên cao cấp",
        email: "nam.td@example.edu.vn",
        phoneNumber: "0978123456",
    },
    {
        id: 5,
        staffCode: "VC005",
        fullName: "Đỗ Minh Anh",
        dateOfBirth: "20/09/1992",
        gender: "Nữ",
        unit: "Phòng Đào tạo",
        position: "Chuyên viên",
        email: "anh.dm@example.edu.vn",
        phoneNumber: "0945678901",
    },
];