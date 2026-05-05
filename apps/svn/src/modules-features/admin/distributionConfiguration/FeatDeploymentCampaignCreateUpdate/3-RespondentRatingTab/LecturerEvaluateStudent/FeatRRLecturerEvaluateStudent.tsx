import { ActionIcon, Center, Checkbox, Grid } from "@mantine/core";
import { IconCaretLeft, IconCaretLeftFilled, IconCaretRight, IconCaretRightFilled } from "@tabler/icons-react";
import { MyDataTable, MyFieldset, MyFlexColumn } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";


interface I {
    subjectCode?: string;     // Mã môn học
    subjectName?: string;     // Tên môn học
    studyGroupCode?: string;  // Nhóm học
    practiceGroup?: string;   // Tổ TH
    classCode?: string;       // Danh sách lớp
    studentCode?: string;     // Mã CBGD
    studentLastName?: string;
    studentFirstName?: string;     // Tên CBGD
    teacherCode?: string;
    teacherName?: string;
    teacherLastName?: string;
    registeredCount?: number; // Sĩ số đăng ký
}
export default function FeatRRLecturerEvaluateStudent() {
    const [canSelect, setCanSelect] = useState<I[]>(objectCanSelectData);
    const [selected, setSelected] = useState<I[]>(objectSelectedData);

    const columnsCanChoseTable = useMemo<MRT_ColumnDef<I>[]>(() => [
        { header: "Mã môn học", accessorKey: "subjectCode" },
        { header: "Tên môn học", accessorKey: "subjectName" },
        { header: "Nhóm học", accessorKey: "studyGroupCode" },
        { header: "Danh sách lớp", accessorKey: "classCode" },
        { header: "Mã GV", accessorKey: "teacherCode" },
        { header: "Họ và đệm GV", accessorKey: "teacherLastName" },
        { header: "Tên GV", accessorKey: "teacherName" },
        { header: "Mã sinh viên", accessorKey: "studentCode" },
        { header: "Họ và đệm SV", accessorKey: "studentLastName" },
        { header: "Tên SV", accessorKey: "studentFirstName" },
        {
            header: "Mã lớp", accessorKey: "registeredCount",
            accessorFn(row) {
                return row.classCode
            }
        },
    ], []);

    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
        { header: "Mã môn học", accessorKey: "subjectCode" },
        { header: "Tên môn học", accessorKey: "subjectName" },
        { header: "Nhóm học", accessorKey: "studyGroupCode" },
        { header: "Danh sách lớp", accessorKey: "classCode" },
        { header: "Mã đáp viên", accessorKey: "teacherCode" },
        { header: "Họ và đệm đáp viên", accessorKey: "teacherLastName" },
        { header: "Tên đáp viên", accessorKey: "teacherName" },
        { header: "Mã sinh viên", accessorKey: "studentCode" },
        { header: "Họ và đệm sinh SV", accessorKey: "studentLastName" },
        { header: "Tên SV", accessorKey: "studentFirstName" },
        {
            header: "Mã lớp", accessorKey: "registeredCount",
            accessorFn(row) {
                return row.classCode
            }
        },
        {
            header: "Đã khảo sát", accessorKey: "isKhaoSat",
            accessorFn(row) {
                return <Checkbox ></Checkbox>
            }
        },
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
                <MyFieldset title="Danh sách đáp viên có thể chọn" h={'100%'}>
                    <MyDataTable columns={columnsCanChoseTable} data={canSelect} />
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
                <MyFieldset title="Danh sách đáp viên đã chọn">
                    <MyDataTable columns={columns} data={selected} />
                </MyFieldset>
            </Grid.Col>
        </Grid>
    );
}


