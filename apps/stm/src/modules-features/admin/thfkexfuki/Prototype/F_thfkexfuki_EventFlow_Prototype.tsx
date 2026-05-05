import MyNumberFormatter from "@/components/DataDisplay/NumberFormatter/MyNumberFormatter";
import { Avatar, Box, Card, Grid, Group, ScrollArea, Stack, Text, Timeline } from "@mantine/core";
import { IconAt, IconBrightness2, IconCake, IconCircleCheckFilled, IconId, IconPhoneCall } from "@tabler/icons-react";
import classes from '../F_thfkexfuki_generalInfor.module.css';


export function AvatarBox({ data }: { data: any }) {
    return (


        <Card style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

        }}>
            <Group wrap="nowrap" style={{ maxHeight: '100%', alignSelf: 'stretch' }}>
                <Grid>
                    <Grid.Col span={{ base: 12, md: 4 }} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                        <Avatar
                            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}

                            radius="md"
                        />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>

                        <div>
                            <Text fz="lg" tt="uppercase" fw={700} c="dimmed">
                                Student Information
                            </Text>

                            <Text style={{ fontSize: '2rem' }} fw={500} className={classes.name}>
                                {data.fullName}
                            </Text>


                            <Group wrap="nowrap" gap={10} mt={3}>
                                <IconCake stroke={1.5} size={16} className={classes.icon} />
                                <Text fz="lg" c="dimmed">
                                    {data.dob ? data.dob.toLocaleDateString() : new Date().toLocaleDateString()}
                                </Text>
                            </Group>
                            <Group wrap="nowrap" gap={10} mt={3}>
                                <IconAt stroke={1.5} size={16} className={classes.icon} />
                                <Text fz="lg" c="dimmed">
                                    {data.email}
                                </Text>
                            </Group>

                            <Group wrap="nowrap" gap={10} mt={5}>
                                <IconPhoneCall stroke={1.5} size={16} style={{ color: 'light-dark(var(--mantine-color-gray-5), var(--mantine-color-dark-3))' }} />
                                <Text fz="lg" c="dimmed">
                                    {data.phoneNumber}
                                </Text>
                            </Group>
                            <Group wrap="nowrap" gap={10} mt={5}>
                                <IconId stroke={1.5} size={16} style={{ color: 'light-dark(var(--mantine-color-gray-5), var(--mantine-color-dark-3))' }} />
                                <Text fz="lg" c="dimmed">
                                    {data.cccd}
                                </Text>
                            </Group>
                        </div>
                    </Grid.Col>
                </Grid>
            </Group>
        </Card>
    )
}

export function EventFlow() {
    return (
        <Card style={{
            display: "flex",
            flexDirection: "column",
            height: "72vh",
            maxHeight: '72vh',
            // alignItems: 'center',
            // justifyContent: 'center',
            // alignItems:'flex-start',
            // justifyContent:'flex-start',
            // maxWidth:'100%'
        }}>

            <ScrollArea
                p={'lg'}
            >
                <Timeline style={{
                    // maxWidth:'100%'

                }} bulletSize={50}>
                    {
                        timelineData.map((item, index) => {
                            return (
                                <Timeline.Item

                                    title={
                                        <strong>
                                            <Stack gap="sm">

                                                {item.shortDate}
                                                <br />

                                                <span style={{ color: 'gray' }} >
                                                    {item.dateTime}
                                                </span>
                                            </Stack>
                                        </strong>}
                                    key={item.id}
                                    bullet={
                                        item.bulletIcon === 'check' ? <IconCircleCheckFilled style={{ width: '100%', height: '100%' }} color='green' /> : <IconBrightness2 style={{ width: '100%', height: '100%' }} color='orange' />
                                    }
                                >
                                    <Card style={
                                        {
                                            // maxWidth:'50%'
                                        }
                                    }>{
                                            <>
                                                <strong>

                                                    {item.title}
                                                </strong>

                                                {item.detail && (item.moneyCheck === false) ? (
                                                    <>
                                                        {/* <br /> */}
                                                        {item.detail}
                                                    </>) : (
                                                    <>
                                                        {/* <br /> */}
                                                        <MyNumberFormatter value={item.detail} />
                                                        {/*                                                             
                                                        </NumberFormatter> */}
                                                    </>
                                                )}

                                            </>
                                        }

                                    </Card>
                                </Timeline.Item>
                            )
                        })
                    }

                </Timeline>
            </ScrollArea>
        </Card>
    )
}

