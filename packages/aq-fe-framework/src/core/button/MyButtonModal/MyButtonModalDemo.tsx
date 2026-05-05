import { useDisclosure } from '@mantine/hooks'
import { MyButtonModal } from './MyButtonModal'

export default function MyButtonModalDemo() {
    const disc = useDisclosure()
    return (
        <MyButtonModal disclosure={disc} isActionIcon actionIconProps={{ actionType: "validate" }}>

        </MyButtonModal>
    )
}
