import { contractService } from "@/shared/APIs/contractService";
import { SRMMainTask } from "@/shared/interfaces/SRMMainTask";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomFileInput } from "@aq-fe/core-ui/shared/components/input/CustomFileInput";
import { CustomNumberInput } from "@aq-fe/core-ui/shared/components/input/CustomNumberInput";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { fileUtils } from "@aq-fe/core-ui/shared/utils/fileUtils";
import { SimpleGrid } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { useProgressReportStore } from "../useProgressReportStore";

export default function ProgressReportMainJobsCreateUpdate({ values }: { values?: SRMMainTask }) {
    const progressReportStore = useProgressReportStore()
    const isUpdate = values != undefined
    const form = useForm<SRMMainTask>({
        mode: "uncontrolled",
        validate: {
            content: (value) => (!value ? "Nội dung công việc không được để trống" : null),
            plannedOutcome: (value) => (!value ? "Kết quả, sản phẩm (Theo thuyết minh) không được để trống" : null),
            startDate: (value) => (!value ? "Ngày bắt đầu không được để trống" : null),
            endDate: (value, values) => {
                if (!value) return "Ngày kết thúc không được để trống"
                if (values.startDate && value < values.startDate) {
                    return "Ngày kết thúc không được trước ngày bắt đầu"
                }
                return null
            },
            actualOutcome: (value) => (!value ? "Kết quả, sản phẩm đạt được không được để trống" : null),
            estimatedBudget: (value) => (value === undefined || value === null ? "Kinh phí (Theo dự toán) không được để trống" : null),
            actualBudget: (value) => (value === undefined || value === null ? "Kinh phí thực hiện không được để trống" : null),
        }
    })
    useEffect(() => {
        if (!values) return
        const valuesSetter: SRMMainTask = {
            ...values,
            attachmentDetail: {
                fileName: values.attachmentPath
            }
        }
        form.setValues(valuesSetter)
        form.setInitialValues(valuesSetter)
    }, [values])
    return (
        <CustomButtonCreateUpdate
            isUpdate={isUpdate}
            form={form}
            modalProps={{
                title: "Chi tiết công việc",
                size: "70rem"
            }}
            onSubmit={(formValues) => {
                const id = values ? values.id : 0
                return contractService.insertOrUpdateMainTaskContract({
                    id: id,
                    srmContractReportHistoryId: progressReportStore.state.historyReportId,
                    ...formValues
                })
            }}
        >
            <CustomTextArea withAsterisk label="Nội dung công việc (Theo thuyết minh)" {...form.getInputProps("content")} />
            <CustomTextArea withAsterisk label="Kết quả, sản phẩm (Theo thuyết minh)"  {...form.getInputProps("plannedOutcome")} />
            <SimpleGrid cols={{ base: 1, md: 2 }}>
                <MonthPickerInput withAsterisk label="Bắt đầu" placeholder="Chọn ngày bắt đầu" {...form.getInputProps("startDate")} />
                <MonthPickerInput withAsterisk label="Kết thúc" placeholder="Chọn ngày kết thúc"{...form.getInputProps("endDate")} />
            </SimpleGrid>
            <CustomTextArea withAsterisk label="Kết quả, sản phẩm đạt được" {...form.getInputProps("actualOutcome")} />
            <CustomNumberInput withAsterisk inputType="currency" label="Kinh phí (Theo dự toán), đồng" {...form.getInputProps("estimatedBudget")} />
            <CustomNumberInput withAsterisk inputType="currency" label="Kinh phí thực hiện, đồng" {...form.getInputProps("actualBudget")} />
            <CustomTextArea label="Ghi chú (Giải thích nếu có sự thay đổi so với thuyết minh)" {...form.getInputProps("note")} />
            <CustomFileInput
                label="Minh chứng"
                {...form.getInputProps("attachmentDetail")}
                value={new File([], form.getValues().attachmentDetail?.fileName || "")}
                onChange={async (e) => form.setFieldValue("attachmentDetail", await fileUtils.fileToAQDocumentType(e!))}
            />
        </CustomButtonCreateUpdate>
    )
}