const objectCanSelectData: I[] = [
    {
        subjectCode: "MH001",
        subjectName: "Lập trình web và ứng dụng",
        studyGroupCode: "01",
        practiceGroup: "",
        classCode: "1T240101",
        studentCode: "SV001",
        studentLastName: "Tô",
        studentFirstName: "La",
        teacherCode: "GV001",
        teacherName: "Lyn",
        teacherLastName: 'Tô',
        registeredCount: 35,
    },
    {
        subjectCode: "MH001",
        subjectName: "Lập trình web và ứng dụng",
        studyGroupCode: "01",
        practiceGroup: "",
        classCode: "1T240101",
        studentCode: "SV002",
        studentLastName: "Tô",
        studentFirstName: "Linh",
        teacherCode: "GV001",
        teacherName: "Lyn",
        teacherLastName: 'Tô',
        registeredCount: 35,
    },
    {
        subjectCode: "MH001",
        subjectName: "Lập trình web và ứng dụng",
        studyGroupCode: "01",
        practiceGroup: "",
        classCode: "1T240101",
        studentCode: "SV003",
        studentLastName: "Tô",
        studentFirstName: "Hạ",
        teacherCode: "GV001",
        teacherName: "Lyn",
        teacherLastName: 'Tô',
        registeredCount: 35,
    },
    {
        subjectCode: "MH001",
        subjectName: "Lập trình web và ứng dụng",
        studyGroupCode: "01",
        practiceGroup: "",
        classCode: "1T240101",
        studentCode: "SV004",
        studentLastName: "Tô",
        studentFirstName: "Châu",
        teacherCode: "GV001",
        teacherName: "Lyn",
        teacherLastName: 'Tô',
        registeredCount: 35,
    },
    {
        subjectCode: "MH001",
        subjectName: "Lập trình web và ứng dụng",
        studyGroupCode: "01",
        practiceGroup: "",
        classCode: "1T240101",
        studentCode: "SV005",
        studentLastName: "Tô",
        studentFirstName: "Ly",
        teacherCode: "GV001",
        teacherName: "Lyn",
        teacherLastName: 'Tô',
        registeredCount: 35,
    },
    {
        subjectCode: "MH001",
        subjectName: "Lập trình web và ứng dụng",
        studyGroupCode: "01",
        practiceGroup: "",
        classCode: "1T240101",
        studentCode: "SV006",
        studentLastName: "Tô",
        studentFirstName: "Canh",
        teacherCode: "GV001",
        teacherName: "Lyn",
        teacherLastName: 'Tô',
        registeredCount: 35,
    },
    {
        subjectCode: "MH001",
        subjectName: "Lập trình web và ứng dụng",
        studyGroupCode: "01",
        practiceGroup: "",
        classCode: "1T240101",
        studentCode: "SV007",
        studentLastName: "Tô",
        studentFirstName: "Mau",
        teacherCode: "GV001",
        teacherName: "Lyn",
        teacherLastName: 'Tô',
        registeredCount: 35,
    },
    {
        subjectCode: "MH001",
        subjectName: "Lập trình web và ứng dụng",
        studyGroupCode: "01",
        practiceGroup: "",
        classCode: "1T240101",
        studentCode: "SV008",
        studentLastName: "Tô",
        studentFirstName: "Huy",
        teacherCode: "GV001",
        teacherName: "Lyn",
        teacherLastName: 'Tô',
        registeredCount: 35,
    },
    {
        subjectCode: "MH001",
        subjectName: "Lập trình web và ứng dụng",
        studyGroupCode: "01",
        practiceGroup: "",
        classCode: "1T240101",
        studentCode: "SV009",
        studentLastName: "Tô",
        studentFirstName: "Nam",
        teacherCode: "GV001",
        teacherName: "Lyn",
        teacherLastName: 'Tô',
        registeredCount: 35,
    },
    {
        subjectCode: "MH001",
        subjectName: "Lập trình web và ứng dụng",
        studyGroupCode: "01",
        practiceGroup: "",
        classCode: "1T240101",
        studentCode: "SV010",
        studentLastName: "Tô",
        studentFirstName: "Nam",
        teacherCode: "GV001",
        teacherName: "Lyn",
        teacherLastName: 'Tô',
        registeredCount: 35,
    },


];

