'use client';
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { Button, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconUserCheck } from "@tabler/icons-react";
import { MRT_ColumnDef, MRT_RowSelectionState } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";

interface Teacher {
    id?: number;
    code?: string;
    fullName?: string;
    degree?: string;
    gender?: string;
    dateOfBirth?: string;
    phoneNumber?: string;
    email?: string;
    skills?: string;
    address?: string;
    program?: string;
}

const mockTeachers: Teacher[] = [
    {
        id: 1,
        code: "TG0001",
        fullName: "Nguyễn Văn A",
        degree: "Thạc sỹ",
        gender: "Nam",
        dateOfBirth: "01/01/1980",
        phoneNumber: "0896585235",
        email: "a@gmail.com",
        skills: "Tin Học",
        address: "Thủ Đức, Bình Thạnh, Quận 1, Quận 3, Quận 7",
        program: "Lập trình web, Lập trình cơ sở dữ liệu, Cơ sở lịch"
    },
    {
        id: 2,
        code: "TG0002",
        fullName: "Trần Thị B",
        degree: "Tiến sỹ",
        gender: "Nữ",
        dateOfBirth: "15/03/1985",
        phoneNumber: "0912345678",
        email: "b@gmail.com",
        skills: "Toán Học, Lý Thuyết Số",
        address: "Quận 5, Gò Vấp, Tân Bình, Bình Chánh, Cù Chi",
        program: "Đại số tuyến tính, Vật lý đại cương, Điện tử cơ bản"
    },
    {
        id: 3,
        code: "TG0003",
        fullName: "Lê Văn C",
        degree: "Đại học",
        gender: "Nam",
        dateOfBirth: "20/07/1992",
        phoneNumber: "0901234567",
        email: "c@gmail.com",
        skills: "Vật Lý, Điện Tử",
        address: "Phú Nhuận, Tân Phú, Quận 4, Quận 2, Hóc Môn",
        program: "Hóa học Việt Nam, Văn học nước ngoài, Hóa hữu cơ"
    },
    {
        id: 4,
        code: "TG0004",
        fullName: "Phạm Thị D",
        degree: "Thạc sỹ",
        gender: "Nữ",
        dateOfBirth: "05/11/1988",
        phoneNumber: "0987654321",
        email: "d@gmail.com",
        skills: "Ngữ Văn, Văn Học Hiện Đại",
        address: "Quận 12, Thủ Đức, Quận 4, Quận 1, Quận 7",
        program: "Tiếng Anh giao tiếp, Nguyên lý IELTS, Trí tuệ nhân tạo"
    },
    {
        id: 5,
        code: "TG0005",
        fullName: "Hoàng Minh E",
        degree: "Tiến sỹ",
        gender: "Nam",
        dateOfBirth: "22/09/1980",
        phoneNumber: "0965432109",
        email: "e@gmail.com",
        skills: "Hóa Học, Hóa Phân Tích",
        address: "Quận 2, Thủ Đức, Quận 9, Quận 4, Quận 1",
        program: "Sinh học tế bào, Di truyền học, Lịch sử cận đại"
    },
    {
        id: 6,
        code: "TG0006",
        fullName: "Đỗ Thị G",
        degree: "Đại học",
        gender: "Nữ",
        dateOfBirth: "30/04/1995",
        phoneNumber: "0934567890",
        email: "g@gmail.com",
        skills: "Tiếng Anh, IELTS",
        address: "Quận 7, Thủ Đức, Quận 4, Quận 1, Quận 7",
        program: "Lịch sử thế giới, Toán Lý và Tin học, Thị trường chứng khoán"
    },
    {
        id: 7,
        code: "TG0007",
        fullName: "Vũ Văn H",
        degree: "Thạc sỹ",
        gender: "Nam",
        dateOfBirth: "10/02/1987",
        phoneNumber: "0888123456",
        email: "h@gmail.com",
        skills: "Khoa Học Máy Tính, AI",
        address: "Quận 12, Thủ Đức, Quận 4, Quận 1, Quận 7",
        program: "Kinh tế, Tài chính, Thị trường chứng khoán"
    },
    {
        id: 8,
        code: "TG0008",
        fullName: "Trịnh Thị I",
        degree: "Đại học",
        gender: "Nữ",
        dateOfBirth: "12/12/1993",
        phoneNumber: "0777987654",
        email: "i@gmail.com",
        skills: "Sinh Học, Di Truyền Học",
        address: "Quận 5, Gò Vấp, Tân Bình, Bình Chánh, Cù Chi",
        program: "Phân tích và thiết kế hệ thống, Quản lý hệ thống"
    },
    {
        id: 9,
        code: "TG0009",
        fullName: "Bùi Mạnh K",
        degree: "Tiến sỹ",
        gender: "Nam",
        dateOfBirth: "18/06/1975",
        phoneNumber: "0945678912",
        email: "k@gmail.com",
        skills: "Lịch Sử, Lịch Sử Việt Nam",
        address: "Phú Nhuận, Tân Phú, Quận 4, Quận 2, Hóc Môn",
        program: "Cơ sở dữ liệu, Hệ thống thông tin, Tư duy tương lai"
    },
    {
        id: 10,
        code: "TG0010",
        fullName: "Nguyễn Thị L",
        degree: "Thạc sỹ",
        gender: "Nữ",
        dateOfBirth: "25/08/1991",
        phoneNumber: "0923456789",
        email: "l@gmail.com",
        skills: "Kinh Tế, Tài Chính",
        address: "Quận 12, Thủ Đức, Quận 4, Quận 1, Quận 7",
        program: "Giáo dục tăng cường, Tư vấn hướng nghiệp, Thị trường chứng khoán"
    }
];

