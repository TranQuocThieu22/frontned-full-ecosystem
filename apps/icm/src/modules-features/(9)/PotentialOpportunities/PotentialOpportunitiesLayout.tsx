'use client'
import { useForm } from "@mantine/form";
import { AQButtonCreateByImportFile, MyButton, MyCenterFull, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import PotentialOpportunitiesCreate from "./PotentialOpportunitiesCreate";
import PotentialOpportunitiesDelete from "./PotentialOpportunitiesDelete";
import PotentialOpportunitiesUpdate from "./PotentialOpportunitiesUpdate";

export interface CollaborationOpportunity {
    id: number;
    code: string;
    title: string;
    type: string;
    field: string;
    potentialPartner: string;
    startDate: string;
    internalManager: string;
    status: string;
    notes: string;
}

export default function PotentialOpportunitiesLayout() {

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    const columns = useMemo<MRT_ColumnDef<CollaborationOpportunity>[]>(() => [
        {
            header: "Mã Cơ hội",
            accessorKey: "code",
        },
        {
            header: "Tên Cơ hội / Ý tưởng",
            accessorKey: "title",
        },
        {
            header: "Loại Cơ hội",
            accessorKey: "type",
        },
        {
            header: "Lĩnh vực",
            accessorKey: "field",
        },
        {
            header: "Đối tác Tiềm năng (Mã DT FK)",
            accessorKey: "potentialPartner",
        },
        {
            header: "Ngày Phát sinh",
            accessorKey: "startDate",
            // accessorFn: (row) => utils_date_dateToDDMMYYYString(new Date(row.startDate)),
        },
        {
            header: "Người Phụ Trách (Nội bộ)",
            accessorKey: "internalManager",
        },
        {
            header: "Trạng thái Cơ hội",
            accessorKey: "status",
        },
        {
            header: "Ghi chú",
            accessorKey: "notes",
        },
    ], []);


    return (
        <MyFieldset title="Danh sách cơ hội tiềm năng" >
            <MyDataTable
                enableRowSelection
                enableRowNumbers={false}
                columns={columns}
                data={mockOpportunities || []}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <PotentialOpportunitiesCreate />
                            <AQButtonCreateByImportFile onSubmit={() => { }} form={form_multiple} />
                            <MyButton crudType="export" />
                            <MyButton crudType="delete">Xóa</MyButton>
                        </>
                    )
                }}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <PotentialOpportunitiesUpdate values={row.original} />
                            <PotentialOpportunitiesDelete id={row.original.id || 0} code={row.original.code} />
                        </MyCenterFull>
                    )
                }}
            />
        </MyFieldset>
    )
}


export const mockOpportunities: CollaborationOpportunity[] = [
    {
        id: 1,
        code: "CH-2025-001",
        title: "Nghiên cứu ứng dụng AI trong chẩn đoán ung thư",
        type: "Nghiên cứu",
        field: "Y sinh; Trí tuệ nhân tạo",
        potentialPartner: "DTQT-002 (NUS)",
        startDate: "2025-01-10",
        internalManager: "GV005 - TS. Trần Bình",
        status: "Đang thảo luận",
        notes: "Thảo luận ban đầu với GS.Lee từ NUS.",
    },
    {
        id: 2,
        code: "CH-2025-002",
        title: "Chương trình trao đổi sinh viên kỹ thuật",
        type: "Trao đổi sinh viên",
        field: "Kỹ thuật",
        potentialPartner: "DTQT-003 (Siemens AG)",
        startDate: "2025-02-01",
        internalManager: "CB010 - ThS. Lê Hoa",
        status: "Đã gửi đề xuất",
        notes: "Đã gửi đề xuất chương trình 6 tháng.",
    },
    {
        id: 3,
        code: "CH-2025-003",
        title: "Hợp tác phát triển vật liệu siêu nhẹ",
        type: "Nghiên cứu & Chuyển giao",
        field: "Khoa học vật liệu; Kỹ thuật nano",
        potentialPartner: "DTQT-006 (MIT)",
        startDate: "2025-03-05",
        internalManager: "GV015 - PGS. Lê Anh",
        status: "Đang tìm hiểu",
        notes: "Ý tưởng từ hội thảo quốc tế.",
    },
];
