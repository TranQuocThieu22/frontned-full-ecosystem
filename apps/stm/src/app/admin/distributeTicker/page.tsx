"use client"
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import Usecase_ClassTable, { ClassTableDomain } from "@/module/class/usecase/Usecase_ClassTable";
import { Group, Select, Space } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MyPageContent } from "aq-fe-framework/components";
import DistributeTickerModal from "./features/DistributeTickerModal";

export default function Page() {
    const distributeTickerDisc = useDisclosure()
    return (
        <MyPageContent>
            <Group>
                <Select
                    label="Chọn quý"
                    value={'Quý 1/2024-2205'}
                    data={['Quý 1/2024-2205', 'Quý 2/2024-2025']}
                />
            </Group>
            <Space />
            <MyFieldset title="Danh sách lớp">
                <Usecase_ClassTable
                    onDistributeTicker={() => {
                        distributeTickerDisc[1].open()
                    }}
                    data={data}
                />
            </MyFieldset>
            <DistributeTickerModal disclosure={distributeTickerDisc} />
        </MyPageContent>
    )
}


const data: ClassTableDomain[] = [
    {
        classCode: "LD1",
        className: "Lập trình Web Cơ bản 1",
        homeroomTeacher: "Trần Nhật Minh",
        classSchedule: "Thứ 3 & 5 (18:00-20:00)",
        roomCode: "P.TD01",
        currentAndMaximumEnrollment: "10/15",
        classStatus: 2,
        isScoreEntered: true,
    },
    {
        classCode: "LD2A1",
        className: "Tiếng Anh Giao tiếp A1",
        homeroomTeacher: "Nguyễn Thị Hải",
        classSchedule: "Thứ 2 & 4 (19:00-21:00)",
        roomCode: "P.TD02",
        currentAndMaximumEnrollment: "12/15",
        classStatus: 2,
        isScoreEntered: true,
    },
    {
        classCode: "LD2A2",
        className: "Tiếng Anh Giao tiếp A2",
        homeroomTeacher: "Lê Thị Quế",
        classSchedule: "Thứ 7 & CN (09:00-11:00)",
        roomCode: "P.TD03",
        currentAndMaximumEnrollment: "8/12",
        classStatus: 2,
        isScoreEntered: true,
    },
    {
        classCode: "LD2B",
        className: "Giải tích Nâng cao",
        homeroomTeacher: "Trần Thị Phương Thảo",
        classSchedule: "Thứ 3 & 5 (18:00-20:00)",
        roomCode: "P.TD01",
        currentAndMaximumEnrollment: "11/15",
        classStatus: 2,
        isScoreEntered: true,
    },
    {
        classCode: "LD2C1",
        className: "Hóa học Đại cương",
        homeroomTeacher: "Hoàng Thị Hương",
        classSchedule: "Thứ 6 (18:00-21:00)",
        roomCode: "P.TD04",
        currentAndMaximumEnrollment: "9/10",
        classStatus: 2,
        isScoreEntered: true,
    },
    {
        classCode: "LD2C2",
        className: "Vật lý Nâng cao",
        homeroomTeacher: "Trần Thị Quy",
        classSchedule: "Thứ 7 (14:00-17:00)",
        roomCode: "P.TD05",
        currentAndMaximumEnrollment: "7/10",
        classStatus: 2,
        isScoreEntered: true,
    },
    {
        classCode: "LD3A",
        className: "Lịch sử Việt Nam",
        homeroomTeacher: "Lê Thu Trang",
        classSchedule: "Thứ 2 & 4 (18:00-20:00)",
        roomCode: "P.TD06",
        currentAndMaximumEnrollment: "14/15",
        classStatus: 2,
        isScoreEntered: true,
    },
    {
        classCode: "LD3B",
        className: "Kinh tế Vi mô",
        homeroomTeacher: "Trần Trọng Thương",
        classSchedule: "Thứ 3 & 5 (19:00-21:00)",
        roomCode: "P.TD07",
        currentAndMaximumEnrollment: "13/15",
        classStatus: 2,
        isScoreEntered: true,
    },
    {
        classCode: "LD3C",
        className: "Địa lý Tự nhiên",
        homeroomTeacher: "Lê Thị Trường An",
        classSchedule: "Thứ 6 (17:00-19:00)",
        roomCode: "P.TD08",
        currentAndMaximumEnrollment: "9/12",
        classStatus: 2,
        isScoreEntered: true,
    },
    {
        classCode: "LD3D",
        className: "Ngữ văn Hiện đại",
        homeroomTeacher: "Trần Trọng Thương",
        classSchedule: "Chủ Nhật (09:00-12:00)",
        roomCode: "P.TD09",
        currentAndMaximumEnrollment: "10/12",
        classStatus: 2,
        isScoreEntered: true,
    },
];