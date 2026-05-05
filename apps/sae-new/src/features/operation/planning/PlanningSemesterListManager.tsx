import { CustomWindow } from "@aq-fe/core-ui/shared/components/layout/CustomWindow/CustomWindow";
import { AcademicYear } from "@/shared/interfaces/AcademicYear";
import { Semester } from "@/shared/interfaces/Semester";
import { CustomActionIcon } from "@aq-fe/core-ui/shared/components/button/CustomActionIcon/CustomActionIcon";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomDateInput } from "@aq-fe/core-ui/shared/components/input/CustomDateInput";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { Box, SimpleGrid } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import { IconPlus } from "@tabler/icons-react";

interface SemesterFieldsProps {
    index: number;
    form: UseFormReturnType<AcademicYear>;
}

function SemesterFields({ index, form }: SemesterFieldsProps) {
    const prefix = `semesters.${index}` as const;

    return (
        <>
            {/* Tên học kỳ / Ngày bắt đầu / Ngày kết thúc */}
            <Box mb="md">
                <CustomTextInput key={form.key(`${prefix}.name`)} label="Tên học kỳ" withAsterisk {...form.getInputProps(`${prefix}.name`)} />
            </Box>
            <SimpleGrid cols={{ base: 1, sm: 2 }} mb="md">
                <CustomDateInput key={form.key(`${prefix}.startDate`)} label="Ngày bắt đầu" withAsterisk valueFormat="DD/MM/YYYY" clearable {...form.getInputProps(`${prefix}.startDate`)} />
                <CustomDateInput key={form.key(`${prefix}.endDate`)} label="Ngày kết thúc" withAsterisk valueFormat="DD/MM/YYYY" clearable {...form.getInputProps(`${prefix}.endDate`)} />
            </SimpleGrid>

            {/* Thời gian tự đánh giá ĐRL */}
            <CustomWindow.Section title="THỜI GIAN TỰ ĐÁNH GIÁ ĐRL" allowCollapse={false}>
                <SimpleGrid cols={{ base: 1, sm: 2 }}>
                    <CustomDateInput key={form.key(`${prefix}.selfAssessmentOpen`)} label="Mở tự đánh giá" withAsterisk valueFormat="DD/MM/YYYY" clearable {...form.getInputProps(`${prefix}.selfAssessmentOpen`)} />
                    <CustomDateInput key={form.key(`${prefix}.selfAssessmentClose`)} label="Đóng tự đánh giá" withAsterisk valueFormat="DD/MM/YYYY" clearable {...form.getInputProps(`${prefix}.selfAssessmentClose`)} />
                </SimpleGrid>
            </CustomWindow.Section>

            {/* Thời gian duyệt điểm các cấp */}
            <CustomWindow.Section title="THỜI GIAN DUYỆT ĐIỂM CÁC CẤP" allowCollapse={false}>
                <SimpleGrid cols={{ base: 1, sm: 3 }}>
                    <CustomDateInput key={form.key(`${prefix}.classApprovalOpen`)} label="Duyệt cấp lớp" withAsterisk valueFormat="DD/MM/YYYY" clearable {...form.getInputProps(`${prefix}.classApprovalOpen`)} />
                    <CustomDateInput key={form.key(`${prefix}.facultyApprovalOpen`)} label="Duyệt cấp khoa" withAsterisk valueFormat="DD/MM/YYYY" clearable {...form.getInputProps(`${prefix}.facultyApprovalOpen`)} />
                    <CustomDateInput key={form.key(`${prefix}.universityApprovalOpen`)} label="Duyệt cấp trường" withAsterisk valueFormat="DD/MM/YYYY" clearable {...form.getInputProps(`${prefix}.universityApprovalOpen`)} />
                </SimpleGrid>
            </CustomWindow.Section>
        </>
    );
}

interface PlanningSemesterListManagerProps {
    form: UseFormReturnType<AcademicYear>;
    /** Callback khi nhấn nút thêm học kỳ */
    onAddSemester?: () => void;
    /** Callback khi nhấn nút xóa học kỳ (nhận index) */
    onRemoveSemester?: (index: number) => void;
    /** Khi đang chỉnh sửa (isUpdate) thì không cho xóa học kỳ */
    isUpdate?: boolean;
}

export default function PlanningSemesterListManager({
    form,
    onAddSemester,
    onRemoveSemester,
    isUpdate = false,
}: PlanningSemesterListManagerProps) {
    const semesters = form.values.semesters ?? [];

    return (
        <Box>
            {semesters.map((semester, index) => {
                const order = index + 1;

                return (
                    <CustomWindow
                        key={(semester as Semester).tempId ?? semester.id ?? index}
                        order={order}
                        title={semester.name ?? `HK${order}`}
                        headerRight={
                            !isUpdate && (
                                <CustomActionIcon
                                    actionType="delete"
                                    size="sm"
                                    onClick={() => onRemoveSemester?.(index)}
                                />
                            )
                        }
                    >
                        <SemesterFields index={index} form={form} />
                    </CustomWindow>
                );
            })}

            {/* Nút thêm học kỳ */}
            <Box mt="sm">
                <CustomButton
                    leftSection={<IconPlus size={14} stroke={2} />}
                    onClick={onAddSemester}
                    variant="default"
                >
                    Thêm học kỳ
                </CustomButton>
            </Box>
        </Box>
    );
}
