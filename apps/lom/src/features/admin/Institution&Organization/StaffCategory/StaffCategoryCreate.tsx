"use client";
import MyButtonCreate from '@/components/ui/Buttons/ButtonCRUD/MyButtonCreate';
import MySelect from '@/components/ui/Combobox/Select/MySelect';
import MyTextInput from '@/components/ui/Inputs/TextInput/MyTextInput';
import { COEUnit } from '@/interfaces/shared-interfaces/COEUnit';
import { Lecturer } from '@/interfaces/shared-interfaces/Lecturer';
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { utils_notification_show } from '@aq-fe/core-ui/shared/utils/notificationUtils';
import { Group, Select, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';


export default function StaffCategoryCreate() {
    const dis = useDisclosure()
    const coeUnitQuery = useQuery<COEUnit[]>({
        queryKey: ["StaffCategory_CoeUnit_Create"],
        queryFn: async () => {
            const response = await baseAxios.get("/Department/Getall");
            return response.data.data || [];
        },
        enabled: dis[0]
    });
    const [coeUnitState, setcoeUnitState] = useState<number>(coeUnitQuery?.data?.[0]?.id ?? 0);
    const form = useForm<Lecturer>({
        initialValues: {
            id: 0,
            code: "",
            gender: 1,
            educationLevel: 1,
            dateOfBirth: "",
            phoneNumber: "",
            email: "",
            address: "",
            lastName: "",
            firstName: ""
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
        <Group>
            <MyButtonCreate
                disclosure={dis}
                objectName='nhân sự'
                form={form}
                onSubmit={async () => {
                    const body = {
                        "id": 0,
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

                    const response = await baseAxios.post("/Account/CreateLecturer", body)
                        .then((res) => {
                            utils_notification_show({ crudType: "create" });
                            return res.data.data || [];
                        }).catch((err) => {
                            utils_notification_show({ crudType: "error" });
                            console.error(err);
                        })
                    return response;
                }}
            >
                <MyTextInput label="Mã nhân sự" {...form.getInputProps("code")} />
                <MyTextInput label="Họ" {...form.getInputProps("lastName")} />
                <MyTextInput label="Tên" {...form.getInputProps("firstName")} />
                <Select
                    label="Giới tính"
                    data={[{ value: "1", label: "Nam" }, { value: "2", label: "Nữ" }]}
                    defaultValue={"1"}
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
            </MyButtonCreate>
        </Group>
    );
}
