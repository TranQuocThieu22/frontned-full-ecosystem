"use client";

import { ICouncilMemberCreate } from "@/shared/interfaces/assessmentCouncilDecision/ICouncilMemberCreate";
import { Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { formatListMessage } from "../ComponentShared/CouncilFunction";
import { IUseArrayRefController } from "../hooks/useArrayRef";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";

interface Props {
    handleCreateSecretaryMember: Function;
    councilMembers: IUseArrayRefController<ICouncilMemberCreate>;
    secretaryMembers: IUseArrayRefController<ICouncilMemberCreate>;
}

export default function SecretaryMemberCreateButton({ handleCreateSecretaryMember, councilMembers, secretaryMembers }: Props) {
    const dics = useDisclosure();

    //column table nhan vien co trong hoi dong
    const columns = useMemo<MRT_ColumnDef<ICouncilMemberCreate>[]>(() => [
        { accessorKey: 'user.code', header: 'Mã viên chức' },
        { accessorKey: 'name', header: 'Họ và Tên' },
        { accessorKey: 'academicTitle', header: 'Học hàm/Học vị' },
        { accessorKey: 'position', header: 'Chức danh' },
        { accessorKey: 'user.workingUnitName', header: 'Đơn vị công tác' },
    ], []);

    // Xu ly nut chon
    const handleConfirmSelect = (listCouncilMember: ICouncilMemberCreate[]) => {
        const { arrayUserExistingInListCouncil, arrayCouncilMemberAddSuccess } = handleCreateSecretaryMember(listCouncilMember);
        if (arrayCouncilMemberAddSuccess?.length > 0) {
            dics[1].close();
            notifications.show({
                autoClose: 10000,
                color: "green",
                title: "Thêm thành công",
                message: (
                    <>
                        Thêm viên chức{" "}
                        {formatListMessage(arrayCouncilMemberAddSuccess, "#1971c2")} vào ban thư ký thành công
                    </>
                )
            });
        }
        if (arrayUserExistingInListCouncil?.length > 0) {
            dics[1].close();
            notifications.show({
                autoClose: 10000,
                color: "red",
                title: "Thêm thất bại",
                message: (<>
                    Viên chức{" "}
                    <Text fw={700} c="#c21919c2" span>
                        {arrayUserExistingInListCouncil.join(", ")}
                    </Text>{" "}
                    đã có trong ban thư ký
                </>),
            });
        }
    }

    return (
        <CustomButtonModal
            disclosure={dics}
            modalProps={{
                title: "Danh sách viên chức",
                size: "100%"
            }}
            buttonProps={{
                actionType: "create"
            }}
        >
            <CustomDataTable
                enableRowNumbers={false}
                columns={columns}
                data={councilMembers.values()}
                getRowId={(row) => `${row.userId}${row.id}`}
                enableRowSelection={(row) => {
                    return !secretaryMembers?.hasItem((item) => item.userId === row.original.userId);
                }}
                renderTopToolbarCustomActions={({ table }) => {
                    const selectedRows = table.getSelectedRowModel().flatRows.map((item) => item.original) || [];
                    return (
                        <>
                            <CustomButton
                                actionType="create"
                                onClick={() => {
                                    handleConfirmSelect(selectedRows);
                                    table.resetRowSelection();
                                }}
                                disabled={selectedRows.length === 0}
                            >
                                Chọn
                            </CustomButton>
                        </>
                    );
                }}
            />
        </CustomButtonModal>
    );
}

