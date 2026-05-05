import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { AQButtonExportData, MyButton, MyCenterFull, MyDataTable, MySelect } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import ScientificResearchTopicRegistrationAnnouncementButtonDelete from "../AdvisoryCouncilEstablishmentDeleteButton";
import AdvisoryCouncilEstablishmentTab2CreateButton from "./AdvisoryCouncilEstablishmentCreateButtonTab2";
import AdvisoryCouncilEstablishmentDeleteListButton from "../AdvisoryCouncilEstablishmentDeleteListButton";

export default function AdvisoryCouncilEstablishmentTab2() {

    // query data
    const AdvisoryCouncilEstablishmentTab2Data = useQuery<
        IStaffData[]
    >({
        queryKey: ["AdvisoryCouncilEstablishmentTab2Data"],
        queryFn: async () => {
            return staffSampleData;
        },
        refetchOnWindowFocus: false,
    });
    const roleData = roleSampleData.map(item => { return { label: item.roleName, value: item.roleName } })
    const staffColumns: MRT_ColumnDef<IStaffData>[] = useMemo(() => [
        { header: "Mã viên chức", accessorKey: "staffCode", accessorFn: (row) => <MyCenterFull><MyTextInput defaultValue={row.staffCode} /></MyCenterFull> },
        { header: "Họ tên", accessorKey: "fullName", accessorFn: (row) => <MyCenterFull><MyTextInput defaultValue={row.fullName} /></MyCenterFull> },
        { header: "Ngày sinh", accessorKey: "dateOfBirth", accessorFn: (row) => <MyCenterFull><MyTextInput defaultValue={row.dateOfBirth} /></MyCenterFull> },
        { header: "Giới tính", accessorKey: "gender", accessorFn: (row) => <MyCenterFull><MyTextInput defaultValue={row.gender} /></MyCenterFull> },
        { header: "Đơn vị", accessorKey: "unit", accessorFn: (row) => <MyCenterFull><MyTextInput defaultValue={row.unit} /></MyCenterFull> },
        { header: "Chức vụ", accessorKey: "position", accessorFn: (row) => <MyCenterFull><MyTextInput defaultValue={row.position} /></MyCenterFull> },
        { header: "Vai trò", accessorKey: "role", accessorFn: (row) => <MyCenterFull><MySelect data={roleData} value={row.role} /></MyCenterFull> },

    ], []);


    return (
        <MyDataTable
            isError={AdvisoryCouncilEstablishmentTab2Data.isError}
            isLoading={AdvisoryCouncilEstablishmentTab2Data.isLoading}
            renderTopToolbarCustomActions={({table}) => (
                <Group>
                    <AdvisoryCouncilEstablishmentTab2CreateButton />
                    {/* <AQButtonExportData isAllData={true} objectName={"Thành viên"} data={staffSampleData} exportConfig={staffExportConfig}></AQButtonExportData> */}
                      <AdvisoryCouncilEstablishmentDeleteListButton values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
                </Group>
            )}

            enableRowSelection={true}
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
    role: string; // role

}


export const staffExportConfig = {
    fields: [
        { fieldName: "staffCode", header: "Mã viên chức" },
        { fieldName: "fullName", header: "Họ tên" },
        { fieldName: "dateOfBirth", header: "Ngày sinh" },
        { fieldName: "gender", header: "Giới tính" },
        { fieldName: "unit", header: "Đơn vị" },
        { fieldName: "position", header: "Chức vụ" },
        { fieldName: "role", header: "Vai trò" },

    ]
};

interface IRoleData {
    id: number; // STT hoặc ID duy nhất cho vai trò
    roleCode: string; // Mã vai trò (Mã NS trong image_76b93c.png, Mã vai trò trong image_b55d97.png)
    roleName: string; // Tên vai trò (Vai trò / Tên vai trò)
    usageScope: boolean; // Ngừng sử dụng (checkbox, dựa trên image_b55d97.png)
    notes: string; // Ghi chú (dựa trên image_b55d97.png)
}
export const staffSampleData: IStaffData[] = [
    {
        id: 1,
        staffCode: "VC001",
        fullName: "Nguyễn Văn A",
        dateOfBirth: "15/03/1975",
        gender: "Nam",
        unit: "Khoa Công nghệ thông tin",
        position: "Trưởng khoa",
        role: "Chủ tịch",
    },
    {
        id: 2,
        staffCode: "VC008",
        fullName: "Lê Thị Bình",
        dateOfBirth: "22/07/1980",
        gender: "Nữ",
        unit: "Phòng Khoa học & Công nghệ",
        position: "Trưởng phòng",
        role: "Phó Chủ tịch",
    },
    {
        id: 3,
        staffCode: "VC012",
        fullName: "Trần Văn Canh",
        dateOfBirth: "01/11/1978",
        gender: "Nam",
        unit: "Khoa Môi trường",
        position: "Phó Trưởng khoa",
        role: "Ủy viên phản biện",
    },
    {
        id: 4,
        staffCode: "VC015",
        fullName: "Phạm Thị Dung",
        dateOfBirth: "05/09/1982",
        gender: "Nữ",
        unit: "Khoa Kinh tế",
        position: "Giảng viên chính",
        role: "Ủy viên",
    },
    {
        id: 5,
        staffCode: "VC019",
        fullName: "Hoàng Trung Kiên",
        dateOfBirth: "10/06/1985",
        gender: "Nam",
        unit: "Phòng Đào tạo",
        position: "Chuyên viên",
        role: "Thư ký",
    },
];



export const roleSampleData: IRoleData[] = [
    {
        id: 1,
        roleCode: "CT", // Từ "Chủ tịch"
        roleName: "Chủ tịch",
        usageScope: false,
        notes: "Người đứng đầu hội đồng/đề tài",
    },
    {
        id: 2,
        roleCode: "PCT", // Từ "Phó Chủ tịch"
        roleName: "Phó Chủ tịch",
        usageScope: false,
        notes: "Người hỗ trợ chủ tịch",
    },
    {
        id: 3,
        roleCode: "UV_PB", // Từ "Ủy viên phản biện"
        roleName: "Ủy viên phản biện",
        usageScope: false,
        notes: "Thành viên có trách nhiệm phản biện",
    },
    {
        id: 4,
        roleCode: "UV", // Từ "Ủy viên"
        roleName: "Ủy viên",
        usageScope: false,
        notes: "Thành viên thông thường của hội đồng",
    },
    {
        id: 5,
        roleCode: "TK", // Từ "Thư ký"
        roleName: "Thư ký",
        usageScope: false,
        notes: "Người ghi chép, tổng hợp tài liệu",
    },

];