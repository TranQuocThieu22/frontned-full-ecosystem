'use client'
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import { Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { AQButtonCreateByImportFile, MyButton, MyButtonDeleteList, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import DanhSachHoSoDangKyTuyenChonCreate from "./DanhSachHoSoDangKyTuyenChonCreate";
import DanhSachHoSoDangKyTuyenChonDelete from "./DanhSachHoSoDangKyTuyenChonDelete";
import DanhSachHoSoDangKyTuyenChonUpdate from "./DanhSachHoSoDangKyTuyenChonUpdate";
import { HoSoDangKyTuyenChonViewModel } from "./interfaces/HoSoDangKyTuyenChonViewModel";

export default function DanhSachHoSoDangKyTuyenChonTable() {
    const Query = useQuery({
        queryKey: ['DanhSachHoSoDangKyTuyenChonTable'],
        queryFn: () => {
            return mockData
        }
    })

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: [],
            editorialBoardId: "EB001"
        },
    });

    const columns = useMemo<MRT_ColumnDef<HoSoDangKyTuyenChonViewModel>[]>(() => [
        {
            header: "Tên đề tài",
            accessorKey: "name",
            size: 300
        },
        {
            header: "Thời gian thực hiện",
            accessorKey: "duration",
        },
        {
            header: "Tổng kinh phí thực hiện",
            accessorKey: "budget",
            accessorFn(originalRow) {
                return new Intl.NumberFormat('vi-VN').format(Number(originalRow.budget)) + " VNĐ"
            },
        },
        {
            header: "Lĩnh vực",
            accessorKey: "codeField",
            accessorFn(originalRow) {
                return fieldOptions.find(item => item.value === originalRow.codeField)?.label
            },
        },
        {
            header: "Chủ nhiệm đề tài",
            accessorKey: "leader",
        },
        {
            header: "File hồ sơ đăng ký",
            accessorKey: "file",
            accessorFn(originalRow) {
                return <MyButtonViewPDF />
            },
        },
    ], [])

    return (
        <MyFieldset
            title="Danh sách đăng ký tuyển chọn"
        >
            <MyDataTable
                columns={columns}
                enableRowSelection={true}
                enableRowNumbers={false}
                data={Query.data || []}
                renderTopToolbarCustomActions={({ table }) => {
                    return <>
                        <DanhSachHoSoDangKyTuyenChonCreate />
                        <AQButtonCreateByImportFile onSubmit={() => { }} form={form_multiple} />
                        <MyButton crudType="export" />
                        <MyButtonDeleteList
                            onSubmit={() => { }}
                            contextData={table.getSelectedRowModel().flatRows.flatMap(item => item.original).map(item => item.code).join(", ")}
                        />
                    </>

                }}
                renderRowActions={({ row }) => {
                    return <Flex gap={8} justify="center">
                        <DanhSachHoSoDangKyTuyenChonUpdate data={row.original} />
                        <DanhSachHoSoDangKyTuyenChonDelete id={row.original.id} code={row.original.code} />
                    </Flex>
                }}
            />
        </MyFieldset>
    );
}

const mockData: HoSoDangKyTuyenChonViewModel[] = [
    {
        id: 1,
        code: 'DT1',
        name: "Nghiên cứu ứng dụng Blockchain trong quản lý văn bằng chứng chỉ",
        duration: "12 tháng",
        budget: "150000000",
        codeField: "CNTT",
        leader: "Nguyễn Văn A",
        path: "nghien_cuu_ung_dung_blockchain.pdf",
    },
    {
        id: 2,
        code: 'DT2',
        name: "Phân tích tác động của biến đổi khí hậu đến nông nghiệp địa phương",
        duration: "19 tháng",
        budget: "200000000",
        codeField: "NN",
        leader: "Hoàng Thị D.",
        path: "phan_tich_tac_dong.pdf",
    },
    {
        id: 3,
        code: 'DT3',
        name: "Phát triển hệ thống cảnh báo sớm lũ lụt dựa trên AI",
        duration: "15 tháng",
        budget: "180000000",
        codeField: "KTMT",
        leader: "Đặng Thị H",
        path: "phat_trien_he_thong.pdf",
    },
    {
        id: 4,
        code: 'DT4',
        name: "Nghiên cứu các giải pháp giảm thiểu rác thải nhựa trong trường học",
        duration: "10 tháng",
        budget: "90000000",
        codeField: "MT",
        leader: "Phạm Thị D",
        path: "nghien_cuc_cau_giai_phap.pdf",
    }
]

const fieldOptions = [
    { value: "CNTT", label: "Công nghệ thông tin" },
    { value: "NN", label: "Nông nghiệp" },
    { value: "KTMT", label: "Kỹ thuật, Môi trường" },
    { value: "MT", label: "Môi trường" },
]