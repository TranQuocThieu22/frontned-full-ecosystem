'use client'
import { MyActionIcon } from "@/components/ActionIcons/ActionIcon/MyActionIcon";
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import MySelect from "@/components/Combobox/Select/MySelect";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import MyNumberInput from "@/components/Inputs/NumberInput/MyNumberInput";
import { Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { I } from './F5_4_1_3Read';
export interface I5_4_1_3ListOfTopic {
    id?: number //STT
    code?: string //Mã đề tài
    name?: string //Tên đề tài
    leaderName?: string //Chủ nhiệm
    point?: number //Điểm trung bình
}

export default function F5_4_1_3Create() {
    const form = useForm<I>({
        initialValues: {
            id: 0,
            soQuyetDinhHoiDongXetDuyetDeTai: "",
            maDeTai: "",
            tenDeTai: "",
            chuNhiem: "",
            diemTrungBinh: 0,
            fileBienBanSrc: "",
        }
    })

    const query = useQuery<I5_4_1_3ListOfTopic[]>({
        queryKey: [`ListOfTopics`],
        queryFn: async () => [
            {
                id: 1,
                code: "DT001",
                name: "Nghiên cứu ứng dụng AI trong giáo dục",
                leaderName: "Nguyễn Văn A",
                point: 9.5,
            },
            {
                id: 2,
                code: "DT002",
                name: "Phát triển hệ thống IoT trong nông nghiệp",
                leaderName: "Trần Thị B",
                point: 8.0,
            },
            {
                id: 3,
                code: "DT003",
                name: "Ứng dụng Blockchain trong quản lý dữ liệu",
                leaderName: "Lê Văn C",
                point: 8.7,
            },
        ],
    });

    const columns = useMemo<MRT_ColumnDef<I5_4_1_3ListOfTopic>[]>(() => [
        {
            header: "STT",
            accessorKey: "id",
            size: 50,
        },
        {
            header: "Mã đề tài",
            accessorKey: "code",
        },
        {
            header: "Tên đề tài",
            accessorKey: "name",
        },
        {
            header: "Chủ nhiệm",
            accessorKey: "leaderName",
        },
        {
            header: "Điểm trung bình",
            accessorKey: "point",
            Cell: ({ cell }) => {
                const point = cell.getValue<number>();
                return point ? point.toFixed(2) : "N/A";
            },
        },
    ], []);

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";
    return (
        <MyButtonCreate objectName="Tổng hợp hội đồng kết quả đánh giá xét duyệt đề tài" form={form} onSubmit={() => { }} modalSize={"100%"}>
            <Flex direction={{ base: 'column', sm: 'row' }}
                gap={{ base: 'sm', sm: 'lg' }}
            >
                <MySelect label="Trưởng ban kiểm phiếu" placeholder="Chọn thành viên" data={[]} />
                <MySelect label="Hội đồng" placeholder="Chọn quyết định hội đồng" data={[]} />
            </Flex>
            <MyNumberInput label="Số thành viên" />
            <MyFileInput label="File biên bản" />
            <MyDataTable
                columns={columns}
                data={query.data!}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <MyActionIcon crudType="update" />
                            <MyActionIcon crudType="delete" />
                        </MyCenterFull>
                    );
                }}
            />
        </MyButtonCreate>
    );
}