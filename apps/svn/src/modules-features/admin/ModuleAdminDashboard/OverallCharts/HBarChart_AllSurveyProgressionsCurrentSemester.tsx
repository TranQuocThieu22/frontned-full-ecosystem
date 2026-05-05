import { BarChart } from '@mantine/charts';
import { Group, Paper, Text, useMantineColorScheme } from '@mantine/core';

interface ChartTooltipProps {
    label: string;
    payload: Record<string, any>[] | undefined;
}

function ChartTooltip({ label, payload }: ChartTooltipProps) {
    if (!payload) return null;
    return (
        <Paper px="md" py="sm" withBorder shadow="md" radius="md">
            <Text fw={500} mb={5}>
                {label}
            </Text>
            {payload.map((item: any) => (
                <Text key={item.name} c={"black"} fz="sm">
                    Tỷ lệ phản hồi trung bình: {item.value}%
                </Text>
            ))}
        </Paper>
    );
}

const data = [
    {
        surveyId: 1,
        surveyCode: 'IT-2023-01',
        surveyName: 'Khảo sát hướng nghiệp khoa Công nghệ thông tin',
        totalReponsePercent: 72
    },
    {
        surveyId: 2,
        surveyCode: 'LIB-2023-02',
        surveyName: 'Khảo sát chất lượng dịch vụ thư viện',
        totalReponsePercent: 68
    },
    {
        surveyId: 3,
        surveyCode: 'ECON-2023-03',
        surveyName: 'Đánh giá chương trình đào tạo khoa Kinh tế',
        totalReponsePercent: 85
    },
    {
        surveyId: 4,
        surveyCode: 'ENV-2023-04',
        surveyName: 'Khảo sát môi trường học tập tại cơ sở chính',
        totalReponsePercent: 79
    },
    {
        surveyId: 5,
        surveyName: 'Đánh giá chất lượng giảng dạy học kỳ hiện tại',
        totalReponsePercent: 90
    },
    {
        surveyId: 6,
        surveyCode: 'IT-2023-05',
        surveyName: 'Khảo sát mức độ hài lòng với hệ thống CNTT',
        totalReponsePercent: 62
    },
    {
        surveyId: 7,
        surveyCode: 'LAB-2023-06',
        surveyName: 'Đánh giá cơ sở vật chất phòng thí nghiệm',
        totalReponsePercent: 75
    },
    {
        surveyId: 8,
        surveyCode: 'EXTRA-2023-07',
        surveyName: 'Khảo sát nhu cầu hoạt động ngoại khóa sinh viên',
        totalReponsePercent: 81
    },
    {
        surveyId: 9,
        surveyCode: 'DORM-2023-08',
        surveyName: 'Đánh giá chất lượng dịch vụ ký túc xá',
        totalReponsePercent: 58
    },
    {
        surveyId: 10,
        surveyCode: 'ONLINE-2023-09',
        surveyName: 'Khảo sát trải nghiệm học trực tuyến',
        totalReponsePercent: 77
    },
    {
        surveyId: 11,
        surveyCode: 'INTERNSHIP-2023-10',
        surveyName: 'Đánh giá hoạt động hướng dẫn thực tập',
        totalReponsePercent: 69
    },
    {
        surveyId: 12,
        surveyCode: 'CANTEEN-2023-11',
        surveyName: 'Khảo sát về chất lượng bữa ăn căn tin',
        totalReponsePercent: 51
    },
    {
        surveyId: 13,
        surveyCode: 'EXCHANGE-2023-12',
        surveyName: 'Đánh giá chương trình trao đổi sinh viên quốc tế',
        totalReponsePercent: 87
    },
    {
        surveyId: 14,
        surveyCode: 'COUNSELING-2023-13',
        surveyName: 'Khảo sát mức độ hài lòng về hoạt động tư vấn tâm lý',
        totalReponsePercent: 74
    },
    {
        surveyId: 15,
        surveyCode: 'HEALTH-2023-14',
        surveyName: 'Đánh giá chất lượng dịch vụ y tế trường học',
        totalReponsePercent: 63
    },
    {
        surveyId: 16,
        surveyCode: 'DIGITAL-2023-15',
        surveyName: 'Khảo sát nhu cầu học liệu kỹ thuật số',
        totalReponsePercent: 82
    },
    {
        surveyId: 17,
        surveyCode: 'CLUB-2023-16',
        surveyName: 'Đánh giá hoạt động câu lạc bộ sinh viên',
        totalReponsePercent: 76
    },
    {
        surveyId: 18,
        surveyCode: 'SCHOLARSHIP-2023-17',
        surveyName: 'Khảo sát về chương trình học bổng và hỗ trợ tài chính',
        totalReponsePercent: 88
    },
    {
        surveyId: 19,
        surveyCode: 'CAREER-2023-18',
        surveyName: 'Đánh giá hiệu quả hoạt động hướng nghiệp',
        totalReponsePercent: 71
    },
    {
        surveyId: 20,
        surveyCode: 'SAFETY-2023-19',
        surveyName: 'Khảo sát về an toàn trong khuôn viên trường',
        totalReponsePercent: 65
    },
    {
        surveyId: 21,
        surveyCode: 'STUDYROOM-2023-20',
        surveyName: 'Đánh giá chất lượng phòng tự học và không gian làm việc',
        totalReponsePercent: 59
    },
    {
        surveyId: 22,
        surveyCode: 'SOFTSKILLS-2023-21',
        surveyName: 'Khảo sát nhu cầu kỹ năng mềm của sinh viên',
        totalReponsePercent: 83
    },
    {
        surveyId: 23,
        surveyCode: 'LANGUAGE-2023-22',
        surveyName: 'Đánh giá hiệu quả các khóa học ngoại ngữ',
        totalReponsePercent: 66
    }
]

export default function HBarChart_AllSurveyProgressionsCurrentSemester() {
    const colorTheme = useMantineColorScheme()
    return (
        <Group>
            <Text mb={"20"}>Tỷ lệ phản hồi trung bình</Text>
            <BarChart
                h={800}
                w={"96%"}
                data={[...data].sort((a, b) => b.totalReponsePercent - a.totalReponsePercent) || []}
                dataKey="surveyName"
                orientation="vertical"
                yAxisProps={{ width: 400, domain: [0, 100] }}
                xAxisProps={{
                    tickMargin: 15,
                    orientation: 'top',
                    label: {
                        value: 'Tỷ lệ phản hồi trung bình (%)',
                        position: 'top',
                        // fill: colorTheme.colorScheme === 'dark' ? 'gray' : 'black',
                        fontSize: 14
                    }
                }}
                // xAxisProps={{ domain: [0, 100] }}
                tooltipProps={{
                    content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
                }}
                series={[{ name: 'totalReponsePercent', color: '#59a89c', label: 'surveyName' }]}
                barProps={{
                    label: {
                        position: 'right',
                        value: 'amount',
                        fill: colorTheme.colorScheme === 'dark' ? 'gray' : 'black',
                        // content: ({ value }) => `${value}%`,
                    }
                }}
                maxBarWidth={20}
                tickLine="x"
                yAxisLabel="Chiến dịch trong học kỳ hiện hành (hiển thị theo mã chiến dịch)"
            // xAxisLabel="Tỷ lệ phản hồi trung bình"
            />
        </Group>
    );
}



