import baseAxios from '@/api/baseAxios'
import MyActionIconDelete from '@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete'

export default function F11_6DeleteMissionCategory({ id }: { id: number }) {
    return (
        <MyActionIconDelete onSubmit={() => {
            return baseAxios.post("/SystemCatalogTaskCategory/delete", {
                "id": id
            })
        }} />
    )
}
