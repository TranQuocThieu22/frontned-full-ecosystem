import { CustomButton } from '@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton';
import { CustomButtonModal } from '@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal';
import { CustomDataTable } from '@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable';
import { CustomCenterFull } from '@aq-fe/core-ui/shared/components/layout/CustomCenterFull';
import { CustomFieldset } from '@aq-fe/core-ui/shared/components/layout/CustomFieldset';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconDotsVertical } from '@tabler/icons-react';
import React, { useMemo } from 'react'
// import { mockPersonel } from '../QualityImprovementActions/mockPersonel';

export default function AssignedSummaryPersonelTable() {
    const disclosure = useDisclosure();
    const dataPersonel = [{}];
    const columsAssignedPersonel = useMemo(() => [
        { header: "Mã tài khoản", accessorKey: "accountCode", size: 150 },
        { header: "Họ tên", accessorKey: "fullname" },
        { header: "Đơn vị", accessorKey: "unit", size: 300 },
    ], []);

    const handleSelect = (row: any) => {
        notifications.show({
            title: 'Thành công',
            message: `Đã chọn người: ${row.original.fullname}`,
            color: 'green',
        });
        disclosure[1].close();
    };


    return (
        <CustomButtonModal disclosure={disclosure} isActionIcon actionIconProps={{ children: <IconDotsVertical /> }} modalProps={{ size: '80%' }}>
            <CustomFieldset title="Danh sách người dùng">
                <CustomDataTable
                    columns={columsAssignedPersonel}
                    data={dataPersonel || []}
                    enableColumnFilters
                    renderRowActions={({ row }) => (
                        <CustomCenterFull>
                            <CustomButton actionType='select' onClick={() => handleSelect(row)} />
                        </CustomCenterFull>
                    )}
                />
            </CustomFieldset>
        </CustomButtonModal>

    )
}
