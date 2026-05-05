'use client'
import { Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconTableExport } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MyButton, MyButtonModal, MyDataTable, MyFieldset, MyFlexColumn } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { IExamScheduleInfoViewModel, IStudentInfoViewModel } from "./interfaces/InfoInterface";

export default function CandidatesList({ data }: { data: IExamScheduleInfoViewModel }) {

    const dis = useDisclosure(false);
    const queryCandidatesList = useQuery<IStudentInfoViewModel[]>({
        queryKey: ["CandidatesListModal"],
        queryFn: () => {
            return mockData || [];
        },
    });

    const columns = useMemo<MRT_ColumnDef<IStudentInfoViewModel>[]>(() => [
        { header: "Mã thí sinh", accessorKey: "maThiSinh" },
        { header: "Họ tên", accessorKey: "hoTen" },
        { header: "Ngày sinh", accessorKey: "ngaySinh" },
        { header: "Giới tính", accessorKey: "gioiTinh" },
        { header: "Lớp", accessorKey: "lop" },
        { header: "Email", accessorKey: "email" },
        { header: "Số điện thoại", accessorKey: "soDienThoai" },
    ], []);

    if (queryCandidatesList.isLoading) return "Loading...";
    if (queryCandidatesList.isError) return 'Không có dữ liệu...';

    return (
        <MyButtonModal variant="transparent" crudType="default" label={`${data.soLuong}`} disclosure={dis} title="Chi tiết danh sách thí sinh" modalSize={"90%"}>
            <Group>
                <Text>Môn học: {data.maMonHoc} - {data.tenMonHoc}</Text>
                <Text>Nhóm: {data.nhomThi}</Text>
                <Text>Ngày thi: {data.ngayThi}</Text>
                <Text>Giờ thi: {data.gioBatDau}</Text>
                <Text>Thời gian thi: {data.thoiGianThi} phút</Text>
            </Group>
            <MyFieldset title={`Danh sách thí sinh`}>
                <MyFlexColumn>
                    <MyDataTable
                        enableRowSelection={true}
                        enableRowNumbers={true}
                        renderTopToolbarCustomActions={({ table }) => (
                            <Group>
                                <MyButton color="teal" leftSection={<IconTableExport />}>Export</MyButton>
                            </Group>
                        )}
                        columns={columns}
                        data={queryCandidatesList.data || []}
                    />
                </MyFlexColumn>
            </MyFieldset>
        </MyButtonModal >
    );
}

const mockData: IStudentInfoViewModel[] = [
    {
        id: 1,
        maThiSinh: "SV00025",
        hoTen: "Tô Ngọc Lan",
        gioiTinh: "Nam",
        ngaySinh: "01/03/2000",
        lop: "IT2401",
        email: "lan@gmail.com",
        soDienThoai: "0985365475"
    },
    {
        id: 2,
        maThiSinh: "SV00026",
        hoTen: "Tô Ngọc Lin",
        gioiTinh: "Nam",
        ngaySinh: "01/03/2000",
        lop: "IT2401",
        email: "lan@gmail.com",
        soDienThoai: "0985365475"
    },
    {
        id: 3,
        maThiSinh: "SV00027",
        hoTen: "Tô Ngọc La",
        gioiTinh: "Nam",
        ngaySinh: "01/03/2000",
        lop: "IT2401",
        email: "lan@gmail.com",
        soDienThoai: "0985365475"
    },
    {
        id: 4,
        maThiSinh: "SV00028",
        hoTen: "Tô Ngọc Lam",
        gioiTinh: "Nam",
        ngaySinh: "01/03/2000",
        lop: "IT2401",
        email: "lan@gmail.com",
        soDienThoai: "0985365475"
    }
];