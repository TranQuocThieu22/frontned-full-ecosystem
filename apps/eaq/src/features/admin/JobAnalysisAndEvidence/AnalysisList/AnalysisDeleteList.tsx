import { service_EAQAnalysis } from "@/shared/APIs/service_EAQAnalysis";
import { IAnalysis } from "@/shared/interfaces/analysis/IAnalysis";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";

export default function AnalysisDeleteList({
  data,
  resetRowSelection,
}: {
  data: IAnalysis[];
  resetRowSelection: Function;
}) {
  return (
    <CustomButtonDeleteList
      count={data.length}
      onSubmit={() => {
        resetRowSelection();
        return service_EAQAnalysis.deleteList(data);
      }}
    />
  );
}
