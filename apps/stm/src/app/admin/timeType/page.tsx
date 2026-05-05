"use client"
import F_timeType_CreateUpdateTimeType from '@/features/admin/timeType/leftSection/F_timeType_CreateUpdateTimeType'
import F_timeType_DeleteListTimeType from '@/features/admin/timeType/leftSection/F_timeType_DeleteListTimeType'
import F_timeType_DeleteTimeType from '@/features/admin/timeType/leftSection/F_timeType_DeleteTimeType'
import F_timeType_ReadTimeTypes from '@/features/admin/timeType/leftSection/F_timeType_ReadTimeTypes'
import F_timeType_ReadTimeTypeDetail from '@/features/admin/timeType/rightSection/F_timeType_ReadTimeTypeDetail'
import { CustomPageContent } from '@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent'
import { Flex, Grid } from '@mantine/core'
import { MyCenterFull } from 'aq-fe-framework/components'
export default function Page() {
    return (
        <CustomPageContent>
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
        </CustomPageContent>
    )
}
