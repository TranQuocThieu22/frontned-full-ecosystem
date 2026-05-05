import MyActionIconDelete from '@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete'

export default function SponsorDeleteButton({ code }: { code: string }) {
    return (
        <MyActionIconDelete
            contextData={code}
            onSubmit={() => {

            }} />
    )
}
