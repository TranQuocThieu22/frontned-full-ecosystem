import { COEProgram } from "@/interfaces/shared-interfaces/COEProgram";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { Account } from "@aq-fe/core-ui/shared/interfaces/Account";
import { useDisclosure } from '@mantine/hooks';
import { IconDotsVertical } from '@tabler/icons-react';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useCallback, useMemo } from 'react';

interface LecturerSelectionModalProps {
    userData: COEProgram[];
    selectedItemId?: number;
    pointRecordUserIdInForm?: number;
    isLoading?: boolean;
    isError?: boolean;
    onUserSelect: (selectedPersonel: Account) => void;
    onUserRemove: () => void;
}

export default function LecturerSelectionModal(
    {
        userData,
        selectedItemId,
        pointRecordUserIdInForm,
        isLoading,
        isError,
        onUserSelect,
        onUserRemove
    }: LecturerSelectionModalProps) {
    const modalDisc = useDisclosure();

    const userColumns = useMemo<MRT_ColumnDef<Account>[]>(
        () => [
            {
                header: "Mã tài khoản",
                accessorKey: "userName", size: 150
            },
            {
                header: "Họ tên",
                accessorKey: "fullName"
            },
            {
                header: "Đơn vị",
                accessorKey: "workingUnit.name",
                size: 300
            },
        ], []);

    const handleUserSelect = useCallback((row: any) => {
        onUserSelect(row.original);

        modalDisc[1].close();
    }, [selectedItemId, modalDisc, onUserSelect]);

    const handleUserRemove = () => {
        onUserRemove();

        modalDisc[1].close();
    };

    return (
        <CustomButtonModal
            disclosure={modalDisc}
            isActionIcon
            actionIconProps={{
                loading: isLoading,
                children: <IconDotsVertical />, size: "md", my: "2"
            }}
            modalProps={{
                size: '80%',
                title: 'Chọn nhân sự phụ trách'
            }}
        >
            <CustomDataTable
                isLoading={isLoading}
                isError={isError}
                columns={userColumns}
                data={userData}
                enableColumnFilters
                enableGlobalFilter
                enableSorting
                renderRowActions={({ row }) => {
                    const isUserSelected = row.original.id === selectedItemId;

                    return (
                        <CustomCenterFull>
                            {isUserSelected ? (
                                <CustomButton
                                    actionType="cancel"
                                    style={{ minWidth: 150 }}
                                    color="#f94459"
                                    onClick={() => handleUserRemove()}
                                >
                                    Hủy chọn
                                </CustomButton>
                            ) : (
                                <CustomButton
                                    actionType="select"
                                    style={{ minWidth: 150 }}
                                    onClick={() => handleUserSelect(row)}
                                />
                            )}
                        </CustomCenterFull>
                    );
                }}
            />
        </CustomButtonModal >
    );
}
