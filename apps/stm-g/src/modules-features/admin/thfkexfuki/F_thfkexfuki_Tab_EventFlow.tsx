"use client"
import { enum_eventTimeLine } from "@/constants/enum/enum_eventTimeLine";
import useQ_UserDashboard_GetUserTimeline from "@/hooks/query-hooks/UserDashboard/useQ_UserDashboard_GetUserTimeline";
import { useS_Shared_FilterStudent } from "@/modules-features/shared/FilterStudent/useS_FilterStudent";
import F_Shared_UserInfoCard from "@/modules-features/shared/UserInfoCard/F_Shared_UserInfoCard";
import { utils_date_formatToDateTimeString } from "@/utils/date";
import { Blockquote, Grid, Paper, ScrollArea, Skeleton, Text, Timeline } from "@mantine/core";
import { IconAward, IconCertificate, IconCheck, IconCreditCard, IconInputCheck } from "@tabler/icons-react";

// Tab thứ 2 của trang: Dòng sự kiện
export default function F_thfkexfuki_Tab_EventFlow() {
    const filterStudent_store = useS_Shared_FilterStudent()
    const getUserTimeline_query = useQ_UserDashboard_GetUserTimeline({
        params: "?userId=" + filterStudent_store.state.userId,
    })
    return (
        <Grid grow >
            <Grid.Col span={3} >
                <F_Shared_UserInfoCard
                    userId={filterStudent_store.state.userId}
                />
            </Grid.Col>
            <Grid.Col span={9} >
                <Paper
                    h={'70vh'}
                    p={'xl'}
                >
                    {getUserTimeline_query.data?.length == 0 &&
                        <Blockquote>
                            Học viên chưa có bất kì sự kiện nào
                        </Blockquote>
                    }
                    <ScrollArea.Autosize h={'70vh'}>
                        <Skeleton visible={getUserTimeline_query.isLoading}>
                            <Timeline
                                active={getUserTimeline_query.data?.length}
                                bulletSize={40}
                                lineWidth={2}
                            >
                                {getUserTimeline_query.data?.map((item, idx) => (
                                    <Timeline.Item
                                        key={idx}
                                        bullet={UserDashboardEventTimelineIcons[item.eventType as enum_eventTimeLine] ?? null}
                                    >
                                        <Paper p={'md'}>
                                            <Text size="lg" fw={'bold'}>
                                                {item.eventDescription}
                                            </Text>
                                            <Text
                                                size="md"
                                                mt={4}
                                            >
                                                {utils_date_formatToDateTimeString(new Date(item.eventDate!))}
                                            </Text>
                                        </Paper>
                                    </Timeline.Item>
                                ))}
                            </Timeline>
                        </Skeleton>
                    </ScrollArea.Autosize>
                </Paper>
            </Grid.Col >
        </Grid>
    )
}

const iconStyle = { height: "25px", width: "25px" }
const UserDashboardEventTimelineIcons: Record<enum_eventTimeLine, React.ReactNode> = {
    [enum_eventTimeLine.Register]: <IconCheck style={iconStyle} />,
    [enum_eventTimeLine.Payment]: <IconCreditCard style={iconStyle} />,
    [enum_eventTimeLine.Review]: <IconInputCheck style={iconStyle} />,
    [enum_eventTimeLine.Point]: <IconAward style={iconStyle} />,
    [enum_eventTimeLine.Finish]: <IconCheck style={iconStyle} />,
    [enum_eventTimeLine.Certificate]: <IconCertificate style={iconStyle} />,
};