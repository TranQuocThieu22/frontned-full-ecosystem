import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import { ActionIcon, Avatar, Box, Breadcrumbs, Card, Flex, Group, Spoiler, Text } from '@mantine/core';
import { IconBook } from "@tabler/icons-react";
import { utils_date_dateToDDMMYYYString } from 'aq-fe-framework/utils';

import F_vmz23lu0tk_PaperLayout from './F_vmz23lu0tk_PaperLayout';
import { IUserDashboardData } from './interfaces/StudentDashBoard';

export default function F_vmz23lu0tk_LecturerFeedback({ studentData }: { studentData: IUserDashboardData }) {
  return (
    <F_vmz23lu0tk_PaperLayout
      title="Nhận xét từ giảng viên"
    // leftIcon={<IconMessage2 />}
    >
      <Box>
        {studentData.lecturerReview?.lecturerReviews?.length ? (
          <Carousel
            slideSize={{ base: '100%', sm: '50%', md: '33.333333%' }}
            slideGap={{ base: 'xs', sm: 'md' }}
            withControls
            emblaOptions={{ loop: true, align: 'start', slidesToScroll: 3 }}
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
    </F_vmz23lu0tk_PaperLayout>
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
        <Text tt="uppercase" size="sm" fw={600}>{course_name}</Text>
      </Group>

      <Box mt="md" style={{ flex: 1 }}>

        <Flex
          align={'center'}
        >
          <Avatar src={avatar} radius="xl" size="md" mr={10} />
          <Box>
            <Group gap={4}>
              <Text size="sm" c="dimmed" fw={400}>GV:</Text>

              <Text fw={500} size="sm" >{name}</Text>
            </Group>

            <Breadcrumbs separator="•">
              <Text size="sm" c="dimmed">{date}</Text>
              <Text size="sm" c="dimmed">{time}</Text>
            </Breadcrumbs>

          </Box>
        </Flex>

        <Spoiler mt="md" maxHeight={100} showLabel="Xem thêm" hideLabel="Thu gọn">
          <Text size="md" style={{ fontStyle: 'italic' }}>
            {feed_back}
          </Text>
        </Spoiler>

      </Box>
    </Card>
  );
}