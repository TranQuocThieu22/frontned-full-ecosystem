'use client'
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { MyButton, MyButtonModal, MyButtonViewPDF, MyCenterFull, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import ProtectionRegistrationUpdate from "./UpdateProtectionRegistration";

export interface ProtectionRegistration {
    id: number,
    code: string;
    projectCode: String;
    name: string;
    startDate: String;
    endDate: String;
    completionDate?: string;
    status: string;
    notes: string;
    link: String;
}

export default function ProtectionRegistrationLayout() {

    const disclosure = useDisclosure();

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    const columns = useMemo<MRT_ColumnDef<ProtectionRegistration>[]>(() => [
        {
            header: "Mã giai đoan",
            accessorKey: "code",
        },
        {
            header: "Mã dự án",
            accessorKey: "projectCode",
        },
        {
            header: "Tên Giai đoạn",
            accessorKey: "name",
        },
        {
            header: "Ngày bắt đầu dự kiến",
            accessorKey: "startDate",
        },
        {
            header: "Ngày kết thúc dự kiến",
            accessorKey: "endDate",
        },
        {
            header: "Ngày hoàn thành thực tế",
            accessorKey: "completionDate",
            accessorFn: row => {
                if (row.completionDate) {
                    return utils_date_dateToDDMMYYYString(row.completionDate)
                }
                else {
                    return "N/A";
                }
            },
        },
        {
            header: "Trạng thái",
            accessorKey: "status",
        },
        {
            header: "Ghi chú",
            accessorKey: "notes",

        },
        {
            header: "File minh chứng",
            accessorKey: "link",
            Cell: ({ cell }) => (
                <MyButtonViewPDF />
            ),
        },
    ], []);

    return (
        <MyButtonModal title="Chi tiết loại đề tài" disclosure={disclosure} modalSize={1500} color="#ff7400" label="Cập nhật tiến độ">
            <MyFieldset title="Danh sách theo dõi đăng ký bảo hộ" >
                <MyDataTable
                    columns={columns}
                    data={mockData || []}
                    renderTopToolbarCustomActions={() => {
                        return (
                            <>
                                <MyButton crudType="export" />
                            </>
                        )
                    }}
                    renderRowActions={({ row }) => {
                        return (
                            <MyCenterFull>
                                <ProtectionRegistrationUpdate values={row.original} />
                            </MyCenterFull>
                        )
                    }}
                />
            </MyFieldset>
        </MyButtonModal>
    )
}


export const mockData: ProtectionRegistration[] = [
    {
        id: 1,
        code: "GDD-20240-001A",
        projectCode: "DAQT-2024-001",
        name: "Khởi động & phân tích yêu cầu",
        startDate: "2024-09-01",
        endDate: "2024-10-31",
        completionDate: "2024-10-25",
        status: "Đã hoàn thành",
        notes: "",
        link: "",
    },
    {
        id: 2,
        code: "GDD-20240-001B",
        projectCode: "DAQT-2024-001",
        name: "Thu tập & tiền xử lí dữ liệu",
        startDate: "2024-11-01",
        endDate: "2025-02-28",
        completionDate: undefined,
        status: "Đang triển khai",
        notes: "",
        link: "",
    },
    {
        id: 3,
        code: "GDD-20240-001C",
        projectCode: "DAQT-2024-001",
        name: "Phát triển mô hình AI",
        startDate: "2025-03-01",
        endDate: "2026-06-30",
        completionDate: undefined,
        status: "Sắp bắt đầu",
        notes: "",
        link: "",
    },
    {
        id: 4,
        code: "GDD-20240-001D",
        projectCode: "DAQT-2024-001",
        name: "Thử nghiệm và đánh giá",
        startDate: "2026-07-01",
        endDate: "2027-03-31",
        completionDate: undefined,
        status: "Sắp bắt đầu",
        notes: "",
        link: "",
    },
    {
        id: 5,
        code: "GDD-20240-001E",
        projectCode: "DAQT-2024-001",
        name: "Tổng kết & công bố kết quả",
        startDate: "2027-04-01",
        endDate: "2027-08-31",
        completionDate: undefined,
        status: "Sắp bắt đầu",
        notes: "",
        link: "",
    },

];
