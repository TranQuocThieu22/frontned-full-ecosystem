"use client";

import { Card, Fieldset, Grid, Group, SimpleGrid, Stack, Text } from "@mantine/core";

import F12_1_sharedCatalog from "./F12_1_sharedCatalog";
import F12_1_FixedAssetsCatalog from "./F12_1_FixedAssetsCatalog";
import F12_1_ShoppingCatalog from "./F12_1_ShoppingCatalog";

// interface I {
//     id?: number, name?: string, code?: string
// }
// export default function F12_1Read({ documentType }: { documentType: number }
// ) {
//     const query = useQuery<I[]>({
//         queryKey: ['F12_1Read', documentType],
//         queryFn: async () => {
//             const result = await baseAxios.get("/DocumentAttribute/GetByType?", { params: { documentType } })
//             return result.data?.data || []
//         },
//     })

//     const columns = useMemo<MRT_ColumnDef<I>[]>(
//         () => [
//             {
//                 header: "Mã loại văn bản",
//                 accessorKey: "code"
//             },
//             {
//                 header: "Tên Loại Văn Bản",
//                 accessorKey: "name"
//             }
//         ],
//         []
//     );

//     if (query.isLoading) return "Đang tải dữ liệu..."
//     if (query.isError) return "Có lỗi xảy ra!"
//     return (
//         <MyDataTable
//             columns={columns}
//             enableRowNumbers={true}
//             data={query.data!}
//             renderTopToolbarCustomActions={() => <F12_1Create documentType={documentType} />}
//             renderRowActions={({ row }) => {
//                 return (
//                     <MyCenterFull>
//                         <F12_1Update values={row.original} />
//                         <F12_1Delete id={row.original.id!} />
//                     </MyCenterFull>
//                 )
//             }}
//         />
//     )
// }

export default function F12_1Read() {
  return (
    <Fieldset legend={<Text fz={"h4"}>Danh mục hệ thống</Text>}>
      {/* <SimpleGrid cols={{ base: 1, sm: 1, md: 3 }}> */}
      <Grid>
        <Grid.Col span={{base:12,sm:12,md:12,lg:4}}>
        <F12_1_sharedCatalog />
        </Grid.Col>
        <Grid.Col span={{base:12,sm:12,md:12,lg:4}}>
        <F12_1_FixedAssetsCatalog />
        </Grid.Col>
        <Grid.Col span={{base:12,sm:12,md:12,lg:4}}>
        <F12_1_ShoppingCatalog />
        </Grid.Col>
      </Grid>
       
       
       
      {/* </SimpleGrid> */}
    </Fieldset>
  );
}




