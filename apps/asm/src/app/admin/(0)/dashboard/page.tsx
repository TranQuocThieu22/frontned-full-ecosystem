'use client'
import AQStatCard1 from "@/components/DataDisplay/StatCard/AQStatCard1";
import BarChart_BiddingDuringTheYear from "@/modules-features/(0)/MainDashboard/BarChart_BiddingDuringTheYear";
import BarChart_MaintainStatus from "@/modules-features/(0)/MainDashboard/BarChart_MaintainStatus";
import BarChart_ValueByDepartment from "@/modules-features/(0)/MainDashboard/BarChart_ValueByDepartment";
import BarChart_ContractorDistribution from "@/modules-features/(0)/MainDashboard/BarChart_ContractorDistribution";
import { Grid, Paper, ScrollArea, SimpleGrid } from "@mantine/core";
import { IconBusinessplan, IconCalendarDollar, IconReportMoney, IconTool } from "@tabler/icons-react";
import LineChart_TotalBudgetIn12Months from "@/modules-features/(0)/MainDashboard/LineChart_TotalBudgetIn12Months";
import { PieChart_TotalAssetByType } from "@/modules-features/(0)/MainDashboard/PieChart_TotalAssetByType";
import MultiBarChart_BuyRequestAndBudgetByUnit from "@/modules-features/(0)/MainDashboard/MultiBarChart_BuyRequestAndBudgetByUnit";
import MultiBarChart_InventoryProgressByUnit from "@/modules-features/(0)/MainDashboard/MultiBarChart_InventoryByUnit";
import BarChart_TotalDeprecatedAssetByDepartment from "@/modules-features/(0)/MainDashboard/BarChart_TotalDeprecatedAssetByDepartment";

export default function Page() {
    return (
        <>
            <SimpleGrid cols={{ base: 1, md: 2, xl: 4 }}>
                <AQStatCard1
                    title={"Tổng giá trị"} value={'125,56'}
                    unit="Tỉ VNĐ" description={"So với tháng trước"}
                    icons={<IconReportMoney opacity={"0.3"} style={{ width: '100%', height: '100%' }} stroke={1.5} />}
                    diff={9}
                />
                <AQStatCard1
                    title={"Giá trị tồn kho"} value={'25,56'}
                    unit="Tỉ VNĐ" description={"So với năm trước"}
                    icons={<IconBusinessplan opacity={"0.3"} style={{ width: '100%', height: '100%' }} stroke={1.5} />}
                    diff={14} />
                <AQStatCard1
                    title={"Đã chi trong năm"} value={'12'}
                    unit="Tỉ VNĐ" description={"So với năm trước"}
                    icons={<IconCalendarDollar opacity={"0.3"} style={{ width: '100%', height: '100%' }} stroke={1.5} />}
                    diff={37} />
                <AQStatCard1
                    title={"Tài sản cần bảo trì"} value={"523"} description={"So với tháng trước"}
                    icons={<IconTool opacity={"0.3"} style={{ width: '100%', height: '100%' }} stroke={1.5} />}
                    diff={-67} />
            </SimpleGrid>

            <Grid >
                <Grid.Col span={{ base: 12, lg: 6, xl: 7 }}>
                    <Paper mt={"md"} p={'24'} >
                        <LineChart_TotalBudgetIn12Months />
                    </Paper>
                </Grid.Col>
                <Grid.Col span={{ base: 12, lg: 6, xl: 5 }}>
                    <Paper mt={"md"} p={'24'}>
                        <PieChart_TotalAssetByType />
                    </Paper>
                </Grid.Col>
            </Grid>

            <Grid >
                <Grid.Col span={{ base: 12 }}>
                    <Paper mt={"md"} p={'24'}>
                        <MultiBarChart_BuyRequestAndBudgetByUnit />
                    </Paper>
                </Grid.Col>
            </Grid>

            <Grid >
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <Paper mt={"md"} p={'24'}>
                        <BarChart_BiddingDuringTheYear />
                    </Paper>
                </Grid.Col>
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <Paper mt={"md"} p={'24'}>
                        <BarChart_ContractorDistribution />
                    </Paper>
                </Grid.Col>
            </Grid>

            <Grid >
                <Grid.Col span={{ base: 12, lg: 12 }}>
                    <Paper mt={"md"} p={'24'}>
                        <BarChart_ValueByDepartment />
                    </Paper>
                </Grid.Col>
            </Grid>

            <Grid >
                <Grid.Col span={{ base: 12, lg: 12 }}>
                    <Paper mt={"md"} p={'24'}>
                        <MultiBarChart_InventoryProgressByUnit />
                    </Paper>
                </Grid.Col>
            </Grid>
            <Grid >
                <Grid.Col span={{ base: 12, sm: 5 }}>
                    <Paper mt={"md"} p={'24'}>
                        <BarChart_MaintainStatus />
                    </Paper>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 7 }}>
                    <Paper mt={"md"} p={'24'}>
                        <ScrollArea style={{ height: 360 }}>
                            <BarChart_TotalDeprecatedAssetByDepartment />
                        </ScrollArea>
                    </Paper>
                </Grid.Col>
            </Grid>
        </>
    )
}
