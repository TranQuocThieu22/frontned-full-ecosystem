'use client'

import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F11_2CreateExternalUserCategory from "./F11_2CreateExternalUserCategory";
import F11_2DeleteExternalUserCategory from "./F11_2DeleteExternalUserCategory";
import F11_2UpdateExternalUserCategory from "./F11_2UpdateExternalUserCategory";

export interface I11_2ExternalUser {
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

export default function F11_2ReadExternalUserCategory() {

    const AllExternalUserQuery = useQuery<I11_2ExternalUser[]>({
        queryKey: [`userNCKHs?isExternal=true`],
        queryFn: async () => data
    })

    const columns = useMemo<MRT_ColumnDef<I11_2ExternalUser>[]>(
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

    if (AllExternalUserQuery.isLoading) return "Đang tải dữ liệu..."
    if (AllExternalUserQuery.isError) return "Không có dữ liệu..."
    return (
        <MyDataTable
            columns={columns}
            enableRowNumbers={true}
            data={AllExternalUserQuery.data!}

            renderTopToolbarCustomActions={() => <F11_2CreateExternalUserCategory />}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F11_2UpdateExternalUserCategory values={row.original} />
                        <F11_2DeleteExternalUserCategory externalUserId={row.original.id!} />
                    </MyCenterFull>
                )
            }}
        />
    )
}


const data: I11_2ExternalUser[] = [
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