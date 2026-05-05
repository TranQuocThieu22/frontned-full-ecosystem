import { Drawer, DrawerProps } from '@mantine/core'
import { UseDisclosureReturnValue } from '@mantine/hooks'
import { SafeOmitType } from '../../types/safeOmitType'

export interface CustomDrawerProps extends SafeOmitType<DrawerProps, "opened" | "onClose"> {
    disclosure: UseDisclosureReturnValue
}

export default function CustomDrawer({
    disclosure,
    children,
    ...rest
}: CustomDrawerProps) {
    return (
        <Drawer
            onClose={disclosure[1].close}
            opened={disclosure[0]}
            offset={8}
            radius="md"
            position='right'
            {...rest}>
            {children}
        </Drawer>
    )
}
