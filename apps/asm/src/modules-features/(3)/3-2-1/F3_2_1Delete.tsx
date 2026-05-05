'use client'
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";

export default function F3_2_1Delete({ contractId }: { contractId: number }) {
    return <MyActionIconDelete onSubmit={() =>
        // baseAxios.delete("/userNCKHs/" + lecturerAndExpertId)
        console.log("Delete")
    }
    ></MyActionIconDelete>
}

