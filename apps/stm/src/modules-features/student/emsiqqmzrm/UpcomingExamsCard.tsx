import { Card, Group, ScrollArea, Stack, Text, ThemeIcon } from "@mantine/core";
import { IconCalendar, IconMapPin } from "@tabler/icons-react";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { IUserDashboardData } from "./interfaces/StudentDashBoard";

export default function UpcomingExamsCard({ studentData }: { studentData: IUserDashboardData }) {
    const upcomingExam = studentData.exam?.exams?.filter((exams) => {
        const today = new Date();
        const examDate = exams.examDate ? new Date(exams.examDate) : new Date(0);
        return examDate > today;
    }) || [];
    return (

        <Card style={{ height: '40vh' }} withBorder>
            <ScrollArea.Autosize>
                <Text tt="uppercase" size="lg" fw="bold">
                    Khóa thi sắp tổ chức
                </Text>
                {upcomingExam.length ?? 0 > 0 ? (upcomingExam ?? []).map((item, index) => (
                    <Card key={index} mt="md" withBorder shadow="sm">
                        <Stack gap="xs">
                            <Text size="md" fw={600}>
                                {item.examName}
                            </Text>
                            <Group gap="xs">
                                <ThemeIcon variant="light" size="sm">
                                    <IconCalendar size={16} />
                                </ThemeIcon>
                                <Text size="sm">
                                    Ngày thi: {utils_date_dateToDDMMYYYString(new Date(item.examDate ?? 0))}
                                </Text>
                            </Group>
                            <Group gap="xs">
                                <ThemeIcon variant="light" size="sm">
                                    <IconMapPin size={16} />
                                </ThemeIcon>
                                <Text size="sm">Địa điểm: {item.branchName}</Text>
                            </Group>
                        </Stack>
                    </Card>
                )) :
                    (
                        <Text c="dimmed" size="sm" ta="center" pb={8}>
                            Chưa có khóa thi nào sắp tới.
                        </Text>
                    )}
            </ScrollArea.Autosize>
        </Card>

    );
}

interface I_courseList {
    id?: number,
    subjectCode?: string,
    title?: string,
    value?: number,
    maximum?: number,

}
interface I_opening {
    id?: number,
    title?: string,
    location?: string,
    learningDays?: number[],
    startDate?: Date
}

interface I_courseDetail {
    id?: number,
    title?: string,
    startTime?: string,
    endTime?: string,
    date?: Date,
    lecturerName?: string,
    room?: string
}

interface I_comments {
    id?: number,
    subjectName?: string,
    lecturerName?: string,
    content?: string,
    dayCreated?: Date,
    timeCreated?: string
}

interface I_exam {
    id?: number,
    title?: string,
    dayCreated?: Date,
    location?: string
}



const courseDetailList: I_courseDetail[] = [
    {
        id: 1,
        title: "Lập trình web",
        lecturerName: "Tô Ngọc Lâm",
        room: "P031",
        date: new Date("2025-03-03"),
        startTime: "18:00",
        endTime: "20:00"
    },
    {
        id: 2,
        title: "Tiếng anh thương mại",
        lecturerName: "Tô Ngọc Bảo",
        room: "P031",
        date: new Date("2025-03-03"),
        startTime: "18:00",
        endTime: "20:00"
    },
]

const commentList: I_comments[] = [
    {
        id: 1,
        subjectName: "Lập trình web",
        lecturerName: "Tô Ngọc Lâm",
        content: "Bạn cần cố gắng thực hành nhiều hơn để có thể theo kịp các bạn học cùng lớp",
        dayCreated: new Date("2025-03-12"),
        timeCreated: "21:22"
    },
    {
        id: 2,
        subjectName: "Tiếng anh thương mại",
        lecturerName: "Tô Ngọc Bảo",
        content: "Bạn cần cố gắng thực hành nhiều hơn để có thể theo kịp các bạn học cùng lớp",
        dayCreated: new Date("2025-03-12"),
        timeCreated: "21:22"
    },
]
const openingList: I_opening[] = [
    {
        id: 1,
        title: "Kế toán doanh nghiệp",
        startDate: new Date("2024-03-25"),
        learningDays: [1, 3, 5],
        location: "Cơ sở Bình Thạnh"
    },
    {
        id: 2,
        title: "Tin học văn phòng nâng cao",
        startDate: new Date("2024-03-25"),
        learningDays: [1, 3, 5],
        location: "Cơ sở Bình Thạnh"
    },
]
const examList: I_exam[] = [
    {
        id: 1,
        title: "Kế toán doanh nghiệp",
        dayCreated: new Date("2024-03-25"),

        location: "Cơ sở Bình Thạnh"
    },
    {
        id: 2,
        title: "Kế toán doanh nghiệp",
        dayCreated: new Date("2024-03-25"),

        location: "Cơ sở Bình Thạnh"
    },
    {
        id: 3,
        title: "Kế toán doanh nghiệp",
        dayCreated: new Date("2024-03-25"),

        location: "Cơ sở Bình Thạnh"
    },
    {
        id: 4,
        title: "Kế toán doanh nghiệp",
        dayCreated: new Date("2024-03-25"),

        location: "Cơ sở Bình Thạnh"
    },
    {
        id: 5,
        title: "Kế toán doanh nghiệp",
        dayCreated: new Date("2024-03-25"),

        location: "Cơ sở Bình Thạnh"
    },
    {
        id: 6,
        title: "Tin học văn phòng nâng cao",
        dayCreated: new Date("2024-03-25"),

        location: "Cơ sở Thủ Đức"
    },
]
const courseList: I_courseList[] = [
    {
        id: 1,
        title: "Lập trình web",
        subjectCode: "WE001",
        value: 11,
        maximum: 24

    },
    {
        id: 2,
        title: "Tiếng anh thương mại",
        subjectCode: "TA001",
        value: 5,
        maximum: 24

    },

]
// emsiqqmzrm
