"use client";
import { Group } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import StaffCategoriesCreateButton from "./StaffCategoriesCreateButton";
import StaffCategoriesDeleteButton from "./StaffCategoriesDeleteButton";
import StaffCategoriesDeleteListButton from "./StaffCategoriesDeleteListButton";
import StaffCategoriesUpdateButton from "./StaffCategoriesUpdateButton";
import { IStaffInfoViewModel } from "./interfaces/IStaffInfoViewModel";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCheckbox } from "@aq-fe/core-ui/shared/components/input/CustomCheckbox";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";

export default function StaffCategoriesTable() {
    const columns = useMemo<MRT_ColumnDef<IStaffInfoViewModel>[]>(() => [
        {
            header: "Mã viên chức",
            accessorKey: "code",
        },
        {
            header: "Họ lót",
            accessorKey: "lastName",
        },
        {
            header: "Tên",
            accessorKey: "firstName",
        },
        {
            header: "Giới tính",
            accessorKey: "gender",
        },
        {
            header: "Ngày sinh",
            accessorKey: "dateOfBirth",
            accessorFn: (row) => dateUtils.toDDMMYYYY(row.dateOfBirth!)
        },
        {
            header: "Số điện thoại",
            accessorKey: "phoneNumber",
        },
        {
            header: "Email",
            accessorKey: "email",
        },
        {
            header: "Trình độ",
            accessorKey: "position",
        },
        {
            header: "Đơn vị",
            accessorKey: "department",
            size: 200
        },
        {
            header: "Viên chức ngoài trường",
            accessorKey: "isExternalStaff",
            Cell: ({ cell }) => (
                <CustomCenterFull>
                    <CustomCheckbox checked={cell.getValue<boolean>()} onChange={() => { }} />
                </CustomCenterFull>
            ),
        }
    ], []);

    return (
        <CustomFlexColumn>
            <CustomFieldset title="Danh mục viên chức">
                <CustomDataTable
                    enableRowSelection={true}
                    enableRowNumbers={true}
                    renderTopToolbarCustomActions={({ table }: { table: any }) => (
                        <Group>
                            <StaffCategoriesCreateButton />
                            <CustomButton actionType="import" />
                            <CustomButton actionType="export" />
                            <StaffCategoriesDeleteListButton values={table.getSelectedRowModel().flatRows.flatMap((item: any) => item.original)} />
                            <CustomButton actionType="default" color="green">Đồng bộ từ Edusoft.Net</CustomButton>
                        </Group>
                    )}
                    columns={columns}
                    data={mockData}
                    renderRowActions={({ row }: { row: any }) => (
                        <CustomCenterFull>
                            <StaffCategoriesUpdateButton data={row.original} />
                            <StaffCategoriesDeleteButton id={row.original.id!} code={row.original.code || ""} />
                        </CustomCenterFull>
                    )}
                />
            </CustomFieldset>
        </CustomFlexColumn>
    );
}

