'use client'
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";


export default function TeachingAssignmentDeleteBtn({ data }: { data: any }) {
    return <MyActionIconDelete onSubmit={() => {
        // baseAxios.post("/userNCKHs/" + id)
        // baseAxios.post("/Course/CourseRegistration",
        //     [
        //         {
        //             "id": data.id,
        //             "code": "string",
        //             "name": "string",
        //             "concurrencyStamp": "string",
        //             "isEnabled": true,
        //             "userId": data.user.id,
        //             "courseTimeClusterId": data.courseTimeClusterId,
        //             "courseSectionId": null
        //         }
        //     ]
        // )
    }}></MyActionIconDelete>
}

