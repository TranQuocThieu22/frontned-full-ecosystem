import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyActionIconU0MyDownloadPDF from "@/components/ActionIcons/ActionIconDownloadPDF/MyActionIconDownloadPDF";
import MyActionIconViewPDF from "@/components/ActionIcons/ActionIconViewPdf/MyActionIconViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import MyDataTableSelect from "@/components/RESTAPIComponents/DataTableSelect/MyDataTableSelect";
import { FileInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useListState } from "@mantine/hooks";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

interface IAwardDecisionViewModel {
    id?: number;
    decisionNumber?: string;
    decisionDate?: Date | undefined;
    decisionName?: string;
    decisionFile?: File;
    awardedResearcherIdList?: number[];
}

interface IAwardedScientificResearcher {
    id: number;
    code?: string;
    fullName?: string;
    awardCategory?: string;
    workUnit?: string;
    evidenceFile?: File;
    isApproved?: boolean;
    awardExpense?: number;
}
export default function F4_4_4UpdateAwardDecision({ initialValues }: { initialValues: IAwardDecisionViewModel }) {
    const ResearchGroupMembers = useListState<IAwardedScientificResearcher>([
        {
            "id": 1,
            "code": "R001",
            "fullName": "John Doe",
            "awardCategory": "Category A",
            "workUnit": "Unit 1",
            "isApproved": true,
            "awardExpense": 1000
        },
        {
            "id": 5,
            "code": "R005",
            "fullName": "Charlie Davis",
            "awardCategory": "Category E",
            "workUnit": "Unit 5",
            "isApproved": true,
            "awardExpense": 3000
        }
    ])

    const form = useForm<IAwardDecisionViewModel>({
        initialValues: {
            ...initialValues,
            decisionDate: new Date(initialValues.decisionDate!)
        }
    })

    const columns = useMemo<MRT_ColumnDef<IAwardedScientificResearcher>[]>(
        () => [
            {
                header: "Mã giảng viên",
                accessorKey: "code"
            },
            {
                header: "Họ và tên",
                accessorKey: "fullName"

            },
            {
                header: "Hạng mục khen thưởng",
                accessorKey: "awardCategory"
            },
            {
                header: "Đơn vị",
                accessorKey: "workUnit"
            },
            {
                header: "File minh chứng",
                accessorKey: "evidenceFile",
                accessorFn: (row) => {
                    return (
                        <MyCenterFull>
                            <MyActionIconViewPDF
                                // pdfLink={row.path!}
                                pdfLink={"https://datafiles.chinhphu.vn/cpp/files/vbpq/2021/07/17-bgd.signed.pdf"}
                            />
                            <MyActionIconU0MyDownloadPDF
                                // pdfLink={row.path!}
                                pdfLink={"https://datafiles.chinhphu.vn/cpp/files/vbpq/2021/07/17-bgd.signed.pdf"}
                            />
                        </MyCenterFull>
                    )
                }
            },
            {
                header: "Mức thưởng",
                accessorKey: "awardExpense"
            }
        ],
        []
    );

    return (
        <MyActionIconUpdate
            modalSize={"100%"}
            form={form}
            onSubmit={() => {
                // return baseAxios.put("/userNCKHs/" + form.values.id, form.values)
                console.log("chỉnh sửa thành công: ", form.values);
                console.log(ResearchGroupMembers);

            }} >
            <MyTextInput label="Số quy định" {...form.getInputProps("decisionNumber")} />
            <MyDateInput label="Ngày quyết định" {...form.getInputProps("decisionDate")} />
            <MyTextInput label="Tên quyết định" {...form.getInputProps("decisionName")} />
            <FileInput label="Tài liệu" {...form.getInputProps("decisionFileUrl")} />
            <MyDataTableSelect
                listLabel="Danh sách giảng viên"
                listState={ResearchGroupMembers}
                data={UserList}
                columns={columns as any}>
            </MyDataTableSelect>
        </MyActionIconUpdate>

    )
}

const UserList: IAwardedScientificResearcher[] = [
    {
        id: 1,
        code: "R001",
        fullName: "John Doe",
        awardCategory: "Category A",
        workUnit: "Unit 1",
        evidenceFile: undefined,
        isApproved: true,
        awardExpense: 1000,
    },
    {
        id: 2,
        code: "R002",
        fullName: "Jane Smith",
        awardCategory: "Category B",
        workUnit: "Unit 2",
        evidenceFile: undefined,
        isApproved: false,
        awardExpense: 2000,
    },
    {
        id: 3,
        code: "R003",
        fullName: "Alice Johnson",
        awardCategory: "Category C",
        workUnit: "Unit 3",
        evidenceFile: undefined,
        isApproved: true,
        awardExpense: 1500,
    },
    {
        id: 4,
        code: "R004",
        fullName: "Bob Brown",
        awardCategory: "Category D",
        workUnit: "Unit 4",
        evidenceFile: undefined,
        isApproved: false,
        awardExpense: 2500,
    },
    {
        id: 5,
        code: "R005",
        fullName: "Charlie Davis",
        awardCategory: "Category E",
        workUnit: "Unit 5",
        evidenceFile: undefined,
        isApproved: true,
        awardExpense: 3000,
    }
];