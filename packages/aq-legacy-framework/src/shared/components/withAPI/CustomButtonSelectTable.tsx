import { CustomButton } from '@aq-fe/aq-legacy-framework/shared/components/button/CustomButton/CustomButton'
import { CustomButtonModal, CustomButtonModalProps } from '@aq-fe/aq-legacy-framework/shared/components/button/CustomButtonModal/CustomButtonModal'
import { CustomDataTableAPI, CustomDataTableAPIProps } from '@aq-fe/aq-legacy-framework/shared/components/withAPI/CustomDataTableAPI'
import { BaseEntity } from '@aq-fe/aq-legacy-framework/shared/interfaces/BaseEntity'
import { SafeOmitType } from '@aq-fe/core-ui/shared/types/safeOmitType'
import { useDisclosure } from '@mantine/hooks'
import { MRT_RowData, MRT_RowSelectionState, MRT_TableInstance } from 'mantine-react-table'
import { useEffect, useState } from 'react'

export interface CustomButtonSelectTableProps<TData extends MRT_RowData & BaseEntity> extends SafeOmitType<CustomButtonModalProps, "disclosure"> {
    values?: TData[],
    onChange?: (values: TData[]) => void
    customDataTableAPIProps: CustomDataTableAPIProps<TData>
}

export default function CustomButtonSelectTable<TData extends MRT_RowData & BaseEntity>({
    values,
    onChange,
    customDataTableAPIProps,
    ...rest
}: CustomButtonSelectTableProps<TData>) {
    const disc = useDisclosure()
    const defaultValuesState = useState<TData[]>([])
    const rowSelectionState = useState<MRT_RowSelectionState>({})
    const handleSelect = (table: MRT_TableInstance<TData>) => {
        const selectedRows = table.getSelectedRowModel().rows.map(item => item.original)
        const existingIds = new Set(defaultValuesState[0]?.map(item => item.id))
        const newValues = selectedRows.filter(item => {
            if (existingIds.has(item.id)) return false
            return true
        }).map(item => ({
            ...item,
            isUpdatedValues: true
        }))
        onChange?.([...defaultValuesState[0], ...newValues])
        disc[1].close()
    }
    useEffect(() => {
        const result = values?.reduce<Record<string, boolean>>((accumulator, current) => {
            accumulator[current.id!] = true
            return accumulator
        }, {})
        rowSelectionState[1](result || {})
    }, [values])
    useEffect(() => {
        defaultValuesState[1](values || [])
    }, [])
    return (
        <CustomButtonModal
            disclosure={disc}
            {...rest}
            buttonProps={{
                actionType: "create",
                ...rest.buttonProps
            }}
            modalProps={{
                size: "80em",
                ...rest.modalProps
            }}
        >
            <CustomDataTableAPI<TData>
                enableRowSelection={row => {
                    if (values?.some(value => value.id === row.original.id)) return false
                    return true
                }}
                onRowSelectionChange={rowSelectionState[1]}
                {...customDataTableAPIProps}
                state={{
                    rowSelection: rowSelectionState[0],
                    ...customDataTableAPIProps.state
                }}
                renderTopToolbarCustomActions={({ table }) => (
                    <CustomButton
                        actionType='select'
                        onClick={() => {
                            handleSelect(table)
                        }}
                    />
                )}
            />
        </CustomButtonModal>
    )
}
