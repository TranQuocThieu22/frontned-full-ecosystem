import MyActionIconDelete from '@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete'

export default function StudentAwardRankingDeleteListButton({ code }: { code: string }) {
    return (
        <MyActionIconDelete
            contextData={code}
            onSubmit={() => {

            }} />
    )
}
