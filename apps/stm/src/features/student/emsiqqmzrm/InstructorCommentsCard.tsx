import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import { ActionIcon, Avatar, Box, Breadcrumbs, Card, Group, Spoiler, Text } from '@mantine/core';
import { IconBook } from "@tabler/icons-react";
import { utils_date_dateToDDMMYYYString } from 'aq-fe-framework/utils';
import PaperLayout from './PaperLayout';
import { IUserDashboardData } from './interfaces/StudentDashBoard';

export default function InstructorCommentsCard({ studentData }: { studentData: IUserDashboardData }) {
    return (
        <PaperLayout
            title="Nhận xét từ giảng viên"
        // leftIcon={<IconMessage2 />}
        >
            <Box py="xl">
                {studentData.lecturerReview?.lecturerReviews?.length ? (
                    <Carousel
                        slideSize={{ base: '100%', sm: '50%', md: '33.333333%' }}
                        slideGap={{ base: 'xs', sm: 'md' }}
                        withControls
                        styles={{
                            slide: {
                                height: 'auto',
                                display: 'flex'
                            },
                        }}
                    >
                        {(studentData.lecturerReview?.lecturerReviews ?? []).map((review, index) => (
                            <Carousel.Slide key={index}>
                                <TestimonialItem
                                    course_name={review.cLass}
                                    feed_back={review.review}
                                    name={review.lecturer || ''}
                                    role={"Giảng viên"}
                                    avatar={'https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png'}
                                    date={utils_date_dateToDDMMYYYString(new Date(review.date))}
                                    time={new Date(review.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                />
                            </Carousel.Slide>
                        ))}
                    </Carousel>
                ) : (
                    <Text c="dimmed" size="sm" ta="center" pb={8}>
                        Hiện tại chưa có nhận xét nào từ giảng viên.
                    </Text>
                )}
            </Box>
        </PaperLayout>
    )
}


interface TestimonialItemProps {
    course_name: string;
    feed_back: string;
    name: string;
    role: string;
    avatar: string;
    date: string;
    time: string
}

function TestimonialItem({ feed_back, name, role, avatar, course_name, date, time }: TestimonialItemProps) {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder h="100%">

            <Group gap='xs'>
                <ActionIcon variant="filled">
                    <IconBook style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
                <Text fw={500} tt="uppercase">{course_name}</Text>
            </Group>

            <Box mt="md" style={{ flex: 1 }}>

                <Group>
                    <Avatar src={avatar} radius="xl" size="md" />
                    <Box>
                        <Text fw={700}>{name}</Text>

                        <Breadcrumbs separator="•">
                            <Text size="sm" c="dimmed" fw={500}>{role}</Text>
                            <Text size="sm" c="dimmed">{date}</Text>
                            <Text size="sm" c="dimmed">{time}</Text>
                        </Breadcrumbs>

                    </Box>
                </Group>

                <Spoiler mt="md" maxHeight={100} showLabel="Xem thêm" hideLabel="Thu gọn">
                    <Text size="md" style={{ fontStyle: 'italic' }}>
                        {feed_back}
                    </Text>
                </Spoiler>

            </Box>
        </Card>
    );
}
