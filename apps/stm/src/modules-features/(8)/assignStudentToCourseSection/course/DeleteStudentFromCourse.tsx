'use client'
import baseAxios from "@/api/config/baseAxios";
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";


export default function DeleteStudentFromCourse({ data }: { data: any }) {
    return <MyActionIconDelete onSubmit={() => {
        console.log(data)


        return baseAxios.post("/Course/CourseRegistration",
            [
                {
                    "id": data.id,
                    "code": "string",
                    "name": "string",
                    "concurrencyStamp": "string",
                    "isEnabled": true,
                    "userId": data.user.id,
                    "courseTimeClusterId": null,
                    "courseSectionId": null
                }
            ]
        )
    }}
    ></MyActionIconDelete>
}

