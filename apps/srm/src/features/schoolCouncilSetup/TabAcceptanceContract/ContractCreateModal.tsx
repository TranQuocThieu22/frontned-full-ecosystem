import { DisplayEnumBadge } from "@/features/submitMissionReport/DisplayEnumBadge";
import { acceptanceCouncilService } from "@/shared/APIs/acceptanceCouncilService";
import { EnumAcceptanceCouncilType } from "@/shared/consts/enum/EnumAcceptanceCouncilType";
import { EnumColorContractExecutionStatus, EnumIconContractExecutionStatus, EnumLabelContractExecutionStatus } from "@/shared/consts/enum/EnumContractExecutionStatus";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMContract } from "@/shared/interfaces/SRMContract";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomButtonViewFileAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomButtonViewFileAPI";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Center, NumberFormatter } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { IUseMapRefController } from "../hooks/useMapRef";
import { keyValueOf } from "../shared/SchoolCoucilFunctions";

interface Props {
    handleAddAcceptanceContract: Function;
    acceptanceContractsData?: IUseMapRefController<string, SRMContract>;
}

export default function ContractCreateModal({ acceptanceContractsData, handleAddAcceptanceContract }: Props) {
    const academicYearStore = useAcademicYearStore();
    const disc = useDisclosure();

    const acceptanceContractQuery = useCustomReactQuery({
        queryKey: ["AcceptanceContractAdd", academicYearStore.state.academicYear?.id],
        axiosFn: () => {
            // Lọc cho đã báo cáo cuối kì / đã nghiệm thu / đã thanh lý / đình chỉ hợp đồng
            return acceptanceCouncilService.GetSRMContractAcceptance({
                academicYearId: academicYearStore.state.academicYear?.id ?? -1,
                type: EnumAcceptanceCouncilType.University
            });
        },
        options: {
            enabled: !!academicYearStore.state.academicYear?.id && disc[0]
        }
    })

    const columns = useMemo<MRT_ColumnDef<SRMContract>[]>(() => [
        { header: "Mã đề tài", accessorKey: "code" },
        { header: "Tên đề tài", accessorKey: "name", size: 400 },
        {
            header: "Chủ nhiệm đề tài",
            accessorKey: "srmTopic.srmTopicMembers",
            accessorFn(row) {
                return row.srmTopic?.srmTopicMembers?.find((item) => item.srmTitle?.isLeader)?.user?.fullName;
            }
        },
        {
            header: "Lĩnh vực",
            accessorKey: "srmTopic.srmArea.name"
        },
        {
            header: "Loại đề tài",
            accessorKey: "srmTopic.srmType.name",
            size: columnSizeObject.name,
            accessorFn(row) {
                return row.srmTopic?.srmType?.name;
            }
        },
        {
            header: "Thời gian thực hiện (tháng)",
            accessorKey: "duration",
        },
        {
            header: "Tổng kinh phí (VNĐ)",
            accessorKey: "totalCost",
            accessorFn(row) {
                return <NumberFormatter value={row.totalCost} thousandSeparator />;
            }
        },
        {
            header: "% Hoàn thành",
            accessorKey: "srmContractReportHistories",
            accessorFn(row) {
                const progress = row.srmContractReportHistories?.[0]?.implementationProgress;

                if (!progress) return "";
                return progress + "%";
            }
        }, {
            header: "File báo cáo cuối kì",
            accessorKey: "attachmentPath",
            accessorFn: (row) => {
                if (!row.attachmentPath) return "";
                return <Center><CustomButtonViewFileAPI filePath={row.attachmentPath} /></Center>
            }
        }, {
            header: "Trang thái thực hiện",
            accessorKey: "executionStatus",
            accessorFn(row) {
                return <Center>
                    <DisplayEnumBadge
                        enumStatus={row.executionStatus}
                        enumLabel={EnumLabelContractExecutionStatus}
                        enumColor={EnumColorContractExecutionStatus}
                        enumIcon={EnumIconContractExecutionStatus}
                    />
                </Center>
            }
        }
    ], []);

    const handleConfirmSelect = (listSelected: SRMContract[]) => {
        const { messageSuccess, messageError } = handleAddAcceptanceContract(listSelected);
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
        <CustomButtonModal modalProps={{ size: "90%", title: "Danh sách đề tài nghiệm thu", }} buttonProps={{ children: "Thêm" }} disclosure={disc}>
            <CustomDataTable
                isError={acceptanceContractQuery.isError}
                isLoading={acceptanceContractQuery.isFetching}
                getRowId={(row) => row.id?.toString()}
                enableRowSelection={(row) => {
                    if (acceptanceContractsData) {
                        return !acceptanceContractsData.get(keyValueOf(row.original.id));
                    }
                    return true;
                }}
                mantineSelectCheckboxProps={({ row }) => {
                    const isDisabled = acceptanceContractsData
                        ? !!acceptanceContractsData.get(keyValueOf(row.original.id))
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
                data={acceptanceContractQuery.data || []}
            />
        </CustomButtonModal>
    );
}