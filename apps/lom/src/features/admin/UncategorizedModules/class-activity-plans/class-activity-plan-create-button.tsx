import { ClassActivityPlanService } from "@/api/services/ClassActivityPlanService";
import { ClassService } from "@/api/services/ClassService";
import { Class } from "@/interfaces/shared-interfaces/Class";
import { ClassActivityPlan } from "@/interfaces/shared-interfaces/ClassActivityPlan";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { useDisclosure } from '@mantine/hooks';
import { useQueryClient } from "@tanstack/react-query";
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo } from 'react';

interface Props {
    activityPlanId?: number,
    loading: boolean,
    addedClassIds?: number[]
}

export default function ClassActivityPlanCreateButton({ activityPlanId, loading, addedClassIds }: Props) {
    const queryClient = useQueryClient();
    const modalDisc = useDisclosure();

    const classesQuery = useCustomReactQuery({
        queryKey: ['Classes'],
        axiosFn: () => ClassService.getAll({
            cols: ["COEGrade", "Users"]
        }),
        options: {
            enabled: modalDisc[0],
            refetchOnWindowFocus: false
        }
    });

    // Memoize processed menuData
    const processedClassIds = useMemo(() => {
        return (addedClassIds);
    }, [addedClassIds]);

    const classColumns = useMemo<MRT_ColumnDef<Class>[]>(() => [
        { header: "Mã lớp", accessorKey: "code" },
        { header: "Tên lớp", accessorKey: "name" },
        { header: "Tên lớp Eg", accessorKey: "egName" },
        { header: "Mã khóa", accessorKey: "coeGrade.code" },
        { header: "Ghi chú", accessorKey: "note" },
    ], []);

    const updateClassActivityPlanMutation = useCustomReactMutation({
        axiosFn: (values: ClassActivityPlan[]) => {
            return ClassActivityPlanService.createList(values);
        },
        options: {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["ClassActivityPlans", activityPlanId] });
                modalDisc[1].close();
            }
        }
    })

    const handleSubmitClassActivityPlan = (value: Class[]) => {
        const classIds = value.map((item) => item.id);

        const payload: ClassActivityPlan[] = classIds.map((classId) => ({
            classId: classId,
            activityPlanId: activityPlanId
        }));

        updateClassActivityPlanMutation.mutate(payload);
    }

    return (
        <CustomButtonModal
            disclosure={modalDisc}
            buttonProps={{
                actionType: "create",
                loading: loading
            }}
            modalProps={{
                size: '80%',
                title: 'Danh sách lớp'
            }}
        >
            <CustomFieldset title="Danh sách lớp">
                <CustomDataTable
                    isLoading={classesQuery.isLoading}
                    isError={classesQuery.isError}
                    enableRowSelection={(row) => {
                        if (row.original?.id === undefined) return false

                        return !processedClassIds?.includes(row.original.id)
                    }}
                    enableRowNumbers={true}
                    renderTopToolbarCustomActions={({ table }) => {
                        const selectedRows = table.getSelectedRowModel().flatRows.map((row) => row.original);

                        return <CustomButton
                            actionType="create"
                            loading={classesQuery.isLoading}
                            onClick={() => handleSubmitClassActivityPlan(selectedRows)}
                        />
                    }}
                    columns={classColumns}
                    data={classesQuery.data ?? []}
                />
            </CustomFieldset>
        </CustomButtonModal >
    );
}
