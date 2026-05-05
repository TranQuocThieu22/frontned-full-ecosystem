import baseAxios from "@/api/config/baseAxios";
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import MyDataTableSelect from "@/components/RESTAPIComponents/DataTableSelect/MyDataTableSelect";
import { ENUM_GENDER } from "@/constants/enum/global";
import { utils_converter_enumToOptions } from "@/utils/converter";
import { Group, Select } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useListState } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

interface IBranchList {
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

interface IUpdateLecturer {
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
    branchs?: IBranchList[];
}

export default function F12_10UpdateLecturer({ lecturerValues }: { lecturerValues: IUpdateLecturer }) {

    const SelectedBranchList = useListState<IBranchList>([...lecturerValues.branchs!])

    const form = useForm<IUpdateLecturer>({
        initialValues: {
            ...lecturerValues,
            dateOfBirth: new Date(lecturerValues.dateOfBirth!),
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

    const AllBranch = useQuery<IBranchList[]>({
        queryKey: [`F12_10AllBranchById`],
        queryFn: async () => {
            const response = await baseAxios.get("/Branch/GetAll");
            return response.data.data
        },
    })

    const branchSelectColumns = useMemo<MRT_ColumnDef<IBranchList>[]>(() => [
        {
            header: "Mã chi nhánh",
            accessorKey: "code",
        },
        {
            header: "Tên chi nhánh",
            accessorKey: "name",
        },
    ], []);

    const handleSelectedBranchList = (selectedBranchList: IBranchList[], userBranch: IUserBranch[]) => {
        let unSelectedBranchList = userBranch.filter(existingUb => !selectedBranchList.find(selectedB => selectedB.id === existingUb.branchId));
        let existingUserBranch = userBranch.filter(existingUb => selectedBranchList.find(selectedUb => selectedUb.id === existingUb.branchId));
        let newUserBranch = selectedBranchList.filter(selectedUb => !userBranch.find(existingUb => existingUb.branchId === selectedUb.id));
        let finalUserBranch: IUserBranch[] = [
            ...existingUserBranch,
            ...newUserBranch.map(ub => ({
                id: 0,
                code: null,
                name: null,
                concurrencyStamp: "string",
                branchId: ub.id,
                userId: lecturerValues.id,
                isEnabled: true
            })),
            ...unSelectedBranchList.map(ub => ({ ...ub, isEnabled: false }))];
        return finalUserBranch;
    }
    const genderOptions = utils_converter_enumToOptions(ENUM_GENDER);
    return (
        <MyActionIconUpdate
            modalSize={"80%"}
            form={form}
            onSubmit={async () => {
                let userBranch = handleSelectedBranchList(SelectedBranchList[0], lecturerValues.userBranch!);
                form.setFieldValue("userBranch", userBranch);
                const response = await baseAxios.post("/Account/Update", form.getValues());
                return response.data.data
            }}>
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
                    listState={SelectedBranchList as any}
                    data={AllBranch.data}
                />
            }
        </MyActionIconUpdate>
    );
}