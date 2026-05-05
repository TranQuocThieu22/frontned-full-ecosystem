'use client'
import baseAxios from "@/api/config/baseAxios";
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";


export default function F3_1DeleteCourseModule({ DeleteCourseId }: { DeleteCourseId: number }) {
    return <MyActionIconDelete onSubmit={() =>
        baseAxios.post("/subject/delete", { id: DeleteCourseId })
    }
    ></MyActionIconDelete>
}

