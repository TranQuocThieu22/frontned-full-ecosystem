import { useMemo, useCallback } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconDotsVertical, IconSelect } from '@tabler/icons-react';
import { MRT_ColumnDef, MRT_Row } from 'mantine-react-table';
import { AxiosResponse } from 'axios';
import { service_Account } from '@/shared/APIs/service_Account';
import { CustomButton } from '@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton';
import { CustomButtonModal } from '@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal';
import { CustomDataTable } from '@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable';
import { CustomCenterFull } from '@aq-fe/core-ui/shared/components/layout/CustomCenterFull';
import { CustomFieldset } from '@aq-fe/core-ui/shared/components/layout/CustomFieldset';
import { useCustomReactQuery } from '@aq-fe/core-ui/shared/hooks/useCustomReactQuery';
import { Account } from '@aq-fe/core-ui/shared/interfaces/Account';
import { CustomApiResponse } from '@aq-fe/core-ui/shared/libs/createBaseApi';


interface UserSelectionModalProps {
  /** Code/identifier of the item (for notification) */
  itemCode?: string;
  /** Callback when a user is selected */
  onSelect: (user: Account) => void;
  /** Modal title */
  modalTitle?: string;
  /** Fieldset title */
  fieldsetTitle?: string;
  selectTooltipLabel?: string
  removeTooltipLabel?: string
  /** Custom columns definition (optional) */
  customColumns?: MRT_ColumnDef<Account>[];
  /** Custom API function to fetch users - must return AxiosResponse with CustomApiResponse wrapper */
  fetchUsers?: () => Promise<AxiosResponse<CustomApiResponse<Account[]>>>;
  /** Success notification message template (optional) */
  getSuccessMessage?: (user: Account, itemCode?: string) => string;
  /** Query key for caching (optional) */
  queryKey?: string[];
}

const defaultColumns: MRT_ColumnDef<Account>[] = [
  { header: "Mã tài khoản", accessorKey: "userName", size: 150 },
  { header: "Họ tên", accessorKey: "fullName" },
  { header: "Đơn vị", accessorKey: "workingUnit.name", size: 300 },
];

export function UserSelectionModal({
  itemCode,
  onSelect,
  modalTitle = 'Chọn nhân sự phụ trách',
  fieldsetTitle = 'Danh sách người dùng',
  selectTooltipLabel = 'Danh sách người dùng',

  customColumns,
  fetchUsers,
  getSuccessMessage,
  queryKey = ['user_selection_modal']
}: UserSelectionModalProps) {
  const disclosure = useDisclosure();

  // useCustomReactQuery automatically unwraps response.data.data
  // So userQuery.data will be Account[] directly
  const userQuery = useCustomReactQuery<Account[]>({
    queryKey,
    axiosFn: fetchUsers || (() => service_Account.getAllModule()),
    options: {
      enabled: disclosure[0],
      staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    }
  });

  const columns = useMemo<MRT_ColumnDef<Account>[]>(
    () => customColumns || defaultColumns,
    [customColumns]
  );

  const handleSelect = useCallback((row: MRT_Row<Account>) => {
    onSelect(row.original);
    notifications.clean();

    const message = getSuccessMessage
      ? getSuccessMessage(row.original, itemCode)
      : `Đã chọn ${row.original.fullName ?? 'nhân sự'}${itemCode ? ` cho yêu cầu ${itemCode}` : ''}. Nhấn "Lưu" để xác nhận.`;

    notifications.show({
      title: 'Đã chọn nhân sự',
      message,
      color: 'green',
      autoClose: 3000,
    });

    disclosure[1].close();
  }, [itemCode, disclosure, onSelect, getSuccessMessage]);

  return (
    <CustomButtonModal
      disclosure={disclosure}
      isActionIcon
      actionIconProps={{
        children: <IconDotsVertical />,
        toolTipProps: {
          label: selectTooltipLabel
        }
      }}
      modalProps={{
        size: '80%',
        title: modalTitle
      }}
    >
      <CustomFieldset title={fieldsetTitle}>
        <CustomDataTable
          isLoading={userQuery.isLoading}
          isError={userQuery.isError}
          columns={columns}
          data={userQuery.data ?? []}
          enableColumnFilters
          enableGlobalFilter
          enableSorting
          initialState={{
            pagination: { pageSize: 10, pageIndex: 0 },
          }}
          renderRowActions={({ row }) => (
            <CustomCenterFull>
              <CustomButton
                color="violet"
                leftSection={<IconSelect />}
                actionType='update'
                onClick={() => handleSelect(row)}
              >Chọn</CustomButton>
            </CustomCenterFull>
          )}
        />
      </CustomFieldset>
    </CustomButtonModal>
  );
}