export default function F_thfkexfuki_EventFlow_Prototype({ data }: { data: any }) {
    return (

        <Box mt={"md"}>

            <Grid>
                <Grid.Col span={{ base: 12, sm: 12, md: 12, lg: 12, xl: 4 }}>
                    <AvatarBox data={data} />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 12, md: 12, lg: 12, xl: 8 }} >
                    <EventFlow />
                </Grid.Col>
            </Grid>
        </Box>

    )
}




export interface TimelineItem {
    id: number;              // Mã định danh duy nhất cho item
    dateTime: string;        // Ngày giờ đầy đủ, ví dụ: "16:30:23 08/12/2024"
    shortDate: string;       // Ngày rút gọn, ví dụ: "08/12"
    title: string;           // Tiêu đề sự kiện, ví dụ: "Đăng ký Khóa học lập trình web 2401"
    detail?: string;         // Thông tin chi tiết bổ sung
    bulletIcon?: 'check' | 'star';   // Kiểu icon của bullet (nếu bạn muốn phân loại)
    bulletColor?: string;
    moneyCheck?: boolean;         // Màu bullet
}


export const timelineData: TimelineItem[] = [
    {
        id: 1,
        dateTime: '16:30:23 08/12/2024',
        shortDate: '08/12',
        title: 'Đăng ký Khóa học lập trình web 2401',
        detail: '', // không có detail bổ sung
        bulletIcon: 'check',
        bulletColor: '#28a745', // xanh lá
        moneyCheck: false
    },
    {
        id: 2,
        dateTime: '16:30:23 08/12/2024',
        shortDate: '08/12',
        title: 'Thanh toán Khóa học lập trình web 2401 ',
        detail: '1.500.000',
        bulletIcon: 'check',
        bulletColor: '#28a745',
        moneyCheck: true

    },
    {
        id: 3,
        dateTime: '16:30:23 08/12/2024',
        shortDate: '08/12',
        title: 'Khóa lập trình web 2401',
        detail: 'Điểm cuối kỳ: 8\nTrạng thái: Đạt',
        bulletIcon: 'check',
        bulletColor: '#28a745',
        moneyCheck: false
    },
    {
        id: 4,
        dateTime: '16:30:23 08/12/2024',
        shortDate: '08/12',
        title: 'Khóa lập trình web 2401',
        detail: 'Điểm LT: 25 Điểm TH: 8\nTrạng thái: Đạt',
        bulletIcon: 'check',
        bulletColor: '#28a745',
        moneyCheck: false
    },
    {
        id: 5,
        dateTime: '16:30:23 08/12/2024',
        shortDate: '08/12',
        title: 'Khóa lập trình web 2401',
        detail: 'Điểm cuối kỳ: 8\nTrạng thái: Đạt',
        bulletIcon: 'check',
        bulletColor: '#28a745',
        moneyCheck: false
    },
    {
        id: 6,
        dateTime: '16:30:23 08/12/2024',
        shortDate: '08/12',
        title: 'Đăng ký thi Khóa lập trình web 2401',
        detail: 'Điểm LT: 25 Điểm TH: 8\nTrạng thái: Đạt',
        bulletIcon: 'star',     // Ví dụ: hiển thị bullet hình sao
        bulletColor: '#ffa94d', // cam
        moneyCheck: false
    },
    {
        id: 7,
        dateTime: '16:30:23 08/12/2024',
        shortDate: '08/12',
        title: 'Cấp chứng chỉ',
        detail: 'Lập trình web',
        bulletIcon: 'check',
        bulletColor: '#28a745',
        moneyCheck: false
    },
    {
        id: 8,
        dateTime: '16:30:23 08/12/2024',
        shortDate: '08/12',
        title: 'Đăng ký Khóa học tiếng Anh B1',
        detail: '',
        bulletIcon: 'check',
        bulletColor: '#28a745',
        moneyCheck: false
    },
];
