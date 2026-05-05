"use client"
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { ActionIcon, Button, Loader, Modal, NumberInput, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconEdit } from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { IGSCLO } from '../TabAssessment/Interfaces';
import { IGSMethod, IGSMethodUpdateModel } from './Interfaces';

enum formulaType {
    "Chuyên cần" = 1,
    "Quá trình" = 2,
    "Cuối kỳ" = 3
}

export default function GSAssessmentUpdateActionIcon({ GSMethodValues, gradeSubjectId, assessmentId }: { GSMethodValues?: IGSMethod, gradeSubjectId?: number, assessmentId?: number | null }) {
    const queryClient = useQueryClient();
    const discUpdateModal = useDisclosure(false);

    const allGSCLOs = useQuery<IGSCLO[]>({
        queryKey: [`GSCLOByGradeSubjectId${gradeSubjectId}`],
        queryFn: async () => {
            if (!gradeSubjectId) return [];
            const response = await baseAxios.get(`/COECLO/GetCLOBygradeSubjectId?gradeSubjectId=${gradeSubjectId}`);
            return response.data.data || [];
        },
        enabled: discUpdateModal[0],
        refetchOnWindowFocus: false,
    })

    const form = useForm<IGSMethodUpdateModel>({
        initialValues: {
            id: GSMethodValues?.id,
            code: GSMethodValues?.code,
            name: GSMethodValues?.name,
            concurrencyStamp: GSMethodValues?.concurrencyStamp,
            isEnabled: GSMethodValues?.isEnabled,
            coeSubjectAssessmentId: GSMethodValues?.coeSubjectAssessmentId,
            coecloId: GSMethodValues?.coecloId,
            questionQuantity: GSMethodValues?.questionQuantity,
            evaluation: GSMethodValues?.evaluation === null ? undefined : GSMethodValues?.evaluation,
            density: GSMethodValues?.density,
            maxPoint: GSMethodValues?.maxPoint,
        },
        validate: {
            maxPoint: (value) => value === 0 ? 'Điểm tối đa phải lớn hơn 0' : null
            // AssessmentType: (value) => value ? null : 'Không được để trống',
        }
    })

    const mutateGSAssessment = useMutation({
        mutationFn: async (values: IGSMethodUpdateModel) => {
            let response = await baseAxios.post('/COESubjectMethod/Update', form.getValues())
            if (response.data.isSuccess === 1) {
                notifications.show({
                    title: 'Thao tác thành công',
                    message: 'Dữ liệu đã được lưu',
                    color: 'green',
                })
            }

            if (response.data.isSuccess !== 1) {
                notifications.show({
                    title: 'Thao tác thất bại',
                    message: 'Dữ liệu chưa được lưu',
                    color: 'red',
                })
            }
        },
        onSuccess: (response) => {
            queryClient.invalidateQueries({
                queryKey: [`COESubjectMethodByAssessment`, assessmentId]
            });
            discUpdateModal[1].close();
        },
        onError: () => {
            //todo
        },
    });

    const handleOnClickUpdateButton = () => {
        discUpdateModal[1].open();
    }

    const handleOnSubmitUpdateForm = async (values: IGSMethodUpdateModel) => {
        mutateGSAssessment.mutate(form.getValues());
    }

    return (
        <>
            <ActionIcon
                variant="light"
                radius="sm"
                color='yellow'
                onClick={handleOnClickUpdateButton}
            >
                <IconEdit />
            </ActionIcon>
            <Modal
                opened={discUpdateModal[0]}
                onClose={discUpdateModal[1].close}
                title="Chi tiết nội dung đánh giá"
            >
                <form onSubmit={form.onSubmit((values) => {
                    handleOnSubmitUpdateForm(values);
                })}>
                    <Select
                        clearable
                        placeholder='Chọn CLO'
                        label='CLO'
                        disabled={allGSCLOs.isFetching}
                        rightSection={allGSCLOs.isFetching ? <Loader size="xs" /> : null}
                        data={
                            allGSCLOs.data?.map((item) => (
                                {
                                    value: item.id?.toString() || "",
                                    label: item.code!,
                                }
                            )) || []
                        }
                        value={form.values.coecloId?.toString()}
                        onChange={(value) => form.setFieldValue("coecloId", parseInt(value!))}
                    />
                    <NumberInput
                        label='Tỷ trọng'
                        placeholder='Nhập tỷ trọng'
                        min={0}
                        allowNegative={false}
                        {...form.getInputProps('density')}
                    />
                    <TextInput
                        label='Bài đánh giá'
                        placeholder='Nhập tên bài đánh giá'
                        {...form.getInputProps('evaluation')}
                    />
                    <NumberInput
                        label='Số câu hỏi'
                        placeholder='Nhập số câu hỏi'
                        min={0}
                        allowNegative={false}
                        {...form.getInputProps('questionQuantity')}
                    />
                    <NumberInput
                        label='Điểm tối đa'
                        placeholder='Nhập điểm tối đa'
                        min={0}
                        allowNegative={false}
                        {...form.getInputProps('maxPoint')}
                    />
                    <Button mt={32} w={"100%"} type="submit">Lưu</Button>
                </form>
            </Modal>
        </>
    )
}

