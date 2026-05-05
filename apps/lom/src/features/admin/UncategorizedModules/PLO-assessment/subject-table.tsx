'use client';
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export const SubjectTable = ({ id, modalDisclosure }: { id: number, modalDisclosure: any }) => {
    const programDetailQuery = useQuery<any[]>({
        queryKey: ["ProgramDetailData", id],
        queryFn: async () => {
            if (!id) return []
            let cols = 'COESubject,ActivityPlan'
            const result = await baseAxios.get(`/COEGradeSubject/GetSubjectByGrade?COEGradeId=${id}&cols=${cols}`)
            return result.data?.data || []
        },
        refetchOnWindowFocus: false,
        select: (data) => data.sort((subjectA, subjectB) => subjectA.order - subjectB.order)
    });

    return (
        <>
            <CustomDataTable
                state={{
                    isLoading: programDetailQuery.isLoading
                }}
                // enableRowSelection={true}
                enableRowNumbers={true}
                columns={[
                    { header: "Năm học - học kỳ", accessorKey: "year", accessorFn: (row) => row.activityPlan?.name },
                    { header: "Thứ tự", accessorKey: "order", size: 64 },
                    { header: "Mã môn học", accessorKey: "code", accessorFn: (row) => row.coeSubject?.code },
                    { header: "Tên môn học", accessorKey: "name", accessorFn: (row) => row.coeSubject?.name },
                    { header: "Số tín chỉ", accessorKey: "credit", accessorFn: (row) => row.coeSubject?.numberCredit, size: 80 },
                    { header: "Số tiết", accessorKey: "periods", accessorFn: (row) => row.coeSubject?.numberPeriod, size: 80 },
                ]}
                data={programDetailQuery.data ?? []}
            // renderTopToolbarCustomActions={() => (
            //     <Group>
            //         {/* <PrototypeExportButton/> */}
            //     </Group>
            // )}
            />
        </>
    );
}