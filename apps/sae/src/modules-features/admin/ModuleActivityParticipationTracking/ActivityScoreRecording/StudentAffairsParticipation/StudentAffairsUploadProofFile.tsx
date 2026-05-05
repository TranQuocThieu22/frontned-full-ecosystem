"use client"

import { CustomButton } from '@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton';
import { CustomButtonModal } from '@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal';
import { CustomFileInput } from '@aq-fe/core-ui/shared/components/input/CustomFileInput';
import axiosInstance from '@aq-fe/core-ui/shared/configs/axiosInstance';
import { Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconFileUpload, IconX } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { IStudentAffairsParticipationEventInfoViewModel } from './interfaces/IStudentAffairsParticipationViewModel';

export default function StudentAffairsUploadProofFile({ eventValue }: { eventValue: IStudentAffairsParticipationEventInfoViewModel }) {
    const [fileData, setFileData] = useState<{}>({});
    const [fileInput, setFileInput] = useState<File | null>(null);

    const disc = useDisclosure();
    const queryClient = useQueryClient();

    const ENDPOINT = 'Event/EventAddFile'

    const uploadFileMutate = useMutation(
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
                    size: "500px"
                }}
                actionIconProps={{
                    variant: "transparent",
                    title: "Upload file",
                    children: <IconFileUpload color="black" />
                }}
                disclosure={disc}
            >
                <CustomFileInput
                    label="File minh chứng"
                    placeholder='Chọn file'
                    accept='application/pdf, image/*'
                    onChange={(fileInput) => {
                        setFileInput(fileInput);
                    }}
                />

                <Group justify='flex-end'>
                    <CustomButton
                        onClick={() => { uploadFileMutate.mutate(fileData) }}
                        leftSection={<IconFileUpload size={24} />}
                        variant="outline"
                        color="blue">
                        Upload
                    </CustomButton>
                    <CustomButton
                        onClick={() => disc[1].close()}
                        leftSection={<IconX size={24} />}
                        variant="outline"
                        color="red">
                        Đóng
                    </CustomButton>
                </Group>
            </CustomButtonModal>
        </Group>
    )
}
