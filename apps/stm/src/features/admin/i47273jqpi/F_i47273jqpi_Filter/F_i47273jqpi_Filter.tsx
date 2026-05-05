'use client'
import MySelect from "@/components/Combobox/Select/MySelect";

import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import useS_Shared_ViewSchedule from "@/features/shared/ViewSchedule/useS_Shared_ViewSchedule";
import { Checkbox, Group } from "@mantine/core";
import { useState } from "react";
import { c_i47273jqpi_filterType } from "../S_i47273jqpi";
import SF_i47273jqpi_SelectCourseSection from "./SF_i47273jqpi_SelectCourseSection";
import SF_i47273jqpi_SelectLecurer from "./SF_i47273jqpi_SelectLecurer";
import SF_i47273jqpi_SelectRoom from "./SF_i47273jqpi_SelectRoom";

export default function F_i47273jqpi_Filter() {
    const conditionState = useState<string | null>('Giảng viên')
    const viewSchedule_store = useS_Shared_ViewSchedule()
    return (
        <MyFieldset title="Điều kiện xem thời khóa biểu">
            <Group justify="space-between" align="end">
                <Group>
                    <MySelect label="Chọn đối tượng" data={c_i47273jqpi_filterType} value={conditionState[0]} onChange={e => {
                        conditionState[1](e)
                        viewSchedule_store.setProperty("currentFilterType", e?.toString())
                    }} />
                    {conditionState[0] === 'Giảng viên' && (
                        <SF_i47273jqpi_SelectLecurer />
                    )}
                    {conditionState[0] === 'Lớp' && (
                        <SF_i47273jqpi_SelectCourseSection />
                    )}
                    {conditionState[0] === 'Phòng' && (
                        <SF_i47273jqpi_SelectRoom />
                    )}
                </Group>
                <Group>
                    {/* <Checkbox label="Ẩn chủ nhật" checked={store.state.anChuNhat} onChange={(e) => store.setProperty("anChuNhat", e.currentTarget.checked)} /> */}
                    <Checkbox label="Ẩn tối" />
                </Group>
            </Group>
        </MyFieldset>
    )
}


const lopData = [
    { value: '1', label: 'Lớp 1' },
    { value: '2', label: 'Lớp 2' },
    { value: '3', label: 'Lớp 3' },
    { value: '4', label: 'Lớp 4' },
];


const hocVienData = [
    { value: '1', label: 'Học viên 1' },
    { value: '2', label: 'Học viên 2' },
    { value: '3', label: 'Học viên 3' },
    { value: '4', label: 'Học viên 4' },
];