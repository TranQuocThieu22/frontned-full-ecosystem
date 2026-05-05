'use client'
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";

// REVIEW: 48246 F4_5Delete
export default function F4_5Delete({ DeleteCourseId }: { DeleteCourseId: number }) {
    return <MyActionIconDelete onSubmit={() =>
        // baseAxios.delete("/userNCKHs/" + lecturerAndExpertId)
        console.log("Delete")
    }
    ></MyActionIconDelete>
}

