"use client";

import DeleteListOnClientButton from "@/features/reviewCommitteeSetup/ComponentShared/DeleteListOnClientButton";
import DeleteOnClientButton from "@/features/reviewCommitteeSetup/ComponentShared/DeleteOnClientButton";
import { SRMConclusion } from "@/shared/interfaces/SRMConclusion";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { Checkbox } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { Dispatch, MutableRefObject, SetStateAction, useMemo } from "react";
import DisplayConclusionStatus from "../DisplayConclusionStatus";
import ConclusionCreateOrUpdateButton from "./ConclusionCreateOrUpdateButton";
import ConclusionImportButton from "./ConclusionImportButton";

interface Props {
    listConclusion: SRMConclusion[];
    setConclusionList: Dispatch<SetStateAction<SRMConclusion[]>>
    listConclusionToDelete?: MutableRefObject<SRMConclusion[]>;
    hasChange: MutableRefObject<boolean>;
    conclusionSetCode?: string;
    conclusionSetId?: number;
}

export default function ConclusionTable({ listConclusion, hasChange, listConclusionToDelete, conclusionSetCode, conclusionSetId, setConclusionList }: Props) {

    // Xóa 1 kết luận
    const handleDeleteConclusion = (item: SRMConclusion, id?: number) => {
        // nếu chưa có id thì xóa nó luôn
        if (!id) {
            setConclusionList((prev) => prev.filter((i) => i !== item));
            return;
        };
        // nếu có id thì đưa nó qua mảng disable để khi lưu gửi lên server
        setConclusionList((prev) => prev.filter((i) => i !== item));
        item.isEnabled = false;
        listConclusionToDelete?.current.push(item);
    }

    // Xóa nhiều kết luận
    const handleDeleteListConclusion = (listConclusion: SRMConclusion[]) => {
        setConclusionList((prev) => prev.filter((i) => !listConclusion.includes(i)));
        listConclusion.map((item) => {
            item.isEnabled = false;
            item.id && listConclusionToDelete?.current.push(item);
        })
        hasChange.current = true;
    }

    // Thêm kết luận
    const handleCreateConclusion = (newConclusion: SRMConclusion) => {
        if (listConclusion.some((item) => item.code === newConclusion.code)) {
            return false;
        }
        newConclusion.isEnabled = true;
        setConclusionList(prev => [...prev, newConclusion]);
        hasChange.current = true;
        return true;
    }

    // Thêm kết luận
    const handleCreateListConclusion = (newConclusions: SRMConclusion[]) => {
        setConclusionList(prev => [...prev, ...newConclusions]);
        hasChange.current = true;
        return true;
    }

    // Sửa 1 kết luận
    const handleUpdateConclusion = (conclusion: SRMConclusion, updateConclusion: SRMConclusion) => {
        conclusion.name = updateConclusion.name;
        conclusion.color = updateConclusion.color;
        conclusion.isPass = updateConclusion.isPass;
        conclusion.note = updateConclusion.note;
        setConclusionList(prev => [...prev]);
        hasChange.current = true;
    }

    const columns = useMemo<MRT_ColumnDef<SRMConclusion>[]>(() => [
        { accessorKey: 'code', header: 'Mã kết luận' },
        { accessorKey: 'name', header: 'Tên kết luận' },
        { accessorKey: 'note', header: 'Ghi chú', size: 350 },
        {
            accessorKey: 'color',
            header: 'Màu sắc hiển thị',
            Cell: ({ row }) => (
                <DisplayConclusionStatus
                    title={`${row.original.name} ${row.original.color ? `(Màu ${row.original.color}` : "(Chưa chọn màu"})`}
                    color={row.original.color}
                />
            ),
            size: 300
        },
        {
            accessorKey: 'isPass',
            header: 'Đạt',
            Cell: ({ row }) => (
                <Checkbox checked={row.original.isPass === true} readOnly />
            ),
            size: 50
        },
    ], []);

    const exportConfig = {
        fields: [
            { fieldName: 'code', header: 'Mã kết luận' },
            { fieldName: 'name', header: 'Tên kết luận' },
            { fieldName: 'note', header: 'Ghi chú' },
            {
                fieldName: 'color',
                header: 'Màu sắc hiển thị',
            },
            {
                fieldName: 'isPass',
                header: 'Đạt',
            },
        ]
    }

    return (
        <CustomDataTable
            enableRowSelection
            columns={columns}
            data={listConclusion}
            getRowId={(row) => row.code}
            renderTopToolbarCustomActions={({ table }) => {
                const dataSelected = table.getSelectedRowModel().rows.map(row => row.original);
                return (
                    <>
                        <ConclusionCreateOrUpdateButton
                            handleCreateOrUpdate={handleCreateConclusion}
                        />
                        <ConclusionImportButton
                            handleCreateListConclusion={handleCreateListConclusion}
                            srmConclusionSetId={conclusionSetId}
                            listConclusionCurrent={listConclusion}
                        />
                        <AQButtonExportData
                            objectName={`Danh_sach_lua_chon_bo_ket_luan_${conclusionSetCode}`}
                            data={dataSelected?.length > 0 ? dataSelected : listConclusion || []}
                            exportConfig={exportConfig}
                        />
                        <DeleteListOnClientButton
                            values={dataSelected}
                            handleDeleteList={handleDeleteListConclusion}
                            handlResetSelection={table.resetRowSelection}
                        />
                    </>
                );
            }}
            renderRowActions={({ row, table }) => {
                return (
                    <CustomCenterFull>
                        <ConclusionCreateOrUpdateButton
                            conclusion={row.original}
                            handleCreateOrUpdate={handleUpdateConclusion}
                        />
                        <DeleteOnClientButton
                            contextData={row.original.code || ""}
                            handleDelete={() => {
                                handleDeleteConclusion(row.original, row.original.id)
                                hasChange.current = true;
                            }}
                            handlResetSelection={table.resetRowSelection}
                        />
                    </CustomCenterFull>
                );
            }}
        />
    );
}