export default function ChooseTeachingAssistant({
    value,
    onChange,
}: {
    value?: { id: number; code: string; name: string };
    onChange: (t: { id: number; code: string; name: string }) => void;
}) {
    const disc = useDisclosure(false);
    const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

    useEffect(() => {
        if (value) {
            const selected = mockTeachers.find(t => t.id === value.id);
            if (selected) {
                setRowSelection({ [selected.id || 0]: true });
            }
        } else {
            setRowSelection({});
        }
    }, [value]);

    const handleSelect = () => {
        const selectedIds = Object.keys(rowSelection).map(Number);
        const selected = mockTeachers.find(t => selectedIds.includes(t.id || 0));
        if (selected) {
            onChange({ id: selected.id!, code: selected.code!, name: selected.fullName! });
        }
        disc[1].close();
    };

    const handleClear = () => {
        onChange(undefined as any); // clear teacher
        setRowSelection({});
        disc[1].close();
    };

    const columns = useMemo<MRT_ColumnDef<Teacher>[]>(() => [
        {
            header: "Mã giáo viên",
            accessorKey: "code",
            size: 100,
        },
        {
            header: "Họ tên",
            accessorKey: "fullName",
            size: 150,
        },
        {
            header: "Bậc học",
            accessorKey: "degree",
            size: 100,
        },
        {
            header: "Giới tính",
            accessorKey: "gender",
            size: 80,
        },
        {
            header: "Ngày sinh",
            accessorKey: "dateOfBirth",
            size: 100,
        },
        {
            header: "Số điện thoại",
            accessorKey: "phoneNumber",
            size: 120,
        },
        {
            header: "Email",
            accessorKey: "email",
            size: 180,
        },
        {
            header: "Kỹ năng",
            accessorKey: "skills",
            size: 200,
        },
        {
            header: "Chỉ nhánh",
            accessorKey: "address",
            size: 250,
            Cell: ({ cell }) => (
                <div style={{
                    maxWidth: '250px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                }}>
                    {cell.getValue() as string}
                </div>
            )
        },
        {
            header: "Chương trình",
            accessorKey: "program",
            size: 300,
            Cell: ({ cell }) => (
                <div style={{
                    whiteSpace: 'nowrap'
                }}>
                    {cell.getValue() as string}
                </div>
            )
        }
    ], []);
    return (
        <MyFlexColumn p={'7px'}>
            <MyButtonModal
                leftSection={<IconUserCheck />}
                color={value ? 'green' : 'gray'}
                title="Danh sách giáo viên"
                modalSize={'90%'}
                label={value ? `${value.code} - ${value.name}` : "Chưa chọn giảng viên"}

                disclosure={disc}
            >
                <MyDataTable
                    renderTopToolbarCustomActions={() => (
                        <Group>
                            <Button onClick={handleSelect} color="blue">Chọn giáo viên</Button>
                            {/* <Button variant="outline" color="red" onClick={handleClear}>Xóa lựa chọn</Button> */}
                        </Group>
                    )}
                    columns={columns}
                    data={mockTeachers}
                    enableRowSelection
                    enableMultiRowSelection={false}
                    getRowId={row => row.id!.toString()}
                    onRowSelectionChange={setRowSelection}
                    state={{ rowSelection }}
                />
            </MyButtonModal>
        </MyFlexColumn>
    );
}
