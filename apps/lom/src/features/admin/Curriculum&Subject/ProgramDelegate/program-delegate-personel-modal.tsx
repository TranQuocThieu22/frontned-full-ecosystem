import { service_account } from "@/api/services/service_account";
import { COEProgram } from "@/interfaces/shared-interfaces/COEProgram";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Account } from "@aq-fe/core-ui/shared/interfaces/Account";
import { useDisclosure } from '@mantine/hooks';
import { IconDotsVertical } from '@tabler/icons-react';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useCallback, useMemo } from 'react';

interface DelegatedLecturerModalProps {
    data: COEProgram;
    onSelect: (selectedPersonel: Account) => void;
    onRemove: () => void;
}

export default function DelegatedLecturerModal({ data, onSelect: onUserSelect, onRemove: onUserRemove }: DelegatedLecturerModalProps) {
    const modalDisc = useDisclosure();

    const lecturerQuery = useCustomReactQuery({
        queryKey: ['Lecturers'],
        axiosFn: () => service_account.getAllLecturer(),
        options: {
            enabled: modalDisc[0],
            staleTime: 5 * 60 * 1000, // Cache for 5 minutes
            refetchOnWindowFocus: false
        }
    });

    const userColumns = useMemo<MRT_ColumnDef<Account>[]>(
        () => [
            { header: "Mã tài khoản", accessorKey: "userName", size: 150 },
            { header: "Họ tên", accessorKey: "fullName" },
            { header: "Đơn vị", accessorKey: "workingUnit.name", size: 300 },
        ], []);

    const handleUserSelect = useCallback((row: any) => {
        onUserSelect(row.original);

        modalDisc[1].close();
    }, [data?.code, modalDisc, onUserSelect]);

    const handleUserRemove = () => {
        onUserRemove();

        modalDisc[1].close();
    };

    return (
        <CustomButtonModal
            disclosure={modalDisc}
            isActionIcon
            actionIconProps={{ children: <IconDotsVertical />, size: "md", my: "2" }}
            modalProps={{
                size: '80%',
                title: 'Chọn nhân sự phụ trách'
            }}
        >
            <CustomFieldset title="Danh sách người dùng">
                <CustomDataTable
                    isLoading={lecturerQuery.isLoading}
                    isError={lecturerQuery.isError}
                    columns={userColumns}
                    data={lecturerQuery.data ?? []}
                    enableColumnFilters
                    enableGlobalFilter
                    enableSorting
                    renderRowActions={({ row }) => {
                        const isUserSelected = row.original.id === data.user?.id;

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
            </CustomFieldset>
        </CustomButtonModal >
    );
}
