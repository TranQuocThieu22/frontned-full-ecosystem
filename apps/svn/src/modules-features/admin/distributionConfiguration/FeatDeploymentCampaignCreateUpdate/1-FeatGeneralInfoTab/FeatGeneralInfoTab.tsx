import { EnumSurveyType, EnumSurveyTypeLabel } from "@/enums/EnumSurveyType"
import { Checkbox, Grid } from "@mantine/core"
import { MyDateInput, MyTextArea } from "aq-fe-framework/components"
import { MyButton, MyFlexColumn, MySelect, MyTextInput } from "aq-fe-framework/core"
import { utils_converter_mapEnumToSelectData } from "aq-fe-framework/utils"
import { useStoreDeploymentCampaign } from "../../useStoreDeploymentCampaign"
export default function FeatGeneralInfoTab() {
    const deploymentCampaignStore = useStoreDeploymentCampaign()
    return (
        <MyFlexColumn>
            <Grid>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <MyTextInput label="Mã chiến dịch" />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <MyTextInput label="Tên chiến dịch" />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 12 }}>
                    <MySelect
                        label="Phiếu khảo sát"
                        data={utils_converter_mapEnumToSelectData(EnumSurveyType, EnumSurveyTypeLabel)}
                        value={deploymentCampaignStore.state.couponType?.toString()}
                        onChange={(val) => {
                            const parsed = val !== null ? parseInt(val) as EnumSurveyType : undefined;
                            deploymentCampaignStore.setProperty("couponType", parsed);
                        }}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <MyDateInput label="Từ ngày" />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <MyDateInput label="Đến ngày" />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 12 }}>
                    <MyTextArea label="Ghi chú" />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <Checkbox label="Công bố" />
                </Grid.Col >


            </Grid>
            <MyButton actionType="save" />
        </MyFlexColumn>
    )
}
