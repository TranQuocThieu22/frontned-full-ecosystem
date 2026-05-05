'use client'
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";


export default function F10_2DeleteStudentFromCourseSection({ data }: { data: any }) {
    return <MyActionIconDelete onSubmit={() => {

        baseAxios.post("/Exam/ExamRegistration",
            // [
            //     {
            //         "id": data.id,
            //         "code": "string",
            //         "name": "string",
            //         "isEnabled": true,
            //         "concurrencyStamp": "string",
            //         "userId": data.user.id,
            //         "courseTimeClusterId": data.courseTimeClusterId,
            //         "courseSectionId": null
            //     }
            // ]
            [
                {
                    "id": data.id,
                    "code": "string",
                    "name": "string",
                    "concurrencyStamp": "string",
                    "isEnabled": true,
                    "userId": data.user.id,
                    "examId": data.examId,
                    "courseSectionId": null,

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

