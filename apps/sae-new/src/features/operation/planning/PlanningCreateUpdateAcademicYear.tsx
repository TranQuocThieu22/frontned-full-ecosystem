"use client";

import { academicYearService } from "@/shared/APIs/academicYearServiceQT";
import { scoreFrameworkVersionService } from "@/shared/APIs/scoreFrameworkVersionService";
import { MAIN_TENANT_ID } from "@/shared/consts/data/mainTenantId";
import { ScoreFrameworkVersionStateEnum } from "@/shared/consts/enum/ScoreFrameworkVersionStateEnum";
import { AcademicYear } from "@/shared/interfaces/AcademicYear";
import { CustomButtonCreateUpdate } from "@aq-fe/aq-core-framework/shared/components/button/CustomButtonCreateUpdate";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { useCustomReactQuery } from "@aq-fe/aq-core-framework/shared/hooks/useCustomReactQuery";
import { useAuthenticateStore } from "@aq-fe/aq-core-framework/shared/stores/useAuthenticateStore";
import { SimpleGrid } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import PlanningSemesterListManager from "./PlanningSemesterListManager";

type TempStatus = "created" | "updated" | "deleted";

/**
 * Refactored PlanningCreateUpdateAcademicYear

 * Following the pattern used in Roles and Accounts for conciseness and maintainability.
 */
