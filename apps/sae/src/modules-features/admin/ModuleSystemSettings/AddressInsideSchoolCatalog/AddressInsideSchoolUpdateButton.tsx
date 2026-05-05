import { service_address } from "@/api/services/service_address";
import { Address } from "@/interfaces/address";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomNumberInput } from "@aq-fe/core-ui/shared/components/input/CustomNumberInput";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";

export default function AddressInsideSchoolUpdateButton({ data }: { data: Address }) {
    const form = useForm<Address>({
        initialValues: data,
        validate: {
            code: (value) => value?.trim() ? null : 'Không được để trống',
            name: (value) => value?.trim() ? null : 'Không được để trống',
            capacity: (value) => value ? null : 'Không được để trống',
        }
    });

    useEffect(() => {
        form.setValues(data);
    }, [data])

    return (
        <Group>
            <CustomButtonCreateUpdate
                modalProps={{
                    title: "Cập nhật địa điểm tổ chức trong trường"
                }}
                form={form}
                onSubmit={async (values) => await service_address.update({ ...values })}
            >
                <CustomTextInput readOnly label="Mã địa điểm" {...form.getInputProps("code")} />
                <CustomTextInput label="Tên địa điểm" {...form.getInputProps("name")} />
                <CustomNumberInput label="Sức chứa" {...form.getInputProps("capacity")} min={0} />
            </CustomButtonCreateUpdate>
        </Group>
    );
}
