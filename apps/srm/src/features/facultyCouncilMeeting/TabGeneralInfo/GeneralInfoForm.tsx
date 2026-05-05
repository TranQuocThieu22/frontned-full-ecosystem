"use client";

import { acceptanceCouncilService } from "@/shared/APIs/acceptanceCouncilService";
import { SRMAcceptanceContract } from "@/shared/interfaces/SRMAcceptanceContract";
import { CustomDateInput } from "@aq-fe/core-ui/shared/components/input/CustomDateInput";
import { CustomFileInput } from "@aq-fe/core-ui/shared/components/input/CustomFileInput";
import { CustomNumberInput } from "@aq-fe/core-ui/shared/components/input/CustomNumberInput";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { formValuesType } from "@aq-fe/core-ui/shared/types/types";
import { fileUtils } from "@aq-fe/core-ui/shared/utils/fileUtils";
import { SimpleGrid, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { forwardRef, useImperativeHandle, useMemo } from "react";

interface Props {
    values?: SRMAcceptanceContract,
}

export interface GenralInfoFormHandle {
    getValues: () => SRMAcceptanceContract;
    validate: () => ReturnType<ReturnType<typeof useForm<SRMAcceptanceContract>>['validate']>;
    resetForm: () => void;
    isDirty: () => boolean;
    setErrors: (errors: Record<string, string>) => void;
}

const GeneralInfoForm = forwardRef<GenralInfoFormHandle, Props>(({ values }, ref) => {

    const form = useForm<formValuesType<SRMAcceptanceContract>>({
        mode: "uncontrolled",
        initialValues: {
            ...values,
            srmAcceptanceContractMembers: undefined,
            srmAcceptanceCouncil: undefined,
            srmConclusion: undefined,
            srmContract: undefined
        },
    });

    // expose hàm cho component cha
    useImperativeHandle(ref, () => ({
        getValues: () => form.getValues(),
        validate: () => form.validate(),
        resetForm: () => form.reset(),
        isDirty: () => form.isDirty(),
        setErrors: (errors) => form.setErrors(errors),
    }));

    const conclusionQuery = useCustomReactQuery({
        queryKey: ['conclusion_list'],
        axiosFn: () => acceptanceCouncilService.getConclusionByAcceptanceCouncilId({ AcceptanceCouncilId: values?.srmAcceptanceCouncilId }),
    })

    const conclusionOptions = useMemo(() => {
        return conclusionQuery.data?.map(item => ({
            value: String(item.id),
            label: String(item.name)
        })) ?? [];
    }, [conclusionQuery.data]);

    return (
        <>
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing={24}>
                <Stack>
                    <CustomTextInput
                        label="Mã đề tài"
                        value={values?.srmContract?.code}
                        readOnly
                        withAsterisk
                    />
                    <CustomTextInput
                        label="Tên đề tài"
                        readOnly
                        value={values?.srmContract?.name}
                        withAsterisk
                    />
                    <CustomDateInput
                        label="Ngày họp"
                        {...form.getInputProps("dateMeeting")}
                    />
                </Stack>
                <Stack>
                    <CustomNumberInput
                        label="Điểm trung bình"
                        {...form.getInputProps("point")}
                    />
                    <CustomSelect
                        label="Xếp loại"
                        isLoading={conclusionQuery.isFetching}
                        isError={conclusionQuery.isError}
                        defaultValue={String(form.getValues().srmConclusionId)}
                        data={conclusionOptions}
                        onChange={(value) => {
                            const id = value !== null ? Number(value) : undefined;
                            form.setFieldValue("srmConclusionId", id);
                        }}
                        error={form.errors.srmConclusionId}
                    />
                    <CustomFileInput
                        label="File hồ sơ hội đồng"
                        accept="*"
                        defaultValue={form.values.attachmentPath ? new File([], form.values.attachmentPath?.split("/").at(-1) || "") : undefined}
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
                <CustomTextArea
                    label="Kiến nghị"
                    {...form.getInputProps("recommendation")}
                />
                <CustomTextArea
                    label="Tóm tắt nhận xét"
                    {...form.getInputProps("comment")}
                />
            </SimpleGrid>
        </>
    );
});

GeneralInfoForm.displayName = "GeneralInfoForm";
export default GeneralInfoForm;
