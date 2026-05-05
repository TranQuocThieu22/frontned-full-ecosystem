'use client'
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Badge, DefaultMantineColor, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCheck, IconHourglassHigh, IconOctagonMinus, IconPlayerPause, IconX } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { ReactNode, useMemo, useState } from "react";
import F12_10CreateLecturer from "./F12_10CreateLecturer";
import F12_10DeleteLecturer from "./F12_10DeleteLecturer";
import F12_10UpdateLecturer from "./F12_10UpdateLecturer";

interface IBranchViewModel {
    id?: number;
    code?: string;
    name?: string;
}

interface ILecturerViewModel {
    id?: number;
    code?: string;
    name?: string;
    educationLevel?: string;
    genderId?: number;
    gender?: string;
    dateOfBirth?: Date;
    phoneNumber?: string;
    email?: string;
    assignStatus?: string;
    branchList?: IBranchViewModel[];
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

const mockData: ILecturerViewModel[] = [
    {
        id: 1,
        code: "GV001",
        name: "Nguyễn Văn A",
        educationLevel: "Thạc sĩ",
        genderId: 1,
        gender: "Nam",
        dateOfBirth: new Date("2024-01-01T00:00:00Z"),
        phoneNumber: "0902012842",
        email: "nva@gmail.com",
        assignStatus: "Đang giảng dạy",
        branchList: [
            {
                id: 1,
                code: "BT001",
                name: "Bình Thạnh CS1",
            },
            {
                id: 2,
                code: "BT002",
                name: "Bình Thạnh CS2",
            },
            {
                id: 8,
                code: "BT003",
                name: "Bình Thạnh CS3",
            },
            {
                id: 9,
                code: "BT004",
                name: "Bình Thạnh CS4",
            }
        ],
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2021-07-11T15:00:00Z")
    },
    {
        id: 2,
        code: "GV002",
        name: "Trần Thị B",
        educationLevel: "Tiến sĩ",
        genderId: 2,
        gender: "Nữ",
        dateOfBirth: new Date("1985-05-15T00:00:00Z"),
        phoneNumber: "0912345678",
        email: "ttb@gmail.com",
        assignStatus: "Chờ phân công",
        branchList: [
            {
                id: 3,
                code: "Q1CS1",
                name: "Quận 1 CS1",
            },
        ],
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2021-07-11T15:00:00Z")
    },
    {
        id: 3,
        code: "GV003",
        name: "Lê Văn C",
        educationLevel: "Thạc sĩ",
        genderId: 1,
        gender: "Nam",
        dateOfBirth: new Date("1990-07-20T00:00:00Z"),
        phoneNumber: "0987654321",
        email: "lvc@gmail.com",
        assignStatus: "Tạm ngưng",
        branchList: [
            {
                id: 4,
                code: "Q2CS1",
                name: "Quận 2 CS1",
            },
            {
                id: 5,
                code: "Q2CS2",
                name: "Quận 2 CS2",
            },
        ],
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2021-07-11T15:00:00Z")
    },
    {
        id: 4,
        code: "GV004",
        name: "Phạm Thị D",
        educationLevel: "Cử nhân",
        genderId: 2,
        gender: "Nữ",
        dateOfBirth: new Date("1995-12-10T00:00:00Z"),
        phoneNumber: "0909090909",
        email: "ptd@gmail.com",
        assignStatus: "Bị đình chỉ",
        branchList: [
            {
                id: 6,
                code: "Q3CS1",
                name: "Quận 3 CS1",
            },
        ],
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2021-07-11T15:00:00Z")
    },
    {
        id: 5,
        code: "GV005",
        name: "Ngô Văn E",
        educationLevel: "Thạc sĩ",
        genderId: 1,
        gender: "Nam",
        dateOfBirth: new Date("1980-03-25T00:00:00Z"),
        phoneNumber: "0923456789",
        email: "nve@gmail.com",
        assignStatus: "Nghỉ việc",
        branchList: [
            {
                id: 7,
                code: "Q4CS1",
                name: "Quận 4 CS1",
            },
        ],
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2021-07-11T15:00:00Z")
    }
];

export default function F12_10ReadLecturer() {
    const AllLecturer = useQuery<ILecturerViewModel[]>({
        queryKey: [`F12_10ReadLecturer`],
        queryFn: async () => {
            // const response = await baseAxios.post("/SystemCatalogProjectTypeCategory/getall");
            return mockData
        },
    })

    const [fileData, setFileData] = useState<any[]>([]);
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })

    const columns = useMemo<MRT_ColumnDef<ILecturerViewModel>[]>(() => [
        {
            header: "Mã giảng viên",
            accessorKey: "code",
        },
        {
            header: "Họ và tên",
            accessorKey: "name",
        },
        {
            header: "Trình độ",
            accessorKey: "educationLevel",
        },
        {
            header: "Giới tính",
            accessorKey: "gender",
        },
        {
            header: "Ngày sinh",
            accessorKey: "dateOfBirth",
            accessorFn(originalRow) {
                return U0DateToDDMMYYYString(new Date(originalRow.dateOfBirth!));
            },
        },
        {
            header: "Số điện thoại",
            accessorKey: "phoneNumber",
        },
        {
            header: "Email",
            accessorKey: "email",
        },
        {
            header: "Trạng thái",
            accessorKey: "assignStatus",
            accessorFn(originalRow) {
                return originalRow.assignStatus
            },
            Cell: ({ row }) => {
                return (
                    <DisplayAssignedStatus assignStatus={row.original.assignStatus!} />
                )
            }
        },
        {
            header: "Chi Nhánh",
            accessorKey: "branchList",
            accessorFn(originalRow) {
                return originalRow.branchList?.map((branch) => branch.name).join(", ");
            },
            Cell: ({ row }) => {
                return (
                    <>
                        <div style={{ whiteSpace: 'pre-wrap' }}>
                            {row.original.branchList?.map((branch) => branch.name).join("\n")}
                        </div>
                    </>
                )
            },
        },
        {
            header: "Người cập nhật",
            accessorKey: "nguoiCapNhat"
        },
        {
            header: "Ngày cập nhật",
            accessorKey: "ngayCapNhat",
            accessorFn(originalRow) {
                return U0DateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
            },
        }
    ], []);

    if (AllLecturer.isLoading) return "Đang tải dữ liệu...";
    if (AllLecturer.isError) return "Không có dữ liệu...";

    return (
        <MyDataTable
            enableRowSelection={true}
            exportAble
            columns={columns}
            data={AllLecturer.data!}
            renderTopToolbarCustomActions={() => (
                <Group>
                    <F12_10CreateLecturer />
                    <AQButtonCreateByImportFile
                        setImportedData={setFileData}
                        onSubmit={
                            () => {
                                console.log("data: ", fileData);
                            }
                        }
                        form={form_multiple}
                    >
                    </AQButtonCreateByImportFile>
                </Group>
            )}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F12_10UpdateLecturer lecturerValues={row.original} />
                        <F12_10DeleteLecturer lecturerId={row.original.id!} />
                    </MyCenterFull>
                );
            }}
        />
    );
}



export function DisplayAssignedStatus({ assignStatus }: { assignStatus: string }) {
    interface I {
        color?: DefaultMantineColor
        label?: string,
        leftSection?: ReactNode
    }

    const data: I[] = [
        { label: "Đang giảng dạy", color: "#32cd32", leftSection: <IconCheck></IconCheck> },
        { label: "Chờ phân công", color: "#FFD700", leftSection: <IconHourglassHigh /> },
        { label: "Tạm ngưng", color: "#FFA07A", leftSection: <IconPlayerPause /> },
        { label: "Bị đình chỉ", color: "#FF0000", leftSection: <IconX /> },
        { label: "Nghỉ việc", color: "#696969", leftSection: <IconOctagonMinus /> }
    ]

    const selected = data.find((item) => item.label === assignStatus);
    return (
        <Badge
            w="100%"
            leftSection={selected?.leftSection || <IconCheck />}
            variant="light"
            color={selected?.color || "#32cd32"}
            radius="xs"
        >
            {selected?.label || "Mặc định"}
        </Badge>
    );
}
