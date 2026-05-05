'use client'

import MyCheckbox from "@/components/Checkbox/MyCheckbox";
import { ActionIcon, Box, Card, Group, Image, ScrollArea, Text } from "@mantine/core";
import { IconDownload, IconPrinter, IconShare } from "@tabler/icons-react";
import { useState } from "react";


export interface F_courses {
    id: number;
    name: string;
    time: string;
    image: string;

}
export default function F_ixnczwdmas_Read_Prototype(
) {
    const [selectedCourse, setSelectedCourse] = useState<F_courses | undefined>(courses[0]);


    return (
        <>
            <Group style={{ display: "flex", flexWrap: "nowrap", alignItems: "start" }}>
                <ScrollArea type="auto" style={{ padding: 10, border: "1px solid #ddd", width: "30%", borderRadius: 8 }} >
                    <Text fw={500} size="xl" >Chứng chỉ đã đạt được</Text>
                    {courses.map((course) => (
                        <Card key={course.id} onClick={() => setSelectedCourse(course)}
                            shadow="xs" withBorder style={{ marginTop: 10, display: "flex", flexWrap: "nowrap", flexDirection: "row", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
                            <Box>
                                <Text fw={500}>{course.name}</Text>
                                <Text size="sm" >{course.time}</Text>
                            </Box>
                            <MyCheckbox checked onChange={() => { }} size="lg" color="green"></MyCheckbox>
                        </Card>
                    ))}
                </ScrollArea>
                <Box style={{ width: "80%", border: "1px solid #ddd", padding: 10, borderRadius: 8 }}>
                    {selectedCourse && (
                        <>
                            <Group style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                                <Text fw={500} size="xl" mb="md">Chứng chỉ {selectedCourse.name}</Text>
                                <Group  >
                                    <ActionIcon color="black" variant="subtle" size={"4rem"}>
                                        <IconShare />
                                    </ActionIcon>
                                    <ActionIcon color="black" variant="subtle" size={"4rem"}>
                                        <IconDownload />
                                    </ActionIcon>
                                    <ActionIcon color="black" variant="subtle" size={"4rem"} >
                                        <IconPrinter />
                                    </ActionIcon>
                                </Group>
                            </Group>
                            <Image radius="md" src={selectedCourse.image} alt="Certificate" fit="contain" />
                        </>
                    )}
                </Box>
            </Group>
        </>
    );
}

const courses: F_courses[] = [
    { id: 1, name: "Lập trình web", time: "08:00 22/02/2025", image: "https://static.vecteezy.com/system/resources/previews/002/349/754/non_2x/modern-elegant-certificate-template-free-vector.jpg" },
    { id: 2, name: "Tiếng Anh thương mại", time: "08:00 25/02/2025", image: "https://slidemodel.com/wp-content/uploads/FF0417-01-free-certificate-template-16x9-1.jpg" },
    { id: 3, name: "Phân tích dữ liệu", time: "09:00 15/03/2025", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyeKxmx9X6iR8_E5321UOq12h8NVKIB9ZTxA&s" },
    { id: 4, name: "Quản lý dự án CNTT", time: "10:00 10/04/2025", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBNh2s6uxyG40gU5PYzRlA4y7QoOGJeGM61A&s" },
    { id: 5, name: "An ninh mạng", time: "11:00 05/05/2025", image: "https://images.template.net/385966/Certificate-Template-edit-online.png" }
];