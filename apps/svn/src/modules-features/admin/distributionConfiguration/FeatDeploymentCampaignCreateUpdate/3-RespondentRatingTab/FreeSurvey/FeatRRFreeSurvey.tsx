import baseAxios from "@/api/config/baseAxios";
import { Checkbox, Group } from "@mantine/core";
import { MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { MyButton } from "aq-fe-framework/core";
import { useMyReactQuery } from "aq-fe-framework/hooks";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import FeatRespondentRatingFreeSurveyCreate from "./FeatRRFreeSurveyCreate";

interface I {
    respondentLastName?: string,
    respondentFirstName?: string,
    workUnit?: string,
    position?: string,
    email?: string,
    phoneNumber?: string,
    surveyed?: boolean
}

export default function FeatRespondentRatingFreeSurvey() {
    const query = useMyReactQuery({
        queryKey: ['FeatFreeSurvey'],
        axiosFn: () => baseAxios.get(""),
        mockData: data
    })
    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
        {
            header: "Họ và tên đáp viên",
            accessorKey: "respondentLastName"
        },
        {
            header: "Tên đáp viên",
            accessorKey: "respondentFirstName"
        },
        {
            header: "Đơn vị công tác",
            accessorKey: "workUnit"
        },
        {
            header: "Chức vụ",
            accessorKey: "position"
        },
        {
            header: "Email",
            accessorKey: "email"
        },
        {
            header: "Số điện thoại",
            accessorKey: "phoneNumber"
        },
        {
            header: "Đã khảo sát",
            accessorKey: "surveyed",
            accessorFn() {
                return (<Checkbox></Checkbox>)
            }
        }
    ], [])
    return (
        <MyFieldset title="Danh sách đáp viên có thể chọn">
            <MyDataTable
                columns={columns}
                data={query.data || []}
                isLoading={query.isLoading}
                isError={query.isError}
                renderTopToolbarCustomActions={() => (
                    <Group>
                        <FeatRespondentRatingFreeSurveyCreate />
                        <MyButton actionType="import" />
                        <MyButton>Gửi mail</MyButton>
                    </Group>

                )}
            />

        </MyFieldset>
    )
}

const data: I[] = [
    {
        respondentLastName: "Tô",
        respondentFirstName: "Lanh",
        workUnit: "AQTech",
        position: "Trưởng phòng SUP",
        email: "support@aqtech.vn",
        phoneNumber: "0256984355",
        surveyed: true
    }
]