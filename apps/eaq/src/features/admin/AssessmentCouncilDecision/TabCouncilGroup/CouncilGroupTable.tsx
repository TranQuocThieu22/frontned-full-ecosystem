"use client";

import { ICouncilGroup } from "@/shared/interfaces/assessmentCouncilDecision/ICouncilGroup";
import { MRT_ColumnDef } from "mantine-react-table";
import { RefObject, useMemo, useReducer } from "react";
import DeleteListOnClientButton from "../ComponentShared/DeleteListOnClientButton";
import DeleteOnClientButton from "../ComponentShared/DeleteOnClientButton";
import { IUseArrayRefController } from "../hooks/useArrayRef";
import CouncilGroupCreateButton from "./CouncilGroupCreateButton";
import CouncilGroupUpdateButton from "./CouncilGroupUpdateButton";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";

interface Props {
    councilGroupList: IUseArrayRefController<ICouncilGroup>;
    councilGroupMemberTableRef: RefObject<{ reRenderComponent: () => void } | null>;
    workingGroupDisable?: RefObject<ICouncilGroup[]>;
    hasChange: RefObject<boolean>;
    viewOnly?: boolean;
}

export default function CouncilGroupTable({ councilGroupList, councilGroupMemberTableRef, workingGroupDisable, hasChange, viewOnly }: Props) {

    // Hàm để chủ động re-render component
    const [, reRender] = useReducer(x => !x, true);

    // Xóa 1 nhóm công tác
    const handleDeleteCouncilGroup = (councilGroup: ICouncilGroup) => {
        // nếu chưa có id thì xóa nó luôn
        if (!councilGroup.id) {
            councilGroupList.removeItem(councilGroup);
            return;
        };
        // nếu có id thì đưa nó qua mảng disable để khi lưu gửi lên server
        const groupToDelete = councilGroupList.removeItem(councilGroup);
        groupToDelete && (groupToDelete.isEnabled = false, workingGroupDisable?.current.push(groupToDelete));
    }

    // Xóa nhiều nhóm công tác
    const handleDeleteListCouncilGroup = (listMember: ICouncilGroup[]) => {
        listMember.map((item) => {
            handleDeleteCouncilGroup(item);
        })
        reRender();
        hasChange.current = true;
        councilGroupMemberTableRef.current?.reRenderComponent();
    }

    // Thêm nhóm công tác
    const handleCreateCouncilGroup = (newWorkingGroup: ICouncilGroup) => {
        if (councilGroupList.hasItem(item => item.code === newWorkingGroup.code)) {
            return false;
        }
        councilGroupList.addItem(newWorkingGroup);
        reRender();
        hasChange.current = true;
        councilGroupMemberTableRef.current?.reRenderComponent();
        return true;
    }

    // Sửa 1 nhóm công tác
    const handleUpdateCouncilGroup = (oldCouncilGroup: ICouncilGroup, newCouncilGroup: ICouncilGroup) => {
        oldCouncilGroup.name = newCouncilGroup.name;
        reRender();
        hasChange.current = true;
        councilGroupMemberTableRef.current?.reRenderComponent();
    }

    const columns = useMemo<MRT_ColumnDef<ICouncilGroup>[]>(() => [
        { accessorKey: 'code', header: 'Mã nhóm' },
        { accessorKey: 'name', header: 'Tên nhóm' },
    ], []);


    return (
        <CustomDataTable
            enableRowSelection={!viewOnly}
            columns={columns}
            data={councilGroupList.values()}
            getRowId={(row) => `${row.code}${row.id}`}
            renderTopToolbarCustomActions={({ table }) => {
                if(viewOnly) return null;
                return (
                    <>
                        <CouncilGroupCreateButton
                            handleCreateWorkingGroup={handleCreateCouncilGroup}
                        />
                        <DeleteListOnClientButton
                            values={table.getSelectedRowModel().rows.map(row => row.original)}
                            handleDeleteList={handleDeleteListCouncilGroup}
                            handlResetSelection={table.resetRowSelection}
                        />
                    </>
                );
            }}
            renderRowActions={({ row, table }) => {
                if(viewOnly) return null;
                return (
                    <CustomCenterFull>
                        <CouncilGroupUpdateButton
                            values={row.original}
                            handleUpdateWorkingGroup={handleUpdateCouncilGroup}
                        />
                        <DeleteOnClientButton
                            code={row.original.code || ""}
                            handleDelete={() => {
                                handleDeleteCouncilGroup(row.original)
                                reRender();
                                hasChange.current = true;
                                councilGroupMemberTableRef.current?.reRenderComponent();
                            }}
                            handlResetSelection={table.resetRowSelection}
                        />
                    </CustomCenterFull>
                );
            }}
        />
    );
}
