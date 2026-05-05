import { proposalNotificationService } from "@/shared/APIs/proposalNotificationService";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMNotificationTopic } from "@/shared/interfaces/SRMNotificationTopic";
import { SRMProposalNotification } from "@/shared/interfaces/SRMProposalNotification";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { StagedChange } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTableStagedChanges";
import { CustomDateInput } from "@aq-fe/core-ui/shared/components/input/CustomDateInput";
import { CustomFileInput } from "@aq-fe/core-ui/shared/components/input/CustomFileInput";
import { CustomRichTextEditor } from "@aq-fe/core-ui/shared/components/input/CustomRichTextEditor";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { CustomTabs } from "@aq-fe/core-ui/shared/components/navigation/CustomTabs/CustomTabs";
import { applyReadOnlyToChildren } from "@aq-fe/core-ui/shared/libs/applyReadOnlyToChildren";
import { actionType } from "@aq-fe/core-ui/shared/types/actionType";
import { fileUtils } from "@aq-fe/core-ui/shared/utils/fileUtils";
import { Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconInfoCircle, IconList } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import ChoseNotificationTopic from "./ChoseNotificationTopic";
import NotificationTopicTable from "./NotificationTopicTable";

interface SelectionResultCreateUpdateSendMailProps {
    actionType?: actionType,
    values?: SRMProposalNotification
    disabled?: boolean
}

export default function SelectionResultCreateUpdateSendMail({
    actionType = "create",
    disabled,
    values
}: SelectionResultCreateUpdateSendMailProps) {
    const academicYearId = useAcademicYearStore().state.academicYear?.id
    const isUpdate = values != undefined
    const stagedChages = useState<StagedChange>()
    const form = useForm<SRMProposalNotification>({
        mode: "uncontrolled",
        validate: {
            code: (value) => value ? null : "Không được để trống",
            name: (value) => value ? null : "Không được để trống",
            description: (value) => value ? null : "Không được để trống",
            issuedDate: (value) => (value ? null : "Không được để trống"),
        }
    })
    useEffect(() => {
        if (!values) return;
        const finalValues: SRMProposalNotification = {
            ...values,
            attachmentDetail: {
                fileName: values.attachmentPath,
            },
        };
        form.setInitialValues(finalValues); // dùng để reset sau này
        form.setValues(finalValues);        // để cập nhật input hiện tại
    }, [values]);


    return (
        <CustomButtonCreateUpdate
            modalProps={{
                title: actionType == "update" ? "Cập nhật thông báo"
                    : actionType == "create" ? "Thêm thông báo"
                        : "Chi tiết thông báo",
                size: "80%"
            }}
            isUpdate={isUpdate}
            useCustomReactMutationProps={{
                ...(actionType == "sendMail" && ({
                    successNotification: "Gửi mail thành công"
                }))
            }}
            form={form}
            onSubmit={() => {
                const deletedIds = stagedChages[0]?.deletedIds || [];
                const allTopic = form.getValues().srmNotificationTopics || [];
                // Lọc ra những topic có id nằm trong deletedIds
                const deletedTopics = allTopic.filter(topic => deletedIds.includes(topic.srmTopicId!));
                const deletedTopicIds = deletedTopics.map(item => item.id);

                const finalValues: SRMProposalNotification = {
                    ...form.getValues(),
                    academicYearId: academicYearId,
                    srmNotificationTopics: [
                        ...(stagedChages[0]?.addedIds || []).map(item => ({
                            srmTopicId: item,
                            srmProposalNotificationId: values?.id!,
                        })) as SRMNotificationTopic[],
                        ...(deletedTopicIds.map(item => ({
                            id: item,
                            isEnabled: false,
                        })) as SRMNotificationTopic[])
                    ]
                }
                if (actionType == "create") {
                    return proposalNotificationService.create(
                        {
                            ...finalValues,
                            type: 3,
                        }
                    )
                }
                if (actionType == "update") {
                    return proposalNotificationService.update(finalValues)
                }
                if (actionType == "sendMail") {
                    if (values?.srmNotificationTopics?.length == 0) {
                        notifications.show({
                            color: "red",
                            message: "Không có đề tài thông báo",
                        });
                        return false;
                    }
                    return proposalNotificationService.sendMailProposalNotification({ SRMProposalNotificationId: values?.id! })
                }

            }}
            actionIconProps={{
                disabled: disabled,
                actionType: actionType
            }}
        >
            <CustomTabs
                tabs={[
                    {
                        label: "Thông tin chung",
                        leftSection: <IconInfoCircle />,
                        children: (
                            applyReadOnlyToChildren((
                                <Stack>
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
                                        withAsterisk={true}
                                        error={form.getInputProps("description").error}
                                        value={form.getValues().description}
                                        onBlur={values => form.setFieldValue("description", values)}

                                    />
                                    <CustomDateInput
                                        withAsterisk
                                        label="Ngày ban hành"
                                        {...form.getInputProps("issuedDate")}
                                    />
                                    <CustomFileInput
                                        label="Đính kèm file"
                                        accept=".pdf"
                                        placeholder={form.values.attachmentDetail?.fileName || "Chọn file"}
                                        defaultValue={new File([], values?.attachmentPath?.split("/").at(-1) || "")}
                                        onChange={async (file) => {
                                            if (!file) return;
                                            form.setFieldValue(
                                                "attachmentDetail",
                                                await fileUtils.fileToAQDocumentType(file)
                                            );
                                        }}
                                        error={form.errors.fileDetail}
                                    />
                                </Stack>
                            ), actionType == "view" || actionType == "sendMail")
                        )
                    },
                    {
                        label: "Danh sách đăng ký tuyển chọn",
                        leftSection: <IconList />,
                        children: actionType == "create" || actionType == "update" ? (
                            <ChoseNotificationTopic
                                initTopicId={values?.srmNotificationTopics?.map(item => item.srmTopicId!)}
                                onStagedChange={stagedChages[1]}
                            />) : (
                            <NotificationTopicTable
                                data={values?.srmNotificationTopics || []}
                            />
                        )
                    }
                ]}
            />
        </CustomButtonCreateUpdate>
    )
}
