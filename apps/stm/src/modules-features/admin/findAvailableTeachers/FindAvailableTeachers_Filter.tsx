import ClassPeriod_Select from "@/module/classPeriod/adapter/ClassPeriod_Select";
import { Flex, Grid, Space } from "@mantine/core";
import { MyDateInput, MyFieldset } from "aq-fe-framework/components";
import { MyButton, MySelectFromAPI } from "aq-fe-framework/core";

export default function FindAvailableTeachers_Filter() {
    return (
        <MyFieldset title="Chọn bộ lọc">
            <Grid>
                <Grid.Col span={4}>
                    <MySelectFromAPI label="Chương trình" />
                </Grid.Col>
                <Grid.Col span={4}>
                    <MySelectFromAPI label="Bậc học" />
                </Grid.Col>
                <Grid.Col span={4}>
                    <MySelectFromAPI label="Chi nhánh" />
                </Grid.Col>
                <Grid.Col span={6}>
                    <MyDateInput label="Từ ngày" />
                </Grid.Col>
                <Grid.Col span={6}>
                    <MyDateInput label="Đến ngày" />
                </Grid.Col>
                <Grid.Col span={12}>
                    <ClassPeriod_Select />
                </Grid.Col>
            </Grid>
            <Space />
            <Flex justify={"end"}>
                <MyButton actionType="find" />
            </Flex>
        </MyFieldset>

    )
}
