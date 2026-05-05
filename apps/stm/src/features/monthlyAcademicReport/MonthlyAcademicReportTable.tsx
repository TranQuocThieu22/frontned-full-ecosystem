import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconTableExport } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MyCenterFull, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import ClassDetail from "./ClassDetail";
import { DisplayDiscountStatus } from "./DisplayDiscountStatus";

interface IClass {
    id?: string;
    className?: string;
    homeroomTeacher?: string;
    schedule?: string;
    room?: string;
    currentStudents?: string; // Or number, if you want to parse it
    status?: number;
}
export default function MonthlyAcademicReportTable() {
    const query = useQuery<IClass[]>({
        queryKey: [`F_klfidusjgn_Read`],
        queryFn: async () => classes
    })

    const columns = useMemo<MRT_ColumnDef<IClass>[]>(
        () => [
            {
                accessorKey: "id",
                header: "Mã lớp",
            },
            {
                accessorKey: "className",
                header: "Tên lớp",
            },
            {
                accessorKey: "homeroomTeacher",
                header: "Giáo viên chủ nhiệm",
            },
            {
                accessorKey: "schedule",
                header: "Lịch học",
            },
            {
                accessorKey: "room",
                header: "phòng học",
            },
            {
                accessorKey: "currentStudents",
                header: "Sĩ số hiện tại / sĩ số tối đa",
                // If you want to parse it into numbers and perhaps display as "10/15" or just "10"
                // Cell: ({ cell }) => {
                //   const [current, total] = cell.getValue<string>().split('/').map(Number);
                //   return `${current}/${total}`;
                // }
            },
            {
                accessorKey: "status",
                header: "Trạng thái lớp",
                size: 200,
                accessorFn(originalRow) {
                    if (originalRow.status) {

                        return <DisplayDiscountStatus classStatus={originalRow.status} />
                        // return <Box bg={trangThai.color} p={5}><Text c={trangThai.textColor}>{trangThai.text}</Text></Box>
                    }
                },
            },

        ],
        []
    );
    const exportConfig = {
        fields: [
            {
                fieldName: "maHocVien",
                header: "Mã học viên",
            },
            {
                fieldName: "hoTen",
                header: "Họ tên",
            },
            {
                fieldName: "ngaySinh",
                header: "Ngày sinh",
            },
            {
                fieldName: "gioiTinh",
                header: "Giới tính",
            },
            {
                fieldName: "maKhoaHoc",
                header: "Mã khóa học",
            },
            {
                fieldName: "maKhoaThi",
                header: "Mã khóa thi",
            },
            {
                fieldName: "tieuDe",
                header: "Tiêu đề",
            },
            {
                fieldName: "fileDinhKem",
                header: "File đính kèm",
            },
            {
                fieldName: "diemTraiNghiem",
                header: "Điểm trải nghiệm",
            },
            {
                fieldName: "trangThai",
                header: "Trạng thái",
            },
            {
                fieldName: "daTraLoi",
                header: "Đã trả lời",
            }
        ]
    };


    if (query.isLoading) return "Đang tải dữ liệu..."
    if (query.isError) return "Không có dữ liệu..."
    return (
        <MyFieldset title="Danh sách phản hồi" >
            <MyDataTable
                enableRowSelection={true}
                columns={columns}
                enableRowNumbers={true}
                data={query.data!}
                renderTopToolbarCustomActions={() => {
                    return (
                        <MyCenterFull>
                            <Button
                                leftSection={<IconTableExport />}
                                color="teal"
                                size="sm"
                                radius="sm"
                                onClick={() => {
                                    notifications.show({
                                        title: "Thông báo",
                                        message:
                                            "Chức năng này đang được phát triển, vui lòng quay lại sau.",
                                        color: "blue",
                                        autoClose: 5000,
                                    });
                                }}
                            >
                                Export
                            </Button>
                        </MyCenterFull>);
                }}
                renderRowActions={() => (
                    <MyCenterFull>
                        <ClassDetail />
                    </MyCenterFull>
                )}
            />
        </MyFieldset >
    )
}




const classes: IClass[] = [
    {
        id: "LD1",
        className: "Lập trình Web Cơ bản 1",
        homeroomTeacher: "Trần Nhật Minh",
        schedule: "Thứ 3 & 5 (18:00-20:00)",
        room: "P.TD01",
        currentStudents: "10/15",
        status: 1
    },
    {
        id: "LD2A1",
        className: "Tiếng Anh Giao tiếp A1",
        homeroomTeacher: "Nguyễn Thị Hà",
        schedule: "Thứ 2 & 4 (19:00-21:00)",
        room: "P.TD02",
        currentStudents: "12/15",
        status: 1
    },
    {
        id: "LD2A2",
        className: "Tiếng Anh Giao tiếp A2",
        homeroomTeacher: "Lê Thị Quế",
        schedule: "Thứ 7 & CN (09:00-11:00)",
        room: "P.TD03",
        currentStudents: "8/12",
        status: 1
    },
    {
        id: "LD2B",
        className: "Giải tích Nâng cao",
        homeroomTeacher: "Trần Thị Phương Thảo",
        schedule: "Thứ 3 & 5 (18:00-20:00)",
        room: "P.TD01",
        currentStudents: "11/15",
        status: 1
    },
    {
        id: "LD2C1",
        className: "Hóa học Đại cương",
        homeroomTeacher: "Hoàng Thị Hương",
        schedule: "Thứ 6 (18:00-21:00)",
        room: "P.TD04",
        currentStudents: "9/10",
        status: 1
    },
    {
        id: "LD2C2",
        className: "Vật lý Nâng cao",
        homeroomTeacher: "Trần Thị Quý",
        schedule: "Thứ 7 (14:00-17:00)",
        room: "P.TD05",
        currentStudents: "7/10",
        status: 1
    },
    {
        id: "LD3A",
        className: "Lịch sử Việt Nam",
        homeroomTeacher: "Lê Thu Trang",
        schedule: "Thứ 2 & 4 (18:00-20:00)",
        room: "P.TD06",
        currentStudents: "14/15",
        status: 1
    },
    {
        id: "LD3B",
        className: "Kinh tế Vi mô",
        homeroomTeacher: "Trần Trọng Thường",
        schedule: "Thứ 3 & 5 (19:00-21:00)",
        room: "P.TD07",
        currentStudents: "13/15",
        status: 1
    },
    {
        id: "LD3C",
        className: "Địa lý Tự nhiên",
        homeroomTeacher: "Lê Thị Trường An",
        schedule: "Thứ 6 (17:00-19:00)",
        room: "P.TD08",
        currentStudents: "9/12",
        status: 1
    },
    {
        id: "LD3D",
        className: "Ngữ Văn Hiện đại",
        homeroomTeacher: "Trần Trọng Thường",
        schedule: "Chủ Nhật (09:00-12:00)",
        room: "P.TD09",
        currentStudents: "10/12",
        status: 1
    },
];