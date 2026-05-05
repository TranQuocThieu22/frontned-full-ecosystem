"use client"
import { service_address } from "@/api/services/serivce_address";
import { MyButton } from "@/components/Buttons/Button/MyButton";
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import useM_Exam_AddOrUpdateExamAddress from "@/hooks/mutation-hooks/Exam/useM_Exam_AddOrUpdateExamAddress";
import { utils_mantineReactTable_getEditedRows } from "@/utils/mantineReactTable";
import { utils_notification_show } from "@/utils/notification";
import { useDisclosure } from "@mantine/hooks";
import { useMyReactQuery } from "aq-fe-framework/hooks";
import { MRT_ColumnDef, MRT_RowSelectionState } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import useS_w9e9qi813x from "./useS_w9e9qi813x";
import { IExamAddress } from "@/interfaces/examAdress";
import { IAddress } from "@/interfaces/address";

export default function F_w9e9qi813x_AddRoom({ examAdressInit }: { examAdressInit: IExamAddress[] }) {
    const disc = useDisclosure()
    const store = useS_w9e9qi813x()
    const getAllAdress_query = useMyReactQuery({
        queryKey: ["examOrganizationDepartment", "getAllAdress_query"],
        axiosFn: () => service_address.getAll({ params: "?cols=branch,roomType" })
    })
    const mutation = useM_Exam_AddOrUpdateExamAddress()
    const [editedRow, setEditedRow] = useState<Record<string, IExamAddress>>()
    const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

    const handleSubmit = () => {
        mutation.mutate(Object.values(editedRow!).map(item => ({
            id: item.id!,
            isEnabled: item.isEnabled,
            address: null,
            code: "string",
            name: "string",
            concurrencyStamp: item.concurrencyStamp,
            addressId: item.addressId,
            examId: store.state.examId
        })), {
            onSuccess: () => {
                utils_notification_show({ crudType: "update" })
                disc[1].close()
            }
        })
    }

    useEffect(() => {
        if (!examAdressInit) return
        const defaultSelection: MRT_RowSelectionState = {};
        examAdressInit!.forEach((row) => { defaultSelection[row.addressId!.toString()] = true });
        setRowSelection(defaultSelection);
    }, []);

    useEffect(() => {
        setEditedRow(utils_mantineReactTable_getEditedRows<IExamAddress>(examAdressInit, rowSelection, "addressId"));
    }, [rowSelection]);

    const columns = useMemo<MRT_ColumnDef<IAddress>[]>(() => [
        {
            header: "Mã phòng",
            accessorKey: "code"
        },
        {
            header: "Tên phòng",
            accessorKey: "name"
        },
        {
            header: "Chi nhánh",
            accessorKey: "branch.name"
        },
        {
            header: "Dãy",
            accessorKey: "block"
        },
        {
            header: "Sức chứa học",
            accessorKey: "capacity"
        },
        {
            header: "Sức chứa thi",
            accessorKey: "testCapacity"
        },
        {
            header: "Tính chất phòng",
            accessorKey: "roomType.name"
        }
    ], [])
    if (getAllAdress_query.isLoading) return "Đang tải dữ liệu"
    if (getAllAdress_query.isError) return "Có lỗi xảy ra!"
    return (
        <MyButtonModal title="Danh mục phòng" modalSize={"80%"} label="Chọn" disclosure={disc} >
            <MyDataTable
                data={getAllAdress_query.data!}
                columns={columns}
                enableRowSelection
                getRowId={(row) => row.id?.toString()}
                state={{ rowSelection }}
                onRowSelectionChange={setRowSelection}
                renderTopToolbarCustomActions={() => {
                    return (
                        <>
                            <MyButton crudType="save" onClick={handleSubmit} />
                        </>
                    )
                }}
            />
        </MyButtonModal>
    )
}
