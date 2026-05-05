import { ActionIcon, Button, Center, Grid } from "@mantine/core"
import { IconCaretLeft, IconCaretLeftFilled, IconCaretRight, IconCaretRightFilled } from "@tabler/icons-react"
import { MyDataTable, MyFieldset, MyFlexColumn } from "aq-fe-framework/components"
import { MRT_ColumnDef } from "mantine-react-table"
import { useMemo } from "react"

interface I {
    code?: string; // Mã bậc hệ
    name?: string; // Tên bậc hệ
    programCode?: string; // Mã chương trình
    programName?: string; // Tên chương trình
}
export default function FeatAOStudentEvaluateCurriculum() {
    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
        {
            header: "Mã bậc hệ",
            accessorKey: "code",
        },
        {
            header: "Tên bậc hệ",
            accessorKey: "name",
        },
        {
            header: "Mã chương trình",
            accessorKey: "programCode",
        },
        {
            header: "Tên chương trình",
            accessorKey: "programName",
        },
    ], []);
    return (
        <Grid>
            <Grid.Col span={{ base: 12, md: 5.5 }}>
                <MyFieldset title="Danh sách đối tượng có thể chọn" h={'100%'}>
                    <MyDataTable columns={columns} data={canSelect} />
                </MyFieldset>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 1 }}>
                <Center h="100%">
                    <MyFlexColumn align={'center'}>
                        <ActionIcon size={"lg"}>
                            <IconCaretRight style={{ width: '90%', height: '90%' }} />
                        </ActionIcon>
                        <ActionIcon size={"lg"}>
                            <IconCaretRightFilled style={{ width: '90%', height: '90%' }} />
                        </ActionIcon>
                        <ActionIcon size={"lg"}>
                            <IconCaretLeft style={{ width: '90%', height: '90%' }} />
                        </ActionIcon>
                        <ActionIcon size={"lg"}>
                            <IconCaretLeftFilled style={{ width: '90%', height: '90%' }} />
                        </ActionIcon>
                    </MyFlexColumn>
                </Center>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 5.5 }}>
                <MyFieldset title="Danh sách đối tượng đã chọn">
                    <MyDataTable
                        renderTopToolbarCustomActions={() => <Button bg={'green'}>Phát phiếu</Button>}
                        columns={columns}
                        data={selected}
                    />
                </MyFieldset>
            </Grid.Col>
        </Grid>
    )
}


const canSelect: I[] = [
    {
        code: "DHCQ",
        name: "Đại học chính quy",
        programCode: "9734",
        programName: "Quản trị kinh doanh",
    },
];
const selected: I[] = [
    {
        code: "DHCQ",
        name: "Đại học chính quy",
        programCode: "9734",
        programName: "Quản trị kinh doanh",
    },
    {
        code: "DHCQ",
        name: "Đại học chính quy",
        programCode: "7810",
        programName: "Quản trị khách sạn",
    },
    {
        code: "DHCQ",
        name: "Đại học chính quy",
        programCode: "6748",
        programName: "Thiết kế đồ hoạ",
    },
    {
        code: "DHCQ",
        name: "Đại học chính quy",
        programCode: "7734",
        programName: "Quản trị du lịch",
    },
    {
        code: "DHCQ",
        name: "Đại học chính quy",
        programCode: "7480",
        programName: "Khoa học máy tính",
    },
    {
        code: "DHCQ",
        name: "Đại học chính quy",
        programCode: "7748",
        programName: "An ninh mạng",
    },
];