import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MySelect from "@/components/Combobox/Select/MySelect"
import MyNumberInput from "@/components/Inputs/NumberInput/MyNumberInput"
import MyDataTableSelect from "@/components/RESTAPIComponents/DataTableSelect/MyDataTableSelect"
import { FileInput, TextInput } from "@mantine/core"
import { DateInput } from "@mantine/dates"
import { useForm } from "@mantine/form"
import { useListState } from "@mantine/hooks"
import { MRT_ColumnDef } from "mantine-react-table"
import { useMemo } from "react"
import { I3_5PublicTopic } from "./F3_5ReadPublicTopic"

interface IParticipatingMembers {
    id: number
    email: string,
    name: string,
    roleId?: number
}
interface IRole {
    name: string,
    id: number,
    code: string
}

export default function F3_5UpdatePuclicTopic({ values }: { values: I3_5PublicTopic }) {
    const ParticipatingMembers = useListState<IParticipatingMembers>(ParticipatingMembersdata)
    const form = useForm<I3_5PublicTopic>({
        initialValues: values
    })
    const columns = useMemo<MRT_ColumnDef<IParticipatingMembers>[]>(
        () => [
            {
                header: "Email",
                accessorKey: "email"
            },
            {
                header: "Họ và tên",
                accessorKey: "name"

            },
            {
                header: "Vai trò",
                accessorFn: (row) => {
                    return <MySelect defaultValue={row.roleId?.toString()} data={RoleData.map(item => ({ value: item.id.toString(), label: item.name }))} onChange={(value) => ParticipatingMembers[1].applyWhere((item) => item.id == row.id, (item) => ({ ...item, roleId: parseInt(value?.toString()!) }))} />
                }
            },
        ],
        []
    );

    return (
        <MyActionIconUpdate onSubmit={() => { }} form={form} modalSize={"80%"}>
            <TextInput
                label="Mã đề tài"
                placeholder="Nhập mã đề tài"
                {...form.getInputProps('code')}
            />
            <TextInput
                label="Tên đề tài"
                placeholder="Nhập tên đề tài"
                {...form.getInputProps('title')}
            />
            <MySelect
                data={['Cấp trường', 'Cấp khoa']}
                label="Cấp đề tài"
                placeholder="Nhập cấp độ"
                {...form.getInputProps('level')}
            />
            <TextInput
                label="Đơn vị chủ trì"
                placeholder="Nhập đơn vị chủ trì"
                {...form.getInputProps('leadingUnit')}
            />
            <TextInput
                label="Đơn vị quản lý"
                placeholder="Nhập đơn vị quản lý"
                {...form.getInputProps('managingUnit')}
            />
            <MyDataTableSelect
                listLabel="Danh sách thành viên"
                listState={ParticipatingMembers}
                data={[
                    { id: 1, name: "Trần Quốc Thiệu", email: "thieutran411@gmail.com" },
                    { id: 2, name: "Đặng Văn Khoa", email: "dangvankhoa@gmail.com" },
                    { id: 3, name: "Nguyễn Văn Tiến", email: "duongvantien@gmail.com" },
                    { id: 4, name: "Dương Tiểu Linh", email: "tieulinh@gmail.com" }
                ]}
                columns={columns as any} />
            <DateInput
                label="Ngày bắt đầu"
                placeholder="Chọn ngày bắt đầu"
                {...form.getInputProps('startDate')}
            />
            <DateInput
                label="Ngày kết thúc"
                placeholder="Chọn ngày kết thúc"
                {...form.getInputProps('endDate')}
            />
            <MyNumberInput
                label="Kinh phí"
                {...form.getInputProps('budget')}
            />
            <FileInput
                label="Tải lên file chứng từ"
                placeholder="Chọn file"
                multiple={true}
                {...form.getInputProps('evidenceFiles')}
            />
        </MyActionIconUpdate>
    )
}

const ParticipatingMembersdata: IParticipatingMembers[] = [
    { id: 1, name: "Trần Quốc Thiệu", email: "thieutran411@gmail.com", roleId: 1 },
    { id: 2, name: "Đặng Văn Khoa", email: "dangvankhoa@gmail.com", roleId: 2 },
    { id: 3, name: "Nguyễn Văn Tiến", email: "duongvantien@gmail.com", roleId: 2 },
    { id: 4, name: "Dương Tiểu Linh", email: "tieulinh@gmail.com", roleId: 2 }
]
const RoleData: IRole[] = [
    { id: 1, name: "Chủ nhiệm", code: "CN" },
    { id: 2, name: "Thành viên nhóm", code: "TVN" },
]