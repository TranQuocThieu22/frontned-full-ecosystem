import { service_address } from "@/api/services/service_address";
import { Address } from "@/interfaces/address";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomNumberInput } from "@aq-fe/core-ui/shared/components/input/CustomNumberInput";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";

export default function AddressOutsideSchoolUpdateButton({ data }: { data: Address }) {
    const form = useForm<Address>({
        initialValues: data,
        validate: {
            code: (value) => value?.trim() ? null : 'Không được để trống',
            name: (value) => value?.trim() ? null : 'Không được để trống',
            capacity: (value) => (value !== undefined && value >= 0) ? null : 'Không rỗng và không được âm',
        }
    });
    useEffect(() => {
        form.setValues(data);
    }, [data])
    return (
        <Group>
            <CustomButtonCreateUpdate
                isUpdate
                form={form}
                onSubmit={async (values) => await service_address.update({ ...values })}
            >
                <CustomTextInput readOnly label="Mã đơn vị" {...form.getInputProps("code")} />
                <CustomTextInput label="Tên đơn vị" {...form.getInputProps("name")} />
                <CustomNumberInput min={0} max={1000000000} thousandSeparator label="Sức chứa" {...form.getInputProps("capacity")} />
            </CustomButtonCreateUpdate>
        </Group>
    );
}
