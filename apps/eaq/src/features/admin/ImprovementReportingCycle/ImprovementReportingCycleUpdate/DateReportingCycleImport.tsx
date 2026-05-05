"use client";

import { service_EAQAnalysis } from "@/shared/APIs/service_EAQAnalysis";
import { ITaskDetailReportRequestBody } from "@/shared/interfaces/task/ITaskDetailReportRequestBody";
import { useModalsStack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ExcelJS from "exceljs";
import { useState } from "react";
import { checkDataImport, convertErrorsImport } from "../../AssessmentCouncilDecision/ComponentShared/CouncilFunction";
import { ErrorModalImportMessage } from "../../AssessmentCouncilDecision/ComponentShared/ErrorModalImportMessage";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { ModalImportId, MyModalImport } from "@aq-fe/core-ui/shared/components/overlays/MyModalStackImport/MyModalImport";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";

interface Props {
    taskDetailId?: number
}

export default function DateReportingCycleImport({ taskDetailId }: Props) {
    const [modalErrorOpened, setModalErrorOpened] = useState(false);
    const [messages, setMessages] = useState<string[]>([]);
    const queryClient = useQueryClient();
    const stack = useModalsStack<ModalImportId>([]);

    const importMutation = useMutation({
        mutationFn: (body: ITaskDetailReportRequestBody[]) => service_EAQAnalysis.createListEAQTaskDetailReport(body),
        onSuccess: (response, body) => {
            if (response.data.isSuccess === 0) {
                const message = convertErrorsImport(response.data.data as any, body);
                setMessages(message);
                setModalErrorOpened(true);
            } else {
                queryClient.invalidateQueries({ queryKey: ['task_detail_report_list'] });
                queryClient.invalidateQueries({ queryKey: ['task_detail_analysis_report_cycle_list'] });
                stack.closeAll();
                notifications.show({
                    color: "green",
                    message: "Import dữ liệu thành công"
                })
            }
        },
        onError: (error) => {
            notifications.show({
                color: "red",
                title: "Đã có lỗi xảy ra!",
                message: error.message
            })
        }
    });

    const handleExport = () => {
        const workbook = new ExcelJS.Workbook();
        excelUtils.addSheet<ITaskDetailReportRequestBody>({
            workbook: workbook,
            sheetName: "Danh sách lần báo cáo",
            data: [],
            config: config,
        });

        excelUtils.download({ name: "Mẫu import lần báo cáo", workbook });
    };

    return (
        <>
            <MyModalImport
                fieldDefinition={config.map((item) => ({
                    key: item.fieldKey,
                    label: item.fieldName,
                    isRequired: item.isRequired
                }))}
                isLoading={importMutation.isPending}
                stack={stack}
                onExportStructure={handleExport}
                onExecute={(values: any[]) => {
                    const { finalValues, resultError } = checkDataImport({
                        values: values,
                        keyCheckDuplicate: "order",
                        labelCheckDuplicate: "Lần báo cáo",
                        requiredFields: ["order", "reportDate"],
                        transform: (item) => {
                            return {
                                ...item,
                                reportDate: item.reportDate?.trim(),
                                note: item.note?.trim(),
                                eaqTaskDetailId: taskDetailId
                            }
                        }
                    });
                    if (resultError.length !== 0) {
                        setMessages(resultError);
                        setModalErrorOpened(true);
                        return;
                    }
                    importMutation.mutate(finalValues);
                }}
            />
            <CustomButton
                actionType="import"
                onClick={async () => {
                    stack.open("FileImportConfig")
                }}
            />
            <ErrorModalImportMessage
                opened={modalErrorOpened}
                onClose={() => setModalErrorOpened(false)}
                messages={messages}
            />
        </>
    );
}

const config: IExcelColumnConfig<ITaskDetailReportRequestBody>[] = [
    {
        fieldKey: "order",
        fieldName: "Lần báo cáo",
        isRequired: true,
    },
    {
        fieldKey: "reportDate",
        fieldName: "Ngày báo cáo",
        isRequired: true,
    },
    {
        fieldKey: "note",
        fieldName: "Ghi chú",
        isRequired: false,
    }
];

