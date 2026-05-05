import { MyButton } from "@/components/Buttons/Button/MyButton";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Button, Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import F_pirjlnnwhv_Create from "./F_pirjlnnwhv_Create";
import F_pirjlnnwhv_Setting from "./F_pirjlnnwhv_Setting";

interface IpirjlnnwhvIdViewModel {
    id?: number;
    hkThu?: number;
    maMonHoc?: string;
    name?:string;
    soTinChi?:number;
    nhomTC?:string;
    nhanhTC?:string;

}

const mockData: IpirjlnnwhvIdViewModel[] = [
   
    {
        id: 1,
        hkThu: 1,
        maMonHoc: "IT001",
        name: "Kỹ thuật lập trình",
     
        soTinChi: 3,
        nhomTC: "01",
        nhanhTC: "01",
     
    }
]
const mockData2: IpirjlnnwhvIdViewModel[] = [
    {
        id: 5,
        
    },
    {
        id: 6,
        
    }
]

export default function F_pirjlnnwhv_ReadById(
    { selectedRowIdList }: { selectedRowIdList: number[] }
) {
    let [listSelectedId, setListSelectedId] = useState<number[]>([]);
    const AllpirjlnnwhvId = useQuery<IpirjlnnwhvIdViewModel[]>({
        queryKey: [`F_pirjlnnwhv_ReadById`, listSelectedId],
        queryFn: async () => {
            // const response = await baseAxios.post("/SystemCatalogProjectTypeCategory/getall");
            return listSelectedId[0] === 1 ? mockData : mockData2;
        },
        enabled: listSelectedId.length > 0
    })


    const columns = useMemo<MRT_ColumnDef<IpirjlnnwhvIdViewModel>[]>(() => [
        {
            header: "HK Thứ",
            accessorKey: "hkThu",
        },
        {
            header: "Mã môn học",
            accessorKey: "maMonHoc",
        },
        {
            header: "Tên môn học",
            accessorKey: "name",
        },
        {
            header: "Số TC",
            accessorKey: "soTinChi",
        },
        {
            header: "Nhóm TC",
            accessorKey: "nhomTC",
        },
        {
            header: "Nhánh TC",
            accessorKey: "nhanhTC",
        },
        {
            header: "Điều kiện TC",
            accessorFn: (row) => <F_pirjlnnwhv_Setting />
        },
        
    ], []);

    useEffect(() => {
        if (selectedRowIdList === undefined) return;
        setListSelectedId(selectedRowIdList);
    }, [selectedRowIdList]);

    if (listSelectedId.length === 0) return "Chưa chọn dòng nào";
    if (listSelectedId.length >= 2) return "Chọn nhiều dữ liệu";
    if (AllpirjlnnwhvId.isLoading) return "Đang tải dữ liệu...";
    if (AllpirjlnnwhvId.isError) return "Không có dữ liệu...";

    return (
        <>
            <MyDataTable
                enableRowNumbers={true}
                columns={columns}
                data={AllpirjlnnwhvId.data!}
                exportAble
            renderTopToolbarCustomActions={() => (
                <Group>
                    <F_pirjlnnwhv_Create />
                    
                    <Button>Lưu</Button>
                    <MyButton crudType="delete" />
                    <MyButton crudType="import" />
                </Group>
            )
            }
            />
        </>
    )
}