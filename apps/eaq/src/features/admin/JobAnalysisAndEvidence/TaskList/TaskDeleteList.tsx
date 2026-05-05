import { service_EAQAnalysis } from "@/shared/APIs/service_EAQAnalysis";
import { ITaskDetailAnalysis } from "@/shared/interfaces/task/ITaskDetailAnalysis";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";

export default function TaskDeleteList({
  data,
  resetRowSelection,
}: {
  data: ITaskDetailAnalysis[];
  resetRowSelection: Function;
}) {
  return (
    <CustomButtonDeleteList
      count={data.length}
      onSubmit={() => {
        resetRowSelection();
        return service_EAQAnalysis.deleteListTaskDetailAnalysis(
          data.map((item) => ({ id: item.id } as BaseEntity))
        );
      }}
    />
  );
}
