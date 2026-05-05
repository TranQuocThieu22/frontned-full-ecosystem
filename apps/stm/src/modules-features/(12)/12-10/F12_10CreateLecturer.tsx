import baseAxios from "@/api/config/baseAxios";
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import MyDataTableSelect from "@/components/RESTAPIComponents/DataTableSelect/MyDataTableSelect";
import { ENUM_GENDER } from "@/constants/enum/global";
import { utils_converter_enumToOptions } from "@/utils/converter";
import { Group, Select } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useListState } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

interface IBranch {
    id?: number;
    code?: string;
    name?: string;
}

interface IUserBranch {
    id?: number;
    code?: null;
    name?: null;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    userId?: number;
    branchId?: number;
}

interface ICreateLecturer {
    id?: number;
    isEnabled?: true;
    isBlocked?: true;
    roleId?: number;
    userName?: string;
    passwordHash?: string;
    passWord?: string;
    code?: string;
    email?: string;
    phoneNumber?: string;
    address?: string;
    avatarPath?: string;
    fullName?: string;
    lockoutEnd?: Date;
    securityStamp?: string;
    expiresDate?: Date;
    facultyId?: number | null;
    majorsId?: number | null;
    classId?: number | null;
    workingUnitId?: number | null;
    aqModuleId?: number;
    gender?: number;
    dateOfBirth?: Date;
    educationLevel?: number;
    teachingStatus?: number;
    userBranch?: IUserBranch[];
}

export default function F12_10CreateLecturer() {
    const SelectedBranch = useListState<IBranch>()
    const AllBranch = useQuery<IBranch[]>({
        queryKey: [`F12_10BranchList`],
        queryFn: async () => {
            const response = await baseAxios.get("/Branch/GetAll");
            return response.data.data
        },
    })

    const form = useForm<ICreateLecturer>({
        initialValues: {
            id: 0,
            isEnabled: true,
            isBlocked: true,
            roleId: 6,
            userName: "",
            passwordHash: "string",
            passWord: "123456",
            code: "",
            email: "",
            phoneNumber: "",
            address: "string",
            avatarPath: "string",
            fullName: "",
            lockoutEnd: new Date(),
            securityStamp: "string",
            expiresDate: new Date(),
            facultyId: null,
            majorsId: null,
            classId: null,
            workingUnitId: null,
            aqModuleId: 3,
            gender: 1,
            dateOfBirth: undefined,
            educationLevel: 0,
            teachingStatus: 2,
        },
        validate: {
            code: (value) => {
                if (!value) {
                    return "Mã giảng viên không được để trống";
                }
            },
            fullName: (value) => {
                if (!value) {
                    return "Họ tên giảng viên không được để trống";
                }
            },
            phoneNumber: (value) => {
                if (value && value.length !== 10) {
                    return "Số điện thoại phải có độ dài đúng 10 chữ số";
                }
                if (value && !/^\d+$/.test(value)) {
                    return "Số điện thoại chỉ được chứa chữ số";
                }
            },
            email: (value) => {
                if (value && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
                    return "Email không hợp lệ";
                }
            }
        }
    });

    const branchSelectColumns = useMemo<MRT_ColumnDef<IBranch>[]>(() => [
        {
            header: "Mã chi nhánh",
            accessorKey: "code",
        },
        {
            header: "Tên chi nhánh",
            accessorKey: "name",
        },
    ], []);

    const genderOptions = utils_converter_enumToOptions(ENUM_GENDER);
    return (
        <MyButtonCreate
            modalSize={"80%"}
            objectName="giảng viên"
            form={form}
            notResetFormWhenSubmit
            onSubmit={async () => {
                let userBranch = SelectedBranch[0].map((branch) => {
                    return {
                        id: 0,
                        code: null,
                        name: null,
                        concurrencyStamp: "string",
                        isEnabled: true,
                        userId: 0,
                        branchId: branch.id
                    }
                });
                form.setFieldValue("userBranch", userBranch);
                form.setFieldValue("userName", form.values.code);
                const response = await baseAxios.post("/Account/CreateLecturer", form.getValues());
                if (response.data.isSuccess === 0) {
                    throw new Error(response.data.message);
                }
                return response;
            }}
            onError={() => {
                notifications.show({
                    color: "red",
                    message: "Tạo dữ liệu không thành công!"
                })
            }}
        >
            <MyTextInput
                withAsterisk
                label="Mã giảng viên"
                {...form.getInputProps("code")}
            />
            <MyTextInput
                withAsterisk
                label="Họ tên giảng viên"
                {...form.getInputProps("fullName")}
            />
            <Group>
                <Select
                    clearable
                    placeholder='Chọn giới tính'
                    label='Giới tính'
                    data={genderOptions}
                    value={form.values.gender?.toString()}
                    onChange={(value) => form.setFieldValue("gender", parseInt(value!))}
                />
                <Select
                    clearable
                    placeholder='Chọn bậc học'
                    label='Bậc học'
                    data={[
                        { value: "2", label: "Tiểu học" },
                        { value: "3", label: "Trung học cơ sở" },
                        { value: "4", label: "Trung học phổ thông" },
                        { value: "5", label: "Đại học" },
                        { value: "6", label: "Cao đẳng" },
                        { value: "7", label: "Cử nhân" },
                        { value: "8", label: "Thạc sĩ" },
                        { value: "9", label: "Tiến sĩ" },
                        { value: "1", label: "Khác" }
                    ]}
                    value={form.values.educationLevel?.toString()}
                    onChange={(value) => form.setFieldValue("educationLevel", parseInt(value!))}
                />
            </Group>
            <DateInput
                label="Ngày sinh"
                placeholder="Chọn ngày sinh"
                {...form.getInputProps("dateOfBirth")}
            />
            <MyTextInput
                label="Số điện thoại"
                {...form.getInputProps("phoneNumber")}
            />
            <MyTextInput
                label="Email"
                {...form.getInputProps("email")}
            />
            {AllBranch.isLoading && "Đang danh sách chi nhánh..."}
            {AllBranch.isError && "Có lỗi khi lấy dữ liệu..."}
            {AllBranch.data === undefined ? "Không có dữ liệu..."
                :
                <MyDataTableSelect
                    listLabel="Danh sách chi nhánh"
                    columns={branchSelectColumns}
                    listState={SelectedBranch as any}
                    data={AllBranch.data}
                />
            }
        </MyButtonCreate>
    );
}