'use client'
import MySelect from "@/components/Combobox/Select/MySelect";
import { Checkbox, Fieldset, Group } from "@mantine/core";
import { useState } from "react";

export default function F_i47273jqpi_ViewCondition() {
    const conditionState = useState<string | null>('Giảng viên')
    return (
        <Fieldset legend="Điều kiện xem thời khóa biểu">
            <Group justify="space-between" align="end">
                <Group>
                    <MySelect label="Chọn đối tượng" data={['Giảng viên', 'Lớp', 'Phòng', 'Học viên']} value={conditionState[0]} onChange={conditionState[1]} />
                    {conditionState[0] === 'Giảng viên' && <MySelect searchable label="Giảng viên" data={giangVienData} />}
                    {conditionState[0] === 'Lớp' && <MySelect searchable label="Lớp" data={lopData} />}
                    {conditionState[0] === 'Phòng' && <MySelect searchable label="Phòng" data={phongData} />}
                    {conditionState[0] === 'Học viên' && <MySelect searchable label="Học viên" data={hocVienData} />}

                    {/* <MySelect label="Chọn tuần" data={tuanData} /> */}
                </Group>
                <Group>
                    <Checkbox label="Ẩn chủ nhật" />
                    <Checkbox label="Ẩn tối" />
                </Group>
            </Group>
        </Fieldset>
    )
}
const giangVienData = [
    { value: '1', label: 'KHNN065- Nguyễn Xuân Tiến' },
    { value: '2', label: 'TDMU048- Bùi Đức Anh' },
    { value: '3', label: 'CNTT026- Võ Thị Diễm Hương' },
    { value: '4', label: 'CNTT030- Nguyễn Thế Bảo' },
];

const lopData = [
    { value: '1', label: 'Lớp 1' },
    { value: '2', label: 'Lớp 2' },
    { value: '3', label: 'Lớp 3' },
    { value: '4', label: 'Lớp 4' },
];

const phongData = [
    { value: '1', label: 'Phòng 101' },
    { value: '2', label: 'Phòng 102' },
    { value: '3', label: 'Phòng 103' },
    { value: '4', label: 'Phòng 104' },
];
const hocVienData = [
    { value: '1', label: 'Học viên 1' },
    { value: '2', label: 'Học viên 2' },
    { value: '3', label: 'Học viên 3' },
    { value: '4', label: 'Học viên 4' },
];