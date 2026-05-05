'use client';
import { Grid } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import {
    MyButton,
    MyButtonModal,
    MyDateInput,
    MyFileInput,
    MyNumberInput,
    MySelect,
    MyTextArea
} from "aq-fe-framework/components";
import { IF9_4_5UpdateTrackProgressButtonModal } from "./F9_4_5UpdateTrackProgressButtonModal";
import { dataMockProgressStatus } from "./mockData";
export default function F9_4_5UpdateOfTrackProgressModal({values}: { values: IF9_4_5UpdateTrackProgressButtonModal }) {
    const disc = useDisclosure();
    const form = useForm<IF9_4_5UpdateTrackProgressButtonModal>({
        initialValues: {
            ...values
        },
        validate: {
            phaseCode: (value) => (value ? null : "Mã giai đoạn không được để trống"),
            numberOfPhase: (value) => (typeof value === 'number' && value > 0 ? null : "Số thứ tự giai đoạn phải lớn hơn 0"),
            phaseName: (value) => (value ? null : "Tên giai đoạn không được để trống"),
            responsibleMember: (value) => (value ? null : "Người chịu trách nhiệm chính không được để trống"),
            estimateStartDate: (value) => (value ? null : "Ngày bắt đầu dự kiến không được để trống"),
            estimateEndDate: (value) => (value ? null : "Ngày kết thúc dự kiến không được để trống"),
            percentageOfCompletion: (value) => (typeof value === 'number' && value >= 0 && value <= 100 ? null : "Tỷ lệ hoàn thành phải từ 0 đến 100"),
            actualEndDate: (value) => (value ? null : "Ngày kết thúc thực tế không được để trống"),
            progressNote: (value) => (value ? null : "Ghi chú tiến độ/Vướng mắc không được để trống"),
        },
    });
    return(
        <MyButtonModal label="Cập nhật" title="Chi tiết công việc"color="blue" modalSize={"70%"} disclosure={disc}>
            <Grid>
            <Grid.Col span={6}>
                <MySelect label="Trạng thái giai đoạn" data={dataMockProgressStatus} {...form.getInputProps("progressStatus")}></MySelect>
                <MyNumberInput label="% hoàn thành" {...form.getInputProps("percentageOfCompletion")}></MyNumberInput>
            </Grid.Col>
            <Grid.Col span={6}>
                <MyDateInput label ="Ngày kết thúc thực tế" {...form.getInputProps("actualEndDate")}></MyDateInput>
                <MyFileInput label="Tài liệu sản phẩm trung gian kèm file" {...form.getInputProps("fileAttachment")}></MyFileInput>
            </Grid.Col>
            <MyTextArea label="Ghi chú tiến độ/Vướng mắc" {...form.getInputProps("progressNote")}></MyTextArea>
            </Grid>
            <MyButton type="submit" fullWidth crudType="save">Lưu</MyButton>
        </MyButtonModal>
    )
}
