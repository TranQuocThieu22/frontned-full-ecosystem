"use client";
import FileFieldMappingModal, { FieldDefinition } from "@/core/overlays/MyModalStackImport/Usecase/FileFieldMappingModal";
import { default as FileImportConfigModal, default as Usecase_FileImportConfigModal } from "@/core/overlays/MyModalStackImport/Usecase/FileImportConfigModal";
import { Modal } from "@mantine/core";
import { ComponentProps, useState } from "react";
import { RowDetail } from "./Usecase/FileImportValidationModal";

export type ModalImportId =
    | "FileImportConfig"
    | "FileFieldMapping"
    | "FileImportValidation"
    | "FileImportValidationDetail"; // 👈 thêm ID mới

interface ModalStackReturnType<T extends string> {
    state: Record<T, boolean>;
    open: (id: T) => void;
    close: (id: T) => void;
    toggle: (id: T) => void;
    closeAll: () => void;
    register: (id: T) => {
        opened: boolean;
        onClose: () => void;
        stackId: T;
    };
}

interface MyModalImportProps {
    fieldDefinition: FieldDefinition[]
    stack: ModalStackReturnType<ModalImportId>
    onExecute: (values: any) => void
    isLoading?: boolean
    onExportStructure?: ComponentProps<typeof Usecase_FileImportConfigModal>["onExportStructure"]
}

export function MyModalImport({
    fieldDefinition = [],
    stack,
    onExecute,
    isLoading,
    onExportStructure
}: MyModalImportProps) {
    const value = useState<any[]>([]);
    const valueMapping = useState<any[]>([]);
    const [detailRows, setDetailRows] = useState<RowDetail[]>([]);
    return (
        <Modal.Stack>
            <FileImportConfigModal
                value={value[0]}
                onChange={(val) => {
                    value[1](val);
                }}
                onContinute={() => {
                    stack.open("FileFieldMapping")
                }}
                onExportStructure={() => {
                    onExportStructure?.()
                }}
                {...stack.register("FileImportConfig")}
            />
            <FileFieldMappingModal
                jsonData={value[0]}
                handleBack={() => {
                    stack.close("FileFieldMapping")
                }}
                fieldDefinitions={fieldDefinition}
                onContinute={(mappedData) => {
                    valueMapping[1](mappedData)
                    stack.open("FileImportValidation")
                    onExecute(mappedData)
                }}
                onCloseAll={() => {
                    stack.closeAll()
                }}
                isLoading={isLoading}
                {...stack.register("FileFieldMapping")}
            />
            {/* <Usecase_FileImportValidationModal
                data={value[0]}
                onExecute={() => {

                }}
                onBack={() => {
                    stack.close("FileImportValidation")
                }}
                onCloseAll={() => {
                    stack.closeAll()
                }}
                onOpenDetail={(rows) => {
                    setDetailRows(rows);            // 👈 gán rows
                    stack.open("FileImportValidationDetail"); // 👈 mở modal chi tiết
                }}
                {...stack.register("FileImportValidation")}
            />
            <Usecase_FileImportValidationDetailModal
                data={detailRows}
                {...stack.register("FileImportValidationDetail")}
            /> */}
        </Modal.Stack>
    );
}
