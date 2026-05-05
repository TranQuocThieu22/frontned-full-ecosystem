'use client'
import baseAxios from "@/api/config/baseAxios";
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";


export default function F10_2DeleteStudentFromExam({ data }: { data: any }) {
    return <MyActionIconDelete onSubmit={() => {
        console.log(data);


        return baseAxios.post("/Exam/ExamRegistration",
            // [
            //     {
            //         "id": data.id,
            //         "code": "string",
            //         "name": "string",
            //         "concurrencyStamp": "string",
            //         "isEnabled": true,
            //         "userId": data.user.id,
            //         "courseTimeClusterId": null,
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
                    "examId": null,
                    "courseSectionId": null,

                }
            ]
        )
    }}
    ></MyActionIconDelete>
}

