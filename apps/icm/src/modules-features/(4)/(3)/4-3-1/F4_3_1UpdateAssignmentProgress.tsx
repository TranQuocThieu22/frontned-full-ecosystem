import MyActionIconU0MyDownloadPDF from "@/components/ActionIcons/ActionIconDownloadPDF/MyActionIconDownloadPDF";
import MyActionIconViewPDF from "@/components/ActionIcons/ActionIconViewPdf/MyActionIconViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Button, Divider, FileInput, Group, NumberInput, Paper, Text } from "@mantine/core";
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
        },
        {
            researchTopicType: "Machine Learning",
            durationByHour: 80,
            progressPercentage: 50,
            evidenceFile: "ml_research.pdf"
        }
    ],
    articleAssignment: [
        {
            articleType: "Journal Article",
            durationByHour: 50,
            progressPercentage: 60,
            evidenceFile: "journal_article.pdf"
        },
        {
            articleType: "Conference Paper",
            durationByHour: 40,
            progressPercentage: 80,
            evidenceFile: "conference_paper.pdf"
        }
    ],
    seminarAssignment: [
        {
            seminarType: "International Conference",
            durationByHour: 30,
            progressPercentage: 90,
            evidenceFile: "conference_presentation.pdf"
        },
        {
            seminarType: "Workshop",
            durationByHour: 20,
            progressPercentage: 100,
            evidenceFile: "workshop_presentation.pdf"
        }
    ]
}

export default function F4_3_1UpdateAssignmentProgressByUserId(
    { userId }: { userId: number }
) {
    const progression = useQuery<IProgressReportByUserIdViewModel>({
        queryKey: [`F4_3_3ModalProgressByUserId`],
        queryFn: async () =>
            // (await baseAxios.get("userNCKHs?isExternal=false"))
            mockData
    })

    if (progression.isLoading) return "Đang tải dữ liệu..."
    if (progression.isError) return "Không có dữ liệu..."

    return (
        <>
            <Paper p={"md"}>
                <Group justify="space-between">
                    <Group>
                        <Text fw={700}>Mã giảng viên:</Text>
                        <Text>{progression.data?.code} </Text>
                    </Group>
                    <Group>
                        <Text fw={700}>Tên giảng viên:</Text>
                        <Text>{progression.data?.fullName}</Text>
                    </Group>
                    <Group>
                        <Text fw={700}>Học hàm/ Học vị:</Text>
                        <Text>{progression.data?.highestDegree} - {progression.data?.highestScientificTitle}</Text>
                    </Group>
                    <Group>
                        <Text fw={700}>Đơn vị công tác:</Text>
                        <Text>{progression.data?.workingPlace}</Text>
                    </Group>
                </Group>
            </Paper>

            <Divider></Divider>
            <Group justify="space-between" mb={"md"}>
                <Text fw={"bold"}>Đăng ký nhiệm vụ đề tài</Text>
            </Group>
            <MyDataTable
                data={progression.data?.researchTopicAssignment!}
                renderRowActions={() => (
                    <Group>
                        <Button color="blue" variant="outline">Lưu</Button>
                    </Group>
                )}
                columns={[
                    {
                        header: "Loại đề tài",
                        accessorKey: "researchTopicType",
                    },
                    {
                        header: "Số giờ đăng ký",
                        accessorKey: "durationByHour",
                        Cell: ({ row }) => <NumberInput defaultValue={row.original.durationByHour} />
                    },
                    {
                        header: "% đã thực hiện",
                        accessorKey: "progressPercentage",
                        Cell: ({ row }) => <NumberInput defaultValue={row.original.progressPercentage} />
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
                                    <FileInput placeholder="Chọn file minh chứng" />
                                </MyCenterFull>
                            )
                        },
                    },
                ]}
            />

            <Divider></Divider>
            <Group justify="space-between" mb={"md"}>
                <Text fw={"bold"}>Đăng ký nhiệm vụ bài báo</Text>
            </Group>
            <MyDataTable
                data={progression.data?.articleAssignment!}
                renderRowActions={() => (
                    <Group>
                        <Button color="blue" variant="outline">Lưu</Button>
                    </Group>
                )}
                columns={[
                    {
                        header: "Loại đề tài",
                        accessorKey: "articleType",
                    },
                    {
                        header: "Số giờ đăng ký",
                        accessorKey: "durationByHour",
                        Cell: ({ row }) => <NumberInput defaultValue={row.original.durationByHour} />
                    },
                    {
                        header: "% đã thực hiện",
                        accessorKey: "progressPercentage",
                        Cell: ({ row }) => <NumberInput defaultValue={row.original.progressPercentage} />
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
                                    <FileInput placeholder="Chọn file minh chứng" />
                                </MyCenterFull>
                            )
                        },
                    },
                ]}
            />

            <Divider></Divider>
            <Group justify="space-between" mb={"md"}>
                <Text fw={"bold"}>Đăng ký nhiệm vụ hội thảo</Text>
            </Group>
            <MyDataTable
                data={progression.data?.seminarAssignment!}
                renderRowActions={() => (
                    <Group>
                        <Button color="blue" variant="outline">Lưu</Button>
                    </Group>
                )}
                columns={[
                    {
                        header: "Loại đề tài",
                        accessorKey: "seminarType",
                    },
                    {
                        header: "Số giờ đăng ký",
                        accessorKey: "durationByHour",
                        Cell: ({ row }) => <NumberInput defaultValue={row.original.durationByHour} />
                    },
                    {
                        header: "% đã thực hiện",
                        accessorKey: "progressPercentage",
                        Cell: ({ row }) => <NumberInput defaultValue={row.original.progressPercentage} />
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
                                    <FileInput placeholder="Chọn file minh chứng" />
                                </MyCenterFull>
                            )
                        },
                    },
                ]}
            />
        </>
    )
}