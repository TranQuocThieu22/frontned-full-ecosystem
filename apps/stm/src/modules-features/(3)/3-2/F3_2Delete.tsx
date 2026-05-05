import baseAxios from '@/api/config/baseAxios'
import MyActionIconDelete from '@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete'

export default function F3_2Delete({ id }: { id: number }) {
    return (
        <MyActionIconDelete onSubmit={() => baseAxios.post("/program/delete", { id: id })} />
    )
}
