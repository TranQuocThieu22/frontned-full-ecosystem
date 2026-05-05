'use client'
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";

// REVIEW: 48272 F6_1Delete
export default function F6_1Delete({ DeleteCourseId }: { DeleteCourseId: number }) {
    return <MyActionIconDelete onSubmit={() =>
        // baseAxios.delete("/userNCKHs/" + lecturerAndExpertId)
        console.log("Delete")
    }
    ></MyActionIconDelete>
}

