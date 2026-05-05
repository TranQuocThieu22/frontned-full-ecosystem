import { Flex } from '@mantine/core';
import { IconUserMinus } from '@tabler/icons-react';
import { UserSelectionModal } from './UserSelectionModal';
import { CustomActionIcon } from '@aq-fe/core-ui/shared/components/button/CustomActionIcon/CustomActionIcon';
import { Account } from '@aq-fe/core-ui/shared/interfaces/Account';

interface UserAssignmentCellProps<T> {
  /** The data item being edited */
  item: T;
  /** Function to get the user from the item */
  getUser: (item: T) => { fullName?: string } | null | undefined;
  /** Function to get the unique identifier for the item */
  getId: (item: T) => string | number;
  /** Function to get the item code/name for notifications */
  getItemCode?: (item: T) => string;
  /** Pending changes state (optional, for optimistic UI updates) */
  pendingChanges?: Record<string, { userId?: string | null }>;
  /** Callback when user is selected */
  onUserSelect: (item: T, selectedUser: Account) => void;
  /** Callback when user is removed */
  onUserRemove: (item: T) => void;
  /** Label for the remove button tooltip */
  removeTooltipLabel?: string;
  /** Label for the select button tooltip */
  selectTooltipLabel?: string;
  /** Placeholder text when no user is assigned */
  noUserPlaceholder?: string;
  modalTitle?: string;
  /** Label for field set */
  fieldsetTitle?: string
}

export function UserAssignmentCell<T>({
  item,
  getUser,
  getId,
  getItemCode,
  pendingChanges,
  onUserSelect,
  onUserRemove,
  modalTitle,
  fieldsetTitle,
  removeTooltipLabel,
  selectTooltipLabel,
  noUserPlaceholder = 'Chưa chọn'
}: UserAssignmentCellProps<T>) {
  const user = getUser(item);
  const itemId = String(getId(item));
  const isRemoved = pendingChanges?.[itemId]?.userId === null;
  const defaultSelectTooltipLabel = 'Chọn nhân sự phụ trách'
  const defaultRemoveTooltipLabel = 'Xóa nhân sự phụ trách'
  return (
    <Flex justify="space-between" align="center" gap="xs">
      <span
        style={{
          flex: 1,
          textDecoration: isRemoved ? 'line-through' : 'none',
          color: isRemoved ? '#868e96' : 'inherit'
        }}
      >
        {user?.fullName || noUserPlaceholder}
      </span>
      <Flex gap="xs">
        {user?.fullName && (
          <CustomActionIcon
            toolTipProps={{ label: removeTooltipLabel ? removeTooltipLabel : defaultRemoveTooltipLabel }}
            actionType="update"
            color="red"
            onClick={() => onUserRemove(item)}
          >
            <IconUserMinus />
          </CustomActionIcon>
        )}
        <UserSelectionModal
          fieldsetTitle={fieldsetTitle ? fieldsetTitle : selectTooltipLabel}
          selectTooltipLabel={selectTooltipLabel ? selectTooltipLabel : defaultSelectTooltipLabel}
          removeTooltipLabel={removeTooltipLabel ? removeTooltipLabel : defaultRemoveTooltipLabel}
          itemCode={getItemCode?.(item)}
          onSelect={(selectedUser) => onUserSelect(item, selectedUser)}
          modalTitle={modalTitle ? modalTitle : 'Nhân sự phụ trách'}
        />
      </Flex>
    </Flex >
  );
}
