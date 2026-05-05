'use client'

import TrainingCenterCard from "@/features/main/_components/TrainingCenterCard";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";
import { SimpleGrid } from "@mantine/core";

export default function Page() {
  return (
    <CustomPageContent title="Danh sách trung tâm đào tạo">
      <SimpleGrid cols={{ base: 1, xs: 2, md: 3, lg: 5 }}>
        {data.map((course, index) => (
          <TrainingCenterCard key={index} href={`/main/course-list`} image={course.image} title={course.title} />
        ))}
      </SimpleGrid>
    </CustomPageContent>
  )
}

const data = [
  {
    image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=500&auto=format&fit=crop&q=60",
    title: "Trung tâm công nghệ thông tin",
    courseId: 1
  },
  {
    image: "https://images.unsplash.com/photo-1614107151491-6876eecbff89?w=500&auto=format&fit=crop&q=60",
    title: "Trung tâm ngoại ngữ",
    courseId: 1
  },
  {
    image: "https://images.unsplash.com/photo-1690223878423-14cf4867638f?w=500&auto=format&fit=crop&q=60",
    title: "Trung tâm kỹ năng xã hội",
    courseId: 1
  },
  {
    image: "https://images.unsplash.com/photo-1543722615-dbf5edf1a00d?w=500&auto=format&fit=crop&q=60",
    title: "Trung tâm thiết kế vi mạch",
    courseId: 1
  },
  {
    image: "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?w=500&auto=format&fit=crop&q=60",
    title: "Trung tâm thiết kế",
    courseId: 1
  },
];
