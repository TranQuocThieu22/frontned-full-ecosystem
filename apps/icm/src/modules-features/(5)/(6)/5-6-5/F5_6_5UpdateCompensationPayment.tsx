'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import MySelect from "@/components/Combobox/Select/MySelect";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import MyNumberInput from "@/components/Inputs/NumberInput/MyNumberInput";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import { Checkbox } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import FeatDeleteListOfMember from './F5_6_5DeleteListOfMember';
import { ICompensationPayment } from "./F5_6_5ReadCompensationPayment";
import FeatUpdateListOfMember from './F5_6_5UpdateListOfMember';

export interface I5_6_5ListOfMember {
    id?: number //STT
    code?: string //Mã thành viên
    name?: string //Họ và tên
    title?: string // Chức vụ
    remuneration?: number //Thù lao
}

export default function F5_5_3CreateProjectAdjustment({ values }: { values: ICompensationPayment }) {
    const form = useForm<ICompensationPayment>({
        initialValues: {
            ...values,
        }
    })
    const query = useQuery<I5_6_5ListOfMember[]>({
        queryKey: [`MemberRemuneration`],
        queryFn: async () => [
            {
                id: 1,
                code: "TV001",
                name: "Nguyễn Văn A",
                title: "Trưởng nhóm",
                remuneration: 5000000,
            },
            {
                id: 2,
                code: "TV002",
                name: "Trần Thị B",
                title: "Thành viên",
                remuneration: 3000000,
            },
        ],
    });

    const columns = useMemo<MRT_ColumnDef<I5_6_5ListOfMember>[]>(() => [
        {
            header: "STT",
            accessorKey: "id",
        },
        {
            header: "Mã thành viên",
            accessorKey: "code",
        },
        {
            header: "Họ và tên",
            accessorKey: "name",
        },
        {
            header: "Chức vụ",
            accessorKey: "title",
        },
        {
            header: "Thù lao (VNĐ)",
            accessorKey: "remuneration",
            Cell: ({ cell }) => cell.getValue<number>()?.toLocaleString("vi-VN"),
        },
        {
            header: "Đã nhận",
            accessorFn: () =>
                <Checkbox />
        }
    ], []);

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }} modalSize={"100%"}>
            <MyFlexRow>
                <MySelect label="Hội đồng" placeholder="Chọn quyết định hội đồng xét duyệt cấp" data={[]} />
                <MyNumberInput label="Tổng thù lao chi trả" />
            </MyFlexRow>
            <MyFileInput label="File biên bản" />
            <MyDataTable
                columns={columns}
                data={query.data!}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <FeatUpdateListOfMember values={row.original} />
                            <FeatDeleteListOfMember id={row.original.id!} />
                        </MyCenterFull>
                    );
                }}
            />
        </MyActionIconUpdate>

    )
}