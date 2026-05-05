import { MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
interface IRoom {
    code?: string;
    name?: string;
    branch?: string;
    capacity?: number;
}
export default function SearchFreeRoomsTable() {
    const columns = useMemo<MRT_ColumnDef<IRoom>[]>(() => [
        {
            accessorKey: 'code',
            header: 'Mã phòng',
        },
        {
            accessorKey: 'name',
            header: 'Tên phòng',
            size: 150,
        },
        {
            accessorKey: 'branch',
            header: 'Chi nhánh',
            size: 100,
        },
        {
            accessorKey: 'capacity',
            header: 'Sức chứa tối đa',
            size: 100,
        },

    ], []);

    return (
        <MyFieldset title="Danh sách phòng rảnh">
            <MyDataTable
                columns={columns}
                data={rooms}
                enableRowNumbers
            />
        </MyFieldset>
    );
}


const rooms: IRoom[] = [
    {
        code: "P.TD01",
        name: "Phòng 101",
        branch: "Thủ Đức",
        capacity: 30,
    },
    {
        code: "P.TD03",
        name: "Phòng 205",
        branch: "Thủ Đức",
        capacity: 25,
    },
    {
        code: "P.Q102",
        name: "Phòng A2",
        branch: "Quận 1",
        capacity: 40,
    },
];

console.log(rooms);