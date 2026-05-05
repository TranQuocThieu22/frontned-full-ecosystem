'use client'

import baseAxios from "@/api/config/baseAxios";
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import { ENUM_GENDER } from "@/constants/enum/global";
import { ILecturer } from "@/interfacesForViewModels/Lecturer/ILecturer";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import { Group } from '@mantine/core';
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F_uqjkcmbrwq_Create from "./F_uqjkcmbrwq_Create";
import F_uqjkcmbrwq_Delete from "./F_uqjkcmbrwq_Delete";
import F_uqjkcmbrwq_DeleteList from "./F_uqjkcmbrwq_DeleteList";
import F_uqjkcmbrwq_Update from "./F_uqjkcmbrwq_Update";
import { IBaseEntity } from 'aq-fe-framework/interfaces'


export interface F_lecturer {
    id: number;
    lecturerCode: string;
    name: string;
    degree: string;
    gender: string;
    dob: string;
    phone: string;
    email: string;
    skill: string;
    branchs: F_branches[];
    userPrograms: F_program[];
    userSkillCenters: any[];
    branches?: IBaseEntity[]
    programs?: IBaseEntity[]
}

export interface F_branches {
    id: number;
    name: string;
}

export interface F_program {
    id: number;
    name: string;
}






export default function F_uqjkcmbrwq_Read(
) {
    const query = useQuery<ILecturer[]>({
        queryKey: ['F_uqjkcmbrwq_Read'],
        queryFn: async () => {
            const response = await baseAxios.get("/Account/GetAllLecturer")
            return response.data.data
        },
    })

    const form = useForm<any>({
        initialValues: {
            fullName: "",
        },
    })
    const columns = useMemo<MRT_ColumnDef<ILecturer>[]>(() => [
        { header: "Mã giảng viên", accessorKey: "code" },
        { header: "Họ Tên", accessorKey: "fullName" },
        {
            header: "Bậc học",
            accessorKey: "educationLevel",
            accessorFn: (originalRow: any) => {
                const levelEntry = Object.values(EducationLevel).find(
                    (entry) => entry.value === originalRow.educationLevel
                );
                return levelEntry?.label || "";
            },
        },

        {
            header: "Giới tính", accessorKey: "gender",
            accessorFn: (row) => {
                return ENUM_GENDER[row.gender!]
            }
        },
        {
            header: "Ngày sinh", accessorKey: "dateOfBirth",
            accessorFn: (originalRow: any) => {
                return utils_date_dateToDDMMYYYString(new Date(originalRow.dateOfBirth!));
            }
        },
        { header: "Số điện thoại", accessorKey: "phoneNumber" },
        { header: "Email", accessorKey: "email" },
        {
            header: "Kỹ năng", accessorKey: "skill",
            accessorFn(originalRow) {
                return (originalRow.userSkillCenters ?? [])
                    .map((item) => item?.name || "")
                    .join(", ");
            },
            Cell: ({ row }) => {
                return (
                    <>
                        <div style={{ whiteSpace: 'pre-wrap' }}>
                            {row.original.userSkillCenters && row.original.userSkillCenters.length > 0
                                ? row.original.userSkillCenters
                                    .map((item) => item.name || "")
                                    .join("\n")
                                : ""}
                        </div>
                    </>
                )
            },
        },
        {
            header: "Chi nhánh", accessorKey: "branchs",
            accessorFn(originalRow) {
                return (originalRow.userBranch ?? [])
                    .map((item) => item.name || "")
                    .join(", ");
            },
            Cell: ({ row }) => {
                return (
                    <>
                        <div style={{ whiteSpace: 'pre-wrap' }}>
                            {row.original.userBranch && row.original.userBranch.length > 0
                                ? row.original.userBranch
                                    .map((item) => item.name || "")
                                    .join("\n")
                                : ""}
                        </div>
                    </>
                )
            },
        },
        {
            header: "Chương trình", accessorKey: "programs",
            accessorFn(originalRow) {
                return (originalRow.userPrograms ?? [])
                    .map((item) => item.name)
                    .join(", ");
            },
            Cell: ({ row }) => {
                return (
                    <>
                        <div style={{ whiteSpace: 'pre-wrap' }}>
                            {row.original.userPrograms && row.original.userPrograms.length > 0
                                ? row.original.userPrograms
                                    .map((item) => item.program?.name || "")
                                    .join("\n")
                                : ""}
                        </div>
                    </>
                )
            },
        },
    ], []);

    return (
        <MyFieldset title="Danh sách giảng viên">
            <MyDataTable
                exportAble
                columns={columns}
                enableRowNumbers={true}
                data={query.data || []}
                renderTopToolbarCustomActions={({ table }) =>
                    <Group>
                        <F_uqjkcmbrwq_Create />
                        <AQButtonCreateByImportFile form={form}
                            onSubmit={() => { }}>
                        </AQButtonCreateByImportFile>
                        <F_uqjkcmbrwq_DeleteList values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />

                    </Group>}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            {/* <F_uqjkcmbrwq_Update values={{ fileProve: row.original.fileProve }}></F_uqjkcmbrwq_Update> */}
                            <F_uqjkcmbrwq_Update values={row.original}></F_uqjkcmbrwq_Update>
                            <F_uqjkcmbrwq_Delete id={row.original.id!} code={row.original.code!} />
                        </MyCenterFull>
                    )
                }}
            />
        </MyFieldset>
    )
}

export const EducationLevel = {
    Other: {
        value: 1,
        label: 'Khác',
    },
    PrimarySchool: {
        value: 2,
        label: 'Tiểu học',
    },
    SecondarySchool: {
        value: 3,
        label: 'THCS',
    },
    HighSchool: {
        value: 4,
        label: 'THPT',
    },
    University: {
        value: 5,
        label: 'Đại học',
    },
    College: {
        value: 6,
        label: 'Cao đẳng',
    },
    Bachelor: {
        value: 7,
        label: 'Cử nhân',
    },
    Master: {
        value: 8,
        label: 'Thạc sĩ',
    },
    Doctoral: {
        value: 9,
        label: 'Tiến sĩ',
    },
} as const;

export type EducationLevelKey = keyof typeof EducationLevel;
export type EducationLevelValue = typeof EducationLevel[EducationLevelKey]['value'];
