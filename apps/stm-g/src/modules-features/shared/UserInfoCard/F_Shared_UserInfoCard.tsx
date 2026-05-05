import baseAxios from "@/api/config/baseAxios";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { Group, Image, Paper, Skeleton, Text } from "@mantine/core";
import { IconBrandGmail, IconCake, IconId, IconPhone } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MyIconText } from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
// import { MyIconText } from "aq-fe-framework/components";

interface I {
    fullName?: string,
    gender?: number,
    dateOfBirth?: Date,
    email?: string,
    phoneNumber?: string,
    address?: string,
    identifier: string,
}
export default function F_Shared_UserInfoCard({ userId }: { userId?: number }) {
    const ENDPOINT = "/UserDashboard/GetStudentDashboard?id=" + userId
    const getStudentDashboard_query = useQuery<I>({
        queryKey: [ENDPOINT],
        queryFn: async () => {
            const res = await baseAxios.get(ENDPOINT)
            return res.data.data
        },
        enabled: userId != 0
    })
    const emptyData = "Chưa có thông tin"
    if (userId == undefined) return "Vui lòng chọn học viên"
    return (
        <Paper h={'100%'}>
            <Skeleton visible={getStudentDashboard_query.isLoading} h={'100%'} p={'md'}>
                <Group>
                    <MyFlexColumn gap={1} w={'100%'}>
                        <Image
                            w={'100%'}
                            radius="md"
                            src={"https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png"}
                        />
                        <Text ta={'center'} size={'xl'} fw={'bold'}>{getStudentDashboard_query.data?.fullName || emptyData}</Text>

                        <MyIconText icon={IconCake} text={utils_date_dateToDDMMYYYString(new Date(getStudentDashboard_query.data?.dateOfBirth!)) || emptyData} />
                        <MyIconText icon={IconBrandGmail} text={getStudentDashboard_query.data?.email || emptyData} />
                        <MyIconText icon={IconPhone} text={getStudentDashboard_query.data?.phoneNumber || emptyData} />
                        <MyIconText icon={IconId} text={getStudentDashboard_query.data?.identifier || emptyData} />
                    </MyFlexColumn>
                </Group>
            </Skeleton>
        </Paper>
    )
}
