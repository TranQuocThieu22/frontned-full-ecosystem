import { contractService } from "@/shared/APIs/contractService";
import { SRMTrainingOutcome } from "@/shared/interfaces/SRMTrainingOutcome";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomFileInput } from "@aq-fe/core-ui/shared/components/input/CustomFileInput";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { fileUtils } from "@aq-fe/core-ui/shared/utils/fileUtils";
import { SimpleGrid } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { useProgressReportStore } from "../useProgressReportStore";

export default function ProgressReportTrainingResultsCreateUpdate({ values }: { values?: SRMTrainingOutcome }) {
    const isUpdate = values != undefined
    const form = useForm<SRMTrainingOutcome>({
        mode: "uncontrolled",
        validate: {
            fullName: (value) => (!value ? "Họ và tên không được để trống" : null),
            startDate: (value) => (!value ? "Thời gian bắt đầu không được để trống" : null),
            endDate: (value, values) => {
                if (!value) return "Thời gian kết thúc không được để trống"
                if (values.startDate && value < values.startDate) {
                    return "Thời gian kết thúc không được trước thời gian bắt đầu"
                }
                return null
            },
            degree: (value) => (!value ? "Đã bảo vệ không được để trống" : null),
            status: (value) => (!value ? "Tình trạng không được để trống" : null),
            attachmentDetail: (value) => (!value ? "Vui lòng tải lên minh chứng" : null),
        }
    })
    const progressReportStore = useProgressReportStore()

    useEffect(() => {
        if (!values) return
        const valuesSetter: SRMTrainingOutcome = {
            ...values,
            attachmentDetail: {
                fileName: values.attachmentPath
            }
        }
        form.setInitialValues(valuesSetter)
        form.setValues(valuesSetter)
    }, [values])
    return (
        <CustomButtonCreateUpdate
            isUpdate={isUpdate}
            form={form}
            modalProps={{
                title: "Chi tiết kết quả đào tạo",
                size: "80rem"
            }}
            onSubmit={(formValues) => {
                const id = isUpdate ? values.id : 0
                return contractService.insertOrUpdateTrainingOutcome({
                    id: id,
                    srmContractReportHistoryId: progressReportStore.state.historyReportId,
                    ...formValues
                })
            }}
        >
            <CustomTextInput withAsterisk label="Họ và tên" {...form.getInputProps("fullName")} />
            <SimpleGrid cols={{ base: 1, md: 2 }}>
                <MonthPickerInput withAsterisk label="Thời gian bắt đầu" placeholder="Chọn thời gian bắt đầu" {...form.getInputProps("startDate")} />
                <MonthPickerInput withAsterisk label="Thời gian kết thúc" placeholder="Chọn thời gian kết thúc"  {...form.getInputProps("endDate")} />
            </SimpleGrid>
            <CustomTextInput withAsterisk label="Đã bảo vệ" {...form.getInputProps("degree")} />
            <CustomTextInput withAsterisk label="Tình trạng" {...form.getInputProps("status")} />
            <CustomFileInput
                withAsterisk
                label="Minh chứng"
                {...form.getInputProps("attachmentDetail")}
                value={new File([], form.getValues().attachmentDetail?.fileName || "Vui lòng chọn file")}
                onChange={async e => form.setFieldValue("attachmentDetail", await fileUtils.fileToAQDocumentType(e!))}

            />
        </CustomButtonCreateUpdate>
    )
}
