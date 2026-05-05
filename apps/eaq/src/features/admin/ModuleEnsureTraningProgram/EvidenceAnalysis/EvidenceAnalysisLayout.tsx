import AnalysisListTable
  from "@/features/admin/ModuleEnsureTraningProgram/EvidenceAnalysis/AnalysisList/AnalysisListTable";
import EvidenceListTable
  from "@/features/admin/ModuleEnsureTraningProgram/EvidenceAnalysis/EvidenceList/EvidenceListTable";
import TaskListTable from "@/features/admin/ModuleEnsureTraningProgram/EvidenceAnalysis/TaskList/TaskListTable";
import SyntheticTable from "@/features/admin/ModuleEnsureTraningProgram/EvidenceAnalysis/Synthetic/SyntheticTable";
import { IconChartAreaLine, IconDeviceSim, IconListDetails, IconReportAnalytics, } from "@tabler/icons-react";
import { CustomTabs } from "@aq-fe/core-ui/shared/components/navigation/CustomTabs/CustomTabs";

export default function EvidenceAnalysisLayout() {
  return (
    <CustomTabs
      tabs={[
        {
          label: "Danh sách phân tích",
          leftSection: <IconReportAnalytics size={16} />,
          children: <AnalysisListTable />,
        },
        {
          label: "Danh sách công việc",
          leftSection: <IconListDetails size={16} />,
          children: <TaskListTable />,
        },
        {
          label: "Danh sách minh chứng dự kiến",
          leftSection: <IconDeviceSim size={16} />,
          children: <EvidenceListTable />,
        },
        {
          label: "Tổng hợp phân tích",
          leftSection: <IconChartAreaLine size={16} />,
          children: <SyntheticTable />,
        },
      ]}
    />
  );
}
