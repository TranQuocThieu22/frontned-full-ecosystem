import DeleteListOnClientButton from "@/shared/features/SRMEvaluationCommittee/DeleteListOnClientButton";
import DeleteOnClientButton from "@/shared/features/SRMEvaluationCommittee/DeleteOnClientButton";
import { SRMAcceptanceContract } from "@/shared/interfaces/SRMAcceptanceContract";
import { SRMContract } from "@/shared/interfaces/SRMContract";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { NumberFormatter, Text } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { MutableRefObject, useMemo, useState } from "react";
import { IUseMapRefController } from "../hooks/useMapRef";
import { formatListMessage, keyValueOf, } from "../shared/FacultyCoucilFunctions";
import ContractCreateModal from "./ContractCreateModal";

interface Props {
    srmAcceptanceCouncilId?: number;
    acceptanceContractsData: IUseMapRefController<string, SRMAcceptanceContract>;
    acceptanceContractsDisable?: MutableRefObject<SRMAcceptanceContract[]>;
    hasChange: MutableRefObject<boolean>
}

export default function ContractTable({ srmAcceptanceCouncilId, acceptanceContractsData, acceptanceContractsDisable, hasChange }: Props) {
    // Proactively (chủ động) re-render component
    const [_, setFlag] = useState(false);

    function reRender() {
        setFlag(f => !f); // toggle để ép render
    }

    const columns = useMemo<MRT_ColumnDef<SRMAcceptanceContract>[]>(() => [
        { header: "Mã đăng ký", accessorKey: "srmContract.code" },
        { header: "Tên đề tài", accessorKey: "srmContract.name", size: 300 },
        {
            header: "Chủ nhiệm đề tài",
            accessorKey: "srmContract.srmTopic.srmTopicMembers",
            accessorFn(row) {
                return row.srmContract?.srmTopic?.srmTopicMembers?.find((item) => item.srmTitle?.isLeader)?.user?.fullName;
            }
        },
        {
            header: "Lĩnh vực",
            accessorKey: "srmContract.srmTopic.srmArea.name"
        },
        {
            header: "Loại đề tài",
            accessorKey: "srmContract.srmTopic.srmType.name",
            size: columnSizeObject.name,
        },
        {
            header: "Thời gian thực hiện (tháng)",
            accessorKey: "srmContract.duration",
        },
        {
            header: "Tổng kinh phí (VNĐ)",
            accessorKey: "srmContract.totalCost",
            accessorFn(row) {
                return <NumberFormatter value={row.srmContract?.totalCost} thousandSeparator />;
            }
        },
        {
            header: "% Hoàn thành",
            accessorKey: "srmContract.srmContractReportHistories",
            accessorFn(row) {
                const progress = row.srmContract?.srmContractReportHistories?.[0]?.implementationProgress

                if (!progress) return "";
                return progress + "%";
            }
        }
    ], []);

    const exportConfig = {
        fields: [
            {
                fieldName: 'srmContract.code',
                header: 'Mã đề tài',
                formatFunction(row: SRMAcceptanceContract, object: SRMAcceptanceContract) {
                    return object.srmContract?.code
                }
            },
            {
                fieldName: 'srmContract.name',
                header: 'Tên đề tài',
                formatFunction(row: SRMAcceptanceContract, object: SRMAcceptanceContract) {
                    return object.srmContract?.name
                }
            },
            {
                fieldName: 'srmContract.srmTopic.srmTopicMembers',
                header: 'Chủ nhiệm đề tài',
                formatFunction(row: SRMAcceptanceContract, object: SRMAcceptanceContract) {
                    return object.srmContract?.srmTopic?.srmTopicMembers?.find((item) => item.srmTitle?.isLeader)?.user?.fullName
                }
            },
            {
                fieldName: 'srmContract.srmTopic.srmArea.name',
                header: 'Lĩnh vực',
                formatFunction(row: SRMAcceptanceContract, object: SRMAcceptanceContract) {
                    return object.srmContract?.srmTopic?.srmArea?.name
                }
            },
            {
                fieldName: 'srmContract.srmType.name',
                header: 'Loại đề tài',
                size: 300,
                formatFunction(row: SRMAcceptanceContract, object: SRMAcceptanceContract) {
                    return object.srmContract?.srmType?.name
                }
            },
            {
                fieldName: 'srmContract.duration',
                header: 'Thời gian thực hiện',
                formatFunction(row: SRMAcceptanceContract, object: SRMAcceptanceContract) {
                    return object.srmContract?.duration
                }
            },
            {
                fieldName: 'srmContract.totalCost',
                header: 'Tổng kinh phí',
                formatFunction(row: SRMAcceptanceContract, object: SRMAcceptanceContract) {
                    return object.srmContract?.totalCost
                }
            },
            {
                fieldName: 'srmContract.implementationProgress',
                header: '% Hoàn thành',
                formatFunction(row: SRMAcceptanceContract, object: SRMAcceptanceContract) {
                    const progress = object.srmContract?.srmContractReportHistories?.[0]?.implementationProgress;

                    if (!progress) return "";
                    return progress + "%";
                }
            },
        ]
    }

    const handleAddAcceptanceContract = (listAcceptanceContract: SRMContract[]) => {
        const arrayAcceptanceContractExistedInListCouncil: string[] = [];
        const arrayAcceptanceContractAddSuccess: string[] = [];

        listAcceptanceContract.map((item) => {
            const key = keyValueOf(item.id)

            if (acceptanceContractsData.has(key)) {
                // If the topic already exists on the board.
                arrayAcceptanceContractExistedInListCouncil.push(item.name || "");

            } else {
                const acceptanceContract = {
                    code: item.code,
                    srmContract: item,
                    srmAcceptanceCouncilId: srmAcceptanceCouncilId,
                    srmContractId: item.id,
                    isEnabled: true
                } as SRMAcceptanceContract;

                // If the topic does not exist on the board
                acceptanceContractsData.set(key, acceptanceContract);
                arrayAcceptanceContractAddSuccess.push(item.name || "");
            }
        })

        // Create success message
        const messageSuccess =
            arrayAcceptanceContractAddSuccess.length > 0 ? (
                <>
                    Thêm đề tài nghiệm thu{" "}
                    {formatListMessage(arrayAcceptanceContractAddSuccess, "#1971c2")} vào hội đồng thành công
                </>
            ) : undefined;

        // Create error messsage
        const messageError = arrayAcceptanceContractExistedInListCouncil.length > 0
            ? <>
                Đề tài nghiệm thu{" "}
                <Text fw={700} c="#c21919c2" span>
                    {arrayAcceptanceContractExistedInListCouncil.join(", ")}
                </Text>{" "}
                đã có trong hội đồng
            </>
            : undefined;

        reRender();
        hasChange.current = true;
        return { messageSuccess, messageError };
    }

    const handleDeleteAcceptanceContract = (
        key: string,
        id?: number
    ) => {
        // If don't have an id => delete it locally.
        if (!id) {
            acceptanceContractsData?.remove(key);
            return;
        }

        // If has id existing, put it through the disable array so that 
        // when saving it will be sent to the server.

        // If the menuData is faulty (duplicate topic)
        const duplicatedAcceptanceContract = acceptanceContractsData.get(`dupKey${key}${id}`);
        if (duplicatedAcceptanceContract) {
            duplicatedAcceptanceContract.isEnabled = false;
            acceptanceContractsDisable?.current.push(duplicatedAcceptanceContract)
            acceptanceContractsData.remove(`dupKey${key}${id}`);
            return;
        }

        // If not duplicated
        const acceptanceContract = acceptanceContractsData.get(key);
        if (acceptanceContract) {
            acceptanceContract.isEnabled = false;
            acceptanceContractsDisable?.current.push(acceptanceContract);
            acceptanceContractsData.remove(key);
        }
    }

    const handleDeleteListAcceptanceContract = (listContract: SRMAcceptanceContract[]) => {
        listContract.map((item) => {
            const key = keyValueOf(item.srmContractId);
            handleDeleteAcceptanceContract(key, item.id);
        })
        reRender();
        hasChange.current = true;
    }

    return (
        <div style={{ paddingTop: "30px" }}>
            <CustomDataTable
                columns={columns}
                data={acceptanceContractsData.values() || []}
                enableRowNumbers={false}
                getRowId={(row) => row.code?.toString()}
                enableRowSelection
                renderTopToolbarCustomActions={({ table }) => {
                    const selectedRows =
                        table
                            .getSelectedRowModel()
                            .flatRows.map((item) => item.original) || [];

                    return (
                        <>
                            <ContractCreateModal
                                handleAddAcceptanceContract={handleAddAcceptanceContract}
                                acceptanceContractsData={acceptanceContractsData}
                            />
                            <AQButtonExportData
                                objectName="Danh sách đề tài nghiệm thu"
                                data={selectedRows.length > 0 ? selectedRows : acceptanceContractsData.values() || []}
                                exportConfig={exportConfig}
                            />
                            <DeleteListOnClientButton
                                values={selectedRows}
                                handleDeleteList={handleDeleteListAcceptanceContract}
                                resetRowSelection={table.resetRowSelection}
                            />
                        </>
                    )
                }}
                renderRowActions={({ row, table }) => {
                    return <CustomCenterFull>
                        <DeleteOnClientButton
                            code={row.original.code || ""}
                            handleDelete={() => {
                                handleDeleteAcceptanceContract(keyValueOf(row.original.srmContractId), row.original.id);
                                reRender();
                                hasChange.current = true;
                            }}
                            resetRowSelection={table.resetRowSelection}
                        />
                    </CustomCenterFull>
                }}
            />
        </div>
    );
}

