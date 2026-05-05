'use client'
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";
import { examService } from "@/shared/APIs/examService";
import { ExamRegistration } from "@/shared/interfaces/examRegistration";
import { CourseSection } from "@/shared/interfaces/courseSection";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { MyButton, MyButtonModal } from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F_akiydtpxjo_CourseSectionTable from "../F_akiydtpxjo_CourseSectionTable";
import F_akiydtpxjo_ViewStudentList from "./F_akiydtpxjo_ViewStudentList";

export default function F_akiydtpxjo_ChangeExamGroup({ studentListSelected }: { studentListSelected: ExamRegistration[] }) {
    const disc = useDisclosure();
    const examRegistration_mutation = useCustomReactMutation({
        axiosFn: (body: ExamRegistration[]) =>
            examService.examRegistration(body),
        mutationType: "update",
    });


    const columns = useMemo<MRT_ColumnDef<CourseSection>[]>(() => [
        { header: "Mã khóa thi", accessorKey: "exam.code" },
        { header: "Mã nhóm thi", accessorKey: "code" },
        { header: "Tên khóa thi", accessorKey: "exam.name" },
        {
            header: "Ngày thi",
            accessorKey: "exam.examDate",
            accessorFn: (row) => {
                return utils_date_dateToDDMMYYYString(new Date(row.exam?.examDate!))
            }
        },
        { header: "Tên chương trình", accessorKey: "exam.program.name" },
        {
            header: "Ngày khai giảng",
            accessorKey: "exam.startRegistrationDate",
            accessorFn: (row) => {
                return utils_date_dateToDDMMYYYString(new Date(row.exam?.startRegistrationDate!))
            }
        },
        { header: "Sĩ số nhóm thi", accessorKey: "quantityStudentActual" },
        { header: "Tính chất phòng", accessorKey: "exam.roomType.name" },
        {
            header: "Danh sách thí sinh", accessorKey: "candidates",
            Cell: ({ row }) =>
                <F_akiydtpxjo_ViewStudentList values={row.original!} />
        }
    ], []);
    function handleChangeCourseSection(courseSectionId?: number) {
        if (courseSectionId == undefined) {
            notifications.show({
                message: "Vui lòng chọn nhóm thi",
                color: "red"
            })
            return
        }
        examRegistration_mutation.mutate(
            studentListSelected.map(
                (item) =>
                    ({
                        id: item.id,
                        code: item.code,
                        name: item.name,
                        concurrencyStamp: item.concurrencyStamp,
                        courseSectionId: courseSectionId,
                        receiptCode: item.receiptCode,
                        receiptLink: item.receiptLink,
                        receiptNote: item.receiptNote,
                        receiptPrice: item.receiptPrice,
                        receiptType: item.receiptType,
                        totalPoint: item.totalPoint,
                        note: item.note,
                        isEnabled: true,
                        userId: item.userId,
                        isCheck: item.isCheck,
                        isPass: item.isPass,
                    }) as ExamRegistration
            ),
            {
                onSuccess: () => {
                    notifications.show({ message: "Đổi nhóm thi thành công!" });
                    disc[1].close();
                },
            }
        );
    }

    // Dữ liệu khóa thi dùng chung từ F_akiydtpxjo_CourseSectionTable qua props,
    // nên không cần query riêng ở đây nữa.
    return (
        <MyButtonModal disabled={studentListSelected.length == 0} modalSize={"80%"} disclosure={disc} label="Đổi nhóm thi" title="Danh sách lịch thi">
            <F_akiydtpxjo_CourseSectionTable
                columnsProps={columns}
                tableProps={{
                    enableMultiRowSelection: false,
                    renderTopToolbarCustomActions: ({ table }) => {
                        return <MyButton crudType="select" onClick={() => handleChangeCourseSection(table.getSelectedRowModel().rows[0]?.original.id)} />
                    }
                }}
            />
        </MyButtonModal>
    )
}

