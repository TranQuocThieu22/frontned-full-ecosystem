// src/modules-features/admin/e7hpvpesjf/F_e7hpvpesjf_TuyenChayModal.tsx
'use client';

import { Modal, Anchor, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MyFlexColumn, MyTextInput, MyNumberInput, MySelect, MyDateInput, MyTextArea, MyButton, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { useForm } from "@mantine/form";
import { useMemo, useState } from "react";
import { MRT_ColumnDef } from "mantine-react-table";
import F_e7hpvpesjf_DeleteTuyenChay from "./F_e7hpvpesjf_DeleteTuyenChay";

interface TuyenChayModalProps {
    tuyenChay: string;
}

interface TuyenChayFormValues {
    bienSoXe: string;
    loaiXe: string;
    soGhe: number;
    trangThai: string;
    ngayGanTuyen: Date | null;
    tuyenChay: string;
    ghiChu: string;
}

interface TuyenChayRecord {
    id: number;
    bienSoXe: string;
    loaiXe: string;
    soGhe: number;
    trangThai: string;
    ngayGanTuyen: string;
    tuyenChay: string;
    ghiChu: string;
}

const trangThaiSelectData = [
    { label: "Đang hoạt động", value: "Đang hoạt động" },
    { label: "Đang bảo trì", value: "Đang bảo trì" },
    { label: "Dừng hoạt động", value: "Dừng hoạt động" }
];

const tuyenChaySelectData = [
    { label: "Thủ Đức - Quận 2-Quận 9", value: "Thủ Đức - Quận 2-Quận 9" },
    { label: "Quận 1 - Bình Thạnh", value: "Quận 1 - Bình Thạnh" },
    { label: "Bến Thành - Suối Tiên", value: "Bến Thành - Suối Tiên" },
    { label: "Bến Xe Miền Tây - Đại học Quốc Gia", value: "Bến Xe Miền Tây - Đại học Quốc Gia" },
];

const mockTuyenChayData: TuyenChayRecord[] = [
    {
        id: 1,
        bienSoXe: '50A-45862',
        loaiXe: 'Bus',
        soGhe: 12,
        trangThai: 'Đang hoạt động',
        ngayGanTuyen: '15/02/2025',
        tuyenChay: 'Thủ Đức - Quận 2-Quận 9',
        ghiChu: 'Tuyến hoạt động buổi sáng 5:00-12:00'
    },
    {
        id: 2,
        bienSoXe: '50A-45862',
        loaiXe: 'Bus',
        soGhe: 12,
        trangThai: 'Đang hoạt động',
        ngayGanTuyen: '10/11/2024',
        tuyenChay: 'Quận 1 - Bình Thạnh',
        ghiChu: 'Tuyến hoạt động buổi chiều 13:00-20:00'
    }
];

export default function F_e7hpvpesjf_TuyenChayModal({ tuyenChay }: TuyenChayModalProps) {
    const [opened, handlers] = useDisclosure(false);
    const [records, setRecords] = useState<TuyenChayRecord[]>(mockTuyenChayData);

    const form = useForm<TuyenChayFormValues>({
        initialValues: {
            bienSoXe: '50A-45862',
            loaiXe: 'Bus',
            soGhe: 12,
            trangThai: 'Đang hoạt động',
            ngayGanTuyen: new Date(),
            tuyenChay: tuyenChay,
            ghiChu: 'Tuyến hoạt động buổi sáng 5:00-12:00, buổi chiều 13:00-20:00.'
        },
        validate: {
            bienSoXe: (value) => value ? null : 'Không được để trống',
            loaiXe: (value) => value ? null : 'Không được để trống',
            soGhe: (value) => {
                if (value === undefined || value === null) return 'Không được để trống';
                if (value < 0) return 'Số chỗ phải lớn hơn hoặc bằng 0';
                return null;
            },
            ngayGanTuyen: (value) => value ? null : 'Không được để trống',
            tuyenChay: (value) => value ? null : 'Không được để trống'
        }
    });

    const handleSubmit = (values: TuyenChayFormValues) => {
        console.log(values);
        handlers.close();
    };

    const handleDelete = (id: number) => {
        setRecords(prev => prev.filter(record => record.id !== id));
    };

    const columns = useMemo<MRT_ColumnDef<TuyenChayRecord>[]>(() => [
        {
            accessorKey: 'bienSoXe',
            header: 'Biển số xe',
        },
        {
            accessorKey: 'loaiXe',
            header: 'Loại xe',
        },
        {
            accessorKey: 'soGhe',
            header: 'Số chỗ',
        },
        {
            accessorKey: 'trangThai',
            header: 'Trạng thái',
        },
        {
            accessorKey: 'ngayGanTuyen',
            header: 'Ngày gán tuyến',
        },
        {
            accessorKey: 'tuyenChay',
            header: 'Tuyến chạy',
        },
        {
            accessorKey: 'ghiChu',
            header: 'Ghi chú',
        },
    ], []);

    return (
        <>
            <Anchor onClick={handlers.open} underline="hover" size="sm">
                {tuyenChay}
            </Anchor>

            <Modal
                size="90%"
                title="Chi tiết tuyến chạy"
                opened={opened}
                onClose={handlers.close}
            >
                <MyFlexColumn>
                    <form onSubmit={form.onSubmit(handleSubmit)}>
                        <MyTextInput
                            label="Biển số xe"
                            withAsterisk
                            {...form.getInputProps("bienSoXe")}
                        />
                        <MyTextInput
                            label="Loại xe"
                            {...form.getInputProps("loaiXe")}
                        />
                        <MyNumberInput
                            label="Số chỗ"
                            withAsterisk
                            {...form.getInputProps("soGhe")}
                        />
                        <MySelect
                            data={trangThaiSelectData}
                            label="Trạng thái"
                            {...form.getInputProps("trangThai")}
                        />
                        <MyDateInput
                            label="Ngày gán tuyến"
                            {...form.getInputProps("ngayGanTuyen")}
                        />
                        <MySelect
                            data={tuyenChaySelectData}
                            label="Tuyến chạy"
                            {...form.getInputProps("tuyenChay")}
                        />
                        <MyTextArea
                            label="Ghi chú"
                            {...form.getInputProps("ghiChu")}
                        />

                        <Group justify="flex-end" mt="md">
                            <MyButton type="submit" color="blue">
                                Lưu
                            </MyButton>
                        </Group>
                    </form>

                    <MyFieldset title="Lịch sử tuyến chạy">
                        <MyDataTable
                            columns={columns}
                            data={records}
                            enableRowSelection={true}
                            enableRowNumbers={true}
                            renderRowActions={({ row }) => (
                                <F_e7hpvpesjf_DeleteTuyenChay
                                    id={row.original.id}
                                    onDelete={handleDelete}
                                />
                            )}
                        />
                    </MyFieldset>
                </MyFlexColumn>
            </Modal>
        </>
    );
}