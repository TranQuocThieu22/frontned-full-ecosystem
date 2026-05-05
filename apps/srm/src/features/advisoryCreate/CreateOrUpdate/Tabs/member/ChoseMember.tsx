import { CustomButton } from '@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton';
import { CustomButtonModal } from '@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal';
import { CustomDataTable } from '@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable';
import { useCustomReactQuery } from '@aq-fe/core-ui/shared/hooks/useCustomReactQuery';
import { dateUtils } from '@aq-fe/core-ui/shared/utils/dateUtils';
import { useDisclosure } from '@mantine/hooks';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo } from 'react';
import { accountService } from '../../../../../shared/APIs/accountService';
import { SRMLecturer } from '../../../../../shared/interfaces/SRMLecturer';

interface ChoseMemberProps {
    onSelect: (recipients: SRMLecturer[]) => void;
    selectedMembers: SRMLecturer[]; // 👈 new prop
}

export default function ChoseMember({ onSelect, selectedMembers }: ChoseMemberProps) {
    const disc = useDisclosure();
    const lecturerQuery = useCustomReactQuery({
        queryKey: ['lecturerQuery'],
        axiosFn: () => accountService.getEdusoftNetAccount(),
    });

    const columns = useMemo<MRT_ColumnDef<SRMLecturer>[]>(() => [
        { accessorKey: "code", header: "Mã viên chức" },
        { accessorKey: "fullName", header: "Họ và tên" },
        {
            accessorKey: "dateOfBirth",
            header: "Ngày sinh",
            accessorFn: (row) => dateUtils.toDDMMYYYY(row.dateOfBirth)
        },
        {
            accessorKey: "gender",
            header: "Giới tính",
            accessorFn: (row) => row.gender === 1 ? "Nam" : "Nữ"
        },
        { accessorKey: "workingUnit.name", header: "Đơn vị" },
        { accessorKey: "email", header: "Email" },
        { accessorKey: "phoneNumber", header: "Số điện thoại" },
    ], []);

    // filter out already selected - with null safety
    const availableRecipients = lecturerQuery.data?.filter(
        (r) => {
            // Check if r and r.id exist before comparing
            if (!r || !r.id) return false;

            // filter out members that are already selected
            // Ensure selectedMembers is an array and filter out null/undefined members
            const validSelectedMembers = (selectedMembers || []).filter(sel => sel && sel.id);

            return !validSelectedMembers.some(sel => sel.id === r.id);
        }
    );

    return (
        <CustomButtonModal
            buttonProps={{ children: "Thêm" }}
            disclosure={disc}
            modalProps={{ title: "Danh sách viên chức", size: '90%' }}
        >
            <CustomDataTable
                columns={columns}
                data={availableRecipients || []}
                enableRowSelection={(availableRecipients?.length ?? 0) > 0}
                renderTopToolbarCustomActions={({ table }) => {
                    const selectedRows = table.getSelectedRowModel().flatRows.map(row => row.original);

                    return (
                        <CustomButton
                            onClick={() => {
                                onSelect(selectedRows);
                                disc[1].close();
                            }}
                            disabled={selectedRows.length === 0}
                        >
                            Chọn ({selectedRows.length})
                        </CustomButton>
                    );
                }}
            />
        </CustomButtonModal>
    );
}