const objectSelectedData: I[] = [
    {
        subjectCode: "MH001",
        subjectName: "Lập trình web và ứng dụng",
        studyGroupCode: "01",
        practiceGroup: "",
        classCode: "1T240101",
        studentCode: "SV001",
        studentLastName: "Tô",
        studentFirstName: "La",
        teacherCode: "GV001",
        teacherName: "Lyn",
        teacherLastName: 'Tô',
        registeredCount: 35,
    },
    {
        subjectCode: "MH001",
        subjectName: "Lập trình web và ứng dụng",
        studyGroupCode: "01",
        practiceGroup: "",
        classCode: "1T240101",
        studentCode: "SV002",
        studentLastName: "Tô",
        studentFirstName: "Linh",
        teacherCode: "GV001",
        teacherName: "Lyn",
        teacherLastName: 'Tô',
        registeredCount: 35,
    },
    {
        subjectCode: "MH001",
        subjectName: "Lập trình web và ứng dụng",
        studyGroupCode: "01",
        practiceGroup: "",
        classCode: "1T240101",
        studentCode: "SV003",
        studentLastName: "Tô",
        studentFirstName: "Hạ",
        teacherCode: "GV001",
        teacherName: "Lyn",
        teacherLastName: 'Tô',
        registeredCount: 35,
    },
    {
        subjectCode: "MH001",
        subjectName: "Lập trình web và ứng dụng",
        studyGroupCode: "01",
        practiceGroup: "",
        classCode: "1T240101",
        studentCode: "SV004",
        studentLastName: "Tô",
        studentFirstName: "Châu",
        teacherCode: "GV001",
        teacherName: "Lyn",
        teacherLastName: 'Tô',
        registeredCount: 35,
    },
    {
        subjectCode: "MH001",
        subjectName: "Lập trình web và ứng dụng",
        studyGroupCode: "01",
        practiceGroup: "",
        classCode: "1T240101",
        studentCode: "SV005",
        studentLastName: "Tô",
        studentFirstName: "Ly",
        teacherCode: "GV001",
        teacherName: "Lyn",
        teacherLastName: 'Tô',
        registeredCount: 35,
    },
    {
        subjectCode: "MH001",
        subjectName: "Lập trình web và ứng dụng",
        studyGroupCode: "01",
        practiceGroup: "",
        classCode: "1T240101",
        studentCode: "SV006",
        studentLastName: "Tô",
        studentFirstName: "Canh",
        teacherCode: "GV001",
        teacherName: "Lyn",
        teacherLastName: 'Tô',
        registeredCount: 35,
    },
    {
        subjectCode: "MH001",
        subjectName: "Lập trình web và ứng dụng",
        studyGroupCode: "01",
        practiceGroup: "",
        classCode: "1T240101",
        studentCode: "SV007",
        studentLastName: "Tô",
        studentFirstName: "Mau",
        teacherCode: "GV001",
        teacherName: "Lyn",
        teacherLastName: 'Tô',
        registeredCount: 35,
    },
    {
        subjectCode: "MH001",
        subjectName: "Lập trình web và ứng dụng",
        studyGroupCode: "01",
        practiceGroup: "",
        classCode: "1T240101",
        studentCode: "SV008",
        studentLastName: "Tô",
        studentFirstName: "Huy",
        teacherCode: "GV001",
        teacherName: "Lyn",
        teacherLastName: 'Tô',
        registeredCount: 35,
    },
    {
        subjectCode: "MH001",
        subjectName: "Lập trình web và ứng dụng",
        studyGroupCode: "01",
        practiceGroup: "",
        classCode: "1T240101",
        studentCode: "SV009",
        studentLastName: "Tô",
        studentFirstName: "Nam",
        teacherCode: "GV001",
        teacherName: "Lyn",
        teacherLastName: 'Tô',
        registeredCount: 35,
    },
    {
        subjectCode: "MH001",
        subjectName: "Lập trình web và ứng dụng",
        studyGroupCode: "01",
        practiceGroup: "",
        classCode: "1T240101",
        studentCode: "SV010",
        studentLastName: "Tô",
        studentFirstName: "Nam",
        teacherCode: "GV001",
        teacherName: "Lyn",
        teacherLastName: 'Tô',
        registeredCount: 35,
    },


];