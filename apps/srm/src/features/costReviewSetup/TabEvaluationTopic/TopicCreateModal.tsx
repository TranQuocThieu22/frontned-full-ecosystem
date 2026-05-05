import { evaluationCommitteeService } from "@/shared/APIs/evaluationCommitteeService";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMTopic } from "@/shared/interfaces/SRMTopic";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { Badge } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { IUseMapRefController } from "../hooks/useMapRef";
import { keyValueOf } from "../shared/CostReviewFunctions";

interface Props {
    handleAddEvaluationTopic: Function;
    evaluationTopicsData?: IUseMapRefController<string, SRMTopic>;
}

export default function TopicCreateModal({ evaluationTopicsData, handleAddEvaluationTopic }: Props) {
    const academicYearStore = useAcademicYearStore();
    const disc = useDisclosure();

    const evaluationTopicQuery = useCustomReactQuery({
        queryKey: ["EvaluationTopicTabAdd", academicYearStore.state.academicYear?.id],
        axiosFn: () => evaluationCommitteeService.getSRMEvaluationTopicPass(
            { AcademicYearId: academicYearStore.state.academicYear?.id ?? -1 }
        ),
        options: {
            enabled: !!academicYearStore.state.academicYear?.id && disc[0]
        }
    })

    const columns = useMemo<MRT_ColumnDef<SRMTopic>[]>(() => [
        { header: "Mã đăng ký", accessorKey: "code" },
        { header: "Tên đề tài", accessorKey: "registerName", size: 400 },
        {
            header: "Lĩnh vực",
            accessorKey: "srmArea.name",
        },
        {
            header: "Chủ nhiệm",
            accessorKey: "srmTopicMembers",
            accessorFn(row) {
                return row.srmTopicMembers?.find((item) => item.srmTitle?.isLeader)?.user?.fullName;
            },
        },
        {
            header: "Thời gian thực hiện",
            accessorKey: "duration",
        },
        {
            header: "Từ tháng/năm",
            accessorKey: "fromDate",
            accessorFn(row) {
                return dateUtils.toMMYYYY(row.fromDate);
            }
        },
        {
            header: "Đến tháng/năm",
            accessorKey: "toDate",
            accessorFn(row) {
                return dateUtils.toMMYYYY(row.toDate);
            }
        },
        {
            header: "Kết luận của hội đồng",
            accessorKey: "srmEvaluationTopic.srmConclusion.name",
            accessorFn(row) {
                return <Badge
                    w="100%"
                    variant="light"
                    color={row.srmEvaluationTopic?.srmConclusion?.color || "gray"}
                    radius="sm"
                >
                    {row.srmEvaluationTopic?.srmConclusion?.name}
                </Badge>
            },
        },
        {
            header: "Kiến nghị", accessorKey: "srmEvaluationTopic.recommendation", size: 300,
            accessorFn(row) {
                return row.srmEvaluationTopic?.recommendation || "";
            }
        },
    ], []);

    const handleConfirmSelect = (listSelected: SRMTopic[]) => {
        const { messageSuccess, messageError } = handleAddEvaluationTopic(listSelected);
        if (messageSuccess) {
            disc[1].close();
            notifications.show({
                autoClose: 10000,
                color: "green",
                title: "Thêm thành công",
                message: (messageSuccess),
            });
        }
        if (messageError) {
            disc[1].close();
            notifications.show({
                autoClose: 10000,
                color: "red",
                title: "Thêm thất bại",
                message: (messageError),
            });
        }
    }

    return (
        <CustomButtonModal modalProps={{ size: "90%", title: "Danh sách đăng ký tuyển chọn", }} buttonProps={{ children: "Thêm" }} disclosure={disc}>
            <CustomDataTable
                isLoading={evaluationTopicQuery.isLoading}
                isError={evaluationTopicQuery.isError}
                getRowId={(row) => row.id?.toString()}
                enableRowSelection={(row) => {
                    if (evaluationTopicsData) {
                        return !evaluationTopicsData.get(keyValueOf(row.original.id));
                    }
                    return true;
                }}
                mantineSelectCheckboxProps={({ row }) => {
                    const isDisabled = evaluationTopicsData
                        ? !!evaluationTopicsData.get(keyValueOf(row.original.id))
                        : false;

                    return { disabled: isDisabled };
                }}
                renderTopToolbarCustomActions={({ table }) => {
                    const selectedRows = table.getSelectedRowModel().flatRows.map((item) => item.original) || [];

                    return (
                        <>
                            <CustomButton
                                actionType="create"
                                onClick={() => {
                                    handleConfirmSelect(selectedRows);
                                    table.resetRowSelection();
                                }}
                                disabled={selectedRows.length === 0}
                            >
                                Chọn
                            </CustomButton>
                        </>
                    )
                }}
                enableRowNumbers={false}
                columns={columns}
                data={evaluationTopicQuery.data || []}
            />
        </CustomButtonModal>
    );
}