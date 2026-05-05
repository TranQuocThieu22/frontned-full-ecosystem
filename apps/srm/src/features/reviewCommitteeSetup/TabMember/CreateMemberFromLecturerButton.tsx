"use client";

import Shared_LecturerTable from "@/shared/features/Lecturer/Shared_LecturerTable";
import { SRMLecturer } from "@/shared/interfaces/SRMLecturer";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";

interface Props {
    handleCreateMember: Function;
    isDisableRow?: (originalRow: SRMLecturer) => boolean;
}

export default function CreateMemberFromLecturerButton({ handleCreateMember, isDisableRow }: Props) {
    const dics = useDisclosure();

    const handleConfirmSelect = (listUser: SRMLecturer[]) => {
        const { messageSuccess, messageError } = handleCreateMember(listUser);
        if (messageSuccess) {
            dics[1].close();
            notifications.show({
                autoClose: 10000,
                color: "green",
                title: "Thêm thành công",
                message: (messageSuccess),
            });
        }
        if (messageError) {
            dics[1].close();
            notifications.show({
                autoClose: 10000,
                color: "red",
                title: "Thêm thất bại",
                message: (messageError),
            });
        }
    }

    return (
        <CustomButtonModal
            disclosure={dics}
            modalProps={{
                title: "Danh sách viên chức",
                size: "80em"
            }}
            buttonProps={{
                actionType: "create"
            }}
        >
            <Shared_LecturerTable
                enableRowNumbers={false}
                enableRowSelection={(row) => {
                    return !(isDisableRow ? isDisableRow(row.original) : false);
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
