import { Fieldset } from '@mantine/core';
import FeatViewAcceptanceRateByLevelChart from './FeatViewAcceptanceRateByLevelChart';
import FeatViewOngoingProjectsTrackingChartByYear from './FeatViewBarChartOngoingProjectsTrackingByYear';
import FeatViewGroupProjectDistributionChart from './FeatViewGroupProjectDistributionChart';
import FeatViewChartAcceptanceRating from './FeatViewPieChartAcceptanceRating';
export default function FeatViewChartFacultyResearchProjects() {

    return (
        <Fieldset legend="Giảng viên thực hiện Đề tài Nghiên cứu khoa học">

            <div style={{ display: 'flex', gap: '5px', marginBottom: '20px' }}>
                <div style={{ flex: 1, minWidth: '550px', overflow: 'hidden' }}>
                    <FeatViewGroupProjectDistributionChart />
                </div>
                <div style={{ flex: 1, minWidth: '190px', overflow: 'hidden' }}>
                    <FeatViewAcceptanceRateByLevelChart />

                </div>
            </div>
            <div style={{ display: 'flex', gap: '5px', marginBottom: '20px' }}>
                <div style={{ flex: 1, minWidth: '530px', overflow: 'hidden' }}>
                    <FeatViewOngoingProjectsTrackingChartByYear />
                </div>
                <div style={{ flex: 1, minWidth: '190px', overflow: 'hidden' }}>
                    <FeatViewChartAcceptanceRating />
                </div>

            </div>


        </Fieldset>
    )
}
