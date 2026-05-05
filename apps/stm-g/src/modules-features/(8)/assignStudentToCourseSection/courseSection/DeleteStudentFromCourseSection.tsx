'use client'
import baseAxios from "@/api/config/baseAxios";
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";


export default function DeleteStudentFromCourseSection({ data }: { data: any }) {
    return <MyActionIconDelete onSubmit={() => {

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
    }}

    // baseAxios.post("/CourseRegistration/update",
    //     {
    //         id: id,
    //         courseSectionId: null
    //     }
    // )
    ></MyActionIconDelete >
}

