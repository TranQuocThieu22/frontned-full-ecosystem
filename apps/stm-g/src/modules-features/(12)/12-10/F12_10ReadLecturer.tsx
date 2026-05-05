'use client'
import baseAxios from "@/api/config/baseAxios";
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { utils_date_dateToDDMMYYYString, utils_date_formatToDateTimeString } from "@/utils/date";
import { Badge, DefaultMantineColor, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCheck, IconHourglassHigh, IconOctagonMinus, IconPlayerPause, IconX } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { ReactNode, useMemo, useState } from "react";
import F12_10CreateLecturer from "./F12_10CreateLecturer";
import F12_10DeleteLecturer from "./F12_10DeleteLecturer";
import F12_10UpdateLecturer from "./F12_10UpdateLecturer";

interface IBranch {
    id?: number;
    code?: string;
    name?: string;
    location?: string;
    note?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
}

interface IUserBranchs {
    id?: number;
    code?: null;
    name?: null;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    userId?: number;
    branchId?: number;
}

interface ILecturerInfo {
    id?: number;
    code?: string;
    fullName?: string;
    educationLevel?: number;
    gender?: number;
    dateOfBirth?: Date;
    phoneNumber?: string;
    email?: string;
    teachingStatus?: number;
    branchs?: IBranch[];
    userBranch?: IUserBranchs[];
    modifiedBy?: number;
    modifiedWhen?: Date;
}

// const mockData: { data: ILecturerInfo[] } = {
//     data: [
//         {
//             id: 1,
//             code: "GV001",
//             fullName: "Nguyễn Văn An",
//             educationLevel: 9,
//             gender: 1,
//             dateOfBirth: new Date("1980-05-15"),
//             phoneNumber: "0912345678",
//             email: "an.nguyen@example.com",
//             teachingStatus: 1, // Đang giảng dạy
//             branchs: [{ id: 1, name: "Cơ sở Hà Nội" }, { id: 2, name: "Cơ sở Hồ Chí Minh" }],
//             modifiedBy: 101,
//             modifiedWhen: new Date("2023-04-12T10:30:00")
//         },
//         {
//             id: 2,
//             code: "GV002",
//             fullName: "Trần Thị Bình",
//             educationLevel: 8,
//             gender: 2,
//             dateOfBirth: new Date("1985-08-22"),
//             phoneNumber: "0923456789",
//             email: "binh.tran@example.com",
//             teachingStatus: 2, // Chờ phân công
//             branchs: [{ id: 3, name: "Cơ sở Đà Nẵng" }],
//             modifiedBy: 102,
//             modifiedWhen: new Date("2023-05-18T14:15:00")
//         },
//         {
//             id: 3,
//             code: "GV003",
//             fullName: "Lê Minh Cường",
//             educationLevel: 7,
//             gender: 1,
//             dateOfBirth: new Date("1978-02-10"),
//             phoneNumber: "0934567890",
//             email: "cuong.le@example.com",
//             teachingStatus: 3, // Tạm ngưng
//             branchs: [{ id: 1, name: "Cơ sở Hà Nội" }],
//             modifiedBy: 103,
//             modifiedWhen: new Date("2023-06-20T09:45:00")
//         },
//         {
//             id: 4,
//             code: "GV004",
//             fullName: "Phạm Thị Dung",
//             educationLevel: 9,
//             gender: 2,
//             dateOfBirth: new Date("1983-11-05"),
//             phoneNumber: "0945678901",
//             email: "dung.pham@example.com",
//             teachingStatus: 4, // Bị đình chỉ
//             branchs: [{ id: 2, name: "Cơ sở Hồ Chí Minh" }, { id: 4, name: "Cơ sở Cần Thơ" }],
//             modifiedBy: 104,
//             modifiedWhen: new Date("2023-07-30T16:20:00")
//         },
//         {
//             id: 5,
//             code: "GV005",
//             fullName: "Hoàng Văn Enh",
//             educationLevel: 8,
//             gender: 1,
//             dateOfBirth: new Date("1975-06-18"),
//             phoneNumber: "0956789012",
//             email: "enh.hoang@example.com",
//             teachingStatus: 5, // Nghỉ việc
//             branchs: [{ id: 3, name: "Cơ sở Đà Nẵng" }],
//             modifiedBy: 105,
//             modifiedWhen: new Date("2023-08-15T11:10:00")
//         }
//     ]
// }

