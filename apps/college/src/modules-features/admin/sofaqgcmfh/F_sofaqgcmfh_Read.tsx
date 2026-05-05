'use client'
import { MyButton } from "@/components/Buttons/Button/MyButton";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Grid, Group, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import F_sofaqgcmfh_Create from "./F_sofaqgcmfh_Create";
import F_sofaqgcmfh_Delete from "./F_sofaqgcmfh_Delete";
import F_sofaqgcmfh_ReadById from "./F_sofaqgcmfh_ReadById";
import F_sofaqgcmfh_Update from "./F_sofaqgcmfh_Update";

interface IsofaqgcmfhViewModel {
    id?: number;
    code?: string;
    codeCt?: string;

    codeBh?: string;


}
const mockData: IsofaqgcmfhViewModel[] = [
    {
        id: 1,
        code: "PB2024",
        codeCt: "IT",
        codeBh: "CDCQ",


    },
]

export default function F_sofaqgcmfh_Read() {
    const Allsofaqgcmfh = useQuery<IsofaqgcmfhViewModel[]>({
        queryKey: [`IF_sofaqgcmfh_Read`],
        queryFn: async () => {
            // const response = await baseAxios.post("/SystemCatalogProjectTypeCategory/getall");
            return mockData
        },
    })

    // let [selectedStudent, setSelectedStudent] = useState<number | undefined>();
    const [selectedRow, setSelectedRow] = useState<number[]>([]);

    useEffect(() => {
        if (Allsofaqgcmfh.data) {
            setSelectedRow([Allsofaqgcmfh.data[0]?.id!]);
        }
    }, [Allsofaqgcmfh.isLoading]);

    const handleRowClick = (itemId: any) => {
        //single
        setSelectedRow((prevSelectedRow) =>
            prevSelectedRow.includes(itemId) ? [] : [itemId]
        );
    };

    const columns = useMemo<MRT_ColumnDef<IsofaqgcmfhViewModel>[]>(() => [
        {


            header: "Mã PB",
            accessorKey: "code",
        },
        {
            header: "Mã Chương trình",
            accessorKey: "codeCt",
            size: 100
        },


        {
            header: "Mã bậc hệ",
            accessorKey: "codeBh"
        },

    ], []);

    if (Allsofaqgcmfh.isLoading) return "Đang tải dữ liệu...";
    if (Allsofaqgcmfh.isError) return "Không có dữ liệu...";

    return (
        <>
            <Grid>
                <Grid.Col span={{ base: 12, md: 5 }}>
                    <Text>Danh sách chương trình đào tạo chuẩn</Text>
                    <MyDataTable
                        exportAble
                        enableRowSelection={true}
                        // setSelectedRow={setSelectedStudent}
                        columns={columns}
                        data={Allsofaqgcmfh.data!}
                        renderTopToolbarCustomActions={() =>
                            <Group>
                                <>
                                    <F_sofaqgcmfh_Create />
                                    <MyButton crudType="import" />
                                </>
                            </Group>
                        }
                        mantineTableBodyRowProps={({ row }) => ({
                            onClick: () => {
                                handleRowClick(row.original.id)
                            },
                            style: {
                                cursor: 'pointer',
                                backgroundColor: selectedRow.includes(row.original.id!) ? '#d0e7ff' : 'transparent',
                            },

                        })}

                        renderRowActions={({ row }) => {
                            return (
                                <MyCenterFull>

                                    <F_sofaqgcmfh_Update values={row.original} />

                                    <F_sofaqgcmfh_Delete id={row.original.id!} />
                                </MyCenterFull>
                            )
                        }}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 7 }}>

                    <Text>Chi tiết chương trình đào tạo chuẩn IT - CDCQ</Text>
                    <F_sofaqgcmfh_ReadById selectedRowIdList={selectedRow} />
                </Grid.Col>
            </Grid>
        </>
    );

}
