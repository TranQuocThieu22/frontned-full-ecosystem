import MyActionIconDelete from '@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete';
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
;

export default function F8_4DeleteCSSchedule({ examSectionid }: { examSectionid: number }) {


    return (
        <MyActionIconDelete onSubmit={async () => {
            await baseAxios.post(`/CourseSection/Delete`, {
                id: examSectionid
            });
        }} />
    )
}