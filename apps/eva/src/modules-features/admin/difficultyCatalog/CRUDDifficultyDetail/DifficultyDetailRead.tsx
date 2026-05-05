'use client'
import { IDifficultyDetail, difficultyDetailService } from "@/shared/APIs/difficultyDetailService";
import { IDifficulty } from "@/shared/APIs/difficultyService";
import { Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconTableExport, IconUpload } from "@tabler/icons-react";
import { MyButton, MyButtonModal, MyCenterFull, MyDataTable, MyFieldset, MyFlexColumn } from "aq-fe-framework/components";
import { useMyReactQuery } from "aq-fe-framework/hooks";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import DifficultyDetailCreate from "./DifficultyDetailCreate";
import DifficultyDetailDelete from "./DifficultyDetailDelete";
import DifficultyDetailDeleteList from "./DifficultyDetailDeleteList";
import DifficultyDetailUpdate from "./DifficultyDetailUpdate";

export default function DifficultyDetailRead({ evaDifficultyId, difficultData }: { evaDifficultyId: number; difficultData?: IDifficulty }) {
    const dis = useDisclosure(false);
    // const queryDifficultyDetail = useQuery<IDifficultyDetail[]>({
    //     queryKey: ["DifficultyDetailRead"],
    //     queryFn: () => {
    //         return mockData || [];
    //     },
    // });
    const queryDifficultyDetail = useMyReactQuery({
        queryKey: [`DifficultyDetailRead ${evaDifficultyId}`],
        axiosFn: async () => difficultyDetailService.GetDificultyDetailsByDifficultyId({ difficultyId: evaDifficultyId }),
        options: {
            enabled: dis[0],
            refetchOnWindowFocus: false
        }
    })
    const columns = useMemo<MRT_ColumnDef<IDifficultyDetail>[]>(() => [
        { header: "Mã mức", accessorKey: "code" },
        { header: "Tên độ khó", accessorKey: "name" },
        { header: "Ghi chú", accessorKey: "note" },
    ], []);


    return (
        <MyButtonModal variant="transparent" crudType="default" label="Chi tiết" disclosure={dis} title="Chi tiếc mức độ khó" modalSize={"90%"}>
            <Text>Thang đo độ khó: {difficultData?.name}</Text>
            <MyFieldset title={`Danh mục độ khó`}>
                <MyFlexColumn>
                    <MyDataTable

                        enableRowSelection={true}
                        enableRowNumbers={true}
                        renderTopToolbarCustomActions={({ table }) => (
                            <Group>
                                <DifficultyDetailCreate evaDifficultyId={evaDifficultyId} />
                                <MyButton color="green" leftSection={<IconUpload />}>Import</MyButton>
                                <MyButton color="teal" leftSection={<IconTableExport />}>Export</MyButton>
                                <DifficultyDetailDeleteList values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
                            </Group>
                        )}
                        columns={columns}
                        data={queryDifficultyDetail.data || []}
                        renderRowActions={({ row }) => (
                            <MyCenterFull>
                                <DifficultyDetailUpdate data={row.original} />
                                <DifficultyDetailDelete id={row.original.id!} code={row.original.code!} />
                            </MyCenterFull>
                        )}
                    />
                </MyFlexColumn>
            </MyFieldset>
        </MyButtonModal>
    );
}

// const mockData: IDifficultyDetail[] = [
//     {
//         id: 1,
//         maMucDo: "1",
//         tenMucDo: "Dễ",
//         ghiChu: '',
//     },
//     {
//         id: 2,
//         maMucDo: "2",
//         tenMucDo: "Trung bình",
//         ghiChu: '',
//     },
//     {
//         id: 3,
//         maMucDo: "3",
//         tenMucDo: "Khó",
//         ghiChu: '',
//     },
//     {
//         id: 4,
//         maMucDo: "4",
//         tenMucDo: "Rất khó",
//         ghiChu: '',
//     },
// ];
