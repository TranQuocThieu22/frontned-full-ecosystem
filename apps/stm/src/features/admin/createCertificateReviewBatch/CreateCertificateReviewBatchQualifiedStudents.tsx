"use client"
import { examService } from "@/shared/APIs/examService";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomColumnDef, CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChecklist } from "@tabler/icons-react";
import { useMemo } from "react";

interface IUser {
    id: number;
    fullName: string;
    gender: number | null;
    dateOfBirth: string | null;
}

interface IEnrollment {
    id: number;
    userId: number;
    courseTimeClusterId: number;
    courseSectionId: number;
    user: IUser;
}

interface Props {
    values?: { examIds: number[] };
    label?: string;
    color?: string;
}

export default function CreateCertificateReviewBatchQualifiedStudents({ label, values, color }: Props) {
    const disc = useDisclosure()

    const studentListQuery = useCustomReactQuery({
        queryKey: ["examService.getStudent", values?.examIds],
        axiosFn: () => examService.getStudent({
            courseSectionId: 0, programId: 0, status: 0,
            examIds: values?.examIds ?? [], pageSize: 0, pageNumber: 0
        }),
        options: { enabled: disc[0] && !!values?.examIds?.length }
    })

    const columns = useMemo<CustomColumnDef<IEnrollment>[]>(() => [
        {
            header: "Họ và tên",
            accessorFn: (row) => row.user?.fullName ?? "Không có dữ liệu"
        },
        { header: "Giới tính", accessorKey: "user.gender" },
        {
            header: "Ngày sinh",
            accessorFn: (row) => dateUtils.toDDMMYYYY(row.user?.dateOfBirth ?? undefined)
        },
    ], [])

    return (
        <CustomButtonModal
            disclosure={disc}
            modalProps={{ size: "90%", title: "Danh sách đạt cấp chứng chỉ" }}
            buttonProps={{ children: label, color: color }}
        >
            <CustomDataTable
                enableRowSelection
                enableRowNumbers
                columns={columns}
                data={(studentListQuery.data ?? []) as unknown as IEnrollment[]}
                state={{ isLoading: studentListQuery.isLoading }}
                renderTopToolbarCustomActions={() => (
                    <Button leftSection={<IconChecklist />} onClick={async () => { }}>
                        Lưu
                    </Button>
                )}
            />
        </CustomButtonModal>
    )
}
