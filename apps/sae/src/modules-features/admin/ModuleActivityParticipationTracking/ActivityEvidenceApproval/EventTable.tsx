'use client';
import { Group, Tabs } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import EvidenceOfStudentsOfEachEventButtonModal from "./EvidenceOfStudentsOfEachEventButtonModal";
import { IEventViewModal } from "./Interfaces/IEventViewModal";
import { IStandardViewModal } from "./Interfaces/IStandardViewModal";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";


export default function EventTable() {
    const [selectedStandardId, setSelectedStandardId] = useState<string | null>(null);

    const standardQuery = useQuery<IStandardViewModal[]>({
        queryKey: [`Q_Standard_List`],
        queryFn: async () => [
            {
                id: 1,
                code: "DIEU1",
            },
            {
                id: 2,
                code: "DIEU2",
            },
            {
                id: 3,
                code: "DIEU3",
            },
            {
                id: 4,
                code: "DIEU4",
            }
        ]
    });

    const query = useQuery<IEventViewModal[]>({
        queryKey: [`Q_Event_List`, selectedStandardId],
        queryFn: async () => {
            if (selectedStandardId && selectedStandardId !== "null") {
                return mockDataEvent.filter(event => event.standardId === parseInt(selectedStandardId));
            }
            return mockDataEvent;
        }
    });

    const handleTabChange = (value: string | null) => {
        setSelectedStandardId(value);
    };


    const columns = useMemo<MRT_ColumnDef<IEventViewModal>[]>(() => [
        {
            header: "Điều",
            accessorKey: "code",
        },
        {
            header: "Hoạt động ngoài khóa",
            accessorKey: "name",
        },
        { header: "Đơn vị tổ chức", accessorKey: "hostName" },
        { header: "Đơn vị ghi nhận", accessorKey: "reviewedName" },
        { header: "Đơn vị công nhận", accessorKey: "completedName" },
        { header: "Địa điểm tổ chức", accessorKey: "addressName" },
        { header: "SLSV dự kiến", accessorKey: "quantity" },
        { header: "Điểm tối đa", accessorKey: "maxPoint" },
        { header: "Điểm tối trừ", accessorKey: "minusPoint" },
        { header: "Đối tượng SV", accessorKey: "facultyName" },
        {
            header: "Từ ngày",
            accessorKey: "startDate",
            size: 150,
            accessorFn: (row) => dateUtils.toDDMMYYYY(new Date(row.startDate!)),
        },
        {
            header: "Đến ngày",
            size: 150,
            accessorKey: "endDate",
            accessorFn: (row) => dateUtils.toDDMMYYYY(new Date(row.endDate!)),
        },
        {
            header: "SL sinh viên",
            accessorKey: "registered",
            size: 150,
        },
        {
            header: "SL đã kiểm tra",
            accessorKey: "checked",
            size: 150,
        },
        { header: "Người cập nhật", accessorKey: "modifiedFullName" },
        {
            header: "Ngày cập nhật",
            accessorKey: "modifiedWhen",
            accessorFn: (row) => dateUtils.toDDMMYYYY(new Date(row.modifiedWhen!)),
        }
    ], []);

    const exportConfig = {
        fields: [
            { fieldName: "code", header: "Điều" },
            { fieldName: "name", header: "Hoạt động ngoại khóa" },
            { fieldName: "hostName", header: "Đơn vị tổ chức" },
            { fieldName: "reviewedName", header: "Đơn vị ghi nhận" },
            { fieldName: "completedName", header: "Đơn vị công nhận" },
            { fieldName: "addressName", header: "Địa điểm tổ chức" },
            { fieldName: "quantity", header: "SLSV dự kiến" },
            { fieldName: "maxPoint", header: "Điểm tối đa" },
            { fieldName: "minusPoint", header: "Điểm tối trừ" },
        ]
    };

    if (query.isLoading || standardQuery.isLoading) return <CustomCenterFull>Đang tải dữ liệu...</CustomCenterFull>
    if (query.isError || standardQuery.isError) return <CustomCenterFull>Không có dữ liệu...</CustomCenterFull>

    return (
        <CustomFieldset title="Danh sách hoạt động ngoại khóa">
            <Tabs value={selectedStandardId} onChange={handleTabChange}>
                <Tabs.List>
                    <Tabs.Tab key="all" value={"null"}>Tất cả</Tabs.Tab>
                    {standardQuery.isSuccess && Array.isArray(standardQuery.data) &&
                        standardQuery.data.map((item, index) => (
                            <Tabs.Tab key={item.id} value={item.id ? item.id.toString() : ""} >
                                Điều {index + 1}
                            </Tabs.Tab>
                        ))}
                </Tabs.List>
            </Tabs>

            <CustomDataTable
                renderTopToolbarCustomActions={() => (
                    <Group>
                        <AQButtonExportData

                            objectName="hoatdongngoaikhoa"
                            data={query.data || []}
                            exportConfig={exportConfig}
                        />
                    </Group>
                )}
                initialState={{
                    showColumnFilters: false,
                    sorting: [{ id: "code", desc: false }],
                    columnVisibility: { "modifiedFullName": false, "modifiedWhen": false },
                    expanded: true,
                    columnPinning: {
                        right: ['registered', 'checked',],
                    },
                }}
                columns={columns}
                data={query.data || []}
                enableRowNumbers
                enableColumnFilters
                enableGlobalFilter
                enablePagination
                enableGrouping
                rowActionSize={120}
                renderRowActions={({ row }) => (
                    <CustomCenterFull>
                        <EvidenceOfStudentsOfEachEventButtonModal
                            standardName={row.original.standardName}
                            standardCode={row.original.standardCode}
                            eventName={row.original.name}
                            eventCode={row.original.code}
                        />
                    </CustomCenterFull>
                )}
            />
        </CustomFieldset>
    )
}



