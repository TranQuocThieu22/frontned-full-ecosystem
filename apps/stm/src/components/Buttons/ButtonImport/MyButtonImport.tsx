'use client'
import { Button, Modal, useModalsStack } from "@mantine/core";
import { IconFileImport } from "@tabler/icons-react";
import { MRT_RowData } from "mantine-react-table";
import SelectFieldModal from "./SelectFieldModal";
import SelectFileModal, { SelectFileModalProps } from "./SelectFileModal";

interface MyButtonImportProps extends Omit<SelectFileModalProps, "stack"> {

}

export default function MyButtonImport<TData extends MRT_RowData>({ onExportStructure }: MyButtonImportProps) {
    const stack = useModalsStack(['select-file-page', 'select-field-page', 'implement-page']);
    return (
        <>
            <Button color="teal.8" onClick={() => stack.open('select-file-page')} leftSection={<IconFileImport />} title="Import" >Import</Button>
            <Modal.Stack>
                <SelectFileModal stack={stack} onExportStructure={onExportStructure} />
                <SelectFieldModal stack={stack} />
            </Modal.Stack>
        </>
    )
}
