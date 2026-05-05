import MySelect from "@/components/Combobox/Select/MySelect";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import MyDataTableSelect from "@/components/RESTAPIComponents/DataTableSelect/MyDataTableSelect";
import { Button, Select, SelectProps, Space, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useListState } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

interface IResearchGroupMember {
    id: number
    fullName: string,
    highestDegree: string,
    highestScientificTitle: string,
    workingPlace: string,
}

interface IScientificProfileResearchGroupViewModel {
    id?: number;
    code?: string | undefined;
    name?: string | undefined;
    concurrencyStamp?: string | undefined;
    isEnabled?: boolean;
    nameEnglish?: string | undefined;
    abbreviation?: string | undefined;
    strategicObjective?: string | undefined;
    fieldOfExpertiseId?: number | undefined;
    researchGroupType?: string | undefined;
    members: IResearchGroupMember[];
    collaborators: IResearchGroupMember[];
}

const mockData: IScientificProfileResearchGroupViewModel[] = [
    {
        id: 1,
        code: "RG001",
        name: "Nhóm nghiên cứu A",
        concurrencyStamp: "abc123",
        isEnabled: true,
        nameEnglish: "Research Group A",
        abbreviation: "RGA",
        strategicObjective: "Nghiên cứu về công nghệ thông tin",
        fieldOfExpertiseId: 1,
        researchGroupType: "Công nghệ thông tin",
        members: [
            {
                id: 1,
                fullName: "Nguyễn Văn A",
                highestDegree: "Tiến sĩ",
                highestScientificTitle: "Giáo sư",
                workingPlace: "Đại học Bách Khoa Hà Nội"
            },
            {
                id: 2,
                fullName: "Trần Thị B",
                highestDegree: "Thạc sĩ",
                highestScientificTitle: "Phó giáo sư",
                workingPlace: "Đại học Quốc gia Hà Nội"
            }
        ],
        collaborators: [
            {
                id: 3,
                fullName: "Lê Văn C",
                highestDegree: "Tiến sĩ",
                highestScientificTitle: "Giáo sư",
                workingPlace: "Đại học Sư phạm Hà Nội"
            }
        ]
    }
];

export default function F3_3UpdateResearchGroupProfile(
    { researchGroupProfileId }: { researchGroupProfileId: number }
) {

    const ResearchGroupProfileByIdQuery = useQuery<IScientificProfileResearchGroupViewModel[]>({
        queryKey: [`userNCKHs?isExternal=false`],
        queryFn: async () =>
            // (await baseAxios.get("userNCKHs?isExternal=false")).data,
            mockData
    })

    const ResearchGroupMembers = useListState<IResearchGroupMember>(mockData[0]?.members)
    const ResearchGroupCollaborators = useListState<IResearchGroupMember>(mockData[0]?.collaborators)

    const form = useForm<IScientificProfileResearchGroupViewModel>({
        initialValues: mockData[0]
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

    // const submitButtonHook = useSubmitButtonForCreatePage({
    //     returnAfterCreate: true,
    //     form: form
    // });

    return (
        <>
            <form
                onSubmit={form.onSubmit(values => {
                    //todo 
                    // submitButtonHook.handleSubmit();
                })}>
                <MyFlexColumn>
                    <TextInput
                        label="Mã nhóm nghiên cứu"
                        placeholder="Nhập mã nhóm nghiên cứu"
                        {...form.getInputProps("code")} />
                    <TextInput
                        label="Tên nhóm nghiên cứu (Tiếng việt)"
                        placeholder="Nhập tên tiếng Việt"
                        {...form.getInputProps("name")}
                    />
                    <TextInput
                        label="Tên nhóm nghiên cứu (Tiếng Anh)"
                        placeholder="Nhập tên tiếng Anh"
                        {...form.getInputProps("nameEnglish")}
                    />
                    <TextInput
                        label="Tên nhóm nghiên cứu (Tiếng gọi tắt)"
                        placeholder="Nhập tên gọi tắt"
                        {...form.getInputProps("abbreviation")}
                    />
                    <MySelect
                        label="Lĩnh vực hoạt động"
                        placeholder="Chọn lĩnh vực hoạt động"
                        defaultValue={form.values.fieldOfExpertiseId?.toString()}
                        searchable
                        data={fieldOfReasearchOptions.map(item => ({ value: item.id.toString(), label: item.label }))}
                        onChange={(value: any) => form.setFieldValue("fieldOfExpertiseId", parseInt(value?.toString()!))}
                    />
                    <TextInput
                        label="Loại hình nhóm nghiên "
                        placeholder="Nhập tên tiếng việt"
                        {...form.getInputProps("researchGroupType")}
                    />
                    <Textarea
                        label="Mục tiêu chiến lược"
                        placeholder="Nhập mục tiêu chiến lược"
                        {...form.getInputProps("strategicObjective")}
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
                    color="yellow"
                >
                    <IconEdit /> Cập nhật hồ sơ nhóm nghiên cứu
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