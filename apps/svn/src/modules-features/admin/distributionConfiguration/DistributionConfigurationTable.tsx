"use client"
import baseAxios from "@/api/config/baseAxios";
import { EnumSurveyType, EnumSurveyTypeLabel } from "@/enums/EnumSurveyType";
import { Checkbox, Group } from "@mantine/core";
import { MyCenterFull, MyDataTable, MyPageContent } from "aq-fe-framework/components";
import { MyActionIcon, MyButton } from "aq-fe-framework/core";
import { useMyReactQuery } from "aq-fe-framework/hooks";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import FeatDeploymentCampaignCreateUpdate from "./FeatDeploymentCampaignCreateUpdate/FeatDeploymentCampaignCreateUpdate";
import FeatStandardSynchronization from "./FeatStandardSynchronization";
interface I {
    code?: string,
    name?: string,
    couponCode?: string,
    couponName?: string,
    couponType?: number,
    semester?: string,
    fromDate?: string,
    toDate?: string,
    isPublish?: boolean,
    numberOfVotesIssued?: number,
    numberOfVotesCollected?: number,
    note?: string
}

export default function DistributionConfigurationTable() {

    const campaignsQuery = useMyReactQuery({
        queryKey: ['camplains'],
        axiosFn: () => baseAxios.get(""),
        mockData: data
    })

    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
        {
            header: "Mã chiến dịch",
            accessorKey: "code"
        },
        {
            header: "Tên chiến dịch",
            accessorKey: "name"
        },
        {
            header: "Mã phiếu",
            accessorKey: "couponCode"
        },
        {
            header: "Tên phiếu",
            accessorKey: "couponName"
        },
        {
            header: "Loại phiếu",
            accessorKey: "couponType",
            accessorFn: (row) => EnumSurveyTypeLabel[row.couponType as EnumSurveyType]
        },
        {
            header: "Học kỳ",
            accessorKey: "semester"
        },
        {
            header: "Từ ngày",
            accessorKey: "fromDate"
        },
        {
            header: "Đến ngày",
            accessorKey: "toDate"
        },
        {
            header: "Công bố",
            accessorKey: "isPublish",
            accessorFn: (row) => <Checkbox defaultChecked={row.isPublish} />
        },
        {
            header: "Số phiếu đã phát",
            accessorKey: "numberOfVotesIssued"
        },
        {
            header: "Số phiếu thu",
            accessorKey: "numberOfVotesCollected"
        },
        {
            header: "Ghi chú",
            accessorKey: "note"
        }
    ], [])

    return (
        <MyPageContent>
            <MyDataTable
                columns={columns}
                isLoading={campaignsQuery.isLoading}
                isError={campaignsQuery.isError}
                data={campaignsQuery.data || []}
                renderTopToolbarCustomActions={() => (
                    <Group>
                        <FeatDeploymentCampaignCreateUpdate />
                        <MyButton actionType="import" />
                        <MyButton actionType="export" />
                        <MyButton actionType="delete" />
                        <FeatStandardSynchronization />
                        <MyButton>Phát phiếu</MyButton>
                    </Group>
                )}
                renderRowActions={() => (
                    <MyCenterFull>
                        <FeatDeploymentCampaignCreateUpdate isUpdate />
                        <MyActionIcon actionType="delete" />
                    </MyCenterFull>
                )}
            />
        </MyPageContent>
    )
}

const data: I[] = [
    {
        code: "SV-NH",
        name: "Sinh viên đánh giá giảng viên giảng dạy nhóm",
        couponCode: "sv-mh-0",
        couponName: "Sinh viên đánh giá môn học",
        couponType: 1,
        semester: "20241",
        fromDate: "15/10/2024",
        toDate: "20/11/2024",
        isPublish: false,
        numberOfVotesIssued: 1520,
        numberOfVotesCollected: 352,
        note: ""
    },
    {
        code: "C01",
        name: "Vãng lai đánh giá trường",
        couponCode: "P01",
        couponName: "Vãng lai đánh giá trường",
        couponType: 0,
        semester: "20241",
        fromDate: "15/10/2024",
        toDate: "20/11/2024",
        isPublish: false,
        numberOfVotesIssued: 1520,
        numberOfVotesCollected: 352,
        note: ""
    },
    {
        code: "C02",
        name: "Sinh viên đánh giá CTĐT",
        couponCode: "P02",
        couponName: "Sinh viên đánh giá CTĐT",
        couponType: 6,
        semester: "20241",
        fromDate: "15/10/2024",
        toDate: "20/11/2024",
        isPublish: false,
        numberOfVotesIssued: 1520,
        numberOfVotesCollected: 352,
        note: ""
    },
    {
        code: "C03",
        name: "Sinh viên đánh giá trường",
        couponCode: "P03",
        couponName: "Sinh viên đánh giá trường",
        couponType: 17,
        semester: "20241",
        fromDate: "15/10/2024",
        toDate: "20/11/2024",
        isPublish: false,
        numberOfVotesIssued: 1520,
        numberOfVotesCollected: 352,
        note: ""
    },
    {
        code: "C04",
        name: "CBNV đánh giá trường",
        couponCode: "P04",
        couponName: "CBNV đánh giá trường",
        couponType: 8,
        semester: "20241",
        fromDate: "15/10/2024",
        toDate: "20/11/2024",
        isPublish: false,
        numberOfVotesIssued: 1520,
        numberOfVotesCollected: 352,
        note: ""
    },
    {
        code: "C05",
        name: "GV-MH đánh giá SV",
        couponCode: "P05",
        couponName: "GV-MH đánh giá SV",
        couponType: 17,
        semester: "20241",
        fromDate: "15/10/2024",
        toDate: "20/11/2024",
        isPublish: false,
        numberOfVotesIssued: 1520,
        numberOfVotesCollected: 352,
        note: ""
    },
    {
        code: "C06",
        name: "Người học đánh giá CLO IT2563",
        couponCode: "P06",
        couponName: "Người học đánh giá CLO IT2563",
        couponType: 22,
        semester: "20241",
        fromDate: "15/10/2024",
        toDate: "20/11/2024",
        isPublish: false,
        numberOfVotesIssued: 1520,
        numberOfVotesCollected: 352,
        note: ""
    },
    {
        code: "C07",
        name: "Người học đánh giá PLO CNTT24",
        couponCode: "P07",
        couponName: "Người học đánh giá PLO CNTT24",
        couponType: 23,
        semester: "20241",
        fromDate: "15/10/2024",
        toDate: "20/11/2024",
        isPublish: false,
        numberOfVotesIssued: 1520,
        numberOfVotesCollected: 352,
        note: ""
    },
    {
        code: "C08",
        name: "Nhà tuyển dụng đánh giá PLĐ CNTT24",
        couponCode: "P08",
        couponName: "Nhà tuyển dụng đánh giá PLO CNTT24",
        couponType: 24,
        semester: "20241",
        fromDate: "15/10/2024",
        toDate: "20/11/2024",
        isPublish: false,
        numberOfVotesIssued: 1520,
        numberOfVotesCollected: 352,
        note: ""
    }
];