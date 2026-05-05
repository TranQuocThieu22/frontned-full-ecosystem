import { ActionIcon, Button, Center, Checkbox, Grid } from "@mantine/core"
import { IconCaretLeft, IconCaretLeftFilled, IconCaretRight, IconCaretRightFilled } from "@tabler/icons-react"
import { MyDataTable, MyFieldset, MyFlexColumn } from "aq-fe-framework/components"
import { MRT_ColumnDef } from "mantine-react-table"
import { useMemo } from "react"

interface I {
    code?: string,
    lastName?: string,
    firstName?: string,
    classCode?: string,
    email?: string,
    phoneNumber?: string
    surveyed?: boolean
}

export default function FeatRRStudentEvaluateUniversity() {
    const studentcolumns = useMemo<MRT_ColumnDef<I>[]>(() => [
        {
            header: "Mã sinh viên",
            accessorKey: "code"
        },
        {
            header: "Họ và đệm",
            accessorKey: "lastName"
        },
        {
            header: "Tên sinh viên",
            accessorKey: "firstName"
        },
        {
            header: "Mã lớp",
            accessorKey: "classCode"
        },
        {
            header: "Email",
            accessorKey: "email"
        },
        {
            header: "Số điện thoại",
            accessorKey: "phoneNumber"
        },
    ], [])

    const respondentColumns = useMemo<MRT_ColumnDef<I>[]>(() => [
        {
            header: "Mã đáp viên",
            accessorKey: "code"
        },
        {
            header: "Họ và đệm đáp viên",
            accessorKey: "lastName"
        },
        {
            header: "Tên đáp viên",
            accessorKey: "firstName"
        },
        {
            header: "Mã lớp",
            accessorKey: "classCode"
        },
        {
            header: "Email",
            accessorKey: "email"
        },
        {
            header: "Số điện thoại",
            accessorKey: "phoneNumber"
        },
        {
            header: "Đã khảo sát",
            accessorKey: "surveyed",
            Cell: ({ cell }) => <Checkbox checked={cell.getValue<boolean>()} onChange={() => { }} />
        }
    ], [])
    return (
        <Grid>
            <Grid.Col span={{ base: 12, md: 5.5 }}>
                <MyFieldset title="Danh sách đối tượng có thể chọn" h={'100%'}>
                    <MyDataTable renderTopToolbarCustomActions={() => <Button bg={'green'}>Phát phiếu</Button>} columns={studentcolumns} data={canSelect} />
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
                    <MyDataTable columns={respondentColumns} data={selected} />
                </MyFieldset>
            </Grid.Col>
        </Grid>
    )
}

const canSelect: I[] = [
    {
        code: "SV00025",
        lastName: "Tô",
        firstName: "Lan",
        classCode: "IT240101",
        email: "lan@mail.com",
        phoneNumber: "089563258"
    }
]

const selected: I[] = [
    {
        code: "SV00025",
        lastName: "Tô",
        firstName: "Lan",
        classCode: "IT240101",
        email: "lan@mail.com",
        phoneNumber: "089563258",
        surveyed: false
    },
    {
        code: "SV00024",
        lastName: "Tô",
        firstName: "La",
        classCode: "IT240101",
        email: "lan@mail.com",
        phoneNumber: "089563258",
        surveyed: false
    },
    {
        code: "SV00023",
        lastName: "Tô",
        firstName: "Canh",
        classCode: "IT240101",
        email: "lan@mail.com",
        phoneNumber: "089563258",
        surveyed: false
    },
    {
        code: "SV00022",
        lastName: "Tô",
        firstName: "Châu",
        classCode: "IT240101",
        email: "lan@mail.com",
        phoneNumber: "089563258",
        surveyed: false
    },
    {
        code: "SV00021",
        lastName: "Tô",
        firstName: "Ly",
        classCode: "IT240101",
        email: "lan@mail.com",
        phoneNumber: "089563258",
        surveyed: false
    },
    {
        code: "SV00020",
        lastName: "Tô",
        firstName: "Vi",
        classCode: "IT240101",
        email: "lan@mail.com",
        phoneNumber: "089563258",
        surveyed: false
    }
]