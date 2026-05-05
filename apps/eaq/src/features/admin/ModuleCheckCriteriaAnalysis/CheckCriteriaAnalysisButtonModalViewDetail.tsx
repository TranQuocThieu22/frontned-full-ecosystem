import { service_EAQEvaluationPlan } from "@/shared/APIs/service_EAQEvaluationPlan";
import { ITaskDetail } from "@/shared/interfaces/task/ITaskDetail";
import { useDisclosure } from "@mantine/hooks";
import { IconAnalyze, IconNote } from "@tabler/icons-react";
import { useState } from "react";
import CriteriaAnalysisTab from "./CriteriaAnalysisTab";
import ExpectedEvidenceTab from "./ExpectedEvidenceTab";
import { MyButtonModal } from "@aq-fe/core-ui/shared/components/button/MyButtonModal";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomTabs } from "@aq-fe/core-ui/shared/components/navigation/CustomTabs/CustomTabs";

export default function CheckCriteriaAnalysisButtonModalViewDetail({
  values,
}: {
  values: ITaskDetail;
}) {
  const disc = useDisclosure();
  const [activeTab, setActiveTab] = useState<string | null>("CriteriaAnalysis");

  const query = useCustomReactQuery({
    queryKey: ["CheckCriteriaAnalysisButtonModalViewDetail", values.id],
    axiosFn: async () =>
      service_EAQEvaluationPlan.GetTaskDetailById({
        taskDetailId: values.id,
      }),
    options: {
      enabled: disc[0],
    },
  });

  return (
    <CustomButtonModal
      modalProps={{
        title: 'Chi tiết phân công tiêu chí',
        size: "90%",
      }}
      buttonProps={{
        size: "xs",
        color: "blue",
        children: "Xem chi tiết",
        variant: "outline",
      }}

      disclosure={disc}
    >
      <CustomTabs
        tabs={[
          {
            label: 'Phân tích tiêu chí',
            leftSection: < IconAnalyze />,
            children: <CriteriaAnalysisTab values={query.data} />

          },
          {
            label: 'Dự kiến minh chứng',
            leftSection: < IconNote />,
            children: <ExpectedEvidenceTab
              standardId={values.eaqCriteria?.eaqStandard?.code}
              criteriaId={values.eaqCriteria?.code}
              values={query.data}
            />
          }
        ]} />

    </CustomButtonModal>
  );
}
