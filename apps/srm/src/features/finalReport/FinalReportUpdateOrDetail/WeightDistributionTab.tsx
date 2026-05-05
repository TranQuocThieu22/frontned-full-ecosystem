import { IBodyUpdateSRMTopicMemberAllocation, contractService } from "@/shared/APIs/contractService";
import { SRMContract } from "@/shared/interfaces/SRMContract";
import { SRMTopicMember } from "@/shared/interfaces/SRMTopicMember";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomNumberInput } from "@aq-fe/core-ui/shared/components/input/CustomNumberInput";
import { genderEnum, genderLabel } from "@aq-fe/core-ui/shared/consts/enum/genderEnum";
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { Stack } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { useQueryClient } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";

interface IProps {
    form: UseFormReturnType<SRMContract>;
    actionType?: "update" | "viewDetail";
    onSubmit?: (callback: () => void) => void;
}

export default function WeightDistributionTab({ form, actionType = "update", onSubmit }: IProps) {
    const [errors, setErrors] = useState<Record<number, string>>({});
    const [forceRender, setForceRender] = useState(0);

    const queryClient = useQueryClient();
    const mutationUpdate = useCustomReactMutation({
        axiosFn: (body: IBodyUpdateSRMTopicMemberAllocation[]) => contractService.updateTopicMemberAllocation(body),
        mutationType: "update",
        options: {
            onSuccess: () => {
                // queryClient.invalidateQueries({ queryKey: ["contractFinalReportQuery"] });
            },
            onError: () => { }
        },
        enableDefaultSuccess: false,
    });

    const columns = useMemo<MRT_ColumnDef<SRMTopicMember>[]>(
        () => [
            {
                header: "Mã viên chức",
                accessorKey: "user.code",
            },
            {
                header: "Họ tên",
                accessorKey: "user.fullName",
            },
            {
                header: "Ngày sinh",
                accessorKey: "user.dateOfBirth",
                accessorFn: (row) => row.user?.dateOfBirth ? dateUtils.toDDMMYYYY(row.user.dateOfBirth) : ""
            },
            {
                header: "Giới tính",
                accessorKey: "user.gender",
                accessorFn: (row) => genderLabel[row.user?.gender as genderEnum]
            },
            {
                header: "Đơn vị",
                accessorKey: "user.workingUnitName",
            },
            {
                header: "Vai trò",
                accessorKey: "srmTitle.name",
                accessorFn: (row) => row.srmTitle?.name || ""
            },
            {
                header: "Phân bổ thời gian(%)",
                accessorKey: "timeAllocation",
                size: 250,
                Cell: ({ row }) => {
                    if (actionType === "update") {
                        const rowIndex = form.getValues().srmTopic?.srmTopicMembers?.findIndex(
                            item => item.user?.code === row.original.user?.code
                        );

                        return (
                            <CustomNumberInput
                                min={0}
                                max={100}
                                value={row.original.timeAllocation}
                                onChange={(value) => {
                                    const newValue = Number(value) || 0;

                                    if (rowIndex !== undefined && rowIndex !== -1) {
                                        form.setFieldValue(
                                            `srmTopic.srmTopicMembers.${rowIndex}.timeAllocation`,
                                            newValue
                                        );

                                        if (errors[rowIndex]) {
                                            const newErrors = { ...errors };
                                            delete newErrors[rowIndex];
                                            setErrors(newErrors);
                                        }
                                    }
                                }}
                                error={rowIndex !== undefined && rowIndex !== -1 ? errors[rowIndex] : undefined}
                            />
                        );
                    }
                    return row.original.timeAllocation;
                },
            }
        ],
        [form.getValues().srmTopic?.srmTopicMembers, errors, forceRender]
    );

    const handleSubmitWeightDistribution = () => {

        let hasError = false;
        const newErrors: Record<number, string> = {};

        const totalAllocation = form.getValues().srmTopic?.srmTopicMembers?.reduce(
            (sum, item) => sum + (item.timeAllocation || 0),
            0
        ) || 0;

        if (totalAllocation > 100) {
            form.getValues().srmTopic?.srmTopicMembers?.forEach((item, index) => {
                newErrors[index] = "Tổng phân bổ thời gian không được vượt quá 100%";
            });

            setErrors(newErrors);
            setForceRender(prev => prev + 1);

            hasError = true;
        } else {
            setErrors({});
        }

        if (hasError) {
            return;
        }

        let body: IBodyUpdateSRMTopicMemberAllocation[] = [];
        form.getValues().srmTopic?.srmTopicMembers?.forEach((item) => {
            body.push({
                id: item.id,
                order: form.getValues().order,
                srmTopicId: form.getValues().srmTopicId,
                userId: item.userId,
                srmTitleId: item.srmTitleId,
                timeAllocation: item.timeAllocation,
            });
        });
        mutationUpdate.mutate(body);
    };

    useEffect(() => {
        if (onSubmit) onSubmit(() => handleSubmitWeightDistribution());
    }, [onSubmit]);

    return (
        <Stack>
            <CustomDataTable
                enableColumnFilters
                enableColumnResizing
                enableRowSelection={actionType === "update"}
                enableRowNumbers
                columns={columns}
                data={form.values.srmTopic?.srmTopicMembers || []}
            />
        </Stack>
    );
}

