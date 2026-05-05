import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { AQButtonCreateByImportFile, AQButtonExportData, MyButtonModal, MyCenterFull, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import ProjectPlanDetailCreate from "./ProjectPlanDetailCreate";
import ProjectPlanDetailDelete from "./ProjectPlanDetailDelete";
import ProjectPlanDetailDeleteList from "./ProjectPlanDetailDeleteList";
import ProjectPlanDetailUpdate from "./ProjectPlanDetailUpdate";


export default function ProjectPlanDetailTable() {
    const disc = useDisclosure();
    const form = useForm<any>({
        initialValues: {}
    });
    const query = useQuery<I_ProjectPlanDetailTable[]>({
        queryKey: ['ProjectPlanDetailTableQuery'],
        queryFn: async () => projectPlanDetailMockData ?? []
    });

    const columns = useMemo<MRT_ColumnDef<I_ProjectPlanDetailTable>[]>(() => [
        { header: "Mã Giai đoạn", accessorKey: "code" },
        { header: "Mã Dự án (FK)", accessorKey: "projectCode" },
        { header: "Tên Giai đoạn", accessorKey: "name" },
        {
            header: "Ngày bắt đầu dự kiến",
            accessorFn: row => row.startDate ? utils_date_dateToDDMMYYYString(row.startDate) : "",
            id: "startDate"
        },
        {
            header: "Ngày kết thúc dự kiến",
            accessorFn: row => row.endDate ? utils_date_dateToDDMMYYYString(row.endDate) : "",
            id: "endDate"
        },
        { header: "Phụ trách", accessorKey: "manager" }
    ], []);

    const exportConfig = {
        fields: [
            { fieldName: "code", header: "Mã Giai đoạn" },
            { fieldName: "projectCode", header: "Mã Dự án (FK)" },
            { fieldName: "name", header: "Tên Giai đoạn" },
            { fieldName: "startDate", header: "Ngày bắt đầu dự kiến" },
            { fieldName: "endDate", header: "Ngày kết thúc dự kiến" },
            { fieldName: "manager", header: "Phụ trách" }
        ]
    };


    return (
        <MyButtonModal title="Chi tiết loại đề tài" modalSize={"90%"} disclosure={disc} label="Lập kế hoạch" >
            <MyFieldset title="Danh sách theo dõi đăng ký bảo hộ">
                <MyDataTable
                    isLoading={query.isLoading}
                    isError={query.isError}
                    enableRowSelection={true}
                    enableRowNumbers={false}
                    exportAble={false}
                    columns={columns}
                    data={query.data || []}
                    renderTopToolbarCustomActions={({ table }) => (
                        <MyCenterFull>
                            <ProjectPlanDetailCreate />
                            <AQButtonCreateByImportFile onSubmit={() => { }} form={form} />
                            <AQButtonExportData
                                
                                objectName="DanhSachTheoDoiDangKyBaoHo"
                                data={query.data ?? []}
                                exportConfig={exportConfig} />
                            <ProjectPlanDetailDeleteList values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
                        </MyCenterFull>
                    )}
                    renderRowActions={({ row }) => (
                        <MyCenterFull>
                            <ProjectPlanDetailUpdate values={row.original} />
                            <ProjectPlanDetailDelete id={row.original.code ?? ""} />
                        </MyCenterFull>
                    )}
                />
            </MyFieldset>
        </MyButtonModal>
    );
}

export interface I_ProjectPlanDetailTable {
    code: string;            // Mã Giai đoạn
    projectCode: string;     // Mã Dự án (FK)
    name: string;            // Tên Giai đoạn
    startDate?: Date;        // Ngày bắt đầu dự kiến
    endDate?: Date;          // Ngày kết thúc dự kiến
    manager: string;         // Phụ trách
}

const projectPlanDetailMockData: I_ProjectPlanDetailTable[] = [
    {
        code: "GĐ-2024-001A",
        projectCode: "DAQT-2024-001",
        name: "Khởi động & Phân tích yêu cầu",
        startDate: new Date("2024-09-01"),
        endDate: new Date("2024-10-31"),
        manager: "Tô Ngọc Lan"
    },
    {
        code: "GĐ-2024-001B",
        projectCode: "DAQT-2024-001",
        name: "Thu thập & Tiền xử lý dữ liệu",
        startDate: new Date("2024-11-01"),
        endDate: new Date("2025-02-28"),
        manager: "Tô Ngọc Lan"
    },
    {
        code: "GĐ-2024-001C",
        projectCode: "DAQT-2024-001",
        name: "Phát triển mô hình AI",
        startDate: new Date("2025-03-01"),
        endDate: new Date("2026-06-30"),
        manager: "Tô Ngọc Lan"
    },
    {
        code: "GĐ-2024-001D",
        projectCode: "DAQT-2024-001",
        name: "Thử nghiệm & Đánh giá",
        startDate: new Date("2026-07-01"),
        endDate: new Date("2027-03-31"),
        manager: "Tô Ngọc Lan"
    },
    {
        code: "GĐ-2024-001E",
        projectCode: "DAQT-2024-001",
        name: "Tổng kết & Công bố kết quả",
        startDate: new Date("2027-04-01"),
        endDate: new Date("2027-08-31"),
        manager: "Tô Ngọc Lan"
    }
];

