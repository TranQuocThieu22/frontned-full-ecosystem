import baseAxios from '@/api/config/baseAxios';
import MyActionIconDelete from '@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete';

export default function F8_4DeleteCSSchedule({ examSectionid }: { examSectionid: number }) {


    return (
        <MyActionIconDelete onSubmit={async () => {
            await baseAxios.post(`/CourseSection/Delete`, {
                id: examSectionid
            });
        }} />
    )
}