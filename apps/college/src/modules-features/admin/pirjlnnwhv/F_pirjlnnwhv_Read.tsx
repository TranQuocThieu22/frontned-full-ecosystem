'use client'
import { MyButton } from "@/components/Buttons/Button/MyButton";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Grid, Group, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import F_pirjlnnwhv_Create from "./F_pirjlnnwhv_Create";
import F_pirjlnnwhv_Create2 from "./F_pirjlnnwhv_Create2";
import F_pirjlnnwhv_Delete from "./F_pirjlnnwhv_Delete";
import F_pirjlnnwhv_ReadById from "./F_pirjlnnwhv_ReadById";
import F_pirjlnnwhv_Update from "./F_pirjlnnwhv_Update";

interface IpirjlnnwhvViewModel {
    id?: number;
    code?: string;
    codeCt?: string;

    codeBh?: string;


}
const mockData: IpirjlnnwhvViewModel[] = [
    {
        id: 1,
        code: "IT2024-01",
        codeCt: "Cao đẳng công nghệ thông tin  2024",

        codeBh: "CDCQ",


    },
]

export default function F_pirjlnnwhv_Read() {
    const Allpirjlnnwhv = useQuery<IpirjlnnwhvViewModel[]>({
        queryKey: [`IF_pirjlnnwhv_Read`],
        queryFn: async () => {
            // const response = await baseAxios.post("/SystemCatalogProjectTypeCategory/getall");
            return mockData
        },
    })

    // let [selectedStudent, setSelectedStudent] = useState<number | undefined>();
    const [selectedRow, setSelectedRow] = useState<number[]>([]);

    useEffect(() => {
        if (Allpirjlnnwhv.data) {
            setSelectedRow([Allpirjlnnwhv.data[0]?.id!]);
        }
    }, [Allpirjlnnwhv.isLoading]);

    const handleRowClick = (itemId: any) => {
        //single
        setSelectedRow((prevSelectedRow) =>
            prevSelectedRow.includes(itemId) ? [] : [itemId]
        );
    };

    const columns = useMemo<MRT_ColumnDef<IpirjlnnwhvViewModel>[]>(() => [
        {


            header: "Mã khoá",
            accessorKey: "code",
        },
        {
            header: "Tên khoá",
            accessorKey: "codeCt",

        },


        {
            header: "Mã bậc hệ",
            accessorKey: "codeBh"
        },

    ], []);

    if (Allpirjlnnwhv.isLoading) return "Đang tải dữ liệu...";
    if (Allpirjlnnwhv.isError) return "Không có dữ liệu...";

    return (
        <>
            <Grid>
                <Grid.Col span={{ base: 12, md: 5 }}>
                    <Text>Danh sách chương trình đào tạo kế hoạch</Text>
                    <MyDataTable
                        exportAble
                        enableRowSelection={true}
                        // setSelectedRow={setSelectedStudent}
                        columns={columns}
                        data={Allpirjlnnwhv.data!}
                        renderTopToolbarCustomActions={() =>
                            <Group>
                                <>
                                    <F_pirjlnnwhv_Create />
                                    {/* <MyButton crudType="import" /> */}
                                    <F_pirjlnnwhv_Create2 />
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
                        // renderRowActions={({ row }) => {
                        //     return (
                        //         <MyCenterFull>
                        //             <F7_5ViewStudentProgessByIdButton studentId={row.original.id!} />
                        //         </MyCenterFull>
                        //     )
                        // }}

                        renderRowActions={({ row }) => {
                            return (
                                <MyCenterFull>

                                    <F_pirjlnnwhv_Update values={row.original} />

                                    <F_pirjlnnwhv_Delete id={row.original.id!} />
                                </MyCenterFull>
                            )
                        }}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 7 }}>

                    <Text>Chi tiết chương trình đào tạo kế hoạch IT2024-01</Text>
                    <F_pirjlnnwhv_ReadById selectedRowIdList={selectedRow} />
                </Grid.Col>
            </Grid>
        </>
    );

}
