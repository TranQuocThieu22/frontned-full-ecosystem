'use client';
import { service_address } from "@/api/services/service_address";
import { Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomNumberInput } from "@aq-fe/core-ui/shared/components/input/CustomNumberInput";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { useDisclosure } from "@mantine/hooks";
import { AddressViewModel } from "@/interfaces/addressViewModel";


export default function AddressOutsideSchoolCreateButton() {
    const [fileData, setFileData] = useState<any[]>([]);
    const form = useForm<AddressViewModel>({
        initialValues: {
            code: "",
            name: "",
            capacity: undefined,
        },
        validate: {
            code: (value) => value?.trim() ? null : 'Không được để trống',
            name: (value) => value?.trim() ? null : 'Không được để trống',
            capacity: (value) => (value !== undefined && value >= 0) ? null : 'Không rỗng và không được âm',
        }
    });

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    useEffect(() => {
        form_multiple.setValues({ importedData: fileData });
    }, [fileData]);

    return (
        <Group>
            <CustomButtonCreateUpdate
                modalProps={{
                    title: "Tạo mới địa điểm tổ chức ngoài trường"
                }}
                onSubmit={async (values: any) => await service_address.create({
                    isInsiteSchool: false,
                    ...values
                })}
                form={form}
            >
                <CustomTextInput label="Mã địa điểm" {...form.getInputProps("code")} />
                <CustomTextInput label="Tên địa điểm" {...form.getInputProps("name")} />
                <CustomNumberInput min={0} max={1000000000} thousandSeparator label="Sức chứa" {...form.getInputProps("capacity")} />
            </CustomButtonCreateUpdate>
        </Group >
    );
}
