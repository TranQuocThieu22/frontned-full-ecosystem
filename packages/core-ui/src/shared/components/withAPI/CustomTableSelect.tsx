import { CustomActionIcon } from "@aq-fe/core-ui/shared/components/button/CustomActionIcon/CustomActionIcon";
import { CustomColumnDef, CustomDataTable, CustomDataTableProps } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { SafeOmitType } from "@aq-fe/core-ui/shared/types/safeOmitType";
import { Badge, Group } from "@mantine/core";
import { MRT_RowData } from "mantine-react-table";
import CustomButtonSelectTable, { CustomButtonSelectTableProps } from "./CustomButtonSelectTable";

interface CustomTableSelectProps<TData extends MRT_RowData & BaseEntity, TEntity extends MRT_RowData & BaseEntity> extends SafeOmitType<CustomDataTableProps<TData>, "data"> {
    values: TData[]
    onChange: (values: TData[]) => void

    getChildrenValue: (entity: TData) => TEntity
    createRelationValue: (data: TEntity) => TData

    customButtonSelectTableProps: CustomButtonSelectTableProps<TEntity>
    readOnly?: boolean
}
export default function CustomTableSelect<
    TData extends MRT_RowData & BaseEntity,
    TEntity extends MRT_RowData & BaseEntity
>({
    values,
    onChange,
    getChildrenValue,
    createRelationValue,
    customButtonSelectTableProps,
    readOnly,
    ...rest
}: CustomTableSelectProps<TData, TEntity>) {
    const handleDelete = (rowData: TData) => {
        onChange(
            values.flatMap(item => {
                const isSame =
                    item.tempId && rowData.tempId
                        ? item.tempId === rowData.tempId
                        : item.id === rowData.id

                if (!isSame) return [item]

                // TỰ TẠO → XOÁ HẲN
                if (item.tempStatus === "created") {
                    return []
                }
                // CÓ SẴN → ĐÁNH DẤU DELETED
                return [
                    {
                        ...item,
                        tempStatus: "deleted",
                        isEnabled: false,
                    },
                ]
            })
        )
    }

    const columns: CustomColumnDef<TData>[] = [
        ...rest.columns,
        {
            header: "Trạng thái",
            accessorKey: "tempStatus",
            size: 100,
            accessorFn: (row) => {
                if (row.tempStatus == "created") {
                    return <Badge fullWidth color="blue">Thêm mới</Badge>
                }
                if (row.tempStatus == "deleted") {
                    return <Badge fullWidth color="red">Xóa</Badge>
                }
                if (row.tempStatus == "updated") {
                    return <Badge fullWidth color="yellow">Cập nhật</Badge>
                }
            }
        }
    ]
    return (
        <CustomDataTable<TData>
            enableRowActions={readOnly ? false : true}
            data={values}
            {...rest}
            columns={columns}
            renderRowActions={(props) => {
                return (
                    <CustomCenterFull>
                        {rest.renderRowActions?.(props)}
                        <CustomActionIcon
                            hidden={readOnly}
                            actionType="tempDelete"
                            onClick={() => {
                                handleDelete(props.row.original)
                            }}
                        />
                    </CustomCenterFull>
                )
            }}
            renderTopToolbarCustomActions={(props) => {
                return (
                    <Group>
                        {rest.renderTopToolbarCustomActions?.(props)}
                        <CustomButtonSelectTable
                            {...customButtonSelectTableProps}
                            buttonProps={{
                                type: "button",
                                hidden: readOnly
                            }}
                            values={values.map(getChildrenValue)}
                            onChange={(selected) => {
                                const existingChildrenIds = new Set(
                                    values.map(v => getChildrenValue(v).id)
                                )
                                const newItems = selected
                                    .filter(entity => !existingChildrenIds.has(entity.id))
                                    .map(entity => ({
                                        id: 0,
                                        tempStatus: "created",
                                        tempId: crypto.randomUUID(),
                                        ...createRelationValue(entity),
                                    })) as TData[]
                                onChange([...values, ...newItems])
                            }}

                        />
                    </Group>
                )
            }}
            pinningRightColumns={[...rest.pinningRightColumns ?? [], readOnly ? '' : 'tempStatus'] as any}
        />
    )
}