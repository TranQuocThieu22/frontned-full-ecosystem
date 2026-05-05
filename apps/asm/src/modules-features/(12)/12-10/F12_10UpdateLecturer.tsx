import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import MyDataTableSelect from "@/components/RESTAPIComponents/DataTableSelect/MyDataTableSelect";
import { Group, Select } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useListState } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

interface IBranchViewModel {
    id?: number;
    code?: string;
    name?: string;
}

interface ILecturerViewModel {
    code?: string;
    name?: string;
    educationLevel?: string;
    genderId?: number;
    dateOfBirth?: Date;
    phoneNumber?: string;
    email?: string;
    branchList?: IBranchViewModel[];
}

const mockData_branch: IBranchViewModel[] = [
    { id: 1, code: "BT001", name: "Bình Thạnh CS1" },
    { id: 2, code: "BT002", name: "Bình Thạnh CS2" },
    { id: 3, code: "TD003", name: "Thủ Đức CS1" },
    { id: 4, code: "TD004", name: "Thủ Đức CS2" },
];


export default function F12_10UpdateLecturer({ lecturerValues }: { lecturerValues: ILecturerViewModel }) {

    const branchList = useListState<IBranchViewModel>(lecturerValues.branchList || []);

    const form = useForm<ILecturerViewModel>({
        initialValues: {
            ...lecturerValues
        }
    });

    const AllBranch = useQuery<ILecturerViewModel[]>({
        queryKey: [`F12_8AllBranchById`],
        queryFn: async () => {
            // const response = await baseAxios.post("/SystemCatalogProjectTypeCategory/getall");
            return mockData_branch
        },
    })

    const branchSelectColumns = useMemo<MRT_ColumnDef<IBranchViewModel>[]>(() => [
        {
            header: "Mã chi nhánh",
            accessorKey: "code",
        },
        {
            header: "Tên chi nhánh",
            accessorKey: "name",
        },
    ], []);

    return (
        <MyActionIconUpdate
            modalSize={"80%"}
            form={form}
            onSubmit={() => {
                console.log(form.values);
            }}>
            <MyTextInput
                disabled
                label="Mã giảng viên"
                {...form.getInputProps("code")}
            />
            <MyTextInput
                label="Họ tên giảng viên"
                {...form.getInputProps("name")}
            />
            <Group>
                <Select
                    clearable
                    placeholder='Chọn giới tính'
                    label='Giới tính'
                    data={[
                        {
                            value: "1",
                            label: "Nam"
                        },
                        {
                            value: "2",
                            label: "Nữ"
                        }
                    ]}
                    defaultValue={form.values.genderId?.toString()}
                    onChange={(value: any) => form.setFieldValue("genderId", parseInt(value?.toString()!))}
                />
                <MyTextInput
                    flex={1}
                    label="Bậc học"
                    {...form.getInputProps("educationLevel")}
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
                    listState={branchList}
                    data={AllBranch.data}
                />
            }
        </MyActionIconUpdate>
    );
}