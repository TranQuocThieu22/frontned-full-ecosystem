import { useDisclosure } from "@mantine/hooks";
import { MyDataTable } from "aq-fe-framework/components";
import { MyButtonModal } from "aq-fe-framework/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

interface I {
    campaignCode?: string,
    campaignName?: string,
    couponCode?: string,
    couponName?: string
    couponType?: string,
    note?: string
}

export default function FeatStandardSynchronization() {
    const disc = useDisclosure()
    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
        {
            header: "Mã chiến dịch",
            accessorKey: "campaignCode"
        },
        {
            header: "Tên chiến dịch",
            accessorKey: "campaignName"
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
            accessorKey: "couponType"
        },
        {
            header: "Ghi chú",
            accessorKey: "note"
        },
    ], [])
    return (
        <MyButtonModal
            disclosure={disc}
            modalProps={{ title: "Danh sách chiến dịch chuẩn", size: "80%" }}
            buttonProps={{ children: "Đồng bộ từ chuẩn" }}
        >
            <MyDataTable columns={columns} data={data} />
        </MyButtonModal>
    )
}

const data: I[] = [
    {
        campaignCode: "SV-NH",
        campaignName: "Sinh viên đánh giá giảng viên giảng dạy nhóm học",
        couponCode: "sv-mh-01",
        couponName: "Sinh viên đánh giá môn học",
        couponType: "01. Sinh viên đánh giá CBGD & Môn học",
        note: "",
    },
    {
        campaignCode: "C01",
        campaignName: "Vãng lai đánh giá trường",
        couponCode: "P01",
        couponName: "Vãng lai đánh giá trường",
        couponType: "00. Khảo sát tự do",
        note: "",
    },
    {
        campaignCode: "C02",
        campaignName: "Sinh viên đánh giá CTĐT",
        couponCode: "P02",
        couponName: "Sinh viên đánh giá CTĐT",
        couponType: "06. Sinh viên đánh giá CTĐT",
        note: "",
    },
    {
        campaignCode: "C03",
        campaignName: "Sinh viên đánh giá trường",
        couponCode: "P03",
        couponName: "Sinh viên đánh giá trường",
        couponType: "07. Sinh viên đánh giá trường",
        note: "",
    },
    {
        campaignCode: "C04",
        campaignName: "CB-CNV đánh giá trường",
        couponCode: "P04",
        couponName: "CB-CNV đánh giá trường",
        couponType: "08. CBCNV đánh giá trường",
        note: "",
    },
    {
        campaignCode: "C05",
        campaignName: "GV-MH đánh giá SV",
        couponCode: "P05",
        couponName: "GV-MH đánh giá SV",
        couponType: "17. GV-MH đánh giá SV",
        note: "",
    },
    {
        campaignCode: "C06",
        campaignName: "Người học đánh giá CLO IT2563",
        couponCode: "P06",
        couponName: "Người học đánh giá CLO IT2563",
        couponType: "22. Người học đánh giá CLO Môn học (xử lý riêng)",
        note: "",
    },
    {
        campaignCode: "C07",
        campaignName: "Người học đánh giá PLO CNTT24",
        couponCode: "P07",
        couponName: "Người học đánh giá PLO CNTT24",
        couponType: "23. Người học đánh giá PLO CTĐT (xử lý riêng)",
        note: "",
    },
    {
        campaignCode: "C08",
        campaignName: "Nhà tuyển dụng đánh giá PLO CNTT24",
        couponCode: "P08",
        couponName: "Nhà tuyển dụng đánh giá PLO CNTT24",
        couponType: "24. Nhà tuyển dụng đánh giá PLO CTĐT (xử lý riêng)",
        note: "",
    },
];