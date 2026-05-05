"use client";
import MySelect from '@/components/ui/Combobox/Select/MySelect';
import MyTextInput from '@/components/ui/Inputs/TextInput/MyTextInput';
import { COEUnit } from '@/interfaces/shared-interfaces/COEUnit';
import { Lecturer } from '@/interfaces/shared-interfaces/Lecturer';
import { CustomButtonCreateUpdate } from '@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate';
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { Select, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export interface IUpdateUnit {
    id?: number;
    code?: string;
    name?: string;
    unitType?: number | null;
    unitId?: number | null;
    note?: string;
    unit?: IUpdateUnit | null;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date;
}

const unitType: Record<number, string> = {
    1: "Khoa",
    2: "Bộ môn",
    3: "Phòng",
    4: "Trung tâm",
};

export default function StaffCategoryUpdate({ data }: { data: Lecturer }) {
    const dis = useDisclosure()
    const coeUnitQuery = useQuery<COEUnit[]>({
        queryKey: ["StaffCategory_CoeUnit_Update"],
        queryFn: async () => {
            const response = await baseAxios.get("/Department/Getall");
            return response.data.data || [];
        },
        enabled: dis[0]
    });
    const [coeUnitState, setcoeUnitState] = useState<number>(data.workingUnitId ?? 0);
    const form = useForm<any>({
        initialValues: {
            ...data,
            dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
            lastName: data.fullName?.split(" ")[0] || "",
            firstName: data.fullName?.split(" ").slice(1).join(" ") || "",
            gender: data.gender
        },
        validate: {
            code: (value) => value ? null : "Không được để trống",
            lastName: (value) => value ? null : "Không được để trống",
            firstName: (value) => value ? null : "Không được để trống",
            dateOfBirth: (value) => value ? null : "Không được để trống",
            phoneNumber: (value) =>
                !value
                    ? "Vui lòng nhập số điện thoại"
                    : !/^\d{10}$/.test(value)
                        ? "Số điện thoại phải có đúng 10 chữ số"
                        : null,

            email: (value) => !value ||
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                ? "Email không hợp lệ"
                : null,
        }
    });
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });
    return (
        <CustomButtonCreateUpdate
            isUpdate={true}

            disclosure={dis}
            form={form}
            onSubmit={async () => {
                const body = {
                    "id": data.id,
                    "userName": form.getValues().code,
                    "passwordHash": "",
                    "passWord": "123456",
                    "code": form.getValues().code,
                    "email": form.getValues().email,
                    "phoneNumber": form.getValues().phoneNumber,
                    "fullName": `${form.getValues().lastName} ${form.getValues().firstName}`,
                    "gender": form.getValues().gender,
                    "dateOfBirth": form.getValues().dateOfBirth,
                    "workingUnitId": coeUnitState,
                }
                return baseAxios.post("/Account/Update", body)
            }}
        >
            <MyTextInput label="Mã nhân sự" {...form.getInputProps("code")} disabled />
            <MyTextInput label="Họ" {...form.getInputProps("lastName")} />
            <MyTextInput label="Tên" {...form.getInputProps("firstName")} />
            <Select
                label="Giới tính"
                data={[{ value: "1", label: "Nam" }, { value: "2", label: "Nữ" }]}
                defaultValue={form.getValues().gender?.toString()}
                onChange={(value) => form.setFieldValue("gender", parseInt(value?.toString()!))}
            />
            <DateInput
                label="Ngày sinh"
                placeholder="DD/MM/YYYY"
                valueFormat="DD/MM/YYYY"
                defaultValue={new Date()}
                {...form.getInputProps("dateOfBirth")}
            />
            <TextInput
                label="Số điện thoại 1"
                placeholder="Nhập số điện thoại 1"
                {...form.getInputProps("phoneNumber")}
                onChange={(event) => {
                    const value = event.currentTarget.value;
                    if (/^\d*$/.test(value)) {
                        form.setFieldValue("phoneNumber", value);
                    }
                }}
            />
            <MyTextInput
                label="Email 1"
                placeholder='Nhập email 1'
                {...form.getInputProps("email")}
            />
            <MySelect
                data={coeUnitQuery.data?.map((item) =>
                ({
                    value: item.id?.toString() || "",
                    label: `${item.code?.toString()} - ${item.name?.toString()}` || ""

                })) || []}
                label="Đơn vị"
                value={coeUnitState?.toString()}
                onChange={(value) => setcoeUnitState(parseInt(value!))}
            />
        </CustomButtonCreateUpdate>
    );
}
