"use client";

import { academicYearService } from "@/shared/APIs/academicYearServiceQT";
import { activityServiceQT } from "@/shared/APIs/activityServiceQT";
import { CustomWindow } from "@aq-fe/core-ui/shared/components/layout/CustomWindow/CustomWindow";
import { Activity, ActivityTypeEnum, ActivityTypeLabel } from "@/shared/interfaces/Activity";
import { useAcademicYearStore } from "@/shared/stores/academicYearStore";
import { CustomButtonCreateUpdate } from "@aq-fe/aq-core-framework/shared/components/button/CustomButtonCreateUpdate";
import { useCustomReactQuery } from "@aq-fe/aq-core-framework/shared/hooks/useCustomReactQuery";
import { useAuthenticateStore } from "@aq-fe/aq-core-framework/shared/stores/useAuthenticateStore";
import { CustomNumberInput } from "@aq-fe/core-ui/shared/components/input/CustomNumberInput";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { SimpleGrid } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";


export default function ActivitiesCreateUpdateButton({
    values
}: {
    values?: Activity
}) {
    const authenticateStore = useAuthenticateStore()
    const academicYearStore = useAcademicYearStore();
    const isUpdate = values !== undefined;
    const form = useForm<Activity>({
        mode: "uncontrolled",
        initialValues: {
            name: "",
            semesterId: undefined,
            quota: 0,
            maxScore: 0,
            organizerUnit: "",
            criteriaId: "",
            description: "",
            type: ActivityTypeEnum.MANDATORY,
        },
    });

    // ── Lấy danh sách tiêu chí theo năm học ────────────────────────────────
    const criteriasQuery = useCustomReactQuery({
        queryKey: ["criterias", academicYearStore.state.currentAcademicYear?.id],
        serviceFn: () =>
            academicYearService.getCriterias({
                tenantId: authenticateStore.state.tenantId,
                id: academicYearStore.state.currentAcademicYear?.id ?? "",
            }),
        enabled: academicYearStore.state.currentAcademicYear != undefined,
    });

    const semesterQuery = useCustomReactQuery({
        queryKey: ["semesters", academicYearStore.state.currentAcademicYear?.id],
        serviceFn: () =>
            academicYearService.getSemesters({
                tenantId: authenticateStore.state.tenantId,
                id: academicYearStore.state.currentAcademicYear?.id ?? "",
            }),
        enabled: academicYearStore.state.currentAcademicYear != undefined,
    });
    useEffect(() => {
        if (values) {
            form.setValues(values);
            form.setInitialValues(values);
        }
    }, [values]);
    return (
        <CustomButtonCreateUpdate
            isUpdate={isUpdate}
            form={form}
            onSubmit={(formValues) => {
                if (isUpdate) {
                    return activityServiceQT.update({
                        tenantId: authenticateStore.state.tenantId,
                        id: values?.id!,
                        body: {
                            name: formValues.name,
                            maxScore: formValues.maxScore,
                            organizerUnit: formValues.organizerUnit
                        },
                    });
                }
                return activityServiceQT.create({
                    tenantId: authenticateStore.state.tenantId,
                    body: {
                        ...formValues,
                        type: Number(formValues.type),
                    },
                });
            }}
            buttonProps={{
                children: isUpdate ? "Cập nhật" : "Tạo mới",
                actionType: isUpdate ? "update" : "create",
            }}
            modalProps={{
                title: isUpdate ? "Cập nhật hoạt động" : "Tạo hoạt động mới",
                size: "70em",
            }}
            isActionIcon={false}
        >
            <CustomWindow order={1} title="THÔNG TIN CƠ BẢN" variant="default">
                <SimpleGrid cols={{ base: 1, sm: 3 }} mb="md">
                    <CustomTextInput
                        readOnly={isUpdate}
                        label="Mã hoạt động"
                        placeholder="VD: HD001"
                        required
                        {...form.getInputProps("code")}
                    />
                    <CustomTextInput
                        label="Tên hoạt động"
                        placeholder="VD: Tham gia chào cờ đầu tuần"
                        required
                        {...form.getInputProps("name")}
                    />

                    <CustomSelect
                        readOnly={isUpdate}
                        label="Tiêu chí ĐRL"
                        placeholder="VD: A.01"
                        required
                        isLoading={criteriasQuery.isLoading}
                        clearable
                        disabled={criteriasQuery.isLoading}
                        data={criteriasQuery.data?.map((c) => ({
                            value: c.id!,
                            label: `${c.code} — ${c.name}`,
                        }))}
                        {...form.getInputProps("criteriaId")}
                    />
                </SimpleGrid>

                <SimpleGrid cols={{ base: 1, sm: 2 }}>
                    <CustomSelect
                        readOnly={isUpdate}
                        label="Học kỳ"
                        placeholder="Chọn học kỳ"
                        clearable
                        isLoading={semesterQuery.isLoading}
                        data={semesterQuery.data?.map((s) => ({
                            value: s.id!,
                            label: s.name!,
                        }))}
                        {...form.getInputProps("semesterId")}
                    />
                    <CustomSelect
                        readOnly={isUpdate}
                        label="Loại hoạt động"
                        data={converterUtils.mapEnumToSelectData(ActivityTypeEnum, ActivityTypeLabel)}
                        value={form.getValues().type?.toString()}
                        onChange={(value) => form.setFieldValue("type", Number(value))}
                    />
                    <CustomNumberInput
                        label="Điểm tối đa"
                        placeholder="0"
                        min={0}
                        {...form.getInputProps("maxScore")}
                    />
                    <CustomNumberInput
                        readOnly={isUpdate}
                        label="Số lượng đăng ký tối đa"
                        placeholder="0"
                        min={0}
                        {...form.getInputProps("quota")}
                    />
                </SimpleGrid>
                <CustomTextArea
                    readOnly={isUpdate}
                    label="Mô tả"
                    placeholder="Mô tả chi tiết về hoạt động..."
                    minRows={3}
                    autosize
                    {...form.getInputProps("description")}
                />
            </CustomWindow>

            {/* ── ĐƠN VỊ TỔ CHỨC ─────────────────────────────────────── */}
            <CustomWindow order={2} title="ĐƠN VỊ TỔ CHỨC" variant="default">
                <CustomTextInput
                    label="Đơn vị tổ chức"
                    {...form.getInputProps("organizerUnit")}
                />
            </CustomWindow>
        </CustomButtonCreateUpdate>
    );
}
