'use client'
import SearchFreeRoomsRead from "@/features/admin/searchFreeRooms/searchFreeRoomsRead";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";

export default function Page() {
    return (
        <CustomPageContent>
            <SearchFreeRoomsRead />
        </CustomPageContent>
    )
}
