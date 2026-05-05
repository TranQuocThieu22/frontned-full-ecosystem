import { service_Account } from '@/shared/APIs/service_Account';
import { IRequirement } from '@/shared/interfaces/requirement/Requirement';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconDotsVertical } from '@tabler/icons-react';
import { useCallback, useMemo } from 'react';
import { CustomButton } from '@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton';
import { CustomButtonModal } from '@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal';
import { CustomDataTable } from '@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable';
import { CustomCenterFull } from '@aq-fe/core-ui/shared/components/layout/CustomCenterFull';
import { CustomFieldset } from '@aq-fe/core-ui/shared/components/layout/CustomFieldset';
import { Account } from '@aq-fe/core-ui/shared/interfaces/Account';
import { MRT_ColumnDef, MRT_Row } from 'mantine-react-table';
import { useCustomReactQuery } from '@aq-fe/core-ui/shared/hooks/useCustomReactQuery';

interface Props {
    data: IRequirement;
    onSelect: (selectedPersonel: Account) => void;
}

export default function AssignedPersonel({ data, onSelect }: Props) {
    const disclosure = useDisclosure();

    // Only fetch when modal is opened
    const userQuery = useCustomReactQuery({
        queryKey: ['qualityImprovementActions_userList'],
        axiosFn: () => service_Account.getAllModule(),
        options: {
            enabled: disclosure[0], // Only fetch when modal is open
            staleTime: 5 * 60 * 1000, // Cache for 5 minutes
        }
    });

    const dataPersonel = userQuery.data;

    const columns = useMemo<MRT_ColumnDef<Account>[]>(
        () => [
            { header: "Mã tài khoản", accessorKey: "userName", size: 150 },
            { header: "Họ tên", accessorKey: "fullName" },
            { header: "Đơn vị", accessorKey: "workingUnit.name", size: 300 },
        ], []);

    const handleSelect = useCallback((row: MRT_Row<Account>) => {
        onSelect(row.original);
        notifications.clean();
        notifications.show({
            title: 'Đã chọn nhân sự',
            message: `Đã chọn ${row.original.fullName ?? 'nhân sự'} cho yêu cầu ${data?.code ?? 'này'}. Nhấn "Lưu" để xác nhận.`,
            color: 'green',
            autoClose: 3000,
        });

        disclosure[1].close();
    }, [data?.code, disclosure, onSelect]);



    return (
        <CustomButtonModal
            disclosure={disclosure}
            isActionIcon
            actionIconProps={{ children: <IconDotsVertical /> }}
            modalProps={{
                size: '80%',
                title: 'Chọn nhân sự phụ trách'
            }}
        >
            <CustomFieldset title="Danh sách người dùng">
                <CustomDataTable
                    isLoading={userQuery.isLoading}
                    isError={userQuery.isError}
                    columns={columns}
                    data={dataPersonel || []}
                    enableColumnFilters
                    enableGlobalFilter
                    enableSorting
                    initialState={{
                        pagination: { pageSize: 10, pageIndex: 0 },
                    }}
                    renderRowActions={({ row }) => {
                        return (
                            <CustomCenterFull>
                                <CustomButton
                                    actionType='select'
                                    onClick={() => handleSelect(row)}
                                />
                            </CustomCenterFull>
                        );
                    }}
                />
            </CustomFieldset>
        </CustomButtonModal>
    );
}