const mockData: IStaffInfoViewModel[] = [
    {
        id: 1,
        code: "VC001",
        lastName: "Nguyễn Văn",
        firstName: "An",
        gender: "Nam",
        dateOfBirth: new Date("1980-05-15"),
        phoneNumber: "0901234567",
        email: "vana@example.com",
        position: "Tiến sĩ",
        department: "Khoa Công nghệ Thông tin",
        isExternalStaff: false
    },
    {
        id: 2,
        code: "VC002",
        lastName: "Trần Thị",
        firstName: "Bình",
        gender: "Nữ",
        dateOfBirth: new Date("1985-08-22"),
        phoneNumber: "0987654321",
        email: "thibinh@example.com",
        position: "Thạc sĩ",
        department: "Phòng Đào tạo",
        isExternalStaff: false
    },
    {
        id: 3,
        code: "VC003",
        lastName: "Lê Quang",
        firstName: "Cảnh",
        gender: "Nam",
        dateOfBirth: new Date("1975-03-01"),
        phoneNumber: "0912345678",
        email: "quangcanh@example.com",
        position: "Tiến sĩ",
        department: "Phòng Công tác Sinh viên",
        isExternalStaff: false
    },
    {
        id: 4,
        code: "VC004",
        lastName: "Phạm Thị",
        firstName: "Dung",
        gender: "Nữ",
        dateOfBirth: new Date("1990-11-05"),
        phoneNumber: "0934567890",
        email: "thidung@example.com",
        position: "Cử nhân",
        department: "Thư viện",
        isExternalStaff: false
    },
    {
        id: 5,
        code: "VC005",
        lastName: "Hoàng Minh",
        firstName: "Đức",
        gender: "Nam",
        dateOfBirth: new Date("1982-09-30"),
        phoneNumber: "0976543210",
        email: "minhduc@example.com",
        position: "Thạc sĩ",
        department: "Phòng Kế hoạch Tài chính",
        isExternalStaff: false
    },
    {
        id: 6,
        code: "VC006",
        lastName: "Võ Thị",
        firstName: "Hạnh",
        gender: "Nữ",
        dateOfBirth: new Date("1978-02-12"),
        phoneNumber: "0902234445",
        email: "thihanh@example.com",
        position: "Tiến sĩ",
        department: "Khoa Kinh tế",
        isExternalStaff: false
    },
    {
        id: 7,
        code: "VC007",
        lastName: "Đinh Văn",
        firstName: "Khôi",
        gender: "Nam",
        dateOfBirth: new Date("1988-06-19"),
        phoneNumber: "0903344556",
        email: "vankhoi@example.com",
        position: "Cử nhân",
        department: "Trung tâm Ngoại ngữ",
        isExternalStaff: false
    },
    {
        id: 8,
        code: "VC008",
        lastName: "Nguyễn Thị",
        firstName: "Lan",
        gender: "Nữ",
        dateOfBirth: new Date("1983-04-28"),
        phoneNumber: "0904455667",
        email: "thilan@example.com",
        position: "Thạc sĩ",
        department: "Khoa Sư phạm",
        isExternalStaff: false
    },
    {
        id: 9,
        code: "VC009",
        lastName: "Bùi Mạnh",
        firstName: "Long",
        gender: "Nam",
        dateOfBirth: new Date("1979-10-07"),
        phoneNumber: "0905566778",
        email: "manhlong@example.com",
        position: "Tiến sĩ",
        department: "Khoa Điện tử",
        isExternalStaff: false
    },
    {
        id: 10,
        code: "VC010",
        lastName: "Trần Thị",
        firstName: "Custom",
        gender: "Nữ",
        dateOfBirth: new Date("1992-01-14"),
        phoneNumber: "0906677889",
        email: "thiCustom@example.com",
        position: "Cử nhân",
        department: "Phòng Thanh tra",
        isExternalStaff: false
    },
    {
        id: 11,
        code: "VC011",
        lastName: "Lý Văn",
        firstName: "Nam",
        gender: "Nam",
        dateOfBirth: new Date("1981-05-20"),
        phoneNumber: "0907788990",
        email: "vannam@example.com",
        position: "Thạc sĩ",
        department: "Khoa Y học",
        isExternalStaff: false
    },
    {
        id: 12,
        code: "VC012",
        lastName: "Nguyễn Thị",
        firstName: "Oanh",
        gender: "Nữ",
        dateOfBirth: new Date("1986-09-12"),
        phoneNumber: "0908899001",
        email: "thioanh@example.com",
        position: "Cử nhân",
        department: "Phòng Khảo thí",
        isExternalStaff: false
    },
    {
        id: 13,
        code: "VC013",
        lastName: "Phạm Văn",
        firstName: "Phong",
        gender: "Nam",
        dateOfBirth: new Date("1976-03-03"),
        phoneNumber: "0909900112",
        email: "vanphong@example.com",
        position: "Tiến sĩ",
        department: "Phòng Tài vụ",
        isExternalStaff: false
    },
    {
        id: 14,
        code: "VC014",
        lastName: "Đặng Thị",
        firstName: "Quỳnh",
        gender: "Nữ",
        dateOfBirth: new Date("1989-07-17"),
        phoneNumber: "0910011223",
        email: "thiquynh@example.com",
        position: "Thạc sĩ",
        department: "Khoa Luật",
        isExternalStaff: false
    },
    {
        id: 15,
        code: "VC015",
        lastName: "Lê Văn",
        firstName: "Sơn",
        gender: "Nam",
        dateOfBirth: new Date("1984-09-25"),
        phoneNumber: "0911122334",
        email: "vanson@example.com",
        position: "Cử nhân",
        department: "Phòng Quản lý Khoa học",
        isExternalStaff: false
    }
];
