'use client'
import { service_timeType } from "@/api/services/service_timeType";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import { MyDataTable, MyDataTableInternalProps, MyFieldset } from "aq-fe-framework/components";
import { useMyReactQuery } from "aq-fe-framework/hooks";
import { MRT_ColumnDef, MRT_Row } from "mantine-react-table";
import { useMemo, useState } from "react";
import useS_timeType from "../useS_timeType";
import { ITimeType } from "@/interfaces/timeType";
import { colorsObject } from "@aq-fe/core-ui/shared/consts/object/colorsObject";


export default function F_timeType_ReadTimeTypes({ ...rest }: MyDataTableInternalProps<ITimeType>) {
    const store = useS_timeType()
    const selectedRowState = useState<number[]>([]);

    const timeTypeQuery = useMyReactQuery({
        queryKey: ["timeTypeQuery"],
        axiosFn: () => service_timeType.getAll()
    })

    const handleRowClick = (row: MRT_Row<ITimeType>) => {
        if (selectedRowState[0].includes(row.original.id!)) return
        store.setProperty("timeTypeId", row.original.id)
        selectedRowState[1]((prevSelectedRow) =>
            prevSelectedRow.includes(row.original.id!) ? [] : [row.original.id!]
        );
    };

    const columns = useMemo<MRT_ColumnDef<ITimeType>[]>(() => [
        {
            header: "Mã thời gian",
            accessorKey: "code",
            size: 120
        },
        {
            header: "Tên thời gian",
            accessorKey: "name",
            size: 120,
        },
        {
            header: "Sáng",
            accessorKey: "classPeriodMorning",
            size: 30
        },
        {
            header: "Chiều",
            accessorKey: "classPeriodAfternoon",
            size: 30
        },
        {
            header: "Tối",
            accessorKey: "classPeriodEvening",
            size: 30
        },
        {
            header: "Người cập nhật",
            accessorKey: "modifiedFullName"
        },
        {
            header: "Ngày cập nhật",
            accessorKey: "modifiedWhen",
            accessorFn(originalRow) {
                return utils_date_dateToDDMMYYYString(new Date(originalRow.modifiedWhen!));
            },
        }
    ], []);

    return (
        <MyFieldset title="Danh sách loại thời gian">
            <MyDataTable
                {...rest}
                columns={columns}
                data={timeTypeQuery.data || []}
                mantineTableBodyRowProps={({ row }) => ({
                    onClick: () => {
                        handleRowClick(row)
                    },
                    style: {
                        cursor: 'pointer',
                        backgroundColor: store.state.timeTypeId == row.original.id ? colorsObject.mantineBackgroundTealLight : "",
                    },
                })}
                isLoading={timeTypeQuery.isLoading}
                isError={timeTypeQuery.isError}
            />
        </MyFieldset>
    );
}

