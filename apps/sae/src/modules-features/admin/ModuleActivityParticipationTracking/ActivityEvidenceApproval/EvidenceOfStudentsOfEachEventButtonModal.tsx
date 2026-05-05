'use client';
import { Button, Divider, Group, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import ApproveEvidenceButtonModal from "./ApproveEvidenceButtonModal";
import { IEvidenceOfStudent } from "./Interfaces/IEvidenceOfStudent";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";

interface Props {
    standardName: string;
    standardCode: string;
    eventName?: string;
    eventCode?: string;
}

export default function EvidenceOfStudentsOfEachEventButtonModal({
    standardName = "D1 - Đánh giá về ý thức tham gia hoạt động học tập",
    standardCode = "DIEU1",
    eventName = "Không vi phạm quy định tổ chức thi",
    eventCode = "HD001"
}: Props) {
    const [opened, { open, close }] = useDisclosure();

    const columns = useMemo<MRT_ColumnDef<IEvidenceOfStudent>[]>(() => [
        {
            accessorKey: 'studentCode',
            header: 'Mã sinh viên',
        },
        {
            accessorKey: 'fullName',
            header: 'Họ tên',
        },
        {
            accessorKey: 'classCode',
            header: 'Mã lớp',
        },
        {
            accessorKey: 'facultyCode',
            header: 'Mã khoa',
        },
        {
            accessorKey: 'points',
            header: 'Điểm',
        },
        {
            accessorKey: 'path',
            header: 'Minh Chứng',
        },
        {
            accessorKey: 'status',
            header: 'Trạng thái',
            Cell: ({ row }) => {
                return row.original.status ? "Duyệt" : "Không Duyệt";
            }
        },
        {
            accessorKey: 'notes',
            header: 'Ghi chú duyệt',
        },
    ], []);

    const exportConfig = {
        fields: [
            { fieldName: "studentCode", header: "Mã sinh viên" },
            { fieldName: "fullName", header: "Họ tên" },
            { fieldName: "classCode", header: "Mã lớp" },
            { fieldName: "facultyCode", header: "Mã khoa" },
            { fieldName: "points", header: "Điểm" },
            {
                fieldName: "status",
                header: "Trạng thái",
                valueGetter: (item: IEvidenceOfStudent) => item.status ? "Duyệt" : "Không Duyệt"
            },
            { fieldName: "notes", header: "Ghi chú duyệt" },
        ]
    };

    const formattedEventName = `${eventCode} - ${eventName}`;

    return (
        <>
            <Button
                onClick={open}
                variant="transparent"
                color="blue"
            >
                Duyệt
            </Button>
            <Modal
                opened={opened}
                onClose={close}
                title="Danh sách sinh viên tham gia"
                size="100%"
                centered
            >
                <CustomFlexColumn gap={'xs'}>
                    <Text fw={500}>Điều: {standardCode} - {standardName}</Text>
                    <Text>Hoạt động: {formattedEventName}</Text>
                </CustomFlexColumn>

                <Divider my="sm" />

                <CustomFieldset title="Danh sách điểm rèn luyện quy đổi của sinh viên">
                    <CustomDataTable
                        data={mockDataEvidenceOfStudents}
                        renderTopToolbarCustomActions={() => (
                            <Group>
                                <AQButtonExportData

                                    objectName="dsdiemquydoisinhvien"
                                    data={mockDataEvidenceOfStudents}
                                    exportConfig={exportConfig}
                                />
                            </Group>
                        )}
                        columns={columns}
                        enablePagination
                        enableColumnFilters={false}
                        enableGlobalFilter={false}
                        enableRowNumbers
                        renderRowActions={({ row }) => (
                            <CustomCenterFull>
                                <ApproveEvidenceButtonModal
                                    eventId={row.original.id}
                                    isApprove={row.original.status}
                                />
                            </CustomCenterFull>
                        )}
                    />
                </CustomFieldset>
            </Modal >
        </>
    );
}


const mockDataEvidenceOfStudents: IEvidenceOfStudent[] = [
    {
        id: 1,
        studentCode: "SV00001",
        fullName: "Tô Văn Ba",
        classCode: "IT2401",
        facultyCode: "CNTT",
        points: 15,
        path: "",
        status: true,
        notes: ""
    },
    {
        id: 2,
        studentCode: "SV00002",
        fullName: "Tô Văn Hai",
        classCode: "IT2401",
        facultyCode: "CNTT",
        points: 15,
        path: "",
        status: true,
        notes: ""
    },
    {
        id: 3,
        studentCode: "SV00003",
        fullName: "Tô Văn Một",
        classCode: "IT2401",
        facultyCode: "CNTT",
        points: 15,
        path: "",
        status: true,
        notes: ""
    },
    {
        id: 4,
        studentCode: "SV00004",
        fullName: "Tô Văn Năm",
        classCode: "IT2401",
        facultyCode: "CNTT",
        points: 15,
        path: "",
        status: true,
        notes: ""
    },
    {
        id: 5,
        studentCode: "SV00005",
        fullName: "Tô Văn Sáu",
        classCode: "IT2401",
        facultyCode: "CNTT",
        points: 15,
        path: "",
        status: true,
        notes: ""
    },
    {
        id: 6,
        studentCode: "SV00006",
        fullName: "Tô Văn Bảy",
        classCode: "IT2401",
        facultyCode: "CNTT",
        points: 15,
        path: "",
        status: false,
        notes: "File chưa đúng"
    }
];
