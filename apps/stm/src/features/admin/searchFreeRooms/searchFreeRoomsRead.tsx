import { Divider } from "@mantine/core";
import SearchFreeRoomsFilter from "./searchFreeRoomsFilter";
import SearchFreeRoomsTable from "./searchFreeRoomsTable";

export default function SearchFreeRoomsRead() {
    return (
        <>
            <SearchFreeRoomsFilter />
            <Divider />
            <SearchFreeRoomsTable />
        </>
    )
}
