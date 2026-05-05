'use client'

import CourseDetailCard from "@/features/main/_components/CourseDetailCard";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";
import { Center, Paper, SimpleGrid, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

interface I {
    id?: number,
    code?: string,
    name?: string,
    classList: IClass[]
}

interface IClass {
    id?: number;
    code?: string;
    name?: string;
    image?: string;
    schedule?: string;
    lessons?: number;
    openingDate?: Date;
    fee?: number;
    tuitionDeadline?: Date;
    learningFacility?: string;
    modifiedWhen: Date;
    modifiedBy: number;
    modifiedFullName: string;
}

export default function CourseClassList() {
    const query = useQuery<I>({
        queryKey: [`CourseClassList`],
        queryFn: async () => {
            return mockData
        }
    });

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <CustomPageContent canBack title="Đăng ký khóa học">

            <Paper p='xl' my='xl'>
                <Center><Title order={1} mb={5} tt="uppercase">{query.data?.name}</Title></Center>
            </Paper>

            <SimpleGrid
                cols={{ base: 1, xs: 2, md: 3, lg: 4, xl: 6 }}
                spacing="lg"
            >
                {query.data?.classList!.map((course, index) => (
                    <CourseDetailCard
                        key={index}
                        code={course.code!}
                        name={course.name!}
                        image={course.image!}
                        openingDate={new Date(course.openingDate!)}
                        schedule={course.schedule!}
                        lessons={course.lessons!}
                        fee={course.fee!}
                        learningFacility={course.learningFacility!}
                        href={`course-registration`}
                    />
                ))}
            </SimpleGrid>

        </CustomPageContent>
    );
}

const mockData = {
    id: 1,
    code: "RJ1",
    name: "ReactJS cơ bản",
    classList: [
        {
            id: 1,
            code: "RJ123",
            name: "ReactJS cơ bản",
            image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&auto=format&fit=crop&q=60",
            schedule: "Tối 3 5 7",
            lessons: 90,
            openingDate: new Date(),
            fee: 5100000,
            tuitionDeadline: new Date(),
            learningFacility: "Sài Gòn Campus",
            modifiedWhen: new Date(),
            modifiedBy: 1,
            modifiedFullName: "GV. Nguyễn Văn A"
        },
        {
            id: 2,
            code: "RJ124",
            name: "ReactJS nâng cao",
            image: "https://images.unsplash.com/photo-1687603917313-ccae1a289a9d?w=500&auto=format&fit=crop&q=60",
            schedule: "Tối 2 4 6",
            lessons: 80,
            openingDate: new Date(),
            fee: 6500000,
            tuitionDeadline: new Date(),
            learningFacility: "Hà Nội Campus",
            modifiedWhen: new Date(),
            modifiedBy: 2,
            modifiedFullName: "GV. Trần Thị B"
        },
        {
            id: 3,
            code: "RJ125",
            name: "Các thư viện bổ sung ReactJS",
            image: "https://images.unsplash.com/photo-1607706189992-eae578626c86?w=500&auto=format&fit=crop&q=60",
            schedule: "Tối 3 5 7",
            lessons: 90,
            openingDate: new Date(),
            fee: 5000000,
            tuitionDeadline: new Date(),
            learningFacility: "Sài Gòn Campus",
            modifiedWhen: new Date(),
            modifiedBy: 3,
            modifiedFullName: "GV. Phạm Văn C"
        },
        {
            id: 4,
            code: "RJ126",
            name: "ReactJS doanh nghiệp",
            image: "https://images.unsplash.com/photo-1653387137517-fbc54d488ed8?w=500&auto=format&fit=crop&q=60",
            schedule: "Sáng 7 Chiều CN",
            lessons: 60,
            openingDate: new Date(),
            fee: 4800000,
            tuitionDeadline: new Date(),
            learningFacility: "Đà Nẵng Campus",
            modifiedWhen: new Date(),
            modifiedBy: 4,
            modifiedFullName: "GV. Lê Thị D"
        },
    ]
}
