"use client"
import { service_event } from '@/api/services/service_event';
import { Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconFileExport } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { IYouthUnionParticipationEventInfoViewModel } from './interfaces/IYouthUnionParticipationViewModel';
import { CustomButtonCreateUpdate } from '@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate';
import { CustomFileInput } from '@aq-fe/core-ui/shared/components/input/CustomFileInput';


export default function YouthUnionUploadProofFile({ eventValue }: { eventValue: IYouthUnionParticipationEventInfoViewModel }) {
    const [fileData, setFileData] = useState<File>();
    const disc = useDisclosure();
    const form = useForm({
        initialValues: {
            eventId: eventValue.id,
            fileName: "",
            fileExtension: "",
            fileBase64String: "",
        },
        validate: {
            fileBase64String: (value) => value ? null : 'Không được để trống',
        }
    })

    const handleFileChange = (file?: File) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            const base64 = reader.result?.toString().split(",")[1];
            const extension = file.name.split(".").pop();

            form.setValues({
                fileName: file.name,
                fileExtension: extension || "",
                fileBase64String: base64 || "",
            });
            setFileData(file);
        };

        reader.readAsDataURL(file);
    };

    useEffect(() => {
        if (!disc[0]) {
            form.reset();
            setFileData(undefined);
        }
    }, [disc[0]]);

    return (
        <Group>
            <CustomButtonCreateUpdate
                isUpdate
                form={form}
                modalProps={{
                    size: '500px',
                    title: "Upload file"
                }}
                actionIconProps={{
                    variant: "transparent",
                    children: <IconFileExport color="black" />
                }}
                //todo Coi lại cái này
                onSubmit={async () => {
                    return await service_event.eventAddFile({
                        eventId: eventValue.id || 0,
                    }, {
                        fileData: [form.values]
                    });
                    disc[1].close();
                }}
                disclosure={disc}
            >
                {/* <CustomFileInput label="File minh chứng" value={fileData} placeholder='Chọn file' onChange={(value) => handleFileChange(value || undefined)} /> */}
            </CustomButtonCreateUpdate>
        </Group>
    )
}
