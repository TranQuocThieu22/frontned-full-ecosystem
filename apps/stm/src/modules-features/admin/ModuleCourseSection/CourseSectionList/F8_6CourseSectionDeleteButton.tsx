import baseAxios from '@/api/config/baseAxios';
import MyActionIconDelete from '@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete';

export default function F8_6CourseSectionDeleteButton({ courseSectionId }: { courseSectionId?: number }) {
    return (
        <MyActionIconDelete onSubmit={async () => {
            await baseAxios.post(`/CourseSection/Delete`, {
                id: courseSectionId,
                isEnabled: true
            });
        }} />
    )
}
