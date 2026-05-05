"use client";

import { proposalApprovalService } from "@/shared/APIs/proposalApprovalService";
import { SRMProposalApproval } from "@/shared/interfaces/SRMProposalApproval";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { ModalImportId, MyModalImport } from "@aq-fe/core-ui/shared/components/overlays/MyModalStackImport/MyModalImport";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { useModalsStack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ExcelJS from "exceljs";
import { useState } from "react";
import { ErrorModalImportMessage } from "../reviewCommitteeSetup/ComponentShared/ErrorModalImportMessage";
import { checkDataImportBeforeSendApi, convertErrorsToMessages } from "../reviewCommitteeSetup/ComponentShared/ReviewCommitteeFunction";


export default function ReviewStudentProposalImportButton({ acdemicYearId }: { acdemicYearId?: number }) {
    const [opened, setOpened] = useState(false);
    const [messages, seMessages] = useState<string[]>([]);
    const queryClient = useQueryClient();

    const importMutation = useMutation({
        mutationFn: (body: SRMProposalApproval[]) => proposalApprovalService.createList(body),
        onSuccess: (response, body) => {
            if (response.data.isSuccess === 0) {
                const message = convertErrorsToMessages(response.data.data as any, body)
                seMessages(message);
                setOpened(true);
            } else {
                queryClient.invalidateQueries({ queryKey: ['student_proposal_list'] });
                stack.closeAll();
                notifications.show({
                    color: "green",
                    message: "Import dữ liệu thành công"
                })
            }
        },
        onError: () => {
            notifications.show({
                color: "red",
                message: "Đã có lỗi xảy ra!"
            })
        }
    });


    const stack = useModalsStack<ModalImportId>([]);
    const handleExport = async () => {
        const workbook = new ExcelJS.Workbook();

        excelUtils.addSheet<SRMProposalApproval>({
            workbook: workbook,
            sheetName: "Danh sách quyết định phê duyệt danh mục đề xuất",
            data: [],
            config: config,
        });

        excelUtils.download({ name: "Mẫu import quyết định phê duyệt danh mục đề xuất", workbook });
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
                onExecute={(values: SRMProposalApproval[]) => {
                    const { finalValues, resultError } = checkDataImportBeforeSendApi(
                        values,
                        "decisionCode",
                        "Số quyết định",
                        item => ({
                            ...item,
                            isEnabled: true,
                            academicYearId: acdemicYearId
                        }),
                        ["decisionCode", "decisionName"]
                    );
                    if (resultError.length !== 0) {
                        seMessages(resultError);
                        setOpened(true);
                        return;
                    }
                    importMutation.mutate(finalValues);
                }}
            />
            <CustomButton actionType="import" onClick={() => stack.open("FileImportConfig")} />
            <ErrorModalImportMessage
                opened={opened}
                onClose={() => setOpened(false)}
                messages={messages}
            />
        </>
    );
}



const config: IExcelColumnConfig<SRMProposalApproval>[] = [
    {
        fieldKey: "decisionCode",
        fieldName: "Số quyết định",
        isRequired: true,
    },
    {
        fieldKey: "decisionName",
        fieldName: "Tên quyết định",
        isRequired: true,
    },
    {
        fieldKey: "decisionDate",
        fieldName: "Ngày quyết định (dd/mm/yyyy)",
        isRequired: false,
    },
    {
        fieldKey: 'signer',
        fieldName: 'Người ký',
        isRequired: false,
    },
    {
        fieldKey: "note",
        fieldName: "Ghi chú",
        isRequired: false,
    },
];