// src/modules-features/admin/lpoa7imbik/F_lpoa7imbik_LichTrinhModal.tsx
'use client';

import { Anchor, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
    AQButtonExportData,
    MyCenterFull,
    MyDataTable,
    MyFieldset,
    MyFlexColumn
} from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_lpoa7imbik_DeleteLichTrinh from "./F_lpoa7imbik_DeleteLichTrinh";
import F_lpoa7imbik_UpdateLichTrinh from "./F_lpoa7imbik_UpdateLichTrinh";

interface LichTrinhModalProps {
    lichTrinh: string;
}

interface LichTrinhFormValues {
    diemDon: string;
    gioDon: string;
}

interface LichTrinhRecord {
    id: number;
    diemDon: string;
    gioDon: string;
}

const mockLichTrinhData: LichTrinhRecord[] = [
    {
        id: 1,
        diemDon: 'Mega Market Thủ Đức',
        gioDon: '06:05'
    },
    {
        id: 2,
        diemDon: 'Khang Điền',
        gioDon: '06:15'
    },
    {
        id: 3,
        diemDon: 'Materize Home',
        gioDon: '06:25'
    },
    {
        id: 4,
        diemDon: 'Nam Long Home',
        gioDon: '06:45'
    },
    {
        id: 5,
        diemDon: 'Globle City', // Note: Transcribed as "Globle" as it appears in the image, not "Global"
        gioDon: '07:05'
    },
    {
        id: 6,
        diemDon: 'Bưng Ông Thoàn',
        gioDon: '07:15'
    },
    {
        id: 7,
        diemDon: 'Cầu Phú Long',
        gioDon: '07:25'
    }
];

export default function F_lpoa7imbik_LichTrinhModal({ lichTrinh }: LichTrinhModalProps) {
    const [opened, handlers] = useDisclosure(false);
    const [records, setRecords] = useState<LichTrinhRecord[]>(mockLichTrinhData);

    const handleDelete = (id: number) => {
        setRecords(prev => prev.filter(record => record.id !== id));
    };

    const handleUpdate = (id: number, values: LichTrinhFormValues) => {
        setRecords(prev => prev.map(record =>
            record.id === id ? { ...record, ...values } : record
        ));
    };

    // Export config
    const exportConfig = {
        fields: [
            {
                fieldName: "diemDon",
                header: "Điểm đón"
            },
            {
                fieldName: "gioDon",
                header: "Giờ đón"
            }
        ]
    };

    const columns = useMemo<MRT_ColumnDef<LichTrinhRecord>[]>(() => [
        {
            accessorKey: 'diemDon',
            header: 'Điểm đón',
        },
        {
            accessorKey: 'gioDon',
            header: 'Giờ đón',
        },
    ], []);

    return (
        <>
            <Anchor onClick={handlers.open} underline="hover" size="sm">
                {lichTrinh}
            </Anchor>

            <Modal
                size="xl"
                opened={opened}
                onClose={handlers.close}
            >
                <MyFlexColumn>
                    <MyFieldset title="Danh sách điểm đón">
                        <MyDataTable
                            columns={columns}
                            data={records}
                            enableRowSelection={true}
                            enableRowNumbers={true}
                            renderRowActions={({ row }) => (
                                <MyCenterFull>
                                    <F_lpoa7imbik_UpdateLichTrinh
                                        data={row.original}
                                        onUpdate={handleUpdate}
                                    />
                                    <F_lpoa7imbik_DeleteLichTrinh
                                        id={row.original.id}
                                        code={row.original.diemDon}
                                        onDelete={handleDelete}
                                    />
                                </MyCenterFull>
                            )}
                            renderTopToolbarCustomActions={() =>
                                <>
                                    <AQButtonExportData
                                        exportConfig={exportConfig}
                                        data={records}
                                        objectName={'Danh sách điểm đón'}
                                    />
                                </>
                            }
                        />
                    </MyFieldset>
                </MyFlexColumn>
            </Modal>
        </>
    );
}