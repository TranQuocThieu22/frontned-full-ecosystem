'use client'
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";


export default function AssignStudentToCourseSectionDeleteFromSection({ data }: { data: any }) {
    return <CustomActionIconDelete onSubmit={() => {
        return baseAxios.post("/Course/CourseRegistration",
            [
                {
                    "id": data.id,
                    "code": "string",
                    "name": "string",
                    "concurrencyStamp": "string",
                    "isEnabled": true,
                    "userId": data.user.id,
                    "courseTimeClusterId": data.courseTimeClusterId,
                    "courseSectionId": null
                }
            ]
        )
    }} />
}
