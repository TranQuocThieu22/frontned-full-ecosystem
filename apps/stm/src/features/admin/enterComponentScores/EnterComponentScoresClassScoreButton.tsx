"use client"
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomColumnDef, CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import { utils_notification_show } from "@/utils/notification";
import { Button, Center, Checkbox, Group, NumberInput, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import EnterComponentScoresClassInfo from './EnterComponentScoresClassInfo';
import { IClassScoreEntry, IProgram, IScoreConfig, ICourseTimeCluster, ITimeCluster, ICourse, CourseSectionLecturer } from './interfaces';


export default function EnterComponentScoresClassScoreButton(
    { data }: { data: IClassScoreEntry }
) {
    const disc = useDisclosure(false)
    const queryClient = useQueryClient()

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })

    const [studentConfigScore, setStudentConfigScore] = useState<{ userId: number; scoreConfigId: number; CourseSectionId: number; point: number; test?: number }[]>([]);

    const updateStudentConfigScore = (
        prev: typeof studentConfigScore,
        userId: number,
        scoreConfigId: number,
        courseSectionId: number,
        point: number,
        testId?: number
    ) => {
        const existingIndex = prev.findIndex(
            (item) => item.userId === userId && item.scoreConfigId === scoreConfigId
        );

        if (existingIndex !== -1) {
            return prev.map((item, index) =>
                index === existingIndex ? { ...item, point } : item
            );
        }

        return [
            ...prev,
            {
                id: testId,
                userId,
                scoreConfigId,
                CourseSectionId: courseSectionId,
                point,
            },
        ];
    };

    const StudentListQuery = useQuery<ITest[]>({
        queryKey: [`EnterComponentScoresStudentList`, data.id],
        queryFn: async () => {
            const response = await baseAxios.post("/Course/GetStudent", {
                "courseTimeClusterId": 0,
                "courseSectionId": data?.id,
                "courseIds": [],
                "pageSize": 0,
                "pageNumber": 0
            });
            return response.data.data
        },
        enabled: disc[0]
    })

    const programDetailQuery = useQuery<IProgram>({
        queryKey: [`EnterComponentScoresProgramDetail`, data.id],
        queryFn: async () => {
            const response = await baseAxios.get(`/Program/ProgramDetail?programId=${data.courseTimeCluster.course.programId}`);
            return response.data.data;
        },
        enabled: disc[0]
    })

    const form = useForm()

    function updateRow(id?: number, updatedFields?: Partial<ITest>) {
        const rootData = queryClient.getQueryData<ITest[]>([`EnterComponentScoresStudentList`, data.id])
        const updatedData = rootData?.map(item =>
            item.id == id ? { ...item, ...updatedFields } : item
        )
        queryClient.setQueryData([`EnterComponentScoresStudentList`, data.id], updatedData)
    }

    const columns = useMemo<CustomColumnDef<ITest>[]>(() => [
        {
            header: "Họ tên",
            accessorKey: "user.fullName",
        },
        {
            header: "Giới tính",
            accessorKey: "user.gender",
        },
        {
            header: "Ngày sinh",
            accessorKey: "user.dateOfBirth",
            accessorFn(originalRow) {
                return utils_date_dateToDDMMYYYString(new Date(originalRow.dateOfBirth!));
            },
        },
        ...(programDetailQuery.data?.scoreConfigs
            ?.filter((config) => config.scoreType === 1)
            ?.map((config) => ({
                header: config.code,
                accessorKey: `${config.id}`,
                accessorFn: (row: any) => {
                    if (!row) return null;
                    const tmp = row.user.courseSectionStudentPoints
                    const pointConfig = tmp
                        .filter((item: any) => item.userId == row.user.id)
                        .filter((item: any) => item.scoreConfigId == config.id)
                        .filter((item: any) => item.courseSectionId == row.courseSectionId)
                        .map((item: any) => item.point)[0]

                    return (
                        <NumberInput
                            hideControls
                            value={pointConfig}
                            defaultValue={pointConfig}
                            min={0}
                            clampBehavior="strict"
                            allowNegative={false}
                            onBlur={(event) => {
                                const inputValue = (event.target as HTMLInputElement).value;
                                const parsedValue = parseInt(inputValue, 10);
                                updateRow(row.id, { [config.id]: parsedValue });
                                const test = tmp.find((item: any) => item.userId === row.userId && item.scoreConfigId === config.id);
                                setStudentConfigScore(prev =>
                                    updateStudentConfigScore(prev, row.user.id, config.id, row.courseSectionId, parsedValue, test?.id)
                                );
                            }}
                        />
                    );
                },
            })) ?? []),
        {
            header: "Tổng kết",
            accessorKey: "totalPoint",
        },
        {
            header: "Đạt",
            accessorKey: "isPass",
            accessorFn: (originalRow) => (
                <Center>
                    <Checkbox color="green" readOnly checked={originalRow.isPass || false} onChange={() => { }} />
                </Center>
            ),
            size: 100
        },
    ], [programDetailQuery.data]);

    useEffect(() => {
        programDetailQuery.refetch();
    }, [data]);

    return (
        <CustomButtonModal
            modalProps={{ size: "80%", title: "Nhập điểm thành phần" }}
            buttonProps={{ variant: 'light', color: 'orange', children: "Nhập điểm" }}
            disclosure={disc}
        >
            <form onSubmit={form.onSubmit(() => {
                disc[1].close()
            })}>
                <Stack>
                    {programDetailQuery.data && (
                        <EnterComponentScoresClassInfo data={data} programDetailData={programDetailQuery.data} />
                    )}
                    {StudentListQuery.data &&
                        <CustomDataTable
                            initialState={{
                                density: "xs",
                                pagination: { pageIndex: 0, pageSize: 10 },
                            }}
                            columns={columns}
                            data={StudentListQuery.data!}
                            renderTopToolbarCustomActions={() => (
                                <Group>
                                    <Button onClick={async () => {
                                        await baseAxios.put("/CourseSection/StudentPointResult", studentConfigScore)
                                        utils_notification_show({ crudType: "update", message: "Dữ liệu được lưu thành công!" })
                                    }}>
                                        Lưu và tổng kết
                                    </Button>
                                </Group>
                            )}
                        />
                    }
                </Stack>
            </form>
        </CustomButtonModal>
    )
}

interface ITest {
    id?: number;
    dateOfBirth?: Date | undefined;
    isPass?: boolean;
    scoreConfigs?: IScoreConfig[];
}
