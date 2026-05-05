import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import MyDataTableSelect from "@/components/RESTAPIComponents/DataTableSelect/MyDataTableSelect";
import { U0MyValidateEmpty } from "@/utils/validateForm";
import { Button, Select, SelectProps, Space, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useListState } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { useSubmitButtonForCreatePage } from "./Hooks/onSubmitHook";

interface F3_3IResearchGroupProfileInput {
    fieldOfResearch?: string | undefined;
    researchGroupType?: string | undefined;
    code?: string | undefined;
    researchObjective?: string | undefined;
    groupAbbreviation?: string | undefined;
    groupNameEn?: string | undefined;
    groupNameVi?: string | undefined;
};

interface IResearchGroupMember {
    id: number
    fullName: string,
    highestDegree: string,
    highestScientificTitle: string,
    workingPlace: string,
}

export default function F3_3CreateScientificResearchGroup(
) {
    const ResearchGroupMembers = useListState<IResearchGroupMember>()
    const ResearchGroupCollaborators = useListState<IResearchGroupMember>()

    const form = useForm<F3_3IResearchGroupProfileInput>({
        initialValues: {
            fieldOfResearch: undefined,
            researchGroupType: "",
            code: "",
            researchObjective: "",
            groupAbbreviation: "",
            groupNameEn: "",
            groupNameVi: "",
        },
        validate: {
            fieldOfResearch: U0MyValidateEmpty(),
            researchGroupType: U0MyValidateEmpty(),
            code: U0MyValidateEmpty(),
            researchObjective: U0MyValidateEmpty(),
            groupAbbreviation: U0MyValidateEmpty(),
            groupNameEn: U0MyValidateEmpty(),
            groupNameVi: U0MyValidateEmpty()
        },
    });

    const columns = useMemo<MRT_ColumnDef<IResearchGroupMember>[]>(
        () => [
            {
                header: "Họ và tên",
                accessorKey: "fullName"

            },
            {
                header: "Học vị",
                accessorKey: "highestDegree"

            },
            {
                header: "Chức danh khoa học",
                accessorKey: "highestScientificTitle"

            },
            {
                header: "Nơi công tác",
                accessorKey: "workingPlace"
            }

        ],
        []
    );

    const submitButtonHook = useSubmitButtonForCreatePage({
        returnAfterCreate: true,
        form: form
    });

    return (
        <>
            <form
                onSubmit={form.onSubmit(values => {
                    //todo 
                    submitButtonHook.handleSubmit();
                })}>
                <MyFlexColumn>
                    <TextInput
                        label="Mã nhóm nghiên cứu"
                        placeholder="Nhập mã nhóm nghiên cứu"
                        {...form.getInputProps("code")} />
                    <TextInput
                        label="Tên nhóm nghiên cứu (Tiếng việt)"
                        placeholder="Nhập tên tiếng Việt"
                        {...form.getInputProps("groupNameVi")}
                    />
                    <TextInput
                        label="Tên nhóm nghiên cứu (Tiếng Anh)"
                        placeholder="Nhập tên tiếng Anh"
                        {...form.getInputProps("groupNameEn")}
                    />
                    <TextInput
                        label="Tên nhóm nghiên cứu (Tiếng gọi tắt)"
                        placeholder="Nhập tên gọi tắt"
                        {...form.getInputProps("groupAbbreviation")}
                    />
                    <SelectFieldOfResearch searchable {...form.getInputProps("fieldOfResearch")} />
                    <TextInput
                        label="Loại hình nhóm nghiên "
                        placeholder="Nhập tên tiếng việt"
                        {...form.getInputProps("researchGroupType")}
                    />
                    <Textarea
                        label="Mục tiêu chiến lược"
                        placeholder="Nhập mục tiêu chiến lược"
                        {...form.getInputProps("researchObjective")}
                    />
                </MyFlexColumn>
                <Space mt={"xs"}></Space>
                <MyDataTableSelect
                    listLabel="Danh sách thành viên"
                    listState={ResearchGroupMembers}
                    data={UserList}
                    columns={columns as any}>
                </MyDataTableSelect>
                <MyDataTableSelect
                    listLabel="Danh sách cộng tác viên"
                    listState={ResearchGroupCollaborators}
                    data={UserList}
                    columns={columns as any}>
                </MyDataTableSelect>
                <Space mt={"md"} />
                <Button
                    w={"100%"}
                    type="submit"
                >
                    <IconPlus /><Space mr={"xs"} /> Tạo hồ sơ nhóm nghiên cứu
                </Button>
            </form>
        </>
    )
}

interface ISelectComponent extends SelectProps { }

function SelectFieldOfResearch({ ...rest }: ISelectComponent) {

    const fieldOfReasearchOptions = [
        {
            id: 1,
            code: "c1",
            value: "1",
            label: "Khoa học máy tính"
        },
        {
            id: 2,
            code: "c2",
            value: "2",
            label: "Khoa học dữ liệu"
        },
        {
            id: 3,
            code: "c3",
            value: "3",
            label: "Kỹ thuật phần mềm"
        },
        {
            id: 4,
            code: "c4",
            value: "4",
            label: "Công nghệ sinh học"
        },
        {
            id: 5,
            code: "c5",
            value: "5",
            label: "Quản trị kinh doanh"
        },
    ]

    return (
        <Select
            label="Lĩnh vực hoạt động"
            placeholder="Chọn lĩnh vực hoạt động"
            data={fieldOfReasearchOptions.map((item) => {
                const data = {
                    value: item?.id.toString()!,
                    // label: `${item?.code} - ${item?.value}`,
                    label: item?.label,
                };
                return data;
            })}
            {...rest}
        />
    );
}

const UserList: IResearchGroupMember[] = [
    {
        id: 1,
        fullName: "Trần Quốc Thiệu",
        highestDegree: "Tiến sĩ",
        highestScientificTitle: "Giáo sư",
        workingPlace: "Đại học Bách Khoa Hà Nội"
    },
    {
        id: 2,
        fullName: "Đặng Văn Khoa",
        highestDegree: "Thạc sĩ",
        highestScientificTitle: "Phó giáo sư",
        workingPlace: "Đại học Quốc gia Hà Nội"
    },
    {
        id: 3,
        fullName: "Nguyễn Văn Tiến",
        highestDegree: "Tiến sĩ",
        highestScientificTitle: "Giáo sư",
        workingPlace: "Đại học Sư phạm Hà Nội"
    },
    {
        id: 4,
        fullName: "Dương Tiểu Linh",
        highestDegree: "Thạc sĩ",
        highestScientificTitle: "Phó giáo sư",
        workingPlace: "Đại học Kinh tế Quốc dân"
    }
];