import baseAxios from '@/api/config/baseAxios'
import MyActionIconDelete from '@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete'

export default function F7_2Delete({ id }: { id: number }) {
    return (
        <MyActionIconDelete onSubmit={() => baseAxios.post("")} />
    )
}
