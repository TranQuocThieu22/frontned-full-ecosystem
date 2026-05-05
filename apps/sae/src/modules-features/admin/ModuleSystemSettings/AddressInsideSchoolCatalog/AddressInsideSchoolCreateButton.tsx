import { service_address } from "@/api/services/service_address";
import { AddressViewModel } from "@/interfaces/addressViewModel";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomNumberInput } from "@aq-fe/core-ui/shared/components/input/CustomNumberInput";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { Group } from '@mantine/core';
import { useForm } from "@mantine/form";

export default function AddressInsideSchoolCreateButton() {
    const form = useForm<AddressViewModel>({
        initialValues: {
            code: "",
            name: "",
            capacity: 0,
            isInsiteSchool: true,
        },
        validate: {
            code: (value) => value?.trim() ? null : 'Không được để trống',
            name: (value) => value?.trim() ? null : 'Không được để trống',
            capacity: (value) => value ? null : 'Không được để trống',
        }
    });

    return (
        <Group>
            <CustomButtonCreateUpdate
                modalProps={{
                    title: "Tạo mới địa điểm tổ chức trong trường"
                }}
                onSubmit={async (values) => await service_address.create({
                    ...values
                })}
                form={form}
            >
                <CustomTextInput label="Mã địa điểm" {...form.getInputProps("code")} />
                <CustomTextInput label="Tên địa điểm" {...form.getInputProps("name")} />
                <CustomNumberInput label="Sức chứa" {...form.getInputProps("capacity")} min={0} />
            </CustomButtonCreateUpdate>
        </Group >
    );
}