export default function PlanningCreateUpdateAcademicYear({
    values,
    onSuccess,
}: {
    values?: AcademicYear;
    onSuccess?: () => void;
}) {
    const queryClient = useQueryClient();
    const authenticateStore = useAuthenticateStore();
    const isUpdate = !!values;

    const form = useForm<AcademicYear>({
        mode: "uncontrolled",
        validate: {
            name: (v) => (v?.trim() ? null : "Không được để trống"),
            code: (v) => (v?.trim() ? null : "Không được để trống"),
            scoreFrameworkVersionId: (v) => (v ? null : "Vui lòng chọn khung điểm"),
            semesters: {
                name: (v) => (v?.trim() ? null : "Không được để trống"),
                startDate: (v) => (v ? null : "Thiếu ngày bắt đầu"),
                endDate: (v, values, path) => {
                    if (!v) return "Thiếu ngày kết thúc";
                    const index = parseInt(path.split(".")[1] || "0");
                    const start = values.semesters?.[index]?.startDate;
                    if (start && new Date(v) <= new Date(start)) return "Ngày kết thúc phải sau ngày bắt đầu";
                    return null;
                },
                selfAssessmentOpen: (v) => (v ? null : "Thiếu ngày mở tự đánh giá"),
                selfAssessmentClose: (v, values, path) => {
                    if (!v) return "Thiếu ngày đóng tự đánh giá";
                    const index = parseInt(path.split(".")[1] || "0");
                    const start = values.semesters?.[index]?.selfAssessmentOpen;
                    if (start && new Date(v) <= new Date(start)) return "Ngày đóng phải sau ngày mở";
                    return null;
                },
                classApprovalOpen: (v, values, path) => {
                    if (!v) return "Thiếu ngày duyệt cấp lớp";
                    const index = parseInt(path.split(".")[1] || "0");
                    const sem = values.semesters?.[index];
                    if (sem) {
                        if (sem.startDate && new Date(v) < new Date(sem.startDate)) return "Phải nằm trong khoảng thời gian học kỳ";
                        if (sem.endDate && new Date(v) > new Date(sem.endDate)) return "Phải nằm trong khoảng thời gian học kỳ";
                    }
                    return null;
                },
                facultyApprovalOpen: (v, values, path) => {
                    if (!v) return "Thiếu ngày duyệt cấp khoa";
                    const index = parseInt(path.split(".")[1] || "0");
                    const sem = values.semesters?.[index];
                    if (sem) {
                        if (sem.startDate && new Date(v) < new Date(sem.startDate)) return "Phải nằm trong khoảng thời gian học kỳ";
                        if (sem.endDate && new Date(v) > new Date(sem.endDate)) return "Phải nằm trong khoảng thời gian học kỳ";
                    }
                    return null;
                },
                universityApprovalOpen: (v, values, path) => {
                    if (!v) return "Thiếu ngày duyệt cấp trường";
                    const index = parseInt(path.split(".")[1] || "0");
                    const sem = values.semesters?.[index];
                    if (sem) {
                        if (sem.startDate && new Date(v) < new Date(sem.startDate)) return "Phải nằm trong khoảng thời gian học kỳ";
                        if (sem.endDate && new Date(v) > new Date(sem.endDate)) return "Phải nằm trong khoảng thời gian học kỳ";
                    }
                    return null;
                },
            },
        },
    });

    useEffect(() => {
        if (!values) return;
        
        // Enrich existing semesters with order and code if they are missing
        const enrichedValues = {
            ...values,
            semesters: values.semesters?.map((s, i) => ({
                ...s,
                order: s.order || i + 1,
                code: s.code || `HK${s.order || i + 1}`,
            })),
        };
        
        form.initialize(enrichedValues);
    }, [values?.id]);

    const scoreFrameworks = useCustomReactQuery({
        queryKey: ["scoreFrameworkVersion", "Published"],
        serviceFn: () =>
            scoreFrameworkVersionService.getAll({
                tenantId: MAIN_TENANT_ID,
                params: {
                    state: ScoreFrameworkVersionStateEnum.Published,
                },
            }),
    });

    return (
        <CustomButtonCreateUpdate
            form={form}
            isUpdate={isUpdate}
            isActionIcon={false}
            customModalProps={{
                size: "75em",
                title: isUpdate ? "Cập nhật năm học" : "Tạo năm học mới",
            }}
            buttonProps={{
                children: isUpdate ? "Chỉnh sửa" : "Tạo mới",
                actionType: isUpdate ? "update" : "create",
            }}
            customReactMutationProps={{
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ["academicYears"] });
                    queryClient.invalidateQueries({ queryKey: ["academicYear"] });
                    onSuccess?.();
                },
            }}
            onSubmit={(formValues) => {
                if (isUpdate) {
                    return academicYearService.update({
                        id: values.id,
                        body: formValues,
                        tenantId: authenticateStore.state.tenantId,
                    });
                }
                return academicYearService.create({
                    tenantId: authenticateStore.state.tenantId,
                    body: formValues,
                });
            }}
        >
            {/* Basic Info */}
            <SimpleGrid cols={{ base: 1, sm: isUpdate ? 2 : 3 }} mb="md">
                {!isUpdate && (
                    <CustomTextInput
                        label="Mã năm học"
                        withAsterisk
                        key={form.key("code")}
                        {...form.getInputProps("code")}
                    />
                )}
                <CustomTextInput
                    label="Tên hiển thị"
                    withAsterisk
                    key={form.key("name")}
                    {...form.getInputProps("name")}
                />
                <CustomSelect
                    label="Khung điểm ĐRL"
                    withAsterisk
                    key={form.key("scoreFrameworkVersionId")}
                    {...form.getInputProps("scoreFrameworkVersionId")}
                    data={scoreFrameworks.data?.map((v) => ({
                        value: v.id!,
                        label: `${v.code} - ${v.name}`,
                    }))}
                />
            </SimpleGrid>

            {/* Semesters */}
            <PlanningSemesterListManager
                form={form}
                onAddSemester={() => {
                    const current = form.getValues().semesters ?? [];
                    const nextOrder = current.length + 1;
                    form.setFieldValue("semesters", [
                        ...current,
                        {
                            name: `HK${nextOrder}`,
                            code: `HK${nextOrder}`,
                            order: nextOrder,
                            tempId: uuidv4(),
                            tempStatus: "created" as TempStatus,
                        },
                    ]);
                }}
                onRemoveSemester={(index) => {
                    const current = form.getValues().semesters ?? [];
                    const semester = current[index];
                    if (semester?.id) {
                        form.setFieldValue(`semesters.${index}.tempStatus`, "deleted" as TempStatus);
                        // Re-calculate orders and codes for non-deleted semesters
                        let orderCount = 0;
                        current.forEach((s, i) => {
                            if (i === index) return;
                            if (s.tempStatus !== "deleted") {
                                orderCount++;
                                form.setFieldValue(`semesters.${i}.order`, orderCount);
                                form.setFieldValue(`semesters.${i}.code`, `HK${orderCount}`);
                            }
                        });
                    } else {
                        const filtered = current.filter((_, i) => i !== index);
                        // Re-calculate orders and codes
                        const updated = filtered.map((s, i) => {
                            const newOrder = i + 1;
                            return {
                                ...s,
                                order: newOrder,
                                code: `HK${newOrder}`,
                            };
                        });
                        form.setFieldValue("semesters", updated);
                    }
                }}
            />
        </CustomButtonCreateUpdate>
    );
}
