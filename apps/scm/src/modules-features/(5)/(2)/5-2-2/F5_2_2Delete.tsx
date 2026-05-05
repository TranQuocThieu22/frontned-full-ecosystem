import MyActionIconDelete from '@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete'

export default function F5_2_2Delete({ code }: { code: string }) {
    return (
        <MyActionIconDelete contextData={code} onSubmit={() => { }} />
    )
}
