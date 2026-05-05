import { analysisTypeEnum } from "@/shared/constants/enum/AnalysisTypeEnum";
import { service_EAQAnalysis } from "@/shared/APIs/service_EAQAnalysis";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { IconAlignBoxCenterStretch, IconCheck } from "@tabler/icons-react";
import CollectedEvidenceTable from "./TabCollectedEvidence/CollectedEvidenceTable";
import CompletedTaskTable from "./TabCompletedTask/CompletedTaskTable";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomTabs } from "@aq-fe/core-ui/shared/components/navigation/CustomTabs/CustomTabs";


export default function PeriodicQualityImprovementReportTabLayout() {
    const filterStore = useS_Shared_Filter();

    const periodicReportQuery = useCustomReactQuery({
        queryKey: ["PeriodicQualityImprovementReportTracking", filterStore.state.Phase?.id],
        axiosFn: () => {
            return service_EAQAnalysis.getEAQTaskDetailReportsByEAQPhaseId({ eaqPhaseId: filterStore.state.Phase?.id, analysisType: analysisTypeEnum.Limitation });
        },
        options: {
            enabled: !!filterStore.state.Phase?.id
        }
    })

    return (
        <CustomTabs
            tabs={[
                {
                    label: "Danh sách công việc đã thực hiện",
                    children: <CompletedTaskTable periodicReportQuery={periodicReportQuery} />,
                    leftSection: <IconCheck />
                },
                {
                    label: "Danh sách minh chứng được thu thập",
                    children: <CollectedEvidenceTable periodicReportQuery={periodicReportQuery} />,
                    leftSection: <IconAlignBoxCenterStretch />
                },
            ]}
        />
    );
};
