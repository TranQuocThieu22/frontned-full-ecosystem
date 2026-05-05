"use client"
import { addressService } from "@/shared/APIs/addressService";
import { examService, ExamAddOrUpdateExamAddressItem } from "@/shared/APIs/examService";
import { MyButton } from "@/components/Buttons/Button/MyButton";
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Address } from "@/shared/interfaces/address";
import { ExamAddress } from "@/shared/interfaces/examAdress";
import { utils_mantineReactTable_getEditedRows } from "@/utils/mantineReactTable";
import { utils_notification_show } from "@/utils/notification";
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";
import { useDisclosure } from "@mantine/hooks";
import { useMyReactQuery } from "aq-fe-framework/hooks";
import { MRT_ColumnDef, MRT_RowSelectionState } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";

const EMPTY_EXAM_ADDRESS: ExamAddress[] = [];

export default function F_w9e9qi813x_AddRoom({ examAdressInit, examId }: { examAdressInit: ExamAddress[]; examId: number | null }) {
    const disc = useDisclosure();
    const getAllAdress_query = useMyReactQuery({
        queryKey: ["examOrganizationDepartment", "getAllAdress_query"],
        axiosFn: () => addressService.getAll({ cols: ["Branch", "RoomType"] }),
    });
    const mutation = useCustomReactMutation({
        axiosFn: (body: ExamAddOrUpdateExamAddressItem[]) =>
            examService.addOrUpdateExamAddress(body),
        mutationType: "update",
    });
    const [editedRow, setEditedRow] = useState<Record<string, ExamAddress>>()
    const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

    const handleSubmit = () => {
        if (!examId || !editedRow) return;
        mutation.mutate(Object.values(editedRow).map(item => ({
            id: item.id!,
            isEnabled: item.isEnabled,
            address: null,
            code: "string",
            name: "string",
            concurrencyStamp: item.concurrencyStamp,
            addressId: item.addressId,
            examId: examId
        })), {
            onSuccess: () => {
                utils_notification_show({ crudType: "update" })
                disc[1].close()
            }
        })
    }

    const examAdressList = Array.isArray(examAdressInit) ? examAdressInit : EMPTY_EXAM_ADDRESS;

    useEffect(() => {
        if (examAdressList.length === 0) return;
        const defaultSelection: MRT_RowSelectionState = {};
        examAdressList.forEach((row) => { defaultSelection[row.addressId!.toString()] = true });
        setRowSelection(defaultSelection);
    }, [examAdressList]);

    useEffect(() => {
        setEditedRow(utils_mantineReactTable_getEditedRows<ExamAddress>(examAdressList, rowSelection, "addressId"));
    }, [rowSelection, examAdressList]);

    const columns = useMemo<MRT_ColumnDef<Address>[]>(() => [
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
