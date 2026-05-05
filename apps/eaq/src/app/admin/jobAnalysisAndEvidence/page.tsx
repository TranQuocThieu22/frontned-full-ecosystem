"use client";

import AnalysisTable from "@/features/admin/JobAnalysisAndEvidence/AnalysisList/AnalysisTable";
import AnalysisSummaryTable from "@/features/admin/JobAnalysisAndEvidence/AnalysisSummaryList/AnalysisSummaryTable";
import EstimatedEvidenceTable from "@/features/admin/JobAnalysisAndEvidence/EvidenceList/EvidenceTable";
import TaskTable from "@/features/admin/JobAnalysisAndEvidence/TaskList/TaskTable";
import { CustomTabs } from "@aq-fe/core-ui/shared/components/navigation/CustomTabs/CustomTabs";
import { IconChartAreaLine, IconDeviceSim, IconListDetails, IconReportAnalytics, } from "@tabler/icons-react";

export default function Page() {
  return (
    <CustomTabs
      defaultValue={"Danh sách phân tích"}
      tabs={[
        {
          label: "Danh sách phân tích",
          children: <AnalysisTable />,
          leftSection: <IconReportAnalytics size={16} />,
        },
        {
          label: "Danh sách công việc",
          children: <TaskTable />,
          leftSection: <IconListDetails size={16} />,
        },
        {
          label: "Danh sách minh chứng dự kiến",
          children: <EstimatedEvidenceTable />,
          leftSection: <IconDeviceSim size={16} />,
        },
        {
          label: "Tổng hợp phân tích",
          children: <AnalysisSummaryTable />,
          leftSection: <IconChartAreaLine size={16} />,
        },
      ]}
    />
  );
}
