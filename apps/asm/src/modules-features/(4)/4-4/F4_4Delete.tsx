'use client'
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";

// REVIEW: 48245 F4_4Delete
export default function F4_4Delete({ DeleteCourseId }: { DeleteCourseId: number }) {
    return <MyActionIconDelete onSubmit={() =>
        // baseAxios.delete("/userNCKHs/" + lecturerAndExpertId)
        console.log("Delete")
    }
    ></MyActionIconDelete>
}

