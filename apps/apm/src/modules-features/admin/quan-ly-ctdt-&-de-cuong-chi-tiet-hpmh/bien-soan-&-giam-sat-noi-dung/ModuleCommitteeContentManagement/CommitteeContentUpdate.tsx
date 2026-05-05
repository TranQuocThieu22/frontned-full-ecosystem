import { Center, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { AQButtonCreateByImportFile, AQButtonExportData, MyActionIconModal, MyButton, MyButtonViewPDF, MyDataTable } from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import CommitteeCompiledDocCreate from "./CommitteeCompiledDocCreate";
import CommitteeCompiledDocDelete from "./CommitteeCompiledDocDelete";
import CommitteeCompiledDocUpdate from "./CommitteeCompiledDocUpdate";

export default function CommitteeContentUpdate({ data }: { data: any }) {
    const formMultiple = useForm({
        initialValues: {

        },
    });

    const disclosure = useDisclosure(false);

    // fetch mockdata
    const compiledDocumentQuery = useQuery<I_CompiledDocumentTable[]>({
        queryKey: ["CompiledDocumentTableQuery"],
        queryFn: async () => compiledDocumentMockData ?? []
    });

    const columns = useMemo<MRT_ColumnDef<I_CompiledDocumentTable>[]>(() => [
        { header: "Mã tài liệu biên soạn", accessorKey: "id" },
        { header: "Tên tài liệu biên soạn", accessorKey: "name" },
        { header: "Ban Biên soạn liên quan", accessorKey: "relatedCommittee" },
        { header: "Phiên hiện tại", accessorKey: "version" },
        {
            header: "Ngày cập nhật gần nhất",
            accessorFn: row => utils_date_dateToDDMMYYYString(new Date(row.lastUpdate)),
            id: "lastUpdate"
        },
        { header: "Người cập nhật gần nhất", accessorKey: "lastUpdater" },
        { header: "Tiến độ hoàn thành (%)", accessorKey: "completion" },
        { header: "Báo cáo tiến độ/Ghi chú", accessorKey: "report" },
        { header: "Tài liệu đính kèm", accessorFn: row => (<Center><MyButtonViewPDF /></Center>) },
        { header: "Trạng thái nội dung", accessorKey: "status" },
    ], []);

    const exportConfig = {
        fields: [
            { fieldName: "id", header: "Mã tài liệu biên soạn" },
            { fieldName: "name", header: "Tên tài liệu biên soạn" },
            { fieldName: "relatedCommittee", header: "Ban Biên soạn liên quan" },
            { fieldName: "version", header: "Phiên hiện tại" },
            { fieldName: "lastUpdate", header: "Ngày cập nhật gần nhất" },
            { fieldName: "lastUpdater", header: "Người cập nhật gần nhất" },
            { fieldName: "completion", header: "Tiến độ hoàn thành (%)" },
            { fieldName: "report", header: "Báo cáo tiến độ/Ghi chú" },
            { fieldName: "status", header: "Trạng thái nội dung" },
        ]
    };

    if (compiledDocumentQuery.isLoading) {
        return <Center>Đang tải dữ liệu...</Center>;
    }
    if (compiledDocumentQuery.isError) {
        return <Center>Có lỗi đang xảy ra</Center>;
    }


    return (
        <MyActionIconModal
            crudType="update"
            onSubmit={() => { }}
            modalSize={"100%"} disclosure={disclosure}
            title="Danh sách tài liệu biên soạn"       >
            <MyDataTable
                columns={columns}
                data={compiledDocumentQuery.data!}
                enableRowSelection={false}
                enableRowNumbers={false}
                exportAble={false}
                renderTopToolbarCustomActions={() => (<>
                    <CommitteeCompiledDocCreate />
                    <AQButtonExportData
                        objectName="DanhSachTaiLieuBienSoan"
                        data={compiledDocumentQuery.data!}
                        exportConfig={exportConfig}
                    />
                    <AQButtonCreateByImportFile onSubmit={() => { }} form={formMultiple} />
                    <MyButton crudType="delete">Xóa</MyButton>
                </>)}
                renderRowActions={({ row }) => (
                    <Group justify="space-evenly">
                        <CommitteeCompiledDocUpdate data={row.original} />
                        <CommitteeCompiledDocDelete id={row.original.id} />
                    </Group>
                )}
            >

            </MyDataTable>

        </MyActionIconModal>
    )
}

export interface I_CompiledDocumentTable {
    id: string;                 // Mã tài liệu biên soạn
    name: string;               // Tên tài liệu biên soạn
    relatedCommittee: string;   // Ban Biên soạn liên quan
    version: string;            // Phiên hiện tại
    lastUpdate: Date;         // Ngày cập nhật gần nhất
    lastUpdater: string;        // Người cập nhật gần nhất
    completion: number;         // Tiến độ hoàn thành (%)
    report: string;             // Báo cáo tiến độ/Ghi chú
    status: string;             // Trạng thái nội dung
}

const compiledDocumentMockData: I_CompiledDocumentTable[] = [
    {
        id: "TDBS-QTKD-002",
        name: "Đề cương chi tiết học phần môn Quản trị chiến lược",
        relatedCommittee: "BBDCHP-QTKD-002",
        version: "V2.1",
        lastUpdate: new Date("2025-11-01 14:00"),
        lastUpdater: "ThS. Phạm Thị E",
        completion: 80,
        report: "Đã cập nhật nội dung về Digital Transformation: Đang bổ sung ví dụ thực tiễn.",
        status: "Đang biên soạn",
    },
    {
        id: "TDBS-QTKD-002",
        name: "Đề cương chi tiết học phần môn Quản trị chiến lược",
        relatedCommittee: "BBDCHP-QTKD-002",
        version: "V2.12",
        lastUpdate: new Date("2025-11-21 14:00"),
        lastUpdater: "ThS. Phạm Thị E",
        completion: 80,
        report: "Đã cập nhật nội dung về Digital Transformation: Đang bổ sung ví dụ thực tiễn.",
        status: "Chờ góp ý",
    },
    {
        id: "TDBS-QTKD-002",
        name: "Đề cương chi tiết học phần môn Quản trị chiến lược",
        relatedCommittee: "BBDCHP-QTKD-002",
        version: "V2.15",
        lastUpdate: new Date("2025-11-30 14:00"),
        lastUpdater: "ThS. Phạm Thị E",
        completion: 80,
        report: "Đã cập nhật nội dung về Digital Transformation: Đang bổ sung ví dụ thực tiễn.",
        status: "Đã hoàn thành bản nháp",
    }
];
