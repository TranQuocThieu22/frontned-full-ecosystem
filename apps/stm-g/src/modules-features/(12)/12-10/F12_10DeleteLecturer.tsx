import baseAxios from '@/api/config/baseAxios';
import MyActionIconDelete from '@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete';

export default function F12_10DeleteLecturer({ lecturerId }: { lecturerId: number }) {
    return (
        <MyActionIconDelete onSubmit={async () => {
            await baseAxios.post(`/Account/Delete`, {
                id: lecturerId,
                isEnabled: true
            });
        }} />
    )
}
