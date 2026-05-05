'use client'
import { addressService } from "@/shared/APIs/addressService";
import { branchService } from "@/shared/APIs/branchService";
import { roomTypeService } from "@/shared/APIs/roomTypeService";
import { Address } from "@/shared/interfaces/address";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { NumberInput, Select, Stack, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";

export default function ClassroomListCreateUpdate({ values }: { values?: Address }) {
    const isUpdate = !!values

    const roomTypeQuery = useCustomReactQuery({
        queryKey: ["roomTypeService.getAll"],
        axiosFn: () => roomTypeService.getAll()
    })

    const branchQuery = useCustomReactQuery({
        queryKey: ["branchService.getAll"],
        axiosFn: () => branchService.getAll()
    })

    const form = useForm<Address>({
        mode: "uncontrolled",
        validate: {
            code: (value) => value
                ? /^[A-Za-z0-9][A-Za-z0-9-]+$/.test(value)
                    ? null
                    : "Chỉ được nhập ký tự thường, số, và dấu '-'"
                : "Không được để trống",
            name: (value) => value ? null : "Không được để trống",
        }
    })

    useEffect(() => {
        const newValues = {
            ...values,
            note: values?.note || "",
        }
        form.setInitialValues(newValues)
        form.setValues(newValues)
    }, [values])

    return (
        <CustomButtonCreateUpdate
            isUpdate={isUpdate}
            form={form}
            modalProps={{ title: isUpdate ? "Sửa phòng học" : "Thêm phòng học" }}
            onSubmit={(formValues) => {
                const { branch, roomType, ...body } = formValues
                return isUpdate ? addressService.update(body) : addressService.create(body)
            }}
        >
            <Stack>
                <TextInput label="Mã phòng" disabled={isUpdate} {...form.getInputProps("code")} />
                <TextInput label="Tên phòng" {...form.getInputProps("name")} />
                <Select
                    label="Chi nhánh"
                    clearable
                    placeholder="Chọn chi nhánh"
                    data={branchQuery.data?.map((item) => ({ value: item.id!.toString(), label: item.name ?? "" })) ?? []}
                    value={form.getValues().branchId?.toString()}
                    onChange={(v) => form.setFieldValue("branchId", v ? parseInt(v) : undefined)}
                />
                <TextInput label="Dãy" {...form.getInputProps("block")} />
                <NumberInput label="Sức chứa học" {...form.getInputProps("capacity")} />
                <NumberInput label="Sức chứa thi" {...form.getInputProps("testCapacity")} />
                <Select
                    label="Tính chất phòng"
                    clearable
                    placeholder="Chọn tính chất"
                    data={roomTypeQuery.data?.map((item) => ({ value: item.id!.toString(), label: item.name ?? "" })) ?? []}
                    value={form.getValues().roomTypeId?.toString()}
                    onChange={(v) => form.setFieldValue("roomTypeId", v ? parseInt(v) : undefined)}
                />
                <Textarea label="Ghi chú" {...form.getInputProps("note")} />
            </Stack>
        </CustomButtonCreateUpdate>
    )
}
