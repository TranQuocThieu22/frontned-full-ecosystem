import UsersTable from './UsersTable'

export default function UserFeature({ isIAM = false }: { isIAM?: boolean }) {
    return (
        <UsersTable isIAM={isIAM} />
    )
}
