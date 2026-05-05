'use client';

import { Modal, Anchor, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MyFlexColumn, MyTextInput, MyNumberInput, MySelect, MyDateInput, MyTextArea, MyButton, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { useForm } from "@mantine/form";
import { useMemo, useState } from "react";
import { MRT_ColumnDef } from "mantine-react-table";
import F_e7hpvpesjf_DeleteBaoTri from "./F_e7hpvpesjf_DeleteBaoTri";

interface LichBaoTriModalProps {
    lichBaoTri: string;
}

interface BaoTriFormValues {
    bienSoXe: string;
    loaiXe: string;
    soGhe: number;
    trangThai: string;
    ngayBaoTri: Date | null;
    ghiChu: string;
}

interface BaoTriRecord {
    id: number;
    bienSoXe: string;
    loaiXe: string;
    soGhe: number;
    trangThai: string;
    ngayBaoTri: string;
    ghiChu: string;
}

const trangThaiSelectData = [
    { label: "Đang hoạt động", value: "Đang hoạt động" },
    { label: "Đang bảo trì", value: "Đang bảo trì" },
    { label: "Dừng hoạt động", value: "Dừng hoạt động" }
];

const mockBaoTriData: BaoTriRecord[] = [
    {
        id: 1,
        bienSoXe: '50A-45862',
        loaiXe: 'Bus',
        soGhe: 12,
        trangThai: 'Đang bảo trì',
        ngayBaoTri: '15/02/2025',
        ghiChu: 'Bảo dưỡng định kỳ. Kiểm tra hệ thống phanh.'
    },
    {
        id: 2,
        bienSoXe: '50A-45862',
        loaiXe: 'Bus',
        soGhe: 12,
        trangThai: 'Đang hoạt động',
        ngayBaoTri: '10/11/2024',
        ghiChu: 'Thay dầu động cơ, vệ sinh máy lạnh.'
    }
];

export default function F_e7hpvpesjf_LichBaoTriModal({ lichBaoTri }: LichBaoTriModalProps) {
    const [opened, handlers] = useDisclosure(false);
    const [records, setRecords] = useState<BaoTriRecord[]>(mockBaoTriData);

    // Parse the date from the lichBaoTri string (format: DD/MM/YYYY)
    const parseDateFromString = (dateStr: string) => {
        if (!dateStr) return null;
        const [day, month, year] = dateStr.split('/').map(Number);

        if(!day || !month || !year) return null;
        return new Date(year, month - 1, day);
    };

    const form = useForm<BaoTriFormValues>({
        initialValues: {
            bienSoXe: '50A-45862',
            loaiXe: 'Bus',
            soGhe: 12,
            trangThai: 'Đang bảo trì',
            ngayBaoTri: parseDateFromString(lichBaoTri),
            ghiChu: 'Bảo dưỡng định kỳ. Kiểm tra hệ thống phanh, thay dầu động cơ, kiểm tra hệ thống điện và vệ sinh máy lạnh.'
        },
        validate: {
            bienSoXe: (value) => value ? null : 'Không được để trống',
            loaiXe: (value) => value ? null : 'Không được để trống',
            soGhe: (value) => {
                if (value === undefined || value === null) return 'Không được để trống';
                if (value < 0) return 'Số chỗ phải lớn hơn hoặc bằng 0';
                return null;
            },
            ngayBaoTri: (value) => value ? null : 'Không được để trống'
        }
    });

    const handleSubmit = (values: BaoTriFormValues) => {
        console.log(values);
        handlers.close();
    };

    const handleDelete = (id: number) => {
        setRecords(prev => prev.filter(record => record.id !== id));
    };

    const columns = useMemo<MRT_ColumnDef<BaoTriRecord>[]>(() => [
        {
            accessorKey: 'bienSoXe',
            header: 'Biển số xe',
        },
        {
            accessorKey: 'ngayBaoTri',
            header: 'Ngày bảo trì',
        },
        {
            accessorKey: 'ghiChu',
            header: 'Ghi chú',
        },
    ], []);

    return (
        <>
            <Anchor onClick={handlers.open} underline="hover" size="sm">
                {lichBaoTri}
            </Anchor>

            <Modal
                size="90%"
                title="Chi tiết bảo trì xe"
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
                            label="Ngày bảo trì"
                            {...form.getInputProps("ngayBaoTri")}
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

                    <MyFieldset title="Danh sách bảo trì xe">
                        <MyDataTable
                            columns={columns}
                            data={records}
                            enableRowSelection={true}
                            enableRowNumbers={true}
                            renderRowActions={({ row }) => (
                                <F_e7hpvpesjf_DeleteBaoTri
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