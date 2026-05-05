'use client'
import { showGeneralErrorNotification, showGeneralSuccessNotification } from "@/components/domain/ModuleNotification/CommonNotification";
import { AppPage } from "@/data/enum/app-page.enum";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { Button, Fieldset, Grid, Group, Loader, NumberInput, Select, Stack, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCheck, IconChevronsRight } from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SemesterInfoViewModel } from "../../Institution&Organization/Semester/semester-table";
import SubjectTable, { SubjectInfoViewModel } from "../../Institution&Organization/Subject/subject-table";

interface Props {
    enrollmentBatchId: number;
    curriculumSubjectId: number;
    startSemesterId: number;
    endSemesterId: number;
    formHandler: any
}

export interface CurriculumSubjectDTO {
    id: number,
    code?: string | null,
    name?: string | null,
    concurrencyStamp?: string,
    isEnabled: boolean,
    coeGradeId?: number | null,
    coeSubjectId?: number | null,
    activityPlanId?: number | null,
    coeSubjectGroupId?: number | null,
    order?: number | null,
    isCore?: boolean | null,
    armiValue?: string | null,
    courseSectionQuantity?: number | null,
    teachingUnitId?: number | null,
    measureUnitId: number | null,
    collectUnitId: number | null
}

export default function CurriculumSubjectForm({
    enrollmentBatchId,
    curriculumSubjectId,
    startSemesterId,
    endSemesterId,
    formHandler
}: Props) {
    const defaultCurriculumSubjectData: CurriculumSubjectDTO = {
        id: 0,
        code: null,
        name: null,
        concurrencyStamp: 'string',
        isEnabled: true,
        coeGradeId: enrollmentBatchId,
        coeSubjectId: null,
        activityPlanId: null,
        coeSubjectGroupId: null,
        order: null,
        isCore: null,
        armiValue: null,
        courseSectionQuantity: null,
        teachingUnitId: null,
        measureUnitId: null,
        collectUnitId: null
    }
    const queryClient = useQueryClient();
    const form = useForm<CurriculumSubjectDTO>({
        initialValues: {
            ...defaultCurriculumSubjectData,
        },
        validate: {
            "coeSubjectId": (value) => {
                if (value === null) return 'Vui lòng chọn môn học';
                return null;
            },
            "activityPlanId": (value) => {
                if (value === null) return 'Vui lòng chọn năm học - học kỳ';
                return null;
            },
            "coeSubjectGroupId": (value) => {
                if (value === null || value === undefined) return 'Vui lòng chọn nhóm môn học';
                return null;
            },
            // "order": (value) => {
            //     if (value === null || value?.toString().length === 0) return 'Vui lòng nhập thứ tự môn học';
            //     if (value! < 0) return 'Thứ tự môn học phải lớn hơn hoặc bằng 0';
            //     return null;
            // }
        }
    });

    const [displaySubjectInfo, setDisplaySubjectInfo] = useState<SubjectInfoViewModel | null>(null);
    const [isContinueAddingSubject, setIsContinueAddingSubject] = useState<boolean>(false);

    const curriculumSubjectByIdQuery = useQuery<CurriculumSubjectDTO[]>({
        enabled: curriculumSubjectId !== 0,
        queryKey: [`CurriculumSubject`, curriculumSubjectId],
        queryFn: async () => {
            const response = await baseAxios.get(`/COEGradeSubject/Get?id=${curriculumSubjectId}&cols=COESubject`);
            form.setValues({
                id: response.data.data.id,
                code: response.data.data.code,
                name: response.data.data.name,
                concurrencyStamp: response.data.data.concurrencyStamp,
                isEnabled: response.data.data.isEnabled,
                coeGradeId: response.data.data.coeGradeId,
                coeSubjectId: response.data.data.coeSubjectId,
                activityPlanId: response.data.data.activityPlanId,
                coeSubjectGroupId: response.data.data.coeSubjectGroupId,
                order: response.data.data.order,
                isCore: response.data.data.isCore,
                armiValue: response.data.data.armiValue,
                courseSectionQuantity: response.data.data.courseSectionQuantity,
                teachingUnitId: response.data.data.teachingUnitId,
                measureUnitId: response.data.data.measureUnitId,
                collectUnitId: response.data.data.collectUnitId
            })
            setDisplaySubjectInfo(response.data.data.coeSubject);
            return response.data.data || [];
        },
        refetchOnWindowFocus: false,
    });

    const semestersQuery = useQuery<SemesterInfoViewModel[]>({
        queryKey: ["Semesters"],
        queryFn: async () => {
            let response = await baseAxios.get(`/ActivityPlan/ActivityPlanOnlyGetAll`)
            return response.data.data
        },
        refetchOnWindowFocus: false,
        select: (data) => data.filter(semester => (
            semester.startDate! >= data.find(semester => semester.id === startSemesterId)?.startDate! &&
            semester.endDate! <= data.find(semester => semester.id === endSemesterId)?.endDate!
        )).sort((a, b) => {
            return a.code!.localeCompare(b.code!, undefined, { sensitivity: 'base' });
        })
    });


    const subjectGroupsQuery = useQuery<any[]>({
        queryKey: ["SubjectGroups"],
        queryFn: async () => {
            let response = await baseAxios.get(`/COESubjectGroup/GetAll`)
            return response.data.data
        },
        refetchOnWindowFocus: false,
    });

    const selectSubjectFromList = (subject: SubjectInfoViewModel) => {
        form.setValues({
            ...form.values,
            coeSubjectId: subject.id,
            order: form.values.order === null ? null : form.values.order
        });
        setDisplaySubjectInfo(subject);
    }

    const removeSubjectSelection = () => {
        form.setValues({
            ...form.values,
            coeSubjectId: null
        });
        setDisplaySubjectInfo(null);
    }

    const curriculumSubjectCreateOrUpdateMutation = useMutation({
        mutationFn: async (curriculumSubjectData: CurriculumSubjectDTO) => {
            let response = await baseAxios.post(form.values.id === 0 ? '/COEGradeSubject/Create' : '/COEGradeSubject/Update', curriculumSubjectData)
            if (response.data.isSuccess === 0) throw new Error('Xảy ra lỗi, vui lòng thử lại');
        },
        onSuccess: async (response) => {
            showGeneralSuccessNotification();
            await Promise.all([
                queryClient.refetchQueries({ queryKey: ["CurriculumSubjects"] }),
                queryClient.refetchQueries({ queryKey: ["ActivatedEnrollmentBatchs"] })
            ]);
            if (isContinueAddingSubject) {
                form.reset()
            } else {
                formHandler.close()
            }
        },
        onError: () => {
            showGeneralErrorNotification();
        },
    });


    const handleOnSubmitFormAndCloseModal = async () => {
        if (form.validate().hasErrors) return;
        if (form.getValues().order?.toString() === '') form.setValues({ ...form.values, order: null });
        setIsContinueAddingSubject(false);
        curriculumSubjectCreateOrUpdateMutation.mutate({ ...form.getValues() });
    }

    const handleOnSubmitFormAndContinue = async () => {
        if (form.validate().hasErrors) return;
        if (form.getValues().order?.toString() === '') form.setValues({ ...form.values, order: null });
        setIsContinueAddingSubject(true);
        curriculumSubjectCreateOrUpdateMutation.mutate({ ...form.getValues() });
    }

    return (
        <>
            <form
                onSubmit={form.onSubmit((values) => {
                    handleOnSubmitFormAndCloseModal();
                })}
            >
                <Grid h={form.values.id === 0 ? '70vh' : 'auto'}>
                    <Grid.Col span={form.values.id === 0 ? { base: 12, sm: 6, md: 5, xl: 4 } : { base: 12 }} order={{ base: 2, sm: 1 }}>
                        <Stack>
                            <Fieldset legend="Môn học đã chọn">
                                {form.getValues().coeSubjectId !== null ?
                                    <Stack gap={12}>
                                        <Group mt={5} gap={6}>
                                            <Text fw={500}>Tên môn học:</Text>
                                            <Text>{displaySubjectInfo?.name}</Text>
                                        </Group>
                                        <Group gap={6}>
                                            <Text fw={500}>Tên môn học (EN):</Text>
                                            <Text>{displaySubjectInfo?.nameEg}</Text>
                                        </Group>
                                        <Group gap={6}>
                                            <Text fw={500}>Số tiết:</Text>
                                            <Text>{displaySubjectInfo?.numberPeriod}</Text>
                                        </Group>
                                        <Group gap={6}>
                                            <Text fw={500}>Số tín chỉ:</Text>
                                            <Text>{displaySubjectInfo?.numberCredit}</Text>
                                        </Group>
                                        <Group gap={6}>
                                            <Text fw={500}>Khoa quản lý:</Text>
                                            <Text>{displaySubjectInfo?.department?.name}</Text>
                                        </Group>
                                        {
                                            form.values.id === 0 &&
                                            <Group gap={6} justify="flex-end">
                                                <Button variant="outline" color='red.8' onClick={removeSubjectSelection}>Xóa lựa chọn</Button>
                                            </Group>
                                        }
                                    </Stack>
                                    :
                                    <Text>Chưa có môn học nào được chọn</Text>
                                }
                            </Fieldset>
                            <Fieldset legend="Thiết lập">
                                <Stack>
                                    <NumberInput
                                        w={"100%"}
                                        label="Thứ tự"
                                        placeholder="Nhập thứ tự môn học"
                                        min={0}
                                        {...form.getInputProps("order")}
                                    // value={form.values.order === null ? "" : form.values.order}
                                    />
                                    <Select
                                        w={"100%"}
                                        withAsterisk
                                        clearable
                                        searchable
                                        nothingFoundMessage="Không tìm thấy dữ liệu"
                                        label="Năm học - Học kỳ"
                                        placeholder="Chọn năm học - học kỳ"
                                        disabled={semestersQuery.isFetching}
                                        rightSection={semestersQuery.isFetching ? <Loader size="xs" /> : null}
                                        data={semestersQuery.data?.map((item) => (
                                            {
                                                value: item.id?.toString() || "",
                                                label: `${item.code} - ${item.name}` || ""
                                            }
                                        )) ?? []}
                                        value={form.values.activityPlanId !== null ? form.values.activityPlanId?.toString() : null}
                                        onChange={(value) => form.setFieldValue("activityPlanId", value === null ? null : parseInt(value))}
                                        error={form.errors.activityPlanId}
                                    />
                                    <Select
                                        w={"100%"}
                                        withAsterisk
                                        clearable
                                        searchable
                                        nothingFoundMessage="Không tìm thấy dữ liệu"
                                        label="Nhóm môn học"
                                        placeholder="Chọn nhóm môn học"
                                        disabled={subjectGroupsQuery.isFetching}
                                        rightSection={subjectGroupsQuery.isFetching ? <Loader size="xs" /> : null}
                                        data={subjectGroupsQuery.data?.map((item) => (
                                            {
                                                value: item.id?.toString() || "",
                                                label: `${item.code} - ${item.name}` || ""
                                            }
                                        )) ?? []}
                                        value={form.values.coeSubjectGroupId !== null ? form.values.coeSubjectGroupId?.toString() : null}
                                        onChange={(value) => form.setFieldValue("coeSubjectGroupId", value === null ? null : parseInt(value))}
                                        error={form.errors.coeSubjectGroupId}
                                    />
                                </Stack>
                                <Group mt={20} gap={8} grow>
                                    {form.values.id === 0 &&
                                        <>
                                            <Button
                                                disabled={form.values.coeSubjectId === null}
                                                variant="outline" color="green.8" leftSection={<IconCheck size={14} />}
                                                onClick={() => handleOnSubmitFormAndCloseModal()}>
                                                Lưu và tắt biểu mẫu
                                            </Button>
                                            <Button
                                                disabled={form.values.coeSubjectId === null}
                                                variant="filled" color='blue.8' leftSection={<IconChevronsRight size={14} />}
                                                onClick={handleOnSubmitFormAndContinue}>
                                                Lưu và chọn thêm môn
                                            </Button>
                                        </>
                                    }
                                </Group>
                            </Fieldset>
                        </Stack>
                        {form.values.id !== 0 &&
                            <>
                                <Button
                                    mt={16}
                                    w={"100%"}
                                    variant="filled" color="blue"
                                    onClick={() => handleOnSubmitFormAndCloseModal()}>
                                    Lưu
                                </Button>
                            </>
                        }
                    </Grid.Col>
                    {
                        form.values.id === 0 &&
                        <Grid.Col span={{ base: 12, sm: 6, md: 7, xl: 8 }} order={{ base: 1, sm: 2 }}>
                            <Fieldset legend="Danh sách môn học">
                                <SubjectTable
                                    appPage={AppPage.CurriculumSetup}
                                    onClickSelectSubjectButton={selectSubjectFromList} />
                            </Fieldset>
                        </Grid.Col>
                    }
                </Grid>
            </form >
        </>
    )
}
