import { Fieldset } from "@mantine/core";
import FeatViewChartResearchProgress from "./FeatViewBarChartResearchProgress";
import FeatViewPieChartAcceptanceRating from "./FeatViewPieChartPublishedArticles";

export default function FeatViewResearchGroupActivities() {
    return (
        <Fieldset legend="Nhóm nghiên cứu thực hiện các hoạt động nghiên cứu khoa học">
            <h2>Số lượng nhóm nghiên cứu: 5</h2>
            <div style={{ display: 'flex', gap: '5px', marginBottom: '20px' }}>
                <div style={{ flex: 1, minWidth: '550px', overflow: 'hidden' }}>
                    <FeatViewChartResearchProgress />
                </div>
                <div style={{ flex: 1, minWidth: '190px', overflow: 'hidden' }}>
                    <FeatViewPieChartAcceptanceRating />
                </div>

            </div>
        </Fieldset>
    )
}