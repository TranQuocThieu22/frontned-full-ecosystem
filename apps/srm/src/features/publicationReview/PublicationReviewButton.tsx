"use client";
import { publicationDeclarationService } from "@/shared/APIs/publicationDeclarationService";
import { EnumLabelPublicationDeclarationStatus, EnumPublicationDeclarationStatus } from "@/shared/consts/enum/EnumPublicationDeclarationStatus";
import { SRMPublicationDeclaration } from "@/shared/interfaces/SRMPublicationDeclaration";
import { SRMReviewPublicationRequestBody } from "@/shared/interfaces/SRMReviewPublicationRequestBody";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { Checkbox, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

interface Props {
    publication: SRMPublicationDeclaration
    isLoading?: boolean
}

export default function PublicationReviewButton({ publication, isLoading }: Props) {
    const dics = useDisclosure();
    const queryClient = useQueryClient();

    const form = useForm<SRMReviewPublicationRequestBody>({
        initialValues: {
            id: publication.id,
            code: publication.code,
            name: publication.name,
            concurrencyStamp: publication.concurrencyStamp,
            isEnabled: publication.isEnabled,
            isSendMail: false,
            review: publication.review ?? "",
            status: publication.status ?? 1
        }
    });

    useEffect(() => {
        form.setValues({
            id: publication.id,
            code: publication.code,
            name: publication.name,
            concurrencyStamp: publication.concurrencyStamp,
            isEnabled: publication.isEnabled,
            isSendMail: false,
            review: publication.review ?? '',
            status: publication.status ?? 1
        });
    }, [publication])

    const mutation = useCustomReactMutation({
        axiosFn: (data: SRMReviewPublicationRequestBody) => publicationDeclarationService.reviewSRMPublicationDeclaration(data),
        enableDefaultSuccess: false,
        options: {
            onSuccess: () => {
                notifications.show({
                    color: "green",
                    message: "Thao tác thành công",
                });
                dics[1].close();
                queryClient.invalidateQueries({ queryKey: ["service_PublishedList_GetAllbyType"] });
                form.reset();
            }
        }
    })

    const handleSubmit = form.onSubmit((values) => {
        if (form.validate().hasErrors) return;
        mutation.mutate(values);
    });

    return (
        <CustomButtonModal
            isActionIcon
            modalProps={{
                title: "Chi tiết kiểm duyệt",
                size: "40%"
            }}
            actionIconProps={{
                actionType: "validate",
                loading: isLoading
            }}
            disclosure={dics}
        >
            <form onSubmit={handleSubmit}>
                <Stack gap={5}>
                    <CustomSelect
                        data={converterUtils.mapEnumToSelectData(EnumPublicationDeclarationStatus, EnumLabelPublicationDeclarationStatus)}
                        label="Trạng thái kiểm tra"
                        {...form.getInputProps("status")}
                        value={String(form.values.status || 1)}
                        onChange={val => {
                            form.setFieldValue("status", val !== "" ? Number(val) : undefined)
                        }}
                    />
                    <CustomTextArea
                        label="Nhận xét chung"
                        minRows={10}
                        {...form.getInputProps("review")}
                    />
                    <Checkbox
                        label="Gửi thông báo"
                        checked={form.getValues().isSendMail}
                        onChange={(event) => form.setFieldValue("isSendMail", event.currentTarget.checked)}
                    />

                    <CustomButton
                        mt="md"
                        type="submit"
                        actionType="save"
                        w="100%"
                        loading={mutation.isPending}
                    >
                        Lưu
                    </CustomButton>
                </Stack>
            </form>
        </CustomButtonModal>
    );
}