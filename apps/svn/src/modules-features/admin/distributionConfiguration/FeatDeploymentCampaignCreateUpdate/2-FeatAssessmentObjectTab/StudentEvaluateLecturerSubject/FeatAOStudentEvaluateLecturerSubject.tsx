import { ActionIcon, Button, Center, Grid } from "@mantine/core";
import { IconCaretLeft, IconCaretLeftFilled, IconCaretRight, IconCaretRightFilled } from "@tabler/icons-react";
import { MyDataTable, MyFieldset, MyFlexColumn } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

interface I {
    subjectCode?: string;     // Mã môn học
    subjectName?: string;     // Tên môn học
    studyGroupCode?: string;  // Nhóm học
    practiceGroup?: string;   // Tổ TH
    classCode?: string;       // Danh sách lớp
    teacherCode?: string;     // Mã CBGD
    teacherName?: string;     // Tên CBGD
    registeredCount?: number; // Sĩ số đăng ký
}

export default function FeatAssessmentObjectStudentEvaluateLecturerSubject() {


    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
        { header: "Mã môn học", accessorKey: "subjectCode" },
        { header: "Tên môn học", accessorKey: "subjectName" },
        { header: "Nhóm học", accessorKey: "studyGroupCode" },
        { header: "Tổ TH", accessorKey: "practiceGroup" },
        { header: "Danh sách lớp", accessorKey: "classCode" },
        { header: "Mã CBGD", accessorKey: "teacherCode" },
        { header: "Tên CBBGD", accessorKey: "teacherName" },
        { header: "Sĩ số đăng ký", accessorKey: "registeredCount" },
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
                    <MyDataTable columns={columns} data={selected}
                        renderTopToolbarCustomActions={() => <Button bg={'green'}>Phát phiếu</Button>}

                    />
                </MyFieldset>
            </Grid.Col>
        </Grid>
    );
}


const canSelect: I[] = [
    {
        subjectCode: "MH001",
        subjectName: "Lập trình web và ứng dụng",
        studyGroupCode: "01",
        practiceGroup: "",
        classCode: "1T240101",
        teacherCode: "GV001",
        teacherName: "Tô Lan",
        registeredCount: 35,
    },
];

const selected: I[] = [
    {
        subjectCode: "MH001",
        subjectName: "Lập trình web và ứng dụng",
        studyGroupCode: "01",
        practiceGroup: "",
        classCode: "1T240101",
        teacherCode: "GV001",
        teacherName: "Tô Lan",
        registeredCount: 35,
    },
    {
        subjectCode: "MH002",
        subjectName: "Khởi nghiệp",
        studyGroupCode: "01",
        practiceGroup: "",
        classCode: "1T240101",
        teacherCode: "GV001",
        teacherName: "Tô Lan",
        registeredCount: 35,
    },
    {
        subjectCode: "MH003",
        subjectName: "Triết học",
        studyGroupCode: "01",
        practiceGroup: "",
        classCode: "1T240101",
        teacherCode: "GV001",
        teacherName: "Tô Lan",
        registeredCount: 35,
    },
    {
        subjectCode: "MH004",
        subjectName: "Cơ sở dữ liệu",
        studyGroupCode: "01",
        practiceGroup: "",
        classCode: "1T240101",
        teacherCode: "GV001",
        teacherName: "Tô Lan",
        registeredCount: 35,
    },
    {
        subjectCode: "MH005",
        subjectName: "Toán cao cấp",
        studyGroupCode: "01",
        practiceGroup: "",
        classCode: "1T240101",
        teacherCode: "GV001",
        teacherName: "Tô Lan",
        registeredCount: 35,
    },
    {
        subjectCode: "MH006",
        subjectName: "Luật cạnh tranh",
        studyGroupCode: "01",
        practiceGroup: "",
        classCode: "1T240101",
        teacherCode: "GV001",
        teacherName: "Tô Lan",
        registeredCount: 35,
    },
];