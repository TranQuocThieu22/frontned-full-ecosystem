import MyActionIconDelete from '@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete';
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { ICourseSectionSchedule } from './HandleCSScheduleButton';
;

export default function F8_4DeleteCSSchedule({ csScheduleValues }: { csScheduleValues: ICourseSectionSchedule }) {


    return (
        <MyActionIconDelete onSubmit={async () => {
            await baseAxios.post(`/CourseSection/updateSectionSchedule`, {
                "id": csScheduleValues.id,
                "code": csScheduleValues.code,
                "name": csScheduleValues.name,
                "concurrencyStamp": csScheduleValues.concurrencyStamp,
                "isEnabled": false,
                "subjectName": csScheduleValues.subjectName,
                "courseSectionId": csScheduleValues.courseSectionId,
                "addressId": csScheduleValues.addressId,
                "classPeriodStart": csScheduleValues.classPeriodStart,
                "classPeriodEnd": csScheduleValues.classPeriodEnd,
                "startDate": csScheduleValues.startDate,
                "endDate": csScheduleValues.endDate,
                "courseSectionScheduleLecturer": csScheduleValues.courseSectionScheduleLecturer
            });
        }} />
    )
}
