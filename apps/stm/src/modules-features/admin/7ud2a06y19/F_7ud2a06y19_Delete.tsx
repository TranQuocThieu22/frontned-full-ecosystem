import baseAxios from '@/api/config/baseAxios'
import MyActionIconDelete from '@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete'

export default function F_7ud2a06y19_Delete({ id }: { id: number }) {
    return (
        <MyActionIconDelete onSubmit={async () => await baseAxios.post('/Role/Delete', { id })} />
    )
}