export default function F12_10ReadLecturer() {
    const AllLecturer = useQuery<ILecturerInfo[]>({
        queryKey: [`F12_10ReadLecturer`],
        queryFn: async () => {
            const response = await baseAxios.get("/Account/GetAllLecturer");
            return response.data.data
            // return mockData.data;
        },
    })

    const [fileData, setFileData] = useState<any[]>([]);
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })

    const columns = useMemo<MRT_ColumnDef<ILecturerInfo>[]>(() => [
        {
            header: "Mã giảng viên",
            accessorKey: "code",
        },
        {
            header: "Họ và tên",
            accessorKey: "fullName",
        },
        {
            header: "Trình độ",
            accessorKey: "educationLevel",
            accessorFn(originalRow) {
                return FormatEducationLevelIdToString(originalRow.educationLevel!)
            }
        },
        {
            header: "Giới tính",
            accessorKey: "gender",
            Cell: ({ row }) => {
                return (
                    <>
                        {row.original.gender === 1 ? "Nam" : "Nữ"}
                    </>
                )
            }
        },
        {
            header: "Ngày sinh",
            accessorKey: "dateOfBirth",
            accessorFn(originalRow) {
                return utils_date_dateToDDMMYYYString(new Date(originalRow.dateOfBirth!));
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
            accessorKey: "teachingStatus",
            accessorFn(originalRow) {
                return originalRow.teachingStatus
            },
            Cell: ({ row }) => {
                return (
                    <DisplayTeachingStatus teachingStatus={row.original.teachingStatus!} />
                )
            }
        },
        {
            header: "Chi Nhánh",
            accessorKey: "branchList",
            accessorFn(originalRow) {
                return originalRow.branchs?.map((branch) => branch.name).join(", ");
            },
            Cell: ({ row }) => {
                return (
                    <>
                        <div style={{ whiteSpace: 'pre-wrap' }}>
                            {row.original.branchs?.map((branch) => branch.name).join("\n")}
                        </div>
                    </>
                )
            },
        },
        {
            header: "Người cập nhật",
            accessorKey: "modifiedBy",
        },
        {
            header: "Ngày cập nhật",
            accessorKey: "modifiedWhen",
            accessorFn(originalRow) {
                return utils_date_formatToDateTimeString(new Date(originalRow.modifiedWhen!));
            },
        }
    ], []);

    if (AllLecturer.isLoading) return "Đang tải dữ liệu...";
    if (AllLecturer.isError) return "Không có dữ liệu...";

    return (
        <>
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
        </>
    );
}


export function FormatEducationLevelIdToString(educationLevel: number | undefined) {
    const levelMap: { [key: number]: string } = {
        1: "Khác",
        2: "Tiểu học",
        3: "Trung học cơ sở",
        4: "Trung học phổ thông",
        5: "Đại học",
        6: "Cao đẳng",
        7: "Cử nhân",
        8: "Thạc sĩ",
        9: "Tiến sĩ"
    };

    return levelMap[educationLevel!] || "Không xác định";
}

export function FormatTeachingStatusIdToString(teachingStatus: number | undefined) {
    const statusMap: { [key: number]: string } = {
        1: "Đang giảng dạy",
        2: "Chờ phân công",
        3: "Tạm ngưng",
        4: "Bị đình chỉ",
        5: "Nghỉ việc"
    };
    return statusMap[teachingStatus!] || "Không xác định";
}


export function DisplayTeachingStatus({ teachingStatus }: { teachingStatus: number }) {
    interface I {
        value?: number,
        color?: DefaultMantineColor
        label?: string,
        leftSection?: ReactNode
    }

    const data: I[] = [
        // { value: 1, label: "Đang giảng dạy", color: "#32cd32", leftSection: <IconCheck></IconCheck> },
        // { value: 2, label: "Chờ phân công", color: "#FFD700", leftSection: <IconHourglassHigh /> },
        // { value: 3, label: "Tạm ngưng", color: "#FFA07A", leftSection: <IconPlayerPause /> },
        // { value: 4, label: "Bị đình chỉ", color: "#FF0000", leftSection: <IconX /> },
        // { value: 5, label: "Nghỉ việc", color: "#696969", leftSection: <IconOctagonMinus /> }

        //darker color
        // { value: 1, label: "Đang giảng dạy", color: "#2E8B57", leftSection: <IconCheck></IconCheck> },  // Darker green
        // { value: 2, label: "Chờ phân công", color: "#DAA520", leftSection: <IconHourglassHigh /> },     // Darker gold
        // { value: 3, label: "Tạm ngưng", color: "#ff8d00", leftSection: <IconPlayerPause /> },           // Darker light salmon
        // { value: 4, label: "Bị đình chỉ", color: "#B22222", leftSection: <IconX /> },                   // Darker red
        // { value: 5, label: "Nghỉ việc", color: "#4D4D4D", leftSection: <IconOctagonMinus /> }           // Darker gray

        { value: 1, label: "Đang giảng dạy", color: "teal.7", leftSection: <IconCheck /> },
        { value: 2, label: "Chờ phân công", color: "yellow", leftSection: <IconHourglassHigh /> },
        { value: 3, label: "Tạm ngưng", color: "orange.6", leftSection: <IconPlayerPause /> },
        { value: 4, label: "Bị đình chỉ", color: "red.7", leftSection: <IconX /> },
        { value: 5, label: "Nghỉ việc", color: "gray.7", leftSection: <IconOctagonMinus /> }

    ]

    const selected = data.find((item) => item.value === teachingStatus);
    return (
        <Badge
            w="100%"
            leftSection={selected?.leftSection || <IconCheck />}
            variant="light"
            color={selected?.color || "#32cd32"}
            radius="xs"
        >
            {selected?.label || "Không xác định"}
        </Badge>
    );
}
