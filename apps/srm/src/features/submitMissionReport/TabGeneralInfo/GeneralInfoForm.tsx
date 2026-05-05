"use client";

import { areaService } from "@/shared/APIs/areaService";
import { SRMTypeService } from "@/shared/APIs/SRMTypeService";
import { EnumLabelTopicStatus, EnumTopicStatus } from "@/shared/consts/enum/EnumTopicStatus";
import { SRMTopic } from "@/shared/interfaces/SRMTopic";
import { CustomFileInput } from "@aq-fe/core-ui/shared/components/input/CustomFileInput";
import { CustomNumberInput } from "@aq-fe/core-ui/shared/components/input/CustomNumberInput";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { formValuesType } from "@aq-fe/core-ui/shared/types/types";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { fileUtils } from "@aq-fe/core-ui/shared/utils/fileUtils";
import { SimpleGrid, Stack } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconCalendar } from "@tabler/icons-react";
import { forwardRef, useImperativeHandle, useMemo } from "react";

interface Props {
    values?: SRMTopic,
    readonly?: boolean
}

export interface GenralInfoFormHandle {
    getValues: () => SRMTopic;
    validate: () => ReturnType<ReturnType<typeof useForm<formValuesType<SRMTopic>>>['validate']>;
    resetForm: () => void;
    isDirty: () => boolean;
    setErrors: (errors: Record<string, string>) => void;
}

const GeneralInfoForm = forwardRef<GenralInfoFormHandle, Props>(({ values, readonly }, ref) => {

    const form = useForm<formValuesType<SRMTopic>>({
        mode: "uncontrolled",
        initialValues: {
            ...values,
            status: values?.status || EnumTopicStatus.New,
            srmTopicMembers: []
        },
        validate: {
            code: (value) => (value ?? "").trim() === "" ? "Số hội đồng không được để trống" : null,
            registerName: (value) => !value || value.trim() === "" ? "Tên hội đồng không được để trống" : null,
            toDate: (value, values) => {
                if (value && values.fromDate) {
                    const from = new Date(values.fromDate);
                    const to = new Date(value);
                    if (to < from) {
                        return "Đến tháng/năm phải lớn hơn hoặc bằng Từ tháng/năm";
                    }
                }
                return null;
            },
        },
    });

    const typeQuery = useCustomReactQuery({
        queryKey: ['types'],
        axiosFn: () => SRMTypeService.getAllIsActive()
    });

    const areaQuery = useCustomReactQuery({
        queryKey: ['areas'],
        axiosFn: () => areaService.getAll()
    });

    // expose hàm cho component cha
    useImperativeHandle(ref, () => ({
        getValues: () => form.getValues(),
        validate: () => form.validate(),
        resetForm: () => form.reset(),
        isDirty: () => form.isDirty(),
        setErrors: (errors) => form.setErrors(errors),
    }));

    const typeOptions = useMemo(() => {
        return typeQuery.data?.map((item) => (
            {
                label: `${item.name}-${item.code}`,
                value: String(item.id)
            }
        ))
    }, [typeQuery.data]);

    const areaOptions = useMemo(() => {
        return areaQuery.data?.map((item) => (
            {
                label: `${item.name}-${item.code}`,
                value: String(item.id)
            }
        ))
    }, [areaQuery.data]);

    return (
        <>
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing={24}>
                <Stack>
                    <CustomTextInput
                        label="Mã đăng ký"
                        {...form.getInputProps("code")}
                        readOnly={!!values}
                        withAsterisk
                    />
                    <CustomTextInput
                        label="Tên đề tài"
                        readOnly={!!values}
                        {...form.getInputProps("registerName")}
                        withAsterisk
                    />
                    <CustomSelect
                        readOnly={readonly}
                        label="Loại đề tài"
                        isLoading={typeQuery.isLoading}
                        isError={typeQuery.isError}
                        defaultValue={String(form.getValues().srmTypeId)}
                        data={typeOptions}
                        onChange={(value) => {
                            const id = value !== null ? Number(value) : undefined;
                            form.setFieldValue("srmTypeId", id);
                        }}
                        error={form.errors.srmTypeId}
                    />
                    <CustomTextInput
                        readOnly={readonly}
                        label="Đơn vị chủ trì"
                        {...form.getInputProps("hostOrganization")}
                    />
                    <CustomTextInput
                        readOnly={readonly}
                        label="Đơn vị quản lý"
                        {...form.getInputProps("managingOrganization")}
                    />
                    <CustomFileInput
                        readOnly={readonly}
                        label="File thuyết minh"
                        accept=".pdf"
                        defaultValue={new File([], form.values.attachmentDetail?.fileName || "")}
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
                <Stack>
                    <CustomSelect
                        readOnly={readonly}
                        label="Lĩnh vực"
                        isLoading={areaQuery.isLoading}
                        isError={areaQuery.isError}
                        defaultValue={String(form.getValues().srmAreaId)}
                        data={areaOptions}
                        onChange={(value) => {
                            const id = value !== null ? Number(value) : undefined;
                            form.setFieldValue("srmAreaId", id);
                        }}
                        error={form.errors.srmAreaId}
                    />
                    <CustomNumberInput
                        readOnly={readonly}
                        inputType="currency"
                        label="Tổng kinh phí"
                        max={999999999999999999999999}
                        maxLength={19}
                        {...form.getInputProps("totalCost")}
                    />
                    <CustomTextInput
                        readOnly={readonly}
                        label="Thời gian thực hiện"
                        {...form.getInputProps("duration")}
                    />
                    <MonthPickerInput
                        readOnly={readonly}
                        label="Từ tháng/năm"
                        placeholder="Từ tháng/năm"
                        rightSection={<IconCalendar />}
                        locale={"vi"}
                        monthsListFormat="[Tháng] M"
                        valueFormat="[Tháng] MM YYYY"
                        {...form.getInputProps("fromDate")}
                    />
                    <MonthPickerInput
                        readOnly={readonly}
                        label="Đến tháng/năm"
                        placeholder="Đến tháng/năm"
                        rightSection={<IconCalendar />}
                        locale={"vi"}
                        monthsListFormat="[Tháng] M"
                        valueFormat="[Tháng] MM YYYY"
                        {...form.getInputProps("toDate")}
                    />
                    <CustomSelect
                        readOnly={readonly}
                        isLoading={typeQuery.isLoading}
                        isError={typeQuery.isError}
                        label="Tình trạng của đề tài"
                        data={converterUtils.mapEnumToSelectData(EnumTopicStatus, EnumLabelTopicStatus)}
                        value={form.values.status ? String(form.values.status) : "1"}
                        onChange={(value) => {
                            const id = value !== null ? Number(value) : undefined;
                            form.setFieldValue("status", id);
                        }}
                        error={form.errors.status}
                    />

                </Stack>
            </SimpleGrid>
        </>
    );
});

GeneralInfoForm.displayName = "GeneralInfoForm";
export default GeneralInfoForm;
