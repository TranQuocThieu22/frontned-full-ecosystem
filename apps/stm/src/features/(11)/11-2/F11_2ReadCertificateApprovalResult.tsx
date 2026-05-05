'use client'

import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import { Checkbox, Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

interface ICertificateApprovalResultViewModel {
    id?: number;
    name?: string;
    gender?: string;
    dateOfBirth?: Date | undefined;
    courseName?: string;
    examCode?: string;
    examDate?: Date | undefined;
    examScore?: number;
    isPassExam?: boolean;
    certificateApprovalBatchCode?: string;
    certificateName?: string;
    isApproveCertificate?: boolean;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

const mockData: ICertificateApprovalResultViewModel[] = [
    {
        id: 1,
        name: "Nguyễn Văn A",
        gender: "Nam",
        dateOfBirth: new Date("2000-01-01T00:00:00Z"),
        courseName: "Lập trình Web",
        examCode: "LTB24101-10",
        examDate: new Date("2023-01-01T00:00:00Z"),
        examScore: 8,
        isPassExam: true,
        certificateApprovalBatchCode: "THCB-Dot1_2024",
        certificateName: "Tin học căn bản (cấp độ A)",
        isApproveCertificate: true,
        nguoiCapNhat: "Admin",
        ngayCapNhat: new Date("2023-01-02"),
    },
    {
        id: 2,
        name: "Trần Thị B",
        gender: "Nữ",
        dateOfBirth: new Date("1998-05-15T00:00:00Z"),
        courseName: "Lập trình Java",
        examCode: "LTJ24101-11",
        examDate: new Date("2023-02-01T00:00:00Z"),
        examScore: 9,
        isPassExam: false,
        certificateApprovalBatchCode: "THCB-Dot2_2024",
        certificateName: "Tin học căn bản (cấp độ B)",
        isApproveCertificate: true,
        nguoiCapNhat: "Admin",
        ngayCapNhat: new Date("2023-02-02"),
    },
    {
        id: 3,
        name: "Lê Văn C",
        gender: "Nam",
        dateOfBirth: new Date("1995-08-20T00:00:00Z"),
        courseName: "Lập trình C++",
        examCode: "LTC24101-12",
        examDate: new Date("2023-03-01T00:00:00Z"),
        examScore: 7,
        isPassExam: true,
        certificateApprovalBatchCode: "THCB-Dot3_2024",
        certificateName: "Tin học căn bản (cấp độ C)",
        isApproveCertificate: true,
        nguoiCapNhat: "Admin",
        ngayCapNhat: new Date("2023-03-02"),
    },
    {
        id: 4,
        name: "Phạm Thị D",
        gender: "Nữ",
        dateOfBirth: new Date("1997-12-10T00:00:00Z"),
        courseName: "Lập trình Python",
        examCode: "LTP24101-13",
        examDate: new Date("2023-04-01T00:00:00Z"),
        examScore: 10,
        isPassExam: false,
        certificateApprovalBatchCode: "THCB-Dot4_2024",
        certificateName: "Tin học căn bản (cấp độ D)",
        isApproveCertificate: true,
        nguoiCapNhat: "Admin",
        ngayCapNhat: new Date("2023-04-02"),
    },
    {
        id: 5,
        name: "Ngô Văn E",
        gender: "Nam",
        dateOfBirth: new Date("1999-11-25T00:00:00Z"),
        courseName: "Lập trình JavaScript",
        examCode: "LTJ24101-14",
        examDate: new Date("2023-05-01T00:00:00Z"),
        examScore: 6,
        isPassExam: true,
        certificateApprovalBatchCode: "THCB-Dot5_2024",
        certificateName: "Tin học căn bản (cấp độ E)",
        isApproveCertificate: true,
        nguoiCapNhat: "Admin",
        ngayCapNhat: new Date("2023-05-02"),
    }
]

export default function F11_2ReadCertificateApprovalResult() {
    const AllCertificateApprovalResult = useQuery<ICertificateApprovalResultViewModel[]>({
        queryKey: [`F11_2ReadCertificateApprovalResult`],
        queryFn: async () => {
            // const response = await baseAxios.post("/SystemCatalogProjectTypeCategory/getall");
            return mockData
        },
    })

    const columns = useMemo<MRT_ColumnDef<ICertificateApprovalResultViewModel>[]>(() => [
        {
            header: "Họ tên",
            accessorKey: "name",
        },
        {
            header: "Giới tính",
            accessorKey: "gender",
        },
        {
            header: "Ngày sinh",
            accessorKey: "dateOfBirth",
            accessorFn(originalRow) {
                return utils_date_dateToDDMMYYYString(new Date(originalRow.dateOfBirth!));
            },
        },
        {
            header: "Tên chương trình",
            accessorKey: "courseName",
        },
        {
            header: "Mã khóa thi",
            accessorKey: "examCode",
        },
        {
            header: "Ngày thi",
            accessorKey: "examDate",
            accessorFn(originalRow) {
                return utils_date_dateToDDMMYYYString(new Date(originalRow.examDate!));
            },
        },
        {
            header: "Điểm thi",
            accessorKey: "examScore",
        },
        {
            header: "Đạt thi",
            accessorKey: "isPassExam",
            accessorFn(originalRow) {
                return originalRow.isPassExam ? "Đạt" : "Không đạt";
            },
            Cell: ({ row }) => {
                return (
                    <MyCenterFull>
                        <Checkbox
                            readOnly
                            checked={row.original.isPassExam}
                            color="green"
                        />
                    </MyCenterFull>
                )
            },
            size: 120
        },
        {
            header: "Đợt xét cấp CC",
            accessorKey: "certificateApprovalBatchCode",
        },
        {
            header: "Chứng chỉ / chứng nhận",
            accessorKey: "certificateName",
        },
        {
            header: "Đạt CC",
            accessorKey: "isApproveCertificate",
            accessorFn(originalRow) {
                return originalRow.isPassExam ? "Đạt" : "Không đạt";
            },
            Cell: ({ row }) => {
                return (
                    <MyCenterFull>
                        <Checkbox
                            readOnly
                            checked={row.original.isApproveCertificate}
                            color="green"
                        />
                    </MyCenterFull>
                )
            },
            size: 120
        },
        {
            header: "người cập nhật",
            accessorKey: "nguoiCapNhat",
        },
        {
            header: "ngày cập nhật",
            accessorKey: "ngayCapNhat",
            accessorFn(originalRow) {
                return utils_date_dateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
            },
        }
    ], []);

    const formatFunctions = {
        date: (value: string) => {
            const date = new Date(value);
            return date.toLocaleDateString("en-GB"); // e.g., "07/11/2024" (DD/MM/YYYY format)
        },
        isPass: (value: boolean) => (value ? "Đạt" : "Không đạt")
    };

    const exportConfig = {
        fields: [
            {
                fieldName: "name",
                header: "Họ và tên"
            },
            {
                fieldName: "gender",
                header: "Giới tính"
            },
            {
                fieldName: "dateOfBirth",
                header: "Ngày sinh",
                formatFunction: formatFunctions.date
            },
            {
                fieldName: "courseName",
                header: "Tên chương trình"
            },
            {
                fieldName: "examCode",
                header: "Mã khóa thi"
            },
            {
                fieldName: "examDate",
                header: "Ngày thi",
                formatFunction: formatFunctions.date
            },
            {
                fieldName: "examScore",
                header: "Điểm thi"
            },
            {
                fieldName: "isPassExam",
                header: "Đạt thi",
                formatFunction: formatFunctions.isPass
            },
            {
                fieldName: "certificateApprovalBatchCode",
                header: "Đợt xét cấp CC"
            },
            {
                fieldName: "certificateName",
                header: "Chứng chỉ / chứng nhận"
            },
            {
                fieldName: "isApproveCertificate",
                header: "Đạt CC",
                formatFunction: formatFunctions.isPass
            }
        ]
    };

    if (AllCertificateApprovalResult.isLoading) return "Đang tải dữ liệu..."
    if (AllCertificateApprovalResult.isError) return "có lỗi xảy ra!"
    return (
        <>
            <MyDataTable
                enableRowSelection={true}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <Group>
                                <AQButtonExportData
                                    isAllData={false}
                                    objectName="dsKetQuaXetChungChi"
                                    data={table.getSelectedRowModel().rows.map((row) => row.original)}
                                    exportConfig={exportConfig}
                                />
                            </Group>
                        </>
                    )
                }}
                columns={columns}
                data={AllCertificateApprovalResult.data!}
            />
        </>
    )
}