import { ENUM_GENDER } from "@/constants/enum/global";
import useQ_Exam_GetStudent from "@/hooks/query-hooks/Exam/useQ_Exam_GetStudent";
import { Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MyButton, MyButtonModal, MyDataTable } from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F_akiydtpxjo_ChangeExamGroup from "./F_akiydtpxjo_ChangeExamGroup";
import { IExamRegistration } from "@/interfaces/examRegistration";

export default function F_akiydtpxjo_ViewUpdateStudentList({ values }: { values: IExamRegistration }) {
    const disc = useDisclosure()
    const getStudent_query = useQ_Exam_GetStudent({
        body: {
            courseSectionId: values.id,
            pageSize: 0,
            pageNumber: 0
        },
        options: {
            enabled: disc[0] == true
        }
    })
    const columns = useMemo<MRT_ColumnDef<IExamRegistration>[]>(() => [
        {
            header: "Mã học viên",
            accessorKey: "user.code"
        },
        {
            header: "Họ tên",
            accessorKey: "user.fullName"
        },
        {
            header: "Giới tính",
            accessorFn: (row) => {
                return ENUM_GENDER[row.user?.gender!]
            }
        },
        {
            header: "Ngày sinh",
            accessorFn: (row) => {
                return utils_date_dateToDDMMYYYString(new Date(row.user?.dateOfBirth!))
            }
        },
        {
            header: "Mã nhóm thi",
            accessorFn: () => {
                return values.code
            }

        },
        {
            header: "Ngày thi",
            accessorFn: () => {
                return utils_date_dateToDDMMYYYString(new Date(values.exam?.examDate!))
            }
        },
        {
            header: "Email",
            accessorKey: "user.email"
        },
        {
            header: "Số điện thoại",
            accessorKey: "user.phoneNumber"
        },
        {
            header: "CCCD",
        },
        {
            header: "Đối tượng",
            accessorFn: () => "Tự do"
        }
    ], [])
    if (getStudent_query.isLoading) return "Đang tải dữ liệu"
    if (getStudent_query.isError) return "Có lỗi xảy ra"
    return (
        <MyButtonModal disclosure={disc} modalSize={"80%"} label="Xem / Sửa danh sách" title="Dan sách thí sinh">
            <MyDataTable
                columns={columns}
                enableRowSelection
                data={getStudent_query.data!}
                renderTopToolbarCustomActions={({ table }) =>
                    <Flex gap={"md"}>
                        <MyButton crudType="export" />
                        <F_akiydtpxjo_ChangeExamGroup studentListSelected={table.getSelectedRowModel().rows.map(item => item.original)} />
                    </Flex>
                }
            />
        </MyButtonModal>
    )
}
