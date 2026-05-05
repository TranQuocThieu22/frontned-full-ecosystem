import { Fieldset } from "@mantine/core";
import FeatViewBarChartOngoingProjectsTrackingByYear from "./FeatViewBarChartOngoingProjectsTrackingByYear";
import FeatViewBarChartResearchProjectTracking from "./FeatViewBarChartResearchProjectTracking";

export default function FeatViewStudentResearchActives() {
    return (
        <Fieldset legend="Sinh viên thực hiện các hoạt động nghiên cứu theo khoa học">
            <div style={{ display: 'flex', gap: '5px', marginBottom: '20px' }}>
                <div style={{ flex: 1, minWidth: '510px', overflow: 'hidden' }}>
                    <FeatViewBarChartResearchProjectTracking />
                </div>
                <div style={{ flex: 1, minWidth: '190px', overflow: 'hidden' }}>
                    <FeatViewBarChartOngoingProjectsTrackingByYear />
                </div>
            </div>
        </Fieldset>
    )
}