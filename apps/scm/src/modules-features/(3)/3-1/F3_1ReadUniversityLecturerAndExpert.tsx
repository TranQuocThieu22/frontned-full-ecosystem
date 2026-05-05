'use client'
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F3_1ButtonActivateAccount from "./F3_1ButtonActivateAccount";
import F3_1CreateUniversityLecturerAndExpert from "./F3_1CreateUniversityLecturerAndExpert";
import F3_1DeleteUniversityLecturerAndExpert from "./F3_1DeleteUniversityLecturerAndExpert";
import F3_1UpdateUniversityLecturerAndExpert from "./F3_1UpdateUniversityLecturerAndExpert";

interface ICreateUserViewModel {
    id?: number;
    code?: string;
    email?: string;
    fullName?: string;
    birthDate?: Date | undefined;
    highestDegree?: string;
    highestScientificTitle?: string;
    woringPlace?: string;
    isExternal?: boolean;
    isEnabled?: boolean;
}

let mockData = [
    {
        id: 1,
        code: "GV001",
        email: "lecturer1@example.com",
        fullName: "Nguyen Van A",
        birthDate: new Date("1980-01-01"),
        highestDegree: "PhD",
        highestScientificTitle: "Professor",
        woringPlace: "University A",
        isExternal: false,
        isEnabled: false
    },
    {
        id: 2,
        code: "GV002",
        email: "lecturer2@example.com",
        fullName: "Tran Thi B",
        birthDate: new Date("1985-02-02"),
        highestDegree: "Master",
        highestScientificTitle: "Associate Professor",
        woringPlace: "University B",
        isExternal: false,
        isEnabled: false
    },
    {
        id: 3,
        code: "GV003",
        email: "lecturer3@example.com",
        fullName: "Le Van C",
        birthDate: new Date("1990-03-03"),
        highestDegree: "PhD",
        highestScientificTitle: "Lecturer",
        woringPlace: "University C",
        isExternal: false,
        isEnabled: false
    },
    {
        id: 4,
        code: "GV004",
        email: "lecturer4@example.com",
        fullName: "Pham Thi D",
        birthDate: new Date("1975-04-04"),
        highestDegree: "PhD",
        highestScientificTitle: "Senior Lecturer",
        woringPlace: "University D",
        isExternal: false,
        isEnabled: false
    },
    {
        id: 5,
        code: "GV005",
        email: "lecturer5@example.com",
        fullName: "Hoang Van E",
        birthDate: new Date("1988-05-05"),
        highestDegree: "Master",
        highestScientificTitle: "Lecturer",
        woringPlace: "University E",
        isExternal: false,
        isEnabled: false
    }
]

export default function F3_1ReadExternalUserCategory() {
    const AllUniversityLecturerAndExpertQuery = useQuery<ICreateUserViewModel[]>({
        queryKey: [`F3_1ReadExternalUserCategory`],
        queryFn: async () => {
            // const response = await baseAxios.post("/SystemCatalogProjectTypeCategory/getall");
            return mockData
        },
    })

    const formatFunctions = {
        birthDate: (value: string) => {
            const date = new Date(value);
            return date.toLocaleDateString("en-GB"); // e.g., "07/11/2024" (DD/MM/YYYY format)
        },
        isEnabled: (value: boolean) => (value ? "Đã kích hoạt" : "Chưa kích hoạt")
    };

    const exportConfig = {
        fields: [
            {
                fieldName: "code",
                header: "Mã"
            },
            {
                fieldName: "fullName",
                header: "Họ và tên"
            },
            {
                fieldName: "birthDate",
                header: "Ngày sinh",
                formatFunction: formatFunctions.birthDate
            },
            {
                fieldName: "highestDegree",
                header: "Học hàm"
            },
            {
                fieldName: "highestScientificTitle",
                header: "Học vị"
            },
            {
                fieldName: "woringPlace",
                header: "Đơn vị công tác"
            },
            {
                fieldName: "isEnabled",
                header: "Trạng thái tài khoản",
                formatFunction: formatFunctions.isEnabled
            }
        ]
    };

    const columns = useMemo<MRT_ColumnDef<ICreateUserViewModel>[]>(
        () => [
            {
                header: "Mã",
                accessorKey: "code"
            },
            {
                header: "Họ và tên",
                accessorKey: "fullName"
            },
            {
                header: "Ngày sinh",
                accessorKey: "birthDate",
                accessorFn(originalRow) {
                    return U0DateToDDMMYYYString(new Date(originalRow.birthDate!))
                },
            },
            {
                header: "Học hàm",
                accessorKey: "highestDegree"
            },
            {
                header: "Học vị",
                accessorKey: "highestScientificTitle"
            },
            {
                header: "Đơn vị công tác",
                accessorKey: "woringPlace"
            },
            {
                header: "Trạng thái tài khoản",
                accessorKey: "isEnabled",
                accessorFn(originalRow) {
                    return originalRow.isEnabled ? "Kích hoạt" : "Chưa kích hoạt"
                },
            }
        ],
        []
    );

    if (AllUniversityLecturerAndExpertQuery.isLoading) return "Đang tải dữ liệu..."
    if (AllUniversityLecturerAndExpertQuery.isError) return "Không có dữ liệu..."
    return (
        <MyDataTable
            enableRowSelection={true}
            columns={columns}
            enableRowNumbers={true}
            data={AllUniversityLecturerAndExpertQuery.data!}

            renderTopToolbarCustomActions={({ table }) => {
                return (
                    <>
                        <F3_1CreateUniversityLecturerAndExpert />
                        <Group>
                            <AQButtonExportData
                                objectName="dsGiangVienVaChuyenGia"
                                data={AllUniversityLecturerAndExpertQuery.data!}
                                exportConfig={exportConfig}
                                isAllData={false} />
                            <AQButtonExportData
                                isAllData={false}
                                objectName="dsGiangVienVaChuyenGia"
                                data={table.getSelectedRowModel().rows.map((row) => row.original)}
                                exportConfig={exportConfig}
                            />
                            <F3_1ButtonActivateAccount
                                data={table.getSelectedRowModel().rows.map((row) => row.original)}
                            />
                        </Group>
                    </>
                )
            }}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F3_1UpdateUniversityLecturerAndExpert lecturerAndExpertValues={row.original} />
                        <F3_1DeleteUniversityLecturerAndExpert lecturerAndExpertId={row.original.id!} />
                    </MyCenterFull>
                )
            }}
        />
    )
}
