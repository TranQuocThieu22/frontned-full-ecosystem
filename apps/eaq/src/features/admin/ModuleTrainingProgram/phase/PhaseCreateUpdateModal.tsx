"use client";

import { service_EAQPhase } from "@/shared/APIs/service_EAQPhase";
import { service_EAQTrainingProgram } from "@/shared/APIs/service_EAQTrainingProgram";
import { IPhase } from '@/shared/interfaces/Phase/IPhase';
import {
    CustomButtonCreateUpdate
} from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomCheckbox } from "@aq-fe/core-ui/shared/components/input/CustomCheckbox";
import { CustomDateInput } from "@aq-fe/core-ui/shared/components/input/CustomDateInput";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Box, Flex, Grid } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { phaseStatusOptions } from "./PhaseTable";

interface Props {
    values?: IPhase;
    isHavingOtherCurrent?: boolean;
}

export default function PhaseCreateUpdateModal({
    values,
    isHavingOtherCurrent,
}: Props) {
    const isUpdate = !!values;
    const queryClient = useQueryClient()
    const disc = useDisclosure(false);

    useEffect(() => {
        if (!values) return;
        form.setValues({
            ...values,
        });
    }, [values]);

    const form = useForm<Partial<Record<keyof IPhase, any>>>({
        initialValues: {
            id: 0,
            code: "",
            name: "",
            concurrencyStamp: "string",
            isEnabled: true,
            isCurrent: false,
            startDate: "",
            endDate: "",
            phaseStatus: 1,
            eaqStandardSetTrainingProgramId: 0,
            // eaqStandardSetId: standardSetStore.state.StandardSet?.id,
            note: "",
        },
        validate: {
            code: (value) => (value ? null : "Vui lòng nhập mã giai đoạn kiểm định"),
            name: (value) => (value ? null : "Vui lòng nhập tên giai đoạn kiểm định"),
            startDate: (value) => {
                if (!value) return "Vui lòng chọn ngày bắt đầu";
                return null;
            },
            endDate: (value, values) => {
                if (!value) return "Vui lòng chọn ngày kết thúc";

                const end = new Date(value);
                const start = new Date(values.startDate || "");

                if (start && !isNaN(start.getTime()) && end < start)
                    return "Ngày kết thúc giai đoạn phải sau ngày bắt đầu";

                return null;
            },
            isCurrent: (isChecked) => {
                if (values?.isCurrent == true && isChecked != values?.isCurrent) {
                    return "Giai đoạn đang hiện hành không thể hủy hiện hành ";
                }
            },
            phaseStatus: (value) =>
                value ? null : "Vui lòng chọn trạng thái giai đoạn kiểm định",
            eaqStandardSetTrainingProgramId: (value) =>
                value ? null : "Vui lòng chọn chương trình đào tạo",
        },
    });

    const trainingProgramQuery = useCustomReactQuery({
        queryKey: ["trainingProgramRead"],
        axiosFn: async () =>
            service_EAQTrainingProgram.GetAllAccreditationTrainingPrograms({}),
        options: { enabled: disc[0] },
    });

    useEffect(() => {
        if (
            trainingProgramQuery.data &&
            trainingProgramQuery.data.length > 0 &&
            !isUpdate
        ) {
            form.setFieldValue(
                "eaqStandardSetTrainingProgramId",
                trainingProgramQuery?.data[0]?.id
            );
        }
    }, [trainingProgramQuery.data]);

    function handleSubmit(formValues: IPhase, isUpdate?: boolean) {
        const validationResult = form.validate();
        if (validationResult.hasErrors) {
            return false;
        }
        type PhasePayload = Omit<IPhase, "eaqTrainingProgram" | "eaqStandardSet">
        // Temp remove unnecessary properties to avoid AutoMapper errors on BE side
        const { eaqStandardSetTrainingProgram, eaqStandardSet, isEnabled, ...payload } = formValues;
        return isUpdate
            ? service_EAQPhase.update(payload as PhasePayload)
            : service_EAQPhase.create(formValues as PhasePayload);
    }

    return (
        <CustomButtonCreateUpdate
            form={form}
            modalProps={{
                size: "80%",
                title: !values
                    ? "Tạo giai đoạn kiểm định mới"
                    : "Chi tiết giai đoạn kiểm định",
            }}
            isUpdate={isUpdate}
            onSubmit={() => handleSubmit(form.values, isUpdate)}
            disclosure={disc}
            useCustomReactMutationProps={{
                options: {
                    onSuccess: () => {
                        // Invalidate the standardSetQuery to refetch fresh data
                        queryClient.invalidateQueries({ queryKey: ['standardSetQuery'] });

                        // Also invalidate the trainingProgramQuery in this modal
                        queryClient.invalidateQueries({ queryKey: ['trainingProgramRead'] });

                        // Optionally refetch immediately to ensure data is current
                        queryClient.refetchQueries({ queryKey: ['standardSetQuery'] });
                    }
                }
            }}
        >
            <Flex align={'center'} justify={'space-between'} w={'100%'}>
                <Box w={'49%'}>
                    {/*  CASE: 22/9/2025 Tạm chưa rõ được đổi ctdt của 1 giai đoạn không */}
                    <CustomSelect
                        w={'100%'}
                        withAsterisk
                        label="Chương trình đào tạo"
                        isLoading={trainingProgramQuery.isLoading}
                        value={form.values.eaqStandardSetTrainingProgramId?.toString()}
                        data={
                            trainingProgramQuery.data?.map((item) => ({
                                value: item.id?.toString() ?? "",
                                label: (item.eaqStandardSet?.code ?? "") + " - " + (item.eaqTrainingProgram?.code ?? ""),
                            })) || []
                        }
                        onChange={(value) => {
                            if (value) {
                                form.setFieldValue("eaqStandardSetTrainingProgramId", parseInt(value!));
                            }
                        }}
                        error={form.errors.eaqStandardSetTrainingProgramId}
                    />
                    <CustomTextInput
                        w={'100%'}
                        withAsterisk
                        pt={10}
                        label="Mã giai đoạn kiểm định"
                        {...form.getInputProps("code")}
                        error={form.errors.code}
                        readOnly={isUpdate}
                    />
                    <CustomTextInput
                        w={'100%'}
                        withAsterisk
                        pt={10}
                        label="Tên giai đoạn kiểm định"
                        {...form.getInputProps("name")}
                        error={form.errors.name}
                    />
                </Box>
                <Box w={'49%'}>
                    <CustomSelect
                        withAsterisk
                        label="Trạng thái giai đoạn"
                        error={form.errors.phaseStatus}
                        data={phaseStatusOptions}
                        value={form.values.phaseStatus?.toString()}
                        onChange={(value) => {
                            if (value) form.setFieldValue("phaseStatus", parseInt(value));
                        }}
                    />
                    <CustomDateInput
                        withAsterisk
                        clearable={false}
                        pt={10}
                        label="Ngày bắt đầu"
                        {...form.getInputProps("startDate")}
                        error={form.errors.startDate}
                    />
                    <CustomDateInput
                        withAsterisk
                        clearable={false}
                        pt={10}
                        minDate={
                            new Date(
                                new Date(form.values.startDate || new Date()).getTime()
                                // new Date(form.values.startDate || new Date()).getTime() + 24 * 60 * 60 * 1000
                            )
                        }
                        label="Ngày kết thúc"
                        {...form.getInputProps("endDate")}
                        error={form.errors.endDate}
                    />
                </Box>
            </Flex>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                }}
            >
                {isHavingOtherCurrent && (
                    <span
                        style={{
                            color: "blue",
                            fontStyle: "italic",
                            fontSize: "0.75rem",
                            marginBottom: "4px",
                            textAlign: "center",
                        }}
                    >
                        Một giai đoạn khác của chương trình{" "}
                        <b>{values?.eaqTrainingProgram?.name}</b> hiện đang được đánh dấu là
                        hiện hành
                    </span>
                )}
                <CustomCheckbox
                    label="Hiện hành"
                    readOnly={values?.isCurrent == true}
                    checked={form.values.isCurrent == true}
                    error={form.errors.isCurrent}
                    onChange={(e) => {
                        if (values?.isCurrent == true) return;
                        form.setFieldValue("isCurrent", e.target.checked);
                    }}
                />
            </div>
            <CustomTextArea
                label="Ghi chú"
                placeholder="Ghi chú"
                value={form.values.note ?? ""}
                onChange={(data) => form.setFieldValue("note", data.target.value)}
            />
        </CustomButtonCreateUpdate>
    );
}
