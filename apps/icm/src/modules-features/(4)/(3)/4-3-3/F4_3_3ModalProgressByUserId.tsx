import MyActionIconU0MyDownloadPDF from "@/components/ActionIcons/ActionIconDownloadPDF/MyActionIconDownloadPDF";
import MyActionIconViewPDF from "@/components/ActionIcons/ActionIconViewPdf/MyActionIconViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Anchor, Divider, Group, Modal, Paper, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";

interface researchTopicAssignment {
    researchTopicType?: string;
    durationByHour?: number;
    progressPercentage?: number;
    evidenceFile?: string;
}

interface articleAssignment {
    articleType?: string;
    durationByHour?: number;
    progressPercentage?: number;
    evidenceFile?: string;
}

interface seminarAssignment {
    seminarType?: string;
    durationByHour?: number;
    progressPercentage?: number;
    evidenceFile?: string;
}

interface IProgressReportByUserIdViewModel {
    id?: number;
    code?: string;
    fullName?: string;
    highestDegree?: string;
    highestScientificTitle?: string;
    workingPlace?: string;
    researchTopicAssignment?: researchTopicAssignment[];
    articleAssignment?: articleAssignment[];
    seminarAssignment?: seminarAssignment[];
}

const mockData: IProgressReportByUserIdViewModel = {
    id: 1,
    code: "GV001",
    fullName: "Nguyen Van A",
    highestDegree: "PhD",
    highestScientificTitle: "Associate Professor",
    workingPlace: "University of Science",
    researchTopicAssignment: [
        {
            researchTopicType: "AI Research",
            durationByHour: 100,
            progressPercentage: 75,
            evidenceFile: "ai_research.pdf"
        }
    ],
    articleAssignment: [
        {
            articleType: "Journal Article",
            durationByHour: 50,
            progressPercentage: 60,
            evidenceFile: "journal_article.pdf"
        }
    ],
    seminarAssignment: [
        {
            seminarType: "International Conference",
            durationByHour: 30,
            progressPercentage: 90,
            evidenceFile: "conference_presentation.pdf"
        }
    ]
}

export default function F4_3_3ModalProgressByUserId(
    { userId, displayText }: { userId: number, displayText: string }
) {
    const [opened, handlers] = useDisclosure(false);

    const progression = useQuery<IProgressReportByUserIdViewModel>({
        queryKey: [`F4_3_3ModalProgressByUserId`],
        queryFn: async () =>
            // (await baseAxios.get("userNCKHs?isExternal=false"))
            mockData
    })

    return (
        <>
            <Anchor onClick={handlers.open}> {displayText}</Anchor>
            <Modal
                opened={opened}
                onClose={handlers.close}
                size={"80%"}
                title="Tiến độ nhiệm vụ"
            >
                <Paper p={"md"}>
                    <Group mb={'sm'} justify="space-between">
                        <Text>Mã giảng viên: {progression.data?.code} </Text>
                        <Text >Tên giảng viên: {progression.data?.fullName} </Text>
                        <Text >Học hàm/ Học vị:  {progression.data?.highestDegree} - {progression.data?.highestScientificTitle}</Text>
                        <Text >Đơn vị công tác: {progression.data?.workingPlace} </Text>
                    </Group>
                    <Divider></Divider>
                    <Group justify="space-between" mb={"md"}>
                        <Text fw={"bold"}>Đăng ký nhiệm vụ đề tài</Text>
                    </Group>

                    <MyDataTable
                        data={progression.data?.researchTopicAssignment!}
                        columns={[
                            {
                                header: "Loại đề tài",
                                accessorKey: "researchTopicType",
                            },
                            {
                                header: "Số giờ đăng ký",
                                accessorKey: "durationByHour",
                            },
                            {
                                header: "% đã thực hiện",
                                accessorKey: "progressPercentage",
                                Cell: ({ row }) => {
                                    return <Text>{row.original.progressPercentage} %</Text>;
                                },
                            },
                            {
                                header: "File minh chứng",
                                accessorKey: "evidenceFile",

                                Cell: ({ row }) => {
                                    return (
                                        <MyCenterFull>
                                            <MyActionIconViewPDF pdfLink={row.original.evidenceFile!} />
                                            <MyActionIconU0MyDownloadPDF pdfLink={row.original.evidenceFile!} />
                                        </MyCenterFull>
                                    )
                                },
                            },
                        ]}
                    />
                </Paper>
                <Paper p={"md"}>
                    <Group justify="space-between" mb={"md"}>
                        <Text fw={"bold"}>Đăng ký nhiệm vụ bài báo</Text>
                    </Group>
                    <MyDataTable
                        data={progression.data?.articleAssignment!}
                        columns={[
                            {
                                header: "Loại đề tài",
                                accessorKey: "articleType",
                            },
                            {
                                header: "Số giờ đăng ký",
                                accessorKey: "durationByHour",
                            },
                            {
                                header: "% đã thực hiện",
                                accessorKey: "progressPercentage",
                                Cell: ({ row }) => {
                                    return <Text>{row.original.progressPercentage} %</Text>;
                                },
                            },
                            {
                                header: "File minh chứng",
                                accessorKey: "evidenceFile",

                                Cell: ({ row }) => {
                                    return (
                                        <MyCenterFull>
                                            <MyActionIconViewPDF
                                                // pdfLink={row.original.evidenceFile!}
                                                pdfLink="https://datafiles.chinhphu.vn/cpp/files/vbpq/2021/07/17-bgd.signed.pdf"
                                            />
                                            <MyActionIconU0MyDownloadPDF
                                                // pdfLink={row.original.evidenceFile!}
                                                pdfLink="https://datafiles.chinhphu.vn/cpp/files/vbpq/2021/07/17-bgd.signed.pdf"
                                            />
                                        </MyCenterFull>
                                    )
                                },
                            },
                        ]}
                    />
                </Paper>
                <Paper p={"md"}>
                    <Group justify="space-between" mb={"md"}>
                        <Text fw={"bold"}>Đăng ký nhiệm vụ hội thảo</Text>
                    </Group>
                    <MyDataTable
                        data={progression.data?.seminarAssignment!}
                        columns={[
                            {
                                header: "Loại đề tài",
                                accessorKey: "seminarType",
                            },
                            {
                                header: "Số giờ đăng ký",
                                accessorKey: "durationByHour",
                            },
                            {
                                header: "% đã thực hiện",
                                accessorKey: "progressPercentage",
                                Cell: ({ row }) => {
                                    return <Text>{row.original.progressPercentage} %</Text>;
                                },
                            },
                            {
                                header: "File minh chứng",
                                accessorKey: "evidenceFile",

                                Cell: ({ row }) => {
                                    return (
                                        <MyCenterFull>
                                            <MyActionIconViewPDF pdfLink={row.original.evidenceFile!} />
                                            <MyActionIconU0MyDownloadPDF pdfLink={row.original.evidenceFile!} />
                                        </MyCenterFull>
                                    )
                                },
                            },
                        ]}
                    />
                </Paper>
            </Modal>
        </>
    )
}