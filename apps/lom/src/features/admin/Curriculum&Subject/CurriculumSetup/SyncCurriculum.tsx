'use client';
import { makeEnum } from "@/utils/enum";
import { AQDataSynchronizationService } from "@aq-fe/core-ui/shared/APIs/AQDataSynchronizationService";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import CustomButtonModalSync from "@aq-fe/core-ui/shared/components/withAPI/CustomButtonModalSync";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Box, Button, Divider, Group, LoadingOverlay, Modal, Radio, Space, Tabs, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import { SyncConfirmPrompt } from "./SyncConfirmPrompt";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNotification, showGeneralSuccessNotification } from "@/components/domain/ModuleNotification/CommonNotification";
import axios from "axios";

interface SyncCurriculumProps {
    LOMCurriculumId?: number | null;
}

const SyncOrigin = makeEnum({
    EdusoftImplementedCurriculum: 1,
    EdusoftPlannedCurriculum: 2
});

export default function SyncCurriculum({
    LOMCurriculumId
}: SyncCurriculumProps) {
    const queryClient = useQueryClient();
    const [syncOrigin, setSyncOrigin] = useState<number | null>(SyncOrigin.EdusoftPlannedCurriculum);
    const [selectedOriginCurriculumId, setSelectedOriginCurriculumId] = useState<number | null>(null);
    const [confirmSyncModalOpened, confirmSyncModalHandler] = useDisclosure(false);

    const originCurriculumData = useCustomReactQuery<any[]>({
        queryKey: ['originCurriculums', syncOrigin],
        axiosFn: async () => {
            return syncOrigin === SyncOrigin.EdusoftImplementedCurriculum ?
                await axiosInstance.post('/AQDataSynchronization/AQImplementedCurriculum')
                :
                await axiosInstance.post('/AQDataSynchronization/AQPlannedCurriculum')
        },
    })

    const curriculumnTableColumns = useMemo<MRT_ColumnDef<any>[]>(() => [
        { header: "Mã khóa", accessorKey: "eduFieldOfStudyTemp.code" },
        { header: "Tên khóa", accessorKey: "eduFieldOfStudyTemp.name" },
        { header: "Mã Chương trình", accessorKey: "eduFieldOfStudyTemp.eduMajorTemp.code" },
        { header: "Chương trình", accessorKey: "eduFieldOfStudyTemp.eduMajorTemp.name" },
        { header: "Mã Khoa", accessorKey: "eduFieldOfStudyTemp.eduUnitTemp.code" },
        { header: "Tổng số môn học", accessorKey: "subjectCount" }
    ], []);

    const handleOnClickSelectOriginCurriculum = (row: any) => {
        setSelectedOriginCurriculumId(row.eduFieldOfStudyId);
        confirmSyncModalHandler.open();
    }

    const syncCurriculumFromEdusoftMutation = useMutation({
        mutationFn: async () => {
            let res = syncOrigin === SyncOrigin.EdusoftImplementedCurriculum ?
                await axiosInstance.post(`/AQDataSynchronization/AQCurriculumSubject?FieldOfStudyID=${selectedOriginCurriculumId}&COEGradeId=${LOMCurriculumId}`)
                : await axiosInstance.post(`/AQDataSynchronization/AQPlannedCurriculumSubject?FieldOfStudyID=${selectedOriginCurriculumId}&COEGradeId=${LOMCurriculumId}`)

            if (res.data.isSuccess !== 1) throw new Error(res.data.message);
        },
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ['ActivatedEnrollmentBatchs'] });
            confirmSyncModalHandler.close();
            showGeneralSuccessNotification();
        },
        onError: (error) => {
            createNotification({
                title: 'Thất bại',
                message: `${error.message}`,
                color: 'red',
                autoClose: 5000,
            })();
        },
    });

    const handleOnClickConfirmSyncCurriculum = async () => {
        syncCurriculumFromEdusoftMutation.mutate();
    }

    return (
        <>
            <Tabs
                variant="pills" radius="0" defaultValue="one-to-one">
                <Tabs.List>
                    <Tabs.Tab value="one-to-one" >
                        Chọn nguồn dữ liệu
                    </Tabs.Tab>
                    <Tabs.Tab value="implemented-curriculums-from-edusoft" >
                        Đồng bộ tất cả
                    </Tabs.Tab>
                </Tabs.List>
                <Divider my="0" mb={12} />

                <Tabs.Panel value="one-to-one">
                    {LOMCurriculumId ?

                        <Box h={'75vh'}>

                            <Radio.Group
                                // name="sync-origin"
                                mb={20}
                                label="Chọn nguồn dữ liệu để đồng bộ"
                                withAsterisk
                                value={syncOrigin?.toString() ?? null}
                                onChange={(value) => setSyncOrigin(Number(value))}
                            >
                                <Group mt="md">
                                    <Radio value={SyncOrigin.EdusoftPlannedCurriculum.toString()} label="Chương trình đào tạo kế hoạch" />
                                    <Radio value={SyncOrigin.EdusoftImplementedCurriculum.toString()} label="Chương trình đào tạo thực hiện" />
                                </Group>
                            </Radio.Group>
                            <CustomDataTableAPI
                                exportProps={{
                                    fileName: "Danh sách trường trình đào tạo khóa"
                                }}
                                columns={curriculumnTableColumns}
                                query={originCurriculumData}
                                enableRowSelection
                                mantineTableContainerProps={{
                                    style: { height: '50vh' }
                                }}
                                renderRowActions={({ row, table }) => {
                                    return (
                                        <CustomCenterFull>
                                            <Button onClick={() => handleOnClickSelectOriginCurriculum(row.original)}>Chọn</Button>
                                        </CustomCenterFull>
                                    )
                                }}
                            />
                            <Space h={5} />
                        </Box>
                        :
                        <Box h={'75vh'}>Chưa chọn chương trình đào tạo để thực hiện đồng bộ. Vui lòng tắt cửa sổ này và chọn 1 chương trình đào tạo.</Box>
                    }
                </Tabs.Panel>
                <Tabs.Panel value="implemented-curriculums-from-edusoft">
                    <Box h={'75vh'}>
                        <Group>
                            Đồng bộ tất cả chương trình đào tạo triển khai từ SIS
                            <CustomButtonModalSync
                                buttonProps={{
                                    children: "Thực hiện đồng bộ"
                                }}
                                axiosFn={() => AQDataSynchronizationService.AQDataTrainingProgram()}
                            />
                        </Group>
                    </Box>
                </Tabs.Panel>
            </Tabs>

            <Modal
                size={500}
                title={<Text fw={600}>Đồng bộ chương trình đào tạo từ SIS</Text>}
                opened={confirmSyncModalOpened}
                onClose={confirmSyncModalHandler.close}
            >
                <Box pos="relative">
                    <LoadingOverlay
                        visible={syncCurriculumFromEdusoftMutation.isPending}
                        zIndex={1000}
                        overlayProps={{ radius: 'sm', blur: 2 }}
                        loaderProps={{
                            color: 'pink',
                            type: 'bars',
                            children: 'Đang đồng bộ dữ liệu...'
                        }}

                    />
                    <SyncConfirmPrompt
                        onClickConfirm={handleOnClickConfirmSyncCurriculum}
                        onClickCancel={confirmSyncModalHandler.close}
                    />
                </Box>
            </Modal>
        </>
    )
}