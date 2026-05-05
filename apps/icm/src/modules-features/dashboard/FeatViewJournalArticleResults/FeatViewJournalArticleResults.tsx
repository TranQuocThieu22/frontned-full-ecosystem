import { Fieldset } from "@mantine/core";
import FeatViewBarChartResearchProjectTracking from "./FeatViewBarChartResearchProjectTracking";
import ViewLineChartPublicationTrends from "./FeatViewLineChartPublicationTrends";



export default function FeatViewJournalArticleResults() {
    return (
        <Fieldset legend="Kết quả thực hiện bài báo - tạp chí">
            <h2>Tổng số bài báo công bố: 2568</h2>
            <div style={{ display: 'flex', gap: '5px', marginBottom: '20px' }}>
                <div style={{ flex: 1, minWidth: '400px', overflow: 'hidden' }}>
                    <FeatViewBarChartResearchProjectTracking />
                </div>
                <div style={{ flex: 1, minWidth: '400px', overflow: 'hidden' }}>
                    <ViewLineChartPublicationTrends />
                </div>
            </div>
        </Fieldset>
    )
}