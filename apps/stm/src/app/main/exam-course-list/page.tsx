'use client'
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";
import { SimpleGrid } from "@mantine/core";
import CourseExamCard, { CourseExamCardProps } from "../../../features/main/_components/CourseExamCard";


export default function Page() {
    return (
        <CustomPageContent canBack title="Danh sách các khóa học có thể đăng ký">
            <SimpleGrid cols={{ base: 1, xs: 2, md: 3, lg: 4, xl: 5 }}>
                {courses.map((course, index) => {
                    return (
                        <CourseExamCard key={index} href={`/main/examRegistration`} image={course.image} title={course.title} description={course.description} fee={course.fee} openingDate={course.openingDate} buttonLabel="Đăng ký" />
                    )
                })}
            </SimpleGrid>
        </CustomPageContent>
    )
}

const courses: CourseExamCardProps[] = [
    {
        image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=500&auto=format&fit=crop&q=60",
        title: "Khóa học React.js cơ bản đến nâng cao",
        description: "Học cách xây dựng ứng dụng web hiện đại với React, Redux và các thư viện phổ biến.",
        href: "",
        fee: 4500000,
        openingDate: new Date(2023, 11, 15)
    },
    {
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&auto=format&fit=crop&q=60",
        title: "Khóa học JavaScript nâng cao",
        description: "Nắm vững các khái niệm nâng cao trong JavaScript như closure, prototype, async/await.",
        href: "",
        fee: 3800000,
        openingDate: new Date(2023, 11, 20)
    },
    {
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop&q=60",
        title: "Lập trình Python cho AI và Machine Learning",
        description: "Học cách sử dụng Python để xây dựng các mô hình AI và Machine Learning.",
        href: "",
        fee: 5200000,
        openingDate: new Date(2024, 0, 5)
    },
    {
        image: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=500&auto=format&fit=crop&q=60",
        title: "Phát triển ứng dụng di động với Flutter",
        description: "Xây dựng ứng dụng di động đa nền tảng với Flutter và Dart.",
        href: "",
        fee: 4800000,
        openingDate: new Date(2024, 0, 10)
    },
    {
        image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=500&auto=format&fit=crop&q=60",
        title: "Khóa học DevOps và CI/CD",
        description: "Học cách triển khai và quản lý hệ thống với Docker, Kubernetes và Jenkins.",
        href: "",
        fee: 5500000,
        openingDate: new Date(2024, 0, 15)
    },
    {
        image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=500&auto=format&fit=crop&q=60",
        title: "Bảo mật ứng dụng web",
        description: "Học cách bảo vệ ứng dụng web khỏi các cuộc tấn công phổ biến và thực hành ethical hacking.",
        href: "",
        fee: 5100000,
        openingDate: new Date(2024, 0, 20)
    },
    {
        image: "https://images.unsplash.com/photo-1489875347897-49f64b51c1f8?w=500&auto=format&fit=crop&q=60",
        title: "Phát triển backend với Node.js",
        description: "Xây dựng API RESTful và GraphQL với Node.js, Express và MongoDB.",
        href: "",
        fee: 4200000,
        openingDate: new Date(2024, 1, 5)
    },
    {
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop&q=60",
        title: "Khóa học AWS Cloud Practitioner",
        description: "Học cách sử dụng dịch vụ đám mây AWS và chuẩn bị cho chứng chỉ AWS Cloud Practitioner.",
        href: "",
        fee: 5300000,
        openingDate: new Date(2024, 1, 10)
    },
    {
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=60",
        title: "Lập trình game với Unity",
        description: "Học cách phát triển game 2D và 3D với Unity và C#.",
        href: "",
        fee: 4800000,
        openingDate: new Date(2024, 1, 15)
    },
    {
        image: "https://images.unsplash.com/photo-1550439062-609e1531270e?w=500&auto=format&fit=crop&q=60",
        title: "Khóa học Data Science cơ bản",
        description: "Học cách phân tích và trực quan hóa dữ liệu với Python, Pandas và Matplotlib.",
        href: "",
        fee: 4500000,
        openingDate: new Date(2024, 1, 20)
    }
];
