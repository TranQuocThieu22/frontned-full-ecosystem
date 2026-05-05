import MyActionIconDelete from '@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete'

export default function F11_7DeleteProjectLevelCategory({ id, code }: { id: number, code: string }) {
    return (
        <MyActionIconDelete
            contextData={code}
            onSubmit={() => {

            }} />
    )
}
