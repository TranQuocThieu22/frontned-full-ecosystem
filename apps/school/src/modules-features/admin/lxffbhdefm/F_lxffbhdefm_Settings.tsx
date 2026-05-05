import { MyActionIconModal } from '@/components/ActionIcons/ActionIconModal/MyActionIconModal';
import MyCheckbox from '@/components/Checkbox/MyCheckbox';
import { Button, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSettings } from '@tabler/icons-react';
import React from 'react'

export default function F_lxffbhdefm_Settings() {
    const disclosure = useDisclosure(false);
    return (
        <MyActionIconModal
            disclosure={disclosure}
            modalSize={"xl"}
            crudType="default"
            icon={<IconSettings stroke={2} />}
            title="Cấu hình thực đơn"
        >
            <Text size="sm">Số ngày có thực đơn</Text>
            <Group>
                <MyCheckbox label='Thứ hai' />
                <MyCheckbox label='Thứ ba' />
                <MyCheckbox label='Thứ tư' />
                <MyCheckbox label='Thứ năm' />
                <MyCheckbox label='Thứ sáu' />
                <MyCheckbox label='Thứ bảy' />
                <MyCheckbox label='Chủ nhật' />
            </Group>

            <Text size="sm">Số bữa ăn trong ngày</Text>
            <Group>
                <MyCheckbox label='Bữa sáng' />
                <MyCheckbox label='Bữa trưa' />
                <MyCheckbox label='Bữa chiều' />
            </Group>
            <Group mt="md" justify="end">
                <Button color="green" onClick={disclosure[1].close}>
                    Lưu
                </Button>
            </Group>
        </MyActionIconModal>
    )
}
