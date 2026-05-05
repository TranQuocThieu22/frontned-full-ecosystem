"use client";
import { Grid, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IStaffViewModel } from "./interfaces/IStaffViewModel";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomCheckbox } from "@aq-fe/core-ui/shared/components/input/CustomCheckbox";
import { CustomDateInput } from "@aq-fe/core-ui/shared/components/input/CustomDateInput";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";

const genderOptions = [
    { label: "Nam", value: "Nam" },
    { label: "Nữ", value: "Nữ" },
];

const positionOptions = [
    { label: "Tiến sĩ", value: "Tiến sĩ" },
    { label: "Thạc sĩ", value: "Thạc sĩ" },
    { label: "Cử nhân", value: "Cử nhân" },
];

const departmentOptions = [
    { label: "Khoa Công nghệ Thông tin", value: "Khoa Công nghệ Thông tin" },
    { label: "Phòng Đào tạo", value: "Phòng Đào tạo" },
    { label: "Phòng Công tác Sinh viên", value: "Phòng Công tác Sinh viên" },
    { label: "Thư viện", value: "Thư viện" },
    { label: "Phòng Kế hoạch Tài chính", value: "Phòng Kế hoạch Tài chính" },
    { label: "Khoa Kinh tế", value: "Khoa Kinh tế" },
    { label: "Trung tâm Ngoại ngữ", value: "Trung tâm Ngoại ngữ" },
    { label: "Khoa Sư phạm", value: "Khoa Sư phạm" },
    { label: "Khoa Điện tử", value: "Khoa Điện tử" },
    { label: "Phòng Thanh tra", value: "Phòng Thanh tra" },
    { label: "Khoa Y học", value: "Khoa Y học" },
    { label: "Phòng Khảo thí", value: "Phòng Khảo thí" },
    { label: "Phòng Tài vụ", value: "Phòng Tài vụ" },
    { label: "Khoa Luật", value: "Khoa Luật" },
    { label: "Phòng Quản lý Khoa học", value: "Phòng Quản lý Khoa học" },
];

export default function StaffCategoriesCreateButton() {
    const form = useForm<IStaffViewModel>({
        initialValues: {
            code: "",
            lastName: "",
            firstName: "",
            gender: undefined,
            dateOfBirth: undefined,
            phoneNumber: "",
            email: "",
            position: undefined,
            department: "",
            isExternalStaff: false
        }
    });

    return (
        <CustomButtonCreateUpdate
            modalProps={{
                size: "60vw",
                title: "viên chức"
            }}

            onSubmit={() => { }}
            form={form}
        >
            <Grid>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <CustomTextInput
                        label="Mã viên chức"
                        {...form.getInputProps("code")}
                    />

                    <CustomTextInput
                        label="Họ lót"
                        {...form.getInputProps("lastName")}
                        mt="xs"
                    />

                    <CustomTextInput
                        label="Tên"
                        {...form.getInputProps("firstName")}
                        mt="xs"
                    />

                    <CustomSelect
                        label="Trình độ"
                        data={positionOptions}
                        {...form.getInputProps("position")}
                        mt="xs"
                        clearable={false}
                    />

                    <CustomSelect
                        label="Đơn vị"
                        data={departmentOptions}
                        {...form.getInputProps("department")}
                        mt="xs"
                        clearable={false}
                    />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6 }}>
                    <CustomDateInput
                        label="Ngày sinh"
                        {...form.getInputProps("dateOfBirth")}
                        clearable={false}
                    />

                    <CustomSelect
                        label="Giới tính"
                        data={genderOptions}
                        {...form.getInputProps("gender")}
                        mt="xs"
                        clearable={false}
                    />

                    <CustomTextInput
                        label="Số điện thoại"
                        {...form.getInputProps("phoneNumber")}
                        mt="xs"
                    />

                    <CustomTextInput
                        label="Email"
                        {...form.getInputProps("email")}
                        mt="xs"
                    />

                    <Group mt="xs" pt={24}>
                        <CustomCheckbox
                            label="Viên chức ngoài trường"
                            {...form.getInputProps("isExternalStaff", { type: "checkbox" })}
                        />
                    </Group>
                </Grid.Col>
            </Grid>
        </CustomButtonCreateUpdate>
    );
}

