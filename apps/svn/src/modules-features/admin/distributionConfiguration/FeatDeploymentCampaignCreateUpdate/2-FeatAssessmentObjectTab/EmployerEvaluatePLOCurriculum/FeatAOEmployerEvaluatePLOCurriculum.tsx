import { ActionIcon, Button, Center, Grid } from "@mantine/core";
import { IconCaretLeft, IconCaretLeftFilled, IconCaretRight, IconCaretRightFilled } from "@tabler/icons-react";
import { MyDataTable, MyFieldset, MyFlexColumn } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";

interface I {
    educationLevelCode?: string;
    educationLevelName?: string;
    programCode?: string;
    programName?: string;
    courseCode?: string;
    courseName?: string;

}
export default function FeatAOEmployerEvaluatePLOCurriculum() {
    const [canSelect, setCanSelect] = useState<I[]>(objectCanSelectData);
    const [selected, setSelected] = useState<I[]>(objectSelectedData);

    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
        { header: "Mã bậc hệ", accessorKey: "educationLevelCode" },
        { header: "Tên bậc hệ", accessorKey: "educationLevelName" },
        { header: "Mã chương trình", accessorKey: "programCode" },
        { header: "Tên chương trình", accessorKey: "programName" },
        { header: "Mã khóa", accessorKey: "courseCode" },
        { header: "Tên khóa", accessorKey: "courseName" },
    ], []);

    const moveRight = () => {
        setSelected((prev) => [...prev, ...canSelect]);
        setCanSelect([]);
    };

    const moveLeft = () => {
        setCanSelect((prev) => [...prev, ...selected]);
        setSelected([]);
    };

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
                    <MyDataTable columns={columns} data={selected}
                        renderTopToolbarCustomActions={() => {
                            return (
                                <>
                                    <Button bg={'green'}>Phát phiếu</Button>
                                </>
                            )
                        }} />
                </MyFieldset>
            </Grid.Col>
        </Grid>
    );
}


const objectCanSelectData: I[] = [
    {
        educationLevelCode: "DHCQ",
        educationLevelName: "Đại học chính quy",
        programCode: "9734",
        programName: "Quản trị kinh doanh",
        courseCode: "IT24",
        courseName: "CNTT 2024",
    },
];

const objectSelectedData: I[] = [
    {
        educationLevelCode: "DHCQ",
        educationLevelName: "Đại học chính quy",
        programCode: "9734",
        programName: "Quản trị kinh doanh",
        courseCode: "IT24",
        courseName: "CNTT 2024",
    },

];
