'use client'

import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import { Avatar, Badge, Box, Button, Card, Group, Image, Progress, ScrollArea, Tabs, Text, TextInput } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";

export interface F_message {
    id: number;
    name: string;
    time: string;
    text: string;
}

export interface F_student {
    name: string;
    email: string;
    phone: string;
    class: string;
}

export interface F_notification {
    id: number;
    title: string;
    content: string;
    time: string;
}


export interface F_group {
    id: number;
    name: string;
    messages: F_message[];
    progress: number;
    totalSessions: number;
    completedSessions: number;
}

export default function F_jflczdkadk_Read(
) {
    const [messages, setMessages] = useState<any[]>(mockMessages);
    const [input, setInput] = useState("");
    const [activeTab, setActiveTab] = useState("center");


    const handleSend = () => {
        if (input.trim()) {
            setMessages([
                ...messages,
                { id: messages.length + 1, name: "Bạn", text: input, time: new Date().toLocaleTimeString() },
            ]);
            setInput("");
        }
    };

    return (
        <Card style={{ backgroundColor: "white", height: "100%" }}>
            <Group style={{ display: "flex", flexWrap: "nowrap", alignItems: "start" }}>
                <Card style={{ width: "30%" }}>
                    <Tabs value={activeTab} onChange={(value) => {
                        if (value) {
                            setActiveTab(value);
                        }
                    }}>
                        <Tabs.List>
                            <Tabs.Tab value="center">Trung tâm</Tabs.Tab>
                            <Tabs.Tab value="student" >Học viên</Tabs.Tab>
                            <Tabs.Tab value="group">Nhóm</Tabs.Tab>
                        </Tabs.List>
                        <Tabs.Panel value="center">
                            <Box style={{ border: "1px solid #ddd", borderRadius: 8, padding: "0.5rem", margin: "0.7rem 0.5rem", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer" }}>
                                <Text size="lg" style={{ marginRight: "0.3rem" }}> Trung tâm</Text>
                                <Badge>{mockNotifications.length}</Badge>
                            </Box>
                        </Tabs.Panel>

                        <Tabs.Panel value="student">
                            <Box style={{ border: "1px solid #ddd", borderRadius: 8, padding: "0.5rem", margin: "0.7rem 0.5rem", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer" }}>
                                <Text size="lg" style={{ marginRight: "0.3rem" }}>{mockStudent.name}</Text>
                                <Badge>{mockMessages.length}</Badge>
                            </Box>
                        </Tabs.Panel>

                        <Tabs.Panel value="group"><Box style={{ border: "1px solid #ddd", borderRadius: 8, padding: "0.5rem", margin: "0.7rem 0.5rem", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer" }}>
                            <Text size="lg" style={{ marginRight: "0.3rem" }}>{mockGroup.name}</Text>
                            <Badge>{mockGroup.messages.length}</Badge>
                        </Box></Tabs.Panel>
                    </Tabs>
                </Card>

                {activeTab === "student" && (
                    <Card p={"1rem"} pt={'1rem'} style={{ width: "80%", height: "80vh", border: "1px solid #ddd", borderRadius: 8, overflow: "hidden" }} >
                        <Text size="lg" fw={500} style={{ background: "#f8f9fa", padding: 10, borderBottom: "1px solid #ddd", backgroundColor: "white" }}>
                            {mockStudent.name}
                        </Text>
                        <ScrollArea style={{ height: "68vh", padding: 10 }}>
                            {messages.map((msg) => (
                                <Box key={msg.id} style={{ display: "flex", alignItems: "flex-start", marginBottom: 10 }}>
                                    <Avatar radius="xl" style={{ marginRight: 10 }}>{msg.name.charAt(0)}</Avatar>
                                    <Box>
                                        <Text fw={500}>{msg.name}</Text>
                                        <Text size="xs" color="dimmed">{msg.time}</Text>
                                        <Text>{msg.text}</Text>
                                    </Box>
                                </Box>
                            ))}
                        </ScrollArea>
                        <Box style={{ display: "flex", alignItems: "center", padding: 10, borderTop: "1px solid #ddd" }}>
                            <TextInput style={{ flex: 1 }} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Nhập tin nhắn..." />
                            <Button ml={10} onClick={handleSend}>Gửi</Button>
                        </Box>
                    </Card>
                )}

                {activeTab === "student" && (
                    <Card style={{ width: "40%", border: "1px solid #ddd", borderRadius: 8, padding: 10 }}>
                        <Text size="lg" fw={500} style={{ borderBottom: "1px solid #ddd", paddingBottom: 10 }}>
                            Học viên
                        </Text>
                        <Box style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 10 }}>
                            {/* <Avatar size={64} radius="xl" /> */}
                            <Avatar
                                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
                                style={{
                                    width: '90%',
                                    height: '90%',
                                    maxHeight: '100%',
                                    maxWidth: '100%',
                                    objectFit: 'cover',
                                }}
                                // size={500}
                                radius="md"
                            />
                            <Text style={{ marginTop: 10, fontSize: 24 }}>{mockStudent.name}</Text>
                        </Box>
                        <Box style={{ marginTop: 10 }}>
                            <Text size="sm">📧 Email: lamlaliem@gmail.com</Text>
                            <Text size="sm">📞 Điện thoại: 0978.563.524</Text>
                            <Text size="sm">🎓 Lớp: Lập trình web 2401</Text>
                        </Box>
                    </Card>
                )}
                {activeTab === "center" && (
                    <Card style={{ width: "80%", height: "80vh", border: "1px solid #ddd", borderRadius: 8, overflow: "hidden" }}>
                        <Text size="lg" fw={500} style={{ background: "#f8f9fa", padding: 10, borderBottom: "1px solid #ddd", backgroundColor: "white" }}>
                            Thông báo từ Trung tâm
                        </Text>
                        <ScrollArea style={{ height: "68vh", padding: 10 }}>
                            {mockNotifications.map((notification) => (
                                <Box key={notification.id} style={{ display: "flex", alignItems: "flex-start", marginBottom: 10, width: "100%" }}>
                                    <Avatar radius="xl" style={{ marginRight: 10 }}>N</Avatar>
                                    <Box>
                                        <Text size="lg" fw={500}>{notification.title}</Text>
                                        <Text>{notification.content}</Text>
                                    </Box>
                                    <Text style={{ position: "absolute", right: "0", paddingRight: "0.3rem" }} size="xs">{notification.time}</Text>
                                </Box>
                            ))}
                        </ScrollArea>
                        <Box style={{ display: "flex", alignItems: "center", padding: 10, borderTop: "1px solid #ddd" }}>
                            <TextInput style={{ flex: 1 }} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Nhập tin nhắn..." />
                            <Button ml={10} onClick={handleSend}>Gửi</Button>
                        </Box>
                    </Card>
                )}

                {activeTab === "center" && (
                    <Box style={{ width: "40%", padding: 10, }}>

                    </Box>
                )}

                {activeTab === "group" && (
                    <Card p="1rem" style={{ width: "80%", height: "80vh", border: "1px solid #ddd", borderRadius: 8, overflow: "hidden" }}>
                        <Text size="lg" fw={500} style={{ background: "#f8f9fa", padding: 10, borderBottom: "1px solid #ddd", backgroundColor: "white" }}>
                            {mockGroup.name}
                        </Text>
                        <ScrollArea style={{ height: "68vh", padding: 10 }}>
                            {mockGroup.messages.map((msg) => (
                                <Box key={msg.id} style={{ display: "flex", alignItems: "flex-start", marginBottom: 10 }}>
                                    <Avatar radius="xl" style={{ marginRight: 10 }}>{msg.name.charAt(0)}</Avatar>
                                    <Box>
                                        <Text fw={500}>{msg.name}</Text>
                                        <Text size="xs" >{msg.time}</Text>
                                        <Text>{msg.text}</Text>
                                    </Box>
                                </Box>
                            ))}
                        </ScrollArea>
                        <Box style={{ display: "flex", alignItems: "center", padding: 10, borderTop: "1px solid #ddd" }}>
                            <TextInput style={{ flex: 1 }} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Nhập tin nhắn..." />
                            <Button ml={10} onClick={handleSend}>Gửi</Button>
                        </Box>
                    </Card>
                )
                }

                {
                    activeTab === "group" && (
                        <Box style={{ width: "40%", borderRadius: 8, padding: "0 1rem 1rem 1rem" }}>
                            <Box pt={"10"} style={{ border: "1px solid #ddd", borderRadius: 8, padding: "0 1rem 1rem 1rem" }}>
                                <Box style={{ marginBottom: 10 }}>
                                    <Text size="lg" fw={500}>
                                        {mockGroup.name}
                                    </Text>
                                </Box>
                                <Box style={{ display: "flex", justifyContent: "center", border: "1px solid #ddd", borderRadius: "1rem" }}>
                                    <Image
                                        radius="md"
                                        h="auto"
                                        w="auto"
                                        fit="contain"
                                        src="https://img.freepik.com/free-vector/website-development-banner_33099-1687.jpg?t=st=1741676035~exp=1741679635~hmac=b9e7bb4a9d090941fd8b6602f118f3428000b78c18c752b01ae86bc91e6f1585&w=1380"
                                    />
                                </Box>
                                <Box style={{ marginTop: 10 }}>
                                    <MyFlexRow style={{ justifyContent: "space-between" }}>
                                        <Text size="sm">Tiến trình học:</Text>
                                        <Text>{mockGroup.progress}%</Text>
                                    </MyFlexRow>
                                    <MyFlexRow style={{ flexWrap: "nowrap" }}>
                                        <Progress value={mockGroup.progress} style={{ marginBottom: 10, width: "100%" }} />
                                        <Text size="sm">{mockGroup.completedSessions}/{mockGroup.totalSessions}</Text>
                                    </MyFlexRow>
                                </Box>
                            </Box>
                            <Card p={"1rem"} style={{ marginTop: 10, border: "1px solid #ddd", borderRadius: 8, padding: "0 1rem 1rem 1rem" }}>
                                <Text size="lg" fw={500}>
                                    Giảng viên
                                </Text>
                                {/* <Box style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 10, border: "1px solid #ddd", borderRadius: 8, }}> */}
                                <Group justify="center" pt={10} >

                                    <Avatar
                                        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
                                        style={{
                                            width: '70%',
                                            height: '70%',
                                            maxHeight: '100%',
                                            maxWidth: '100%',
                                            objectFit: 'cover',
                                        }}
                                        // size={500}
                                        radius="md"
                                    />
                                    <Text size="xl" style={{}}>{mockMessages[0]?.name}</Text>
                                </Group>
                                {/* </Box> */}
                                <Box style={{ marginTop: 15 }}>
                                    <Text size="sm">📧 Email: linhlanhloim@gmail.com</Text>
                                    <Text size="sm">📞 Điện thoại: 0978.563.524</Text>
                                </Box>
                            </Card>
                        </Box>
                    )
                }
            </Group >
        </Card >
    );
}


export const mockMessages: F_message[] = [
    {
        id: 1,
        name: "Tô Ngọc Linh",
        time: "20:15 22/02/2025",
        text: "Buổi 1, Khóa lập trình web\nCác bạn cần về nhà rèn luyện nhiều hơn về các bài hôm nay có dạy nhé!",
    },
];

export const mockStudent: F_student = {
    name: "Tô Ngọc Lâm",
    email: "lamlaliem@gmail.com",
    phone: "0978.563.524",
    class: "Lập trình web 2401",
};

export const mockNotifications: F_notification[] = [
    {
        id: 1,
        title: "Thông báo từ trung tâm",
        content: "Trung tâm sẽ triển khai chiêu sinh các lớp tiếng Anh văn phòng tối 2, 4, 6. Giảng viên đăng ký tham gia giảng dạy ạ.",
        time: "20:15 22/02/2025",
    },
    {
        id: 2,
        title: "Cập nhật lịch học",
        content: "Lịch học tuần này có một số thay đổi, vui lòng kiểm tra lịch cá nhân để cập nhật.",
        time: "10:30 23/02/2025",
    },
];

export const mockGroup: F_group = {
    id: 1,
    name: "Lập trình web 2401",
    messages: [
        {
            id: 1,
            name: "Giảng viên",
            time: "20:20 22/02/2025",
            text: "Chào các bạn, đây là nhóm lớp Lập trình web 2401!",
        },
        {
            id: 2,
            name: "Học viên A",
            time: "20:30 22/02/2025",
            text: "Chào thầy và các bạn ạ!",
        },
    ],
    progress: 15,
    totalSessions: 24,
    completedSessions: 5,
};