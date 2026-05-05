'use client'

import MyActionIconutils_pdf_download from "@/components/ActionIcons/ActionIconDownloadPDF/MyActionIconDownloadPDF";
import MyActionIconViewPDF from "@/components/ActionIcons/ActionIconViewPdf/MyActionIconViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

interface IRegisteredExaminationViewModel {
    id?: number;
    name?: string;
    gender?: string;
    dateOfBirth?: Date | undefined;
    examCode?: string;
    exameName?: string;
    examDate?: Date | undefined;
    email?: string;
    phoneNumber?: string;
    CCCD?: string;
    CCCD_DateOfIssue?: Date | undefined;
    CCCD_PlaceOfIssue?: string;
    receiptFile?: File | undefined;
    payment?: number;
    studentType?: string;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

const mockData: IRegisteredExaminationViewModel[] = [
    {
        id: 1,
        name: "Nguyễn Văn A",
        gender: "Nam",
        dateOfBirth: new Date("1990-01-01T00:00:00Z"),
        examCode: "KT001",
        exameName: "Toán cao cấp",
        examDate: new Date("2023-12-01T00:00:00Z"),
        email: "nguyenvana@example.com",
        phoneNumber: "0123456789",
        CCCD: "123456789",
        CCCD_DateOfIssue: new Date("2010-01-01T00:00:00Z"),
        CCCD_PlaceOfIssue: "Hà Nội",
        receiptFile: undefined,
        payment: 1000000,
        studentType: "Sinh viên",
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2021-07-11T15:00:00Z")
    },
    {
        id: 2,
        name: "Trần Thị B",
        gender: "Nữ",
        dateOfBirth: new Date("1992-02-02T00:00:00Z"),
        examCode: "KT002",
        exameName: "Vật lý đại cương",
        examDate: new Date("2023-12-02T00:00:00Z"),
        email: "tranthib@example.com",
        phoneNumber: "0987654321",
        CCCD: "987654321",
        CCCD_DateOfIssue: new Date("2012-02-02T00:00:00Z"),
        CCCD_PlaceOfIssue: "Hồ Chí Minh",
        receiptFile: undefined,
        payment: 2000000,
        studentType: "Sinh viên",
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2021-07-11T15:00:00Z")
    },
    {
        id: 3,
        name: "Lê Văn C",
        gender: "Nam",
        dateOfBirth: new Date("1994-03-03T00:00:00Z"),
        examCode: "KT003",
        exameName: "Hóa học đại cương",
        examDate: new Date("2023-12-03T00:00:00Z"),
        email: "levanc@example.com",
        phoneNumber: "0123987654",
        CCCD: "456789123",
        CCCD_DateOfIssue: new Date("2014-03-03T00:00:00Z"),
        CCCD_PlaceOfIssue: "Đà Nẵng",
        receiptFile: undefined,
        payment: 1500000,
        studentType: "Tự do",
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2021-07-11T15:00:00Z")
    },
    {
        id: 4,
        name: "Phạm Thị D",
        gender: "Nữ",
        dateOfBirth: new Date("1996-04-04T00:00:00Z"),
        examCode: "KT004",
        exameName: "Sinh học đại cương",
        examDate: new Date("2023-12-04T00:00:00Z"),
        email: "phamthid@example.com",
        phoneNumber: "0987123456",
        CCCD: "321654987",
        CCCD_DateOfIssue: new Date("2016-04-04T00:00:00Z"),
        CCCD_PlaceOfIssue: "Hải Phòng",
        receiptFile: undefined,
        payment: 1800000,
        studentType: "Sinh viên",
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2021-07-11T15:00:00Z")
    },
    {
        id: 5,
        name: "Ngô Văn E",
        gender: "Nam",
        dateOfBirth: new Date("1998-05-05T00:00:00Z"),
        examCode: "KT005",
        exameName: "Lịch sử Việt Nam",
        examDate: new Date("2023-12-05T00:00:00Z"),
        email: "ngovane@example.com",
        phoneNumber: "0123456780",
        CCCD: "654321987",
        CCCD_DateOfIssue: new Date("2018-05-05T00:00:00Z"),
        CCCD_PlaceOfIssue: "Cần Thơ",
        receiptFile: undefined,
        payment: 1200000,
        studentType: "Sinh viên",
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2021-07-11T15:00:00Z")
    }
];

export default function F10_1ReadRegisteredExamination() {
    const AllRegisteredExamination = useQuery<IRegisteredExaminationViewModel[]>({
        queryKey: [`F10_3Read`],
        queryFn: async () => {
            // const response = await baseAxios.post("/SystemCatalogProjectTypeCategory/getall");
            return mockData
        },
    })

    const columns = useMemo<MRT_ColumnDef<IRegisteredExaminationViewModel>[]>(() => [
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
            header: "Mã khóa thi",
            accessorKey: "examCode",
        },
        {
            header: "Tên khóa thi",
            accessorKey: "exameName",
        },
        {
            header: "Ngày thi",
            accessorKey: "examDate",
            accessorFn(originalRow) {
                return utils_date_dateToDDMMYYYString(new Date(originalRow.examDate!));
            },
        },
        {
            header: "Email",
            accessorKey: "email",
        },
        {
            header: "Số điện thoại",
            accessorKey: "phoneNumber",
        },
        {
            header: "CCCD",
            accessorKey: "CCCD",
        },
        {
            header: "Ngày cấp CCCD",
            accessorKey: "CCCD_DateOfIssue",
            accessorFn(originalRow) {
                return utils_date_dateToDDMMYYYString(new Date(originalRow.CCCD_DateOfIssue!));
            },
        },
        {
            header: "Nơi cấp CCCD",
            accessorKey: "CCCD_PlaceOfIssue",
        },
        {
            header: "Phiếu thu",
            accessorFn: (row) => {
                return (
                    <MyCenterFull>
                        <MyActionIconViewPDF pdfLink={"https://datafiles.chinhphu.vn/cpp/files/vbpq/2021/07/17-bgd.signed.pdf"} />
                        <MyActionIconutils_pdf_download pdfLink={"https://datafiles.chinhphu.vn/cpp/files/vbpq/2021/07/17-bgd.signed.pdf"} />
                    </MyCenterFull>
                )
            }
        },
        {
            header: "Số tiền đã thu",
            accessorKey: "payment",
        },
        {
            header: "Đối tượng",
            accessorKey: "studentType",
        },
        {
            header: "Người cập nhật",
            accessorKey: "nguoiCapNhat",
        },
        {
            header: "Ngày cập nhật",
            accessorKey: "ngayCapNhat",
            accessorFn(originalRow) {
                return utils_date_dateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
            },
        }
    ], []);

    if (AllRegisteredExamination.isLoading) return "Đang tải dữ liệu..."
    if (AllRegisteredExamination.isError) return "có lỗi xảy ra!"
    return (
        <>
            <MyDataTable
                columns={columns}
                data={AllRegisteredExamination.data!}
            />
        </>
    )
}