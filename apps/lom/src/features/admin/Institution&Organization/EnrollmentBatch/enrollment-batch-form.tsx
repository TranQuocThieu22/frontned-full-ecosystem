'use client';

import { showGeneralErrorNotification, showGeneralSuccessNotification } from "@/components/domain/ModuleNotification/CommonNotification";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { Button, Select, Stack, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ProgramFormatInfoViewModel } from "../../GeneralEducationMasterData/ProgramFormat/program-format-table";
import { ProgramInfoViewModel } from "../Program/program-table";
import { SemesterInfoViewModel } from "../Semester/semester-table";

export interface EnrollmentBatchDTO {
    id: number;
    code?: string | null;
    name?: string | null;
    concurrencyStamp?: string | null;
    isEnabled: boolean;
    activityPlanStartId?: number | null,
    activityPlanEndId?: number | null,
    coeProgramId?: number | null,
    note?: string | null;
    isActive?: boolean | null;
    coeDegreeLevelId?: number | null,
    formulaType?: number | null,
    isSplitPoint?: boolean | null
}

export default function EnrollmentBatchForm({ enrollmentBatchData, formHandler }: { enrollmentBatchData: EnrollmentBatchDTO, formHandler: any }) {
    const queryClient = useQueryClient();

    const programFormatQuery = useQuery<ProgramFormatInfoViewModel[]>({
        queryKey: ["ProgramFormats"],
        queryFn: async () => {
            let cols = 'COEProgram,COETrainingSystem,COERegulation';
            const result = await baseAxios.get(`/COEDegreeLevel/GetAll?cols=${cols}`);
            return result.data?.data || []
        },
        refetchOnWindowFocus: false,
    });

    const semesterQuery = useQuery<SemesterInfoViewModel[]>({
        queryKey: ["Semesters"],
        queryFn: async () => {
            let response = await baseAxios.get(`/ActivityPlan/ActivityPlanOnlyGetAll`)
            return response.data.data
        },
        refetchOnWindowFocus: false,
        select(data) {
            return data.sort((a, b) => {
                return a.code!.localeCompare(b.code!, undefined, { sensitivity: 'base' });
            });
        },
    });

    const programQuery = useQuery<ProgramInfoViewModel[]>({
        queryKey: ["Programs"],
        queryFn: async () => {
            const response = await baseAxios.get("/COEProgram/Getall?cols=Department");
            return response.data.data || [];
        },
        refetchOnWindowFocus: false,
    });

    const form = useForm<EnrollmentBatchDTO>({
        initialValues: {
            ...enrollmentBatchData,
            code: enrollmentBatchData.code ?? '',
            name: enrollmentBatchData.name ?? '',
            note: enrollmentBatchData.note ?? '',
        },
        validate: {
            code: (value) => value ? null : 'Không được để trống',
            name: (value) => value ? null : 'Không được để trống',
            activityPlanStartId: (value) => {
                if (value === null) return 'Không được để trống';
                return null;
            },
            activityPlanEndId: (value) => {
                if (value === null) return 'Không được để trống';
                const startSemesterStartDate = new Date(semesterQuery.data?.find(semester => semester.id === form.values.activityPlanStartId)?.startDate!).setHours(0, 0, 0, 0);
                const endSemesterEndDate = new Date(semesterQuery.data?.find(semester => semester.id === form.values.activityPlanEndId)?.endDate!).setHours(0, 0, 0, 0);
                if (startSemesterStartDate && (endSemesterEndDate < startSemesterStartDate)) return "Học kỳ ra không hợp lệ, vui lòng chọn học kỳ có thời gian kết thúc diễn ra sau học kỳ vào";
                return null;
            },
            coeDegreeLevelId: (value) => value ? null : 'Không được để trống',
            coeProgramId: (value) => value ? null : 'Không được để trống',
        }
    });

    const enrollmentBatchCreateOrUpdateMutation = useMutation({
        mutationFn: async (enrollmentBatchData: EnrollmentBatchDTO) => {
            let response = await baseAxios.post(form.values.id === 0 ? '/COEGrade/Create' : '/COEGrade/Update', enrollmentBatchData)
            if (response.data.isSuccess === 0) throw new Error('Xảy ra lỗi, vui lòng thử lại');
        },
        onSuccess: (response) => {
            showGeneralSuccessNotification();
            queryClient.invalidateQueries({ queryKey: ["EnrollmentBatchs"] });
            formHandler.close();
        },
        onError: () => {
            showGeneralErrorNotification();
        },
    });

    const handleOnSubmitForm = async () => {
        enrollmentBatchCreateOrUpdateMutation.mutate({ ...form.getValues() });
    };

    return (
        <form onSubmit={form.onSubmit((values) => {
            handleOnSubmitForm();
        })}>
            <Stack>
                <TextInput
                    disabled={form.values.id !== 0}
                    withAsterisk
                    label="Mã khóa"
                    placeholder="Nhập mã khóa"
                    {...form.getInputProps("code")}
                />
                <TextInput
                    withAsterisk
                    label="Tên khóa"
                    placeholder="Nhập tên khóa"
                    {...form.getInputProps("name")}
                />
                <Select
                    clearable
                    searchable
                    withAsterisk
                    nothingFoundMessage="Không tìm thấy dữ liệu"
                    placeholder='Chọn năm học - học kỳ vào'
                    label='Năm học - Học kỳ vào'
                    data={
                        semesterQuery.data?.map((semester) => ({
                            value: semester.id.toString(),
                            label: `${semester.name}` || "không có dữ liệu tên",
                        })) ?? []
                    }
                    value={form.values.activityPlanStartId !== null ? form.values.activityPlanStartId?.toString() : ""}
                    onChange={(value) => form.setFieldValue("activityPlanStartId", value ? parseInt(value) : null)}
                    error={form.errors.activityPlanStartId}
                />
                <Select
                    clearable
                    searchable
                    withAsterisk
                    nothingFoundMessage="Không tìm thấy dữ liệu"
                    placeholder='Chọn năm học - học kỳ ra'
                    label='Năm học - Học kỳ ra'
                    data={
                        semesterQuery.data?.map((semester) => ({
                            value: semester.id.toString(),
                            label: `${semester.name}` || "không có dữ liệu tên",
                        })) ?? []
                    }
                    value={form.values.activityPlanEndId !== null ? form.values.activityPlanEndId?.toString() : ""}
                    onChange={(value) => form.setFieldValue("activityPlanEndId", value ? parseInt(value) : null)}
                    error={form.errors.activityPlanEndId}
                />
                <Select
                    clearable
                    searchable
                    withAsterisk
                    nothingFoundMessage="Không tìm thấy dữ liệu"
                    placeholder='Chọn bậc hệ đào tạo'
                    label="Bậc hệ đào tạo"
                    data={
                        programFormatQuery.data?.map((programFormat) => ({
                            value: programFormat.id.toString(),
                            label: `${programFormat.code} - ${programFormat.name}` || "không có dữ liệu tên",
                        })) ?? []
                    }
                    value={form.values.coeDegreeLevelId !== null ? form.values.coeDegreeLevelId?.toString() : ""}
                    onChange={(value) => form.setFieldValue("coeDegreeLevelId", value ? parseInt(value) : null)}
                    error={form.errors.coeDegreeLevelId}
                />
                <Select
                    clearable
                    searchable
                    withAsterisk
                    nothingFoundMessage="Không tìm thấy dữ liệu"
                    placeholder='Chọn chương trình'
                    label="Chương trình"
                    data={
                        programQuery.data?.map((program) => ({
                            value: program.id.toString(),
                            label: `${program.code} - ${program.name}` || "không có dữ liệu tên",
                        })) ?? []
                    }
                    value={form.values.coeProgramId !== null ? form.values.coeProgramId?.toString() : ""}
                    onChange={(value) => form.setFieldValue("coeProgramId", value ? parseInt(value) : null)}
                    error={form.errors.coeProgramId}
                />
                <Textarea
                    label="Ghi chú"
                    placeholder="Nhập dữ liệu"
                    minRows={4}
                    {...form.getInputProps("note")}
                />
                <Button mt={5} type='submit' w={"100%"}>Lưu</Button>
            </Stack>
        </form >
    );
}