import { CustomButton } from '@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton';
import { CustomButtonModal } from '@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal';
import { CustomDataTable } from '@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable';
import { CustomCenterFull } from '@aq-fe/core-ui/shared/components/layout/CustomCenterFull';
import { CustomFieldset } from '@aq-fe/core-ui/shared/components/layout/CustomFieldset';
import { Account } from '@aq-fe/core-ui/shared/interfaces/Account';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconDotsVertical } from '@tabler/icons-react';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useCallback, useMemo } from 'react';

interface Student {
    id?: string;
    code?: string;
    fullName?: string;
    dateOfBirth?: string;
    gender?: number;
    class?: {
        name?: string;
    };
}

interface Props {
    students: Account[];
    onSelect: (selectedStudent: Student) => void;
}

export default function StudentSelectionModal({ students, onSelect }: Props) {
    const disclosure = useDisclosure();

    const columns = useMemo<MRT_ColumnDef<Student>[]>(
        () => [
            { header: "Mã sinh viên", accessorKey: "code", size: 150 },
            { header: "Họ tên", accessorKey: "fullName" },
            { header: "Lớp", accessorKey: "class.name", size: 200 },
            {
                header: "Ngày sinh",
                accessorKey: "dateOfBirth",
                Cell: ({ cell }) => {
                    const date = cell.getValue() as Date;
                    return date ? new Date(date).toLocaleDateString('vi-VN') : '';
                },
                size: 150
            },
        ], []
    );

    const handleSelect = useCallback((row: any) => {
        onSelect(row.original);
        notifications.clean();
        notifications.show({
            title: 'Đã chọn sinh viên',
            message: `Đã chọn sinh viên ${row.original.code} - ${row.original.fullName}`,
            color: 'green',
            autoClose: 3000,
        });

        disclosure[1].close();
    }, [disclosure, onSelect]);

    // Memoize processed data
    const processedData = useMemo(() => {
        return (students || []).map((student: Account) => ({
            ...student,
            id: student.id?.toString(),
            dateOfBirth: student.dateOfBirth ? new Date(student.dateOfBirth) : undefined,
        })) as Student[];
    }, [students]);

    return (
        <CustomButtonModal
            disclosure={disclosure}
            isActionIcon
            actionIconProps={{ children: <IconDotsVertical /> }}
            modalProps={{
                size: '80%',
                title: 'Chọn sinh viên'
            }}
        >
            <CustomFieldset title="Danh sách sinh viên">
                <CustomDataTable
                    columns={columns}
                    data={processedData || []}
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
