"use client"
import { FileInput, Grid, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconFileUpload, IconX } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Children, useEffect, useState } from 'react';
import { IMandatoryActivitiesEventInfoViewModel } from './interfaces/IMandatoryActivitiesParticipationViewModel';
import axiosInstance from '@aq-fe/core-ui/shared/configs/axiosInstance';
import { CustomButtonModal } from '@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal';
import { CustomButton } from '@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton';

export default function MandatoryActivitiesUploadProofFile({ eventValue }: { eventValue: IMandatoryActivitiesEventInfoViewModel }) {
    const [fileData, setFileData] = useState<{}>({});
    const [fileInput, setFileInput] = useState<File | null>(null);

    const disc = useDisclosure();
    const queryClient = useQueryClient();

    const ENDPOINT = 'Event/EventAddFile'

    const uploadPDFFileMutate = useMutation(
        {
            mutationFn: async (fileData: {}) => {
                const params = `?eventId=${eventValue.id}`;
                const response = await axiosInstance.post(`${ENDPOINT}${params}`, fileData);

                return response.data;
            },
            onSuccess: () => {
                notifications.show({
                    title: 'Cập nhật thành công',
                    message: 'File đã được đăng tải',
                    color: 'green'
                })

                disc[1].close();
                queryClient.invalidateQueries();
            },
        }
    );

    useEffect(() => {
        if (fileInput === null) return

        const reader = new FileReader();

        reader.onloadend = () => {
            const pdfData = reader.result?.toString();

            if (pdfData && pdfData.length > 0) {
                const fileBase64String = pdfData.split(',')[1];
                const fileExtension = fileInput.name.split('.').pop()?.toLowerCase();

                const fileData = {
                    "eventId": eventValue.id,
                    "fileName": fileInput.name,
                    "fileExtension": fileExtension,
                    "fileBase64String": fileBase64String,
                }

                setFileData(fileData);
            }
        };

        reader.readAsDataURL(fileInput);
    }, [fileInput])

    return (
        <Group>
            <CustomButtonModal
                isActionIcon
                modalProps={{
                    size: "500px",
                    title: "Upload file"

                }}
                actionIconProps={{
                    variant: "transparent",
                    children: <IconFileUpload color="black" />

                }}
                disclosure={disc}
            >
                <FileInput
                    label="File minh chứng"
                    placeholder='Chọn file'
                    accept='application/pdf, image/*'
                    onChange={(fileInput) => {
                        setFileInput(fileInput);
                    }}
                />

                <Grid align="flex-start">
                    <Grid.Col span={{ base: 12, sm: 6.5, lg: 9.2 }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <CustomButton
                                onClick={
                                    () => {
                                        uploadPDFFileMutate.mutate(fileData);
                                    }
                                }
                                leftSection={<IconFileUpload size={24} />}
                                variant="outline"
                                color="blue">
                                Upload
                            </CustomButton>
                        </div>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 5, lg: 2.8 }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <CustomButton
                                onClick={() => disc[1].close()}
                                leftSection={<IconX size={24} />}
                                variant="outline"
                                color="red">
                                Đóng
                            </CustomButton>
                        </div>
                    </Grid.Col>
                </Grid>
            </CustomButtonModal>
        </Group>
    )
}
