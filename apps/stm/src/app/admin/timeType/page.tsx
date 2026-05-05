"use client"
import F_timeType_CreateUpdateTimeType from '@/modules-features/admin/timeType/leftSection/F_timeType_CreateUpdateTimeType'
import F_timeType_DeleteListTimeType from '@/modules-features/admin/timeType/leftSection/F_timeType_DeleteListTimeType'
import F_timeType_DeleteTimeType from '@/modules-features/admin/timeType/leftSection/F_timeType_DeleteTimeType'
import F_timeType_ReadTimeTypes from '@/modules-features/admin/timeType/leftSection/F_timeType_ReadTimeTypes'
import F_timeType_ReadTimeTypeDetail from '@/modules-features/admin/timeType/rightSection/F_timeType_ReadTimeTypeDetail'
import { Flex, Grid } from '@mantine/core'
import { MyCenterFull, MyPageContent } from 'aq-fe-framework/components'
export default function Page() {
    return (
        <MyPageContent>
            <Grid>
                <Grid.Col span={{ base: 12, sm: 7 }}>
                    <F_timeType_ReadTimeTypes
                        enableRowSelection={true}
                        renderTopToolbarCustomActions={({ table }) => {
                            return (
                                <Flex gap={'md'} direction={{ base: "column", xs: "row" }}>
                                    <F_timeType_CreateUpdateTimeType />
                                    <F_timeType_DeleteListTimeType values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
                                </Flex>
                            )
                        }}
                        renderRowActions={({ row }) => {
                            return (
                                <MyCenterFull>
                                    <F_timeType_CreateUpdateTimeType values={row.original} />
                                    <F_timeType_DeleteTimeType values={row.original!} />
                                </MyCenterFull>
                            );
                        }}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 5 }}>
                    <F_timeType_ReadTimeTypeDetail />
                </Grid.Col>
            </Grid>
        </MyPageContent>
    )
}
