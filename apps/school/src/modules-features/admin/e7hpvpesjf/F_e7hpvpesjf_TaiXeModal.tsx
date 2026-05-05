// src/modules-features/admin/e7hpvpesjf/F_e7hpvpesjf_TaiXeModal.tsx
'use client';

import { Modal, Anchor, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MyFlexColumn, MyTextInput, MyNumberInput, MySelect, MyDateInput, MyTextArea, MyButton, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { useForm } from "@mantine/form";
import { useMemo, useState } from "react";
import { MRT_ColumnDef } from "mantine-react-table";
import F_e7hpvpesjf_DeleteTaiXe from "./F_e7hpvpesjf_DeleteTaiXe";

interface TaiXeModalProps {
    taiXe: string;
}

interface TaiXeFormValues {
    bienSoXe: string;
    loaiXe: string;
    soGhe: number;
    trangThai: string;
    ngayPhanCong: Date | null;
    taiXe: string;
    ghiChu: string;
}

interface TaiXeRecord {
    id: number;
    bienSoXe: string;
    loaiXe: string;
    soGhe: number;
    trangThai: string;
    ngayPhanCong: string;
    taiXe: string;
    ghiChu: string;
}

const trangThaiSelectData = [
    { label: "Đang hoạt động", value: "Đang hoạt động" },
    { label: "Đang bảo trì", value: "Đang bảo trì" },
    { label: "Dừng hoạt động", value: "Dừng hoạt động" }
];

// Mock data for driver search
const taiXeSelectData = [
    { label: 'Nguyễn Văn A', value: 'Nguyễn Văn A' },
    { label: 'Trần Văn B', value: 'Trần Văn B' },
    { label: 'Lê Thị C', value: 'Lê Thị C' },
    { label: 'Phạm Văn D', value: 'Phạm Văn D' },
    { label: 'Đỗ Thị E', value: 'Đỗ Thị E' },
    { label: 'Tô Ngọc Bảo', value: 'Tô Ngọc Bảo' },
];

const mockTaiXeData: TaiXeRecord[] = [
    {
        id: 1,
        bienSoXe: '50A-45862',
        loaiXe: 'Bus',
        soGhe: 12,
        trangThai: 'Đang hoạt động',
        ngayPhanCong: '15/02/2025',
        taiXe: 'Nguyễn Văn A',
        ghiChu: 'Tài xế chuyên tuyến buổi sáng'
    },
    {
        id: 2,
        bienSoXe: '50A-45862',
        loaiXe: 'Bus',
        soGhe: 12,
        trangThai: 'Đang hoạt động',
        ngayPhanCong: '10/11/2024',
        taiXe: 'Trần Văn B',
        ghiChu: 'Tài xế chuyên tuyến buổi chiều'
    }
];

export default function F_e7hpvpesjf_TaiXeModal({ taiXe }: TaiXeModalProps) {
    const [opened, handlers] = useDisclosure(false);
    const [records, setRecords] = useState<TaiXeRecord[]>(mockTaiXeData);

    const form = useForm<TaiXeFormValues>({
        initialValues: {
            bienSoXe: '50A-45862',
            loaiXe: 'Bus',
            soGhe: 12,
            trangThai: 'Đang hoạt động',
            ngayPhanCong: new Date(),
            taiXe: taiXe,
            ghiChu: 'Tài xế chuyên tuyến buổi sáng 5:00-12:00'
        },
        validate: {
            bienSoXe: (value) => value ? null : 'Không được để trống',
            loaiXe: (value) => value ? null : 'Không được để trống',
            soGhe: (value) => {
                if (value === undefined || value === null) return 'Không được để trống';
                if (value < 0) return 'Số chỗ phải lớn hơn hoặc bằng 0';
                return null;
            },
            ngayPhanCong: (value) => value ? null : 'Không được để trống',
            taiXe: (value) => value ? null : 'Không được để trống'
        }
    });

    const handleSubmit = (values: TaiXeFormValues) => {
        console.log(values);
        handlers.close();
    };

    const handleDelete = (id: number) => {
        setRecords(prev => prev.filter(record => record.id !== id));
    };

    const columns = useMemo<MRT_ColumnDef<TaiXeRecord>[]>(() => [
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
            accessorKey: 'ngayPhanCong',
            header: 'Ngày phân công',
        },
        {
            accessorKey: 'taiXe',
            header: 'Tài xế',
        },
        {
            accessorKey: 'ghiChu',
            header: 'Ghi chú',
        },
    ], []);

    return (
        <>
            <Anchor onClick={handlers.open} underline="hover" size="sm">
                {taiXe}
            </Anchor>

            <Modal
                size="90%"
                title="Chi tiết phân công tài xế"
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
                            label="Ngày phân công"
                            {...form.getInputProps("ngayPhanCong")}
                        />
                        <MySelect
                            data={taiXeSelectData}
                            label="Tài xế"
                            placeholder="Tìm kiếm tài xế"
                            searchable
                            {...form.getInputProps("taiXe")}
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

                    <MyFieldset title="Danh sách phân công tài xế lái xe">
                        <MyDataTable
                            columns={columns}
                            data={records}
                            enableRowSelection={true}
                            enableRowNumbers={true}
                            renderRowActions={({ row }) => (
                                <F_e7hpvpesjf_DeleteTaiXe
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