'use client'
import { SimpleGrid } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyActionIconUpdate, MyDateInput, MySelect, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { IInfoViewModel } from "./ReadStepReview";
import MyNumberInput from "@/components/Inputs/NumberInput/MyNumberInput";
export default function UpdateStepReview({ values }: { values: IInfoViewModel }) {
    const form = useForm<IInfoViewModel>({
        initialValues: values
    })

    return (
        <MyActionIconUpdate
            title="Chi tiết bước xét duyệt"
            form={form} onSubmit={() => { }}
            modalSize={"60%"}
        >
            <SimpleGrid cols={2}>
                <MyTextInput
                    label="Mã bước"
                    {...form.getInputProps("maBuocXetDuyet")}
                />

                <MySelect
                    label="Đơn vị phụt trách"
                    data={[
                        "Ban Giám hiệu/Lãnh đạo trường",
                        "Hội đồng tuyển sinh HTQT",
                        "Khoa/Viện chủ quản",
                        "Phòng HTQT",
                    ]}
                    {...form.getInputProps("donViPhuTrach")}
                />
                <MyNumberInput
                    label="Thứ tự"
                    {...form.getInputProps("thuTu")}
                />
                <MySelect
                    label="Loại tiêu chí"
                    defaultValue={"Tô Ngọc Lan"}
                    data={[
                        "Điểm/Nhận xét",
                        "Quyết định cuối cùng",
                    ]}
                    {...form.getInputProps("loaiTieuChi")}
                />
                <MyTextInput label="Tên bước" {...form.getInputProps("tenBuocXetDuyet")} />
                <MySelect label="Thang điểm" data={[
                    "10",
                    "100",
                    "N/A",
                ]}
                    {...form.getInputProps("thangDiemToiDa")} />
                <MyTextInput label="Trạng thái hồ sơ" {...form.getInputProps("trangThaiHoSo")} />
            </SimpleGrid>
            <MyTextArea
                label="Ghi chú"
                {...form.getInputProps("ghiChu")}
            />
        </MyActionIconUpdate>
    )
}