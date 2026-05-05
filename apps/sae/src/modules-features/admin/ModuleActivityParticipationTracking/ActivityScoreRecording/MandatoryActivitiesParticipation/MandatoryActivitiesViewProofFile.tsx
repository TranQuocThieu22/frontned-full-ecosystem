"use client"

import { service_event } from '@/api/services/service_event';
import { Group, Image } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEye } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { IMandatoryActivitiesEventInfoViewModel } from './interfaces/IMandatoryActivitiesParticipationViewModel';
import { useCustomReactQuery } from '@aq-fe/core-ui/shared/hooks/useCustomReactQuery';
import { CustomButtonModal } from '@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal';

export default function MandatoryActivitiesViewProofFile({ eventValue }: { eventValue: IMandatoryActivitiesEventInfoViewModel }) {
    const [fileUrl, setFileUrl] = useState('');
    const [isImage, setIsImage] = useState(false);

    const disc = useDisclosure();

    const fileDataQuery = useCustomReactQuery({
        queryKey: ["getEventFile"],
        axiosFn: () => service_event.getFile({ filePath: eventValue.proofPath?.toString() || '' }),
        options: { enabled: disc[0] }
    })

    useEffect(() => {
        const base64String = fileDataQuery.data?.fileBase64String;
        const fileExtension = fileDataQuery.data?.fileExtension?.toLowerCase();


        if (base64String) {
            if (fileExtension === '.pdf') {

                const fileBlob = base64ToBlob(base64String, 'application/pdf');
                const fileUrl = URL.createObjectURL(fileBlob);
                setFileUrl(fileUrl);

                setIsImage(false);
            } else if (fileExtension === '.png' || fileExtension === '.jpg' || fileExtension === '.jpeg') {
                const fileBlob = base64ToBlob(base64String, 'image/png');
                const fileUrl = URL.createObjectURL(fileBlob);
                setFileUrl(fileUrl);

                setIsImage(true);
            }
        }
        return () => {
            // Cleanup the object URL when component unmounts or file changes
            if (fileUrl) {
                URL.revokeObjectURL(fileUrl);
            }
        };
    }, [fileDataQuery.data]);


    const base64ToBlob = (base64: string, mimeType: string) => {
        const byteCharacters = atob(base64); // Decode base64 string
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
            const slice = byteCharacters.slice(offset, offset + 1024);
            const byteNumbers = new Array(slice.length);

            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        return new Blob(byteArrays, { type: mimeType });
    };

    return (
        <Group>
            <CustomButtonModal
                isActionIcon
                modalProps={{
                    size: "70%",
                    title: "Xem file"

                }}
                actionIconProps={{
                    variant: "transparent",
                    children: <IconEye color="black" />

                }}
                disclosure={disc}
            >
                <div>
                    {fileUrl && (
                        isImage ? (
                            <Image
                                src={fileUrl}
                                alt="File Preview"
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    objectFit: 'contain',
                                }}
                            />
                        ) : (
                            <iframe
                                src={fileUrl}
                                style={{
                                    width: '100%',
                                    height: '80vh',
                                    flexGrow: 1,
                                    border: 'none',
                                }}
                                title="File Preview"
                            />
                        )
                    )}
                </div>
            </CustomButtonModal>
        </Group>
    )
}
