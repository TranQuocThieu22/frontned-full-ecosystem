'use client'

import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F3_2ButtonUpdateScientificProfile from "./LecturerProfileButtonUpdateScientificProfile";
import F3_2PrintScientifictProfile from "./LecturerProfilePrintScientifictProfile";

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

export default function LecturerProfileReadScientificProfile() {
    const AllUniversityLecturerAndExpertQuery = useQuery<ICreateUserViewModel[]>({
        queryKey: [`userNCKHs?isExternal=false`],
        queryFn: async () =>
            // (await baseAxios.get("userNCKHs?isExternal=false")).menuData,
            mockData
    })

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
                    return dateUtils.toDDMMYYYY(new Date(originalRow.birthDate!))
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
            }
        ],
        []
    );

    if (AllUniversityLecturerAndExpertQuery.isLoading) return "Đang tải dữ liệu..."
    if (AllUniversityLecturerAndExpertQuery.isError) return "Không có dữ liệu..."

    return (
        <CustomDataTable
            columns={columns}
            enableRowNumbers={true}
            data={AllUniversityLecturerAndExpertQuery.data!}
            renderRowActions={({ row }) => {
                return (
                    <CustomCenterFull>
                        <F3_2ButtonUpdateScientificProfile scientificProfileId={row.original.id!} />
                        {/* <F3_2ButtonPrintScientificProfile scientificProfileId={row.original.id!} /> */}
                        <F3_2PrintScientifictProfile id={row.original.id!} />
                    </CustomCenterFull>
                )
            }}
        />

    )
}
