import { proposalNotificationService } from "@/shared/APIs/proposalNotificationService";
import { EnumLabelProposalNotificationType, EnumProposalNotificationType } from "@/shared/consts/enum/EnumProposalNotificationType";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMNotificationRecipients } from "@/shared/interfaces/SRMNotificationRecipients";
import { SRMProposalNotification } from "@/shared/interfaces/SRMProposalNotification";
import { applyReadOnlyToChildren, CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomDateInput } from "@aq-fe/core-ui/shared/components/input/CustomDateInput";
import { CustomFileInput } from "@aq-fe/core-ui/shared/components/input/CustomFileInput";
import { CustomRichTextEditor } from "@aq-fe/core-ui/shared/components/input/CustomRichTextEditor";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { CustomTabs } from "@aq-fe/core-ui/shared/components/navigation/CustomTabs/CustomTabs";
import { actionType } from "@aq-fe/core-ui/shared/types/actionType";
import { fileUtils } from "@aq-fe/core-ui/shared/utils/fileUtils";
import { SimpleGrid, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import TaskProposalNoticeNotificationRecipientList from "./TaskProposalNoticeNotificationRecipientList";

interface TaskProposalNoticeCreateUpdateSendMailProps {
    actionType?: actionType,
    values?: SRMProposalNotification
    type?: number,
    disabled?: boolean
}

export default function TaskProposalNoticeCreateUpdateSendMail({
    actionType = "create",
    values,
    type,
    disabled
}: TaskProposalNoticeCreateUpdateSendMailProps) {
    const academicYearId = useAcademicYearStore().state.academicYear?.id
    const isUpdate = values != undefined
    const notificationRecipients = useState<SRMNotificationRecipients[]>([])
    const form = useForm<SRMProposalNotification>({
        mode: "uncontrolled",
        validate: {
            code: (value) => value ? null : "Không được để trống",
            name: (value) => value ? null : "Không được để trống",
            issuedDate: (value) => (value ? null : "Không được để trống"),
            startDate: (value, values) => {
                if (!value) return "Không được để trống";
                if (values.issuedDate && new Date(value) < new Date(values.issuedDate)) {
                    return "Ngày bắt đầu phải sau hoặc bằng ngày ban hành";
                }
                return null;
            },
            endDate: (value, values) => {
                if (!value) return "Không được để trống";
                if (values.startDate && new Date(value) < new Date(values.startDate)) {
                    return "Ngày kết thúc phải sau hoặc bằng ngày bắt đầu";
                }
                return null;
            },

        }
    })
    useEffect(() => {
        if (!values) {
            form.reset()
            return;
        }
        const finalValues: SRMProposalNotification = {
            ...values,
            attachmentDetail: {
                fileName: values.attachmentPath,
            },
        };
        notificationRecipients[1](values.srmNotificationRecipients ?? [])
        form.setInitialValues(finalValues); // dùng để reset sau này
        form.setValues(finalValues);        // để cập nhật input hiện tại
    }, [values]);

    return (
        <CustomButtonCreateUpdate
            modalProps={{
                title: "Chi tiết thông báo",
                size: "80%"
            }}
            scrollAreaAutosizeProps={{ h: "65vh" }}
            isUpdate={isUpdate}
            useCustomReactMutationProps={{
                ...(actionType == "sendMail" && ({
                    successNotification: "Gửi mail thành công",
                })),
            }}
            form={form}
            onSubmit={() => {
                const finalValues: SRMProposalNotification = {
                    ...form.getValues(),
                    academicYearId: academicYearId,
                    srmNotificationRecipients: notificationRecipients[0].filter(item => item.tempStatus != undefined).map(item => ({
                        userId: item.user?.id,
                        id: item.id,
                        isEnabled: item.isEnabled
                    })),
                    type: type
                }

                if (actionType == "create") {
                    return proposalNotificationService.create(finalValues)
                }
                if (actionType == "update") {
                    return proposalNotificationService.update(finalValues)
                }
                if (actionType == "sendMail") {
                    return proposalNotificationService.sendMailProposalNotification({ SRMProposalNotificationId: values?.id! })
                }
            }}
            actionIconProps={{
                actionType: actionType,
                disabled: disabled
            }}
        >
            <CustomTabs
                tabs={[
                    {
                        label: "Thông tin chung",
                        children: (
                            applyReadOnlyToChildren(<Stack>
                                <CustomTextInput
                                    label="Mã thông báo"
                                    withAsterisk
                                    {...form.getInputProps("code")}
                                />
                                <CustomTextInput
                                    label="Tiêu đề thông báo"
                                    withAsterisk
                                    {...form.getInputProps("name")}
                                />
                                <CustomRichTextEditor
                                    label="Nội dung chính"
                                    value={form.getValues().description}
                                    onBlur={values => form.setFieldValue("description", values)}
                                />
                                <SimpleGrid cols={{ base: 1, md: 2 }}>
                                    <CustomTextInput
                                        label="Đối tượng áp dụng"
                                        {...form.getInputProps("targetAudience")}
                                    />
                                    <CustomDateInput
                                        withAsterisk
                                        label="Ngày ban hành"
                                        {...form.getInputProps("issuedDate")}
                                    />
                                    <CustomFileInput
                                        label="Đính kèm file"
                                        value={new File([], form.getValues().attachmentDetail?.fileName || "Vui lòng chọn file")}
                                        onChange={async (e) => {
                                            form.setFieldValue("attachmentDetail", await fileUtils.fileToAQDocumentType(e!))
                                        }}
                                    />
                                    <Stack>
                                        <CustomDateInput
                                            withAsterisk
                                            label={`Ngày bắt đầu nhận ${EnumLabelProposalNotificationType[type as EnumProposalNotificationType]}`}
                                            {...form.getInputProps("startDate")}
                                        />
                                        <CustomDateInput
                                            withAsterisk
                                            label={`Ngày kết thúc nhận ${EnumLabelProposalNotificationType[type as EnumProposalNotificationType]}`}
                                            {...form.getInputProps("endDate")}
                                        />
                                    </Stack>
                                </SimpleGrid>
                            </Stack>, actionType == "sendMail" || actionType == "view")
                        )
                    },
                    {
                        label: "Danh sách người nhận",
                        children: (
                            <TaskProposalNoticeNotificationRecipientList
                                values={notificationRecipients[0]}
                                readOnly={actionType == "sendMail" || actionType == "view"}
                                onChange={notificationRecipients[1]}
                            />
                        )
                    }
                ]}
            />
        </CustomButtonCreateUpdate>
    )
}
