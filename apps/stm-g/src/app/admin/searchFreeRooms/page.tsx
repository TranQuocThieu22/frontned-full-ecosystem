'use client'
import SearchFreeRoomsRead from "@/modules-features/admin/searchFreeRooms/searchFreeRoomsRead";
import { MyPageContent } from "aq-fe-framework/components";

export default function Page() {
    return (
        <MyPageContent>
            <SearchFreeRoomsRead />
        </MyPageContent>
    )
}