const mockDataEvent = [
    {
        id: 1,
        standardId: 1,
        standardCode: "Điều 1",
        standardName: "Ý thức tham gia học tập",
        code: "HD001",
        name: "Hiến máu nhân đạo",
        hostName: "Đoàn trường",
        reviewedName: "Đoàn trường",
        completedName: "Phòng Công tác sinh viên",
        addressName: "Hội trường A",
        quantity: 250,
        maxPoint: 15,
        minusPoint: 0,
        facultyName: "Toàn trường",
        startDate: "2025-02-01",
        endDate: "2025-02-05",
        registered: 23,
        checked: 23,
        modifiedFullName: "Nguyễn Văn A",
        modifiedWhen: "2025-01-15"
    },
    {
        id: 2,
        standardId: 1,
        standardCode: "Điều 1",
        standardName: "Ý thức tham gia học tập",
        code: "HD002",
        name: "Không vi phạm quy định tổ chức thi",
        hostName: "Đoàn trường",
        reviewedName: "Đoàn trường",
        completedName: "Phòng Công tác sinh viên",
        addressName: "",
        quantity: 250,
        maxPoint: 15,
        minusPoint: 0,
        facultyName: "Toàn trường",
        startDate: "2025-02-01",
        endDate: "2025-02-05",
        registered: 23,
        checked: 23,
        modifiedFullName: "Nguyễn Văn A",
        modifiedWhen: "2025-01-15"
    },
    {
        id: 3,
        standardId: 1,
        standardCode: "Điều 1",
        standardName: "Ý thức tham gia học tập",
        code: "HD003",
        name: "Không vi phạm pháp luật an toàn giao thông",
        hostName: "Đoàn trường",
        reviewedName: "Đoàn trường",
        completedName: "Phòng Công tác sinh viên",
        addressName: "",
        quantity: 250,
        maxPoint: 15,
        minusPoint: 0,
        facultyName: "Toàn trường",
        startDate: "2025-02-01",
        endDate: "2025-02-05",
        registered: 23,
        checked: 23,
        modifiedFullName: "Nguyễn Văn A",
        modifiedWhen: "2025-01-15"
    },
    {
        id: 4,
        standardId: 2,
        standardCode: "Điều 2",
        standardName: "Ý thức chấp hành nội quy, quy chế, quy định",
        code: "HD004",
        name: "Thực hiện nghĩa vụ đóng học phí",
        hostName: "Đoàn trường",
        reviewedName: "Đoàn trường",
        completedName: "Phòng Công tác sinh viên",
        addressName: "",
        quantity: 250,
        maxPoint: 15,
        minusPoint: 0,
        facultyName: "Toàn trường",
        startDate: "2025-02-01",
        endDate: "2025-02-05",
        registered: 23,
        checked: 23,
        modifiedFullName: "Nguyễn Văn A",
        modifiedWhen: "2025-01-15"
    },
    {
        id: 5,
        standardId: 2,
        standardCode: "Điều 2",
        standardName: "Ý thức chấp hành nội quy, quy chế, quy định",
        code: "HD005",
        name: "Tham gia buổi chào cờ đầu tuần",
        hostName: "Đoàn trường",
        reviewedName: "Đoàn trường",
        completedName: "Phòng Công tác sinh viên",
        addressName: "Sân trường",
        quantity: 1000,
        maxPoint: 10,
        minusPoint: 0,
        facultyName: "Toàn trường",
        startDate: "2025-02-01",
        endDate: "2025-02-05",
        registered: 950,
        checked: 930,
        modifiedFullName: "Nguyễn Văn A",
        modifiedWhen: "2025-01-15"
    },
    {
        id: 6,
        standardId: 3,
        standardCode: "Điều 3",
        standardName: "Ý thức tham gia các hoạt động chính trị, văn hóa",
        code: "HD006",
        name: "Tham gia hội thảo chuyên đề",
        hostName: "Khoa CNTT",
        reviewedName: "Khoa CNTT",
        completedName: "Phòng Công tác sinh viên",
        addressName: "Hội trường B",
        quantity: 150,
        maxPoint: 10,
        minusPoint: 0,
        facultyName: "Khoa CNTT",
        startDate: "2025-03-01",
        endDate: "2025-03-05",
        registered: 120,
        checked: 115,
        modifiedFullName: "Trần Thị B",
        modifiedWhen: "2025-02-15"
    },
    {
        id: 7,
        standardId: 4,
        standardCode: "Điều 4",
        standardName: "Ý thức công dân trong quan hệ cộng đồng",
        code: "HD007",
        name: "Tham gia hoạt động tình nguyện",
        hostName: "Đoàn trường",
        reviewedName: "Đoàn trường",
        completedName: "Phòng Công tác sinh viên",
        addressName: "Công viên thành phố",
        quantity: 200,
        maxPoint: 20,
        minusPoint: 0,
        facultyName: "Toàn trường",
        startDate: "2025-04-01",
        endDate: "2025-04-05",
        registered: 180,
        checked: 175,
        modifiedFullName: "Lê Văn C",
        modifiedWhen: "2025-03-15"
    }
];
