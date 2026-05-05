import MyActionIconDelete from '@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete'

export default function DMVienChucDelete({ id, code }: { id: number, code: string }) {
    return (
        <MyActionIconDelete
            contextData={code}
            onSubmit={() => {

            }} />
    )
}
