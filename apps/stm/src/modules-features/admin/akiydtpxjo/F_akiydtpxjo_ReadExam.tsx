'use client'
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F_akiydtpxjo_CourseSectionTable from "./F_akiydtpxjo_CourseSectionTable";
import F_uqjkcmbrwq_Delete from "./F_uqjkcmbrwq_Delete";
import F_akiydtpxjo_ViewUpdateStudentList from "./ViewUpdateStudentList/F_akiydtpxjo_ViewUpdateStudentList";
import { ICourseSection } from "@/interfaces/courseSection";

export default function F_akiydtpxjo_ReadExam() {
    const columns = useMemo<MRT_ColumnDef<ICourseSection>[]>(() => [
        {
            header: "Mã khóa thi",
            accessorKey: "exam.code"
        },
        {
            header: "Mã nhóm thi",
            accessorKey: "code"
        },
        {
            header: "Tên khóa thi",
            accessorKey: "exam.name"
        },
        {
            header: "Ngày thi",
            accessorKey: "exam.examDate",
            accessorFn: (row) => {
                return utils_date_dateToDDMMYYYString(new Date(row.exam?.examDate!))
            }
        },
        {
            header: "Tên chương trình",
            accessorKey: "exam.program.name"
        },
        {
            header: "Ngày khai giảng",
            accessorKey: "exam.startRegistrationDate",
            accessorFn: (row) => {
                return utils_date_dateToDDMMYYYString(new Date(row.exam?.startRegistrationDate!))
            }
        },
        {
            header: "Sĩ số nhóm thi",
            accessorKey: "quantityStudentActual"
        },
        {
            header: "Tính chất phòng",
            accessorKey: "exam.roomType.name"
        },
        {
            header: "Danh sách thí sinh",
            accessorKey: "candidates",
            Cell: ({ row }) => {
                return <F_akiydtpxjo_ViewUpdateStudentList values={row.original!} />
            }
        }
    ], []);
    return (
        <MyFieldset title="Danh sách lớp giảng dạy">
            <F_akiydtpxjo_CourseSectionTable
                columnsProps={columns}
                tableProps={{
                    enableRowNumbers: true,
                    renderRowActions: ({ row }) => (
                        <MyCenterFull>
                            <F_uqjkcmbrwq_Delete values={row.original} />
                        </MyCenterFull>
                    )
                }}
            />
        </MyFieldset>
    )
}

