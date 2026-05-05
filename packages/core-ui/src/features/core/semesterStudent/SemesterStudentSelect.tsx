import { accountService } from "@aq-fe/core-ui/shared/APIs/accountService";
import { studentActivityPlanService } from "@aq-fe/core-ui/shared/APIs/studentActivityPlanService";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomColumnDef, PaginationState } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import { useSemesterStore } from "@aq-fe/core-ui/shared/features/Semester/useSemesterStore";
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { StudentActivityPlan } from "@aq-fe/core-ui/shared/interfaces/StudentActivityPlan";
import { User } from "@aq-fe/core-ui/shared/interfaces/User";
import { textUtils } from "@aq-fe/core-ui/shared/utils/textUtils";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { MRT_RowSelectionState } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";

export default function SemesterStudentSelect({
    defaultSelectedIds = [],
    // onSelectNew
}: {
    defaultSelectedIds?: number[];
    // onSelectNew?: (ids: number[]) => void;
}) {
    const semesterStore = useSemesterStore()
    const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
    const disc = useDisclosure();
    const searchState = useState("")
    const [debouncedSearch] = useDebouncedValue(searchState[0], 1000)
    const pagingState = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 20,
    })
    const studentQuery = useCustomReactQuery({
        axiosFn: () => accountService.getStudentCOE({
            pageNumber: pagingState[0].pageIndex + 1,
            pageSize: pagingState[0].pageSize,
            codeOrName: debouncedSearch
        }),
        queryKey: ['students', pagingState[0], debouncedSearch]
    })
    const studentActivityPlanCreateListMutation = useCustomReactMutation({
        axiosFn: (studentActivityPlans: StudentActivityPlan[]) => studentActivityPlanService.createList(studentActivityPlans)
    })
    // -----------------------
    // Khi load data → Set mặc định
    // -----------------------
    useEffect(() => {
        if (!studentQuery.data) return;
        const initial: MRT_RowSelectionState = {};
        defaultSelectedIds.forEach(id => {
            initial[id] = true;
        });
        setRowSelection(initial);
    }, [studentQuery.data]);

    // -----------------------
    // Columns
    // -----------------------
    const columns = useMemo<CustomColumnDef<User>[]>(() => [
        {
            header: "Mã sinh viên",
            accessorKey: "code"
        },
        {
            header: "Họ",
            accessorFn: (row) => textUtils.splitFullName(row.fullName).lastName
        },
        {
            header: "Tên",
            accessorFn: (row) => textUtils.splitFullName(row.fullName).firstName
        },
        {
            header: "Họ và tên",
            accessorKey: "fullName"
        },
        {
            header: "Giới tính",
            accessorKey: "gender",
            type: "gender"
        },
        {
            header: "Ngày sinh",
            accessorKey: "dateOfBirth",
            type: "ddMMyyyy"
        }
    ], []);

    // -----------------------
    // MRT: UpdaterFn Handler
    // -----------------------
    const handleRowSelectionChange = (updater: any) => {
        setRowSelection((old) => {
            const updated = typeof updater === "function" ? updater(old) : updater;

            // Giữ nguyên các id mặc định
            defaultSelectedIds.forEach(id => {
                updated[id] = true;
            });

            return { ...updated };
        });
    };

    return (
        <CustomButtonModal
            disclosure={disc}
            buttonProps={{ actionType: 'create' }}
            modalProps={{
                title: "Danh mục sinh viên",
                size: "80em"
            }}
        >
            <CustomDataTableAPI
                columns={columns}
                pagination={pagingState[0]}
                onPaginationChange={pagingState[1]}
                query={studentQuery}
                rowCount={studentQuery.dataCount}
                state={{ rowSelection }}
                onRowSelectionChange={handleRowSelectionChange}
                enableRowSelection={(row) =>
                    !defaultSelectedIds.includes(row.original.id!)
                }
                renderTopToolbarCustomActions={() => (
                    <>
                        <CustomButton
                            actionType="select"
                            onClick={() => {
                                const allSelectedIds = Object.keys(rowSelection)
                                    .filter(id => rowSelection[id])
                                    .map(Number);

                                // 👉 chỉ gọi onSelectNew tại đây — trong event handler
                                // onSelectNew?.(allSelectedIds.filter(id => !defaultSelectedIds.includes(id)));
                                const newSelect = allSelectedIds.filter(id => !defaultSelectedIds.includes(id))
                                studentActivityPlanCreateListMutation.mutate(newSelect.map(item => ({
                                    id: 0,
                                    userId: item,
                                    activityPlanId: semesterStore.state.semester?.id
                                })))

                                disc[1].close();
                            }}
                        />
                        <CustomTextInput
                            w={350}
                            leftSection={<IconSearch />}
                            placeholder="Tìm theo mã sinh viên hoặc họ tên"
                            value={searchState[0]} onChange={(e) => searchState[1](e.currentTarget.value)}
                        />
                    </>
                )}
            />
        </CustomButtonModal>
    );
}
