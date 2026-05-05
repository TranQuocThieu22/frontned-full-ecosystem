import baseAxios from '@/api/baseAxios'
import MyActionIconDelete from '@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete'

export default function F11_5DeleteDomainCategory({ id }: { id: number }) {
    return (
        <MyActionIconDelete onSubmit={() => baseAxios.post("/SystemCatalogDomainCategory/delete", { "id": id })
        }
        />
    )
}
