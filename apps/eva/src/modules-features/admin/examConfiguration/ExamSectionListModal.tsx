'use client'
import { Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconTableExport } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MyButton, MyButtonModal, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import CandidatesListModal from "../examShiftAssignment/CandidatesListModal";

export default function ExamSectionListModal({ soLuong }: { soLuong: number }) {

    const dis = useDisclosure(false);
    const queryExamSchedule = useQuery<any[]>({
        queryKey: ["ExamScheduleAssignmentRead"],
        queryFn: () => {
            return mockData || [];
        },
    });

    const columns = useMemo<MRT_ColumnDef<any>[]>(() => [
        { header: "Mã môn học", accessorKey: "maMonHoc" },
        { header: "Tên môn học", accessorKey: "tenMonHoc" },
        { header: "Nhóm thi", accessorKey: "nhomThi" },
        { header: "Ngày thi", accessorKey: "ngayThi" },
        { header: "Giờ bắt đầu", accessorKey: "gioBatDau" },
        { header: "Thời gian thi", accessorKey: "thoiGianThi" },
        { header: "Quy tắc làm tròn điểm", accessorKey: "quyTacLamTronDiem" },
        { header: "Ghi chú", accessorKey: "ghiChu" },
        {
            header: "Số lượng", accessorKey: "soLuong",
            accessorFn: (row) => {
                return <CandidatesListModal ExamSectiondData={row} />;
            }
        },
        { header: "Trạng thái", accessorKey: "trangThai" },
    ], []);

    return (
        <MyButtonModal
            variant="transparent"
            crudType="default"
            label={`${soLuong}`}
            disclosure={dis}
            title="Danh sách ca thi"
            modalSize={"90%"}>
            <MyFieldset title={`Danh sách ca thi`}>
                <MyDataTable
                    enableRowSelection={true}
                    enableRowNumbers={true}
                    renderTopToolbarCustomActions={({ table }) => (
                        <Group>
                            <MyButton color="teal" leftSection={<IconTableExport />}>Export</MyButton>
                        </Group>
                    )}
                    columns={columns}
                    data={queryExamSchedule.data || []}
                />
            </MyFieldset>
        </MyButtonModal >
    );
}

const mockData: any[] = [
    {
        id: 1,
        maMonHoc: "CSDLCB",
        tenMonHoc: "Cơ sở dữ liệu cơ bản",
        nhomThi: "room1",
        ngayThi: "25/05/2025",
        gioBatDau: "09:00",
        thoiGianThi: 90,
        quyTacLamTronDiem: "0.25",
        ghiChu: "",
        soLuong: 20,
        trangThai: "Sắp diễn ra",
    },
    {
        id: 2,
        maMonHoc: "CSDLCB",
        tenMonHoc: "Cơ sở dữ liệu cơ bản",
        nhomThi: "room2",
        ngayThi: "25/05/2025",
        gioBatDau: "09:00",
        thoiGianThi: 90,
        quyTacLamTronDiem: "0.25",
        ghiChu: "",
        soLuong: 20,
        trangThai: "Sắp diễn ra",
    },
    {
        id: 3,
        maMonHoc: "CSDLCB",
        tenMonHoc: "Cơ sở dữ liệu cơ bản",
        nhomThi: "room3",
        ngayThi: "25/05/2025",
        gioBatDau: "09:00",
        thoiGianThi: 90,
        quyTacLamTronDiem: "0.25",
        ghiChu: "",
        soLuong: 20,
        trangThai: "Sắp diễn ra",
    },
    {
        id: 4,
        maMonHoc: "CSDLCB",
        tenMonHoc: "Cơ sở dữ liệu cơ bản",
        nhomThi: "room4",
        ngayThi: "25/05/2025",
        gioBatDau: "09:00",
        thoiGianThi: 90,
        quyTacLamTronDiem: "0.25",
        ghiChu: "",
        soLuong: 20,
        trangThai: "Đã kết thúc",
    },
    {
        id: 5,
        maMonHoc: "CSDLCB",
        tenMonHoc: "Cơ sở dữ liệu cơ bản",
        nhomThi: "room5",
        ngayThi: "25/05/2025",
        gioBatDau: "09:00",
        thoiGianThi: 90,
        quyTacLamTronDiem: "0.25",
        ghiChu: "",
        soLuong: 20,
        trangThai: "Đang diễn ra",
    },
    // {
    //     id: 6,
    //     maMonHoc: "TCC",
    //     tenMonHoc: "Toán cao cấp",
    //     nhomThi: "room5",
    //     ngayThi: "25/06/2025",
    //     gioBatDau: "09:00",
    //     thoiGianThi: 90,
    //     quyTacLamTronDiem: "0.25",
    //     ghiChu: "",
    //     soLuong: 20,
    //     trangThai: "Sắp diễn ra",
    // }
];