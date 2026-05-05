'use client'
import { Checkbox } from "@mantine/core";
import { MyButton, MyCenterFull, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { DisplayPotentialCustomerStatus, PotentialCustomerStatusMap } from "./DisplayPotentialCustomerStatus";
import PotentialCustomerCreateButton from "./PotentialCustomerCreateButton";
import PotentialCustomerDeleteButton from "./PotentialCustomerDeleteButton";
import PotentialCustomerUpdateButton from "./PotentialCustomerUpdateButton";

export interface PotentialStudent {
    id: number;
    code: string;
    fullName: string;
    dateOfBirth: string;
    gender: string;
    phone: string;
    email: string;
    address: string;
    source: string;
    status: string;
    interestedProgram: string;
    note: string;
    assignedStaff: string;
    createdDate: string;
    lastUpdatedDate: string;
    isEnrolled: boolean;
}



export default function ListPotentialCustomerTable() {

    const columns = useMemo<MRT_ColumnDef<PotentialStudent>[]>(
        () => [
            { accessorKey: 'code', header: 'Mã KHTN' },
            { accessorKey: 'fullName', header: 'Họ và tên KHTN' },
            { accessorKey: 'dateOfBirth', header: 'Ngày sinh KHTN', accessorFn: (row) => utils_date_dateToDDMMYYYString(new Date(row.dateOfBirth)) },
            { accessorKey: 'gender', header: 'Giới tính KHTN' },
            { accessorKey: 'phone', header: 'Số điện thoại PH' },
            { accessorKey: 'email', header: 'Email PH' },
            { accessorKey: 'address', header: 'Địa chỉ PH' },
            { accessorKey: 'source', header: 'Nguồn KHTN' },
            {
                accessorKey: 'status',
                header: 'Trạng thái KHTN',
                accessorFn: (row) => <DisplayPotentialCustomerStatus customerStatus={PotentialCustomerStatusMap[row.status] ?? 0} />,
                size: 200
            },
            { accessorKey: 'interestedProgram', header: 'Chương trình quan tâm' },
            {
                accessorKey: 'note',
                header: 'Ghi chú',
                size: 500
            },
            { accessorKey: 'assignedStaff', header: 'Người phụ trách' },
            { accessorKey: 'createdDate', header: 'Ngày tạo KHTN', accessorFn: (row) => utils_date_dateToDDMMYYYString(new Date(row.createdDate)) },
            { accessorKey: 'lastUpdatedDate', header: 'Ngày cập nhật gần nhất', accessorFn: (row) => utils_date_dateToDDMMYYYString(new Date(row.lastUpdatedDate)) },
            {
                accessorKey: 'isEnrolled',
                header: 'Đã ghi danh',
                Cell: ({ cell }) => (
                    <Checkbox checked={cell.getValue<boolean>()} readOnly />
                ),
            },
        ], []
    );

    return (
        <MyFieldset title="Danh sách khách hàng tiềm năng" >
            <MyDataTable
                enableRowSelection
                enableRowNumbers={false}
                columns={columns}
                data={potentialStudents}
                renderTopToolbarCustomActions={() => {
                    return (
                        <>
                            <PotentialCustomerCreateButton />
                            <MyButton crudType="import" />
                            <MyButton crudType="export" />
                            <MyButton crudType="delete">Xóa</MyButton>
                        </>
                    )
                }}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <PotentialCustomerUpdateButton values={row.original} />
                            <PotentialCustomerDeleteButton id={row.original.id} code={row.original.code} />
                        </MyCenterFull>
                    )
                }}
            />
        </MyFieldset>
    )
}

export const potentialStudents: PotentialStudent[] = [
    {
        id: 1,
        code: "KHTN001",
        fullName: "Nguyễn Văn A",
        dateOfBirth: "2014-05-20",
        gender: "Nam",
        phone: "0901234567",
        email: "nguyen.va@example.com",
        address: "123 Đường ABC Quận 1 TP.HCM",
        source: "Facebook Ads",
        status: "Đã hẹn test",
        interestedProgram: "Toán Khối 7",
        note: "Phụ huynh muốn tìm lớp Toán K7 học vào cuối tuần, đã gửi tài liệu tham khảo qua email.",
        assignedStaff: "Nguyễn Thị Lan",
        createdDate: "2025-07-01",
        lastUpdatedDate: "2025-07-12",
        isEnrolled: false,
    },
    {
        id: 2,
        code: "KHTN002",
        fullName: "Lê Thị B",
        dateOfBirth: "2013-11-15",
        gender: "Nữ",
        phone: "0987654321",
        email: "le.tb@email.com",
        address: "456 Phó XYZ Quận 7 TP.HCM",
        source: "Giới thiệu từ học viên cũ",
        status: "Đang học thử",
        interestedProgram: "Tiếng Anh Tổng Quát",
        note: "Học sinh yếu phản xạ nghe, cần tư vấn lớp tiếng Anh giao tiếp, đang học thử lớp TA TQ cấp độ A1.",
        assignedStaff: "Trần Văn Hùng",
        createdDate: "2025-07-05",
        lastUpdatedDate: "2025-07-13",
        isEnrolled: false,
    },
    {
        id: 3,
        code: "KHTN003",
        fullName: "Phạm Minh C",
        dateOfBirth: "2015-03-01",
        gender: "Nam",
        phone: "0912345678",
        email: "pham.mc@example.com",
        address: "789 Đường DEF Quận 3 TP.HCM",
        source: "Website",
        status: "Đã ghi danh",
        interestedProgram: "Rèn chữ",
        note: "Đã hoàn tất thủ tục ghi danh vào lớp Rèn chữ cơ bản 7C1. Ngày ghi danh: 12/07/2025.",
        assignedStaff: "Nguyễn Thị Lan",
        createdDate: "2025-07-08",
        lastUpdatedDate: "2025-07-12",
        isEnrolled: true,
    },
    {
        id: 4,
        code: "KHTN004",
        fullName: "Đặng Thu D",
        dateOfBirth: "2012-09-22",
        gender: "Nữ",
        phone: "0976543210",
        email: "dang.td@example.com",
        address: "101 Đường GHI Quận Bình Thạnh TP.HCM",
        source: "Sự kiện trường học",
        status: "Không tiềm năng",
        interestedProgram: "Luyện thi IELTS",
        note: "Phụ huynh quyết định cho con học trung tâm khác. Lý do: Thời gian học không phù hợp.",
        assignedStaff: "Trần Văn Hùng",
        createdDate: "2025-07-09",
        lastUpdatedDate: "2025-07-11",
        isEnrolled: false,
    },
];

