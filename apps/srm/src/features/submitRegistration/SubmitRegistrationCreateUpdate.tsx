import { topicService } from "@/shared/APIs/topicService";
import { EnumPreliminaryStatus } from "@/shared/consts/enum/EnumPreliminaryStatus";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import Shared_AreaSelect from "@/shared/features/Area/Shared_AreaSelect";
import Shared_TypeSelect from "@/shared/features/Type/Shared_TypeSelect";
import { SRMTopic } from "@/shared/interfaces/SRMTopic";
import { SRMTopicMember } from "@/shared/interfaces/SRMTopicMember";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomFileInput } from "@aq-fe/core-ui/shared/components/input/CustomFileInput";
import { CustomNumberInput } from "@aq-fe/core-ui/shared/components/input/CustomNumberInput";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { CustomTabs } from "@aq-fe/core-ui/shared/components/navigation/CustomTabs/CustomTabs";
import { formValuesType } from "@aq-fe/core-ui/shared/types/types";
import { fileUtils } from "@aq-fe/core-ui/shared/utils/fileUtils";
import { SimpleGrid } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import { isNotEmpty, useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import SubmitRegistrationTopicMemberList from "./SubmitRegistrationTopicMemberList";

export default function SubmitRegistrationCreateUpdate({
    values,
    disabled
}: {
    values?: SRMTopic,
    disabled?: boolean
}) {
    const academicYearStore = useAcademicYearStore()
    const isUpdate = values != undefined
    const form = useForm<formValuesType<SRMTopic>>({
        mode: "uncontrolled",
        validate: {
            registerName: isNotEmpty("Không được để trống"),
            duration: isNotEmpty("Không được để trống"),
            srmAreaId: isNotEmpty("Không được để trống"),
            totalCost: isNotEmpty("Không được để trống"),
            fromDate: isNotEmpty("Không được để trống"),
            toDate: (value, values) => {
                if (!value) return "Không được để trống";
                if (values.fromDate && new Date(value) <= new Date(values.fromDate)) {
                    return "Ngày kết thúc phải lớn hơn ngày bắt đầu";
                }
                return null;
            },
            srmTypeId: isNotEmpty("Không được để trống"),
        },
    })
    const topicMememberState = useState<SRMTopicMember[]>([])
    useEffect(() => {
        if (!values) return
        const valueSetter = {
            ...values,
            attachmentDetail: {
                fileName: values.attachmentPath
            }
        }
        form.setValues(valueSetter)
        form.setInitialValues(valueSetter)

    }, [values])

    useEffect(() => {
        if (!values) return
        topicMememberState[1](values.srmTopicMembers || [])
    }, [values])

    return (
        <CustomButtonCreateUpdate
            isUpdate={isUpdate}
            actionIconProps={{
                disabled: disabled
            }}
            modalProps={{
                title: "Chi tiết hồ sơ đăng ký tuyển chọn",
                size: "80rem"
            }}
            form={form}
            onSubmit={(formValues) => {
                const mutationValues: SRMTopic = {
                    ...formValues,
                    srmTopicMembers: topicMememberState[0],
                    academicYearId: academicYearStore.state.academicYear?.id!,
                    preliminaryStatus: EnumPreliminaryStatus.Waiting
                }
                if (isUpdate) {
                    return topicService.update(mutationValues);
                }
                return topicService.create(mutationValues)
            }}
        >
            <CustomTabs
                tabs={[
                    {
                        label: "Thông tin chung",
                        children: (
                            <SimpleGrid cols={{ base: 1, md: 2 }}>
                                <CustomTextInput withAsterisk label="Tên đề tài" {...form.getInputProps("registerName")} />
                                <CustomTextInput withAsterisk label="Thời gian thực hiện (Tháng)" {...form.getInputProps("duration")} />
                                <Shared_AreaSelect withAsterisk {...form.getInputProps("srmAreaId")} />
                                <CustomNumberInput withAsterisk inputType="currency" label="Tổng kinh phí thực hiện" {...form.getInputProps("totalCost")} />
                                <MonthPickerInput withAsterisk label="Từ tháng/ năm" placeholder="Chọn tháng/ năm" {...form.getInputProps("fromDate")} />
                                <MonthPickerInput withAsterisk label="Đến tháng/ năm" placeholder="Chọn tháng/ năm" {...form.getInputProps("toDate")} />
                                <Shared_TypeSelect {...form.getInputProps("srmTypeId")} />
                                <CustomFileInput
                                    label="File thuyết minh"
                                    value={new File([], form.getValues().attachmentDetail?.fileName!)}
                                    onChange={async (e) => form.setFieldValue('attachmentDetail', await fileUtils.fileToAQDocumentType(e!))}
                                />
                            </SimpleGrid>
                        )
                    },
                    {
                        label: "Thành viên",
                        children: (
                            <SubmitRegistrationTopicMemberList
                                values={topicMememberState[0]}
                                onChange={topicMememberState[1]}
                            />
                        )
                    }
                ]}
            />
        </CustomButtonCreateUpdate>
    )
}
