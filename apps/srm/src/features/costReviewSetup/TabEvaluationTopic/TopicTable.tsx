import { SRMEvaluationTopic } from "@/shared/interfaces/SRMEvaluationTopic";
import { SRMTopic } from "@/shared/interfaces/SRMTopic";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { Badge, Text } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { MutableRefObject, useMemo, useState } from "react";
import DeleteListOnClientButton from "../../../shared/features/SRMEvaluationCommittee/DeleteListOnClientButton";
import DeleteOnClientButton from "../../../shared/features/SRMEvaluationCommittee/DeleteOnClientButton";
import { IUseMapRefController } from "../hooks/useMapRef";
import { formatListMessage, keyValueOf } from "../shared/CostReviewFunctions";
import TopicCreateModal from "./TopicCreateModal";

interface Props {
    srmEvaluationCommitteeId?: number
    evaluationTopicsData: IUseMapRefController<string, SRMEvaluationTopic>;
    evaluationTopicsDisable?: MutableRefObject<SRMEvaluationTopic[]>;
    hasChange: MutableRefObject<boolean>
}

export default function TopicTable({ evaluationTopicsData, evaluationTopicsDisable, hasChange, srmEvaluationCommitteeId }: Props) {
    // Proactively (chủ động) re-render component
    const [_, setFlag] = useState(false);

    function reRender() {
        setFlag(f => !f); // toggle để ép render
    }

    const columns = useMemo<MRT_ColumnDef<SRMEvaluationTopic>[]>(() => [
        { header: "Mã đăng ký", accessorKey: "code" },
        { header: "Tên đề tài", accessorKey: "srmTopic.registerName", size: 300 },
        { header: "Lĩnh vực", accessorKey: "srmTopic.srmArea.name" },
        {
            header: "Chủ nhiệm",
            accessorKey: "srmTopic.user.fullName",
            accessorFn(row) {
                const fullName = row.srmTopic?.srmTopicMembers?.find((item) => item.srmTitle?.isLeader)?.user?.fullName;
                return fullName ?? "";
            },
        },
        {
            header: "Thời gian thực hiện",
            accessorKey: "srmTopic.duration",
            accessorFn(row) {
                if (!row.srmTopic?.duration) return "";
                return row.srmTopic?.duration + " tháng";
            },
        },
        {
            header: "Từ tháng/năm",
            accessorKey: "srmTopic.fromDate",
            accessorFn(row) {
                return dateUtils.toMMYYYY(row.srmTopic?.fromDate);
            }
        },
        {
            header: "Đến tháng/năm",
            accessorKey: "srmTopic.toDate",
            accessorFn(row) {
                return dateUtils.toMMYYYY(row.srmTopic?.toDate);
            }
        },
        {
            header: "Kết luận của hội đồng",
            accessorKey: "srmConclusion.name",
            accessorFn(row) {

                return <Badge
                    w="100%"
                    variant="light"
                    color={row.srmConclusion?.color || "gray"}
                    radius="sm"
                >
                    {row.srmConclusion?.name}
                </Badge>
            },
        },
        { header: "Kiến nghị", accessorKey: "recommendation", size: 300 },
    ], []);

    const exportConfig = {
        fields: [
            {
                fieldName: 'code',
                header: 'Mã đăng ký',
                formatFunction: (row: SRMEvaluationTopic, object: SRMEvaluationTopic) => {
                    return object.code
                }
            },
            {
                fieldName: 'srmTopic.registerName',
                header: 'Tên đề tài',
                formatFunction: (row: SRMEvaluationTopic, object: SRMEvaluationTopic) => {
                    return object.srmTopic?.registerName
                }
            },
            {
                fieldName: 'srmTopic.srmArea.name', header: 'Lĩnh vực',
                formatFunction: (row: SRMEvaluationTopic, object: SRMEvaluationTopic) => {
                    return object.srmTopic?.srmArea?.name
                }
            },
            {
                fieldName: 'srmTopic.user.fullName', header: 'Chủ nhiệm',
                formatFunction: (row: SRMEvaluationTopic, object: SRMEvaluationTopic) => {
                    return object.srmTopic?.srmTopicMembers?.find((item) => item.srmTitle?.isLeader)?.user?.fullName
                }
            },
            {
                fieldName: 'srmTopic.duration',
                header: 'Thời gian thực hiện',
                formatFunction: (row: SRMEvaluationTopic, object: SRMEvaluationTopic) => {
                    if (!object.srmTopic?.duration) return "";
                    return object.srmTopic?.duration + " tháng";
                }
            },
            {
                fieldName: 'srmTopic.fromDate',
                header: 'Từ tháng/năm',
                formatFunction: (row: SRMEvaluationTopic, object: SRMEvaluationTopic) => {
                    return dateUtils.toMMYYYY(object.srmTopic?.fromDate)
                }
            },
            {
                fieldName: 'srmTopic.toDate',
                header: 'Đến tháng/năm',
                formatFunction: (row: SRMEvaluationTopic, object: SRMEvaluationTopic) => {
                    return dateUtils.toMMYYYY(object.srmTopic?.toDate)
                }
            },
            {
                fieldName: 'srmConclusion.name',
                header: 'Đánh giá của hội đồng',
                formatFunction: (row: SRMEvaluationTopic, object: SRMEvaluationTopic) => {
                    return object.srmConclusion?.name
                }

            },
            {
                fieldName: 'recommendation',
                header: 'Kiến nghị',
                formatFunction: (row: SRMEvaluationTopic, object: SRMEvaluationTopic) => {
                    return object.recommendation
                }
            },
        ]
    }

    const handleAddEvaluationTopic = (listAddEvaluationTopic: SRMTopic[]) => {
        const arrayEvaluationTopicExistedInList: string[] = [];
        const arrayEvaluationTopicAddSuccess: string[] = [];

        listAddEvaluationTopic.map((item) => {
            const key = keyValueOf(item.id)

            if (evaluationTopicsData.has(key)) {
                // If the register already exists on the board.
                arrayEvaluationTopicExistedInList.push(item.name || "");

            } else {
                const evaluationTopic = {
                    code: item.code,
                    srmTopic: item,
                    srmEvaluationCommitteeId: srmEvaluationCommitteeId,
                    srmTopicId: item.id,
                    recommendation: item.srmEvaluationTopic?.recommendation,
                    srmConclusion: item.srmEvaluationTopic?.srmConclusion,
                    isEnabled: true
                } as SRMEvaluationTopic;

                // If the register does not exist on the board
                evaluationTopicsData.set(key, evaluationTopic);
                arrayEvaluationTopicAddSuccess.push(item.name || "");
            }
        })

        // Create success message
        const messageSuccess =
            arrayEvaluationTopicAddSuccess.length > 0 ? (
                <>
                    Thêm đăng kí tuyển chọn{" "}
                    {formatListMessage(arrayEvaluationTopicAddSuccess, "#1971c2")} vào hội đồng thành công
                </>
            ) : undefined;

        // Create error messsage
        const messageError = arrayEvaluationTopicExistedInList.length > 0
            ? <>
                Đăng kí tuyển chọn{" "}
                <Text fw={700} c="#c21919c2" span>
                    {arrayEvaluationTopicExistedInList.join(", ")}
                </Text>{" "}
                đã có trong hội đồng
            </>
            : undefined;

        reRender();
        hasChange.current = true;
        return { messageSuccess, messageError };
    }

    const handleDeleteEvaluationTopic = (
        key: string,
        id?: number
    ) => {
        // If don't have an id => delete it locally.
        if (!id) {
            evaluationTopicsData?.remove(key);
            return;
        }

        // If has id existing, put it through the disable array so that 
        // when saving it will be sent to the server.

        // If the menuData is faulty (duplicate register)
        const duplicatedEvaluationTopic = evaluationTopicsData.get(`dupKey${key}${id}`);
        if (duplicatedEvaluationTopic) {
            duplicatedEvaluationTopic.isEnabled = false;
            evaluationTopicsDisable?.current.push(duplicatedEvaluationTopic)
            evaluationTopicsData.remove(`dupKey${key}${id}`);
            return;
        }

        // If not duplicated
        const evalucationTopic = evaluationTopicsData.get(key);
        if (evalucationTopic) {
            evalucationTopic.isEnabled = false;
            evaluationTopicsDisable?.current.push(evalucationTopic);
            evaluationTopicsData.remove(key);
        }
    }

    const handleDeleteListEvaluationTopic = (listTopic: SRMEvaluationTopic[]) => {
        listTopic.map((item) => {
            const key = keyValueOf(item.srmTopicId);
            handleDeleteEvaluationTopic(key, item.id);
        })
        reRender();
        hasChange.current = true;
    }

    return (
        <div style={{ paddingTop: "30px" }}>
            <CustomDataTable
                initialState={{ sorting: [{ id: "code", desc: false }] }}
                columns={columns}
                data={evaluationTopicsData.values() || []}
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
                            <TopicCreateModal
                                handleAddEvaluationTopic={handleAddEvaluationTopic}
                                evaluationTopicsData={evaluationTopicsData}
                            />
                            <AQButtonExportData
                                objectName="Danh sách đăng ký tuyển chọn"
                                data={selectedRows.length > 0 ? selectedRows : evaluationTopicsData.values() || []}
                                exportConfig={exportConfig}
                            />
                            <DeleteListOnClientButton
                                values={selectedRows}
                                handleDeleteList={handleDeleteListEvaluationTopic}
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
                                handleDeleteEvaluationTopic(keyValueOf(row.original.srmTopicId), row.original.id);
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

