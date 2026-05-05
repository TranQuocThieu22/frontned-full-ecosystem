"use client";

import { journalService } from "@/shared/APIs/journalService";
import { publicationTypeService } from "@/shared/APIs/publicationTypeService";
import { EnumJournalType, EnumLabelJournalType } from "@/shared/consts/enum/EnumJournalType";
import { SRMJournal } from "@/shared/interfaces/SRMJournal";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { ModalImportId, MyModalImport } from "@aq-fe/core-ui/shared/components/overlays/MyModalStackImport/MyModalImport";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { useModalsStack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ExcelJS from "exceljs";
import { useState } from "react";
import { ErrorModalImportMessage } from "../reviewCommitteeSetup/ComponentShared/ErrorModalImportMessage";
import { checkDataImportBeforeSendApi, convertErrorsToMessages } from "../reviewCommitteeSetup/ComponentShared/ReviewCommitteeFunction";

export default function JournalImportButton() {
    const [opened, setOpened] = useState(false);
    const [messages, seMessages] = useState<string[]>([]);
    const stack = useModalsStack<ModalImportId>([]);
    const queryClient = useQueryClient();

    const publicationTypeQuery = useCustomReactQuery({
        queryKey: ["publication_type_list"],
        axiosFn: () => publicationTypeService.getAllIsActive(),
        options: {
            enabled: false
        }
    });

    const importMutation = useMutation({
        mutationFn: (body: SRMJournal[]) => journalService.createList(body),
        onSuccess: (response, body) => {
            if (response.data.isSuccess === 0) {
                const message = convertErrorsToMessages(response.data.data as any, body);
                seMessages(message);
                setOpened(true);
            } else {
                queryClient.invalidateQueries({ queryKey: ['journal_list'] });
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
                message: error.message,
                title: "Đã có lỗi xảy ra!"
            })
        }
    });

    const handleExport = async () => {
        const workbook = new ExcelJS.Workbook();

        excelUtils.addSheet<SRMJournal>({
            workbook: workbook,
            sheetName: "Danh sách Tạp chí, Hội thảo, NXB",
            data: [],
            config: config,
        });

        excelUtils.addSheet<IJournalTypeConfig>({
            workbook: workbook,
            sheetName: "Danh sách loại",
            data: converterUtils.mapEnumToSelectData(EnumJournalType, EnumLabelJournalType),
            config: journalTypeValueConfig,
        });

        excelUtils.addSheet<IPubicationTypeConfig>({
            workbook: workbook,
            sheetName: "Danh sách loại công bố",
            data: publicationTypeQuery.data?.map(item => ({
                code: item.code,
                name: item.name
            })) || [],
            config: pubicationTypeValueConfig,
        });
        excelUtils.download({ name: "Mẫu import Tạp chí, Hội thảo, NXB", workbook });
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
                    const { finalValues, resultError } = checkDataImportBeforeSendApi(values, "code", "Mã danh mục",
                        item => ({
                            code: String(item.code),
                            name: String(item.name),
                            note: String(item.note),
                            isbn: String(item.isbn),
                            type: item.type ? Number(item.type) : undefined,
                            srmPublicationTypeId: publicationTypeQuery.data?.find(i => i.code === item.pulicationTypeCode)?.id
                        }),
                        ["code", "name", "type", "pulicationTypeCode"]
                    );
                    if (resultError.length !== 0) {
                        seMessages(resultError);
                        setOpened(true);
                        return;
                    }
                    importMutation.mutate(finalValues);
                }}
            />
            <CustomButton
                actionType="import"
                onClick={async () => {
                    await publicationTypeQuery.refetch();
                    stack.open("FileImportConfig")
                }}
            />
            <ErrorModalImportMessage
                opened={opened}
                onClose={() => setOpened(false)}
                messages={messages}
            />
        </>
    );
}


const config: IExcelColumnConfig<SRMJournal>[] = [
    {
        fieldKey: "code",
        fieldName: "Mã danh mục",
        isRequired: true,
    },
    {
        fieldKey: "name",
        fieldName: "Tên",
        isRequired: true,
    },
    {
        fieldKey: "type",
        fieldName: "Loại",
        isRequired: true,
    },
    {
        fieldKey: "pulicationTypeCode",
        fieldName: "Mã loại công bố",
        isRequired: true,
    },
    {
        fieldKey: "isbn",
        fieldName: "Chỉ số ISBN/ ISSN",
        isRequired: false,
    },
    {
        fieldKey: "note",
        fieldName: "Ghi chú",
        isRequired: false,
    },
];

interface IPubicationTypeConfig {
    code?: string,
    name?: string
}

const pubicationTypeValueConfig: IExcelColumnConfig<IPubicationTypeConfig>[] = [
    {
        fieldKey: "code",
        fieldName: "Mã loại công bố",
    },
    {
        fieldKey: "name",
        fieldName: "Tên loại công bố",
    },
];


interface IJournalTypeConfig {
    value?: string,
    label?: string
}

const journalTypeValueConfig: IExcelColumnConfig<IJournalTypeConfig>[] = [
    {
        fieldKey: "value",
        fieldName: "Mã",
    },
    {
        fieldKey: "label",
        fieldName: "Tên loại",
    },
];

