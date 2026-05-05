import { service_EAQAnalysis } from "@/shared/APIs/service_EAQAnalysis";
import { ITaskDetailAnalysis } from "@/shared/interfaces/task/ITaskDetailAnalysis";
import { MRT_TableInstance } from "mantine-react-table";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";

interface IProps {
  table: MRT_TableInstance<ITaskDetailAnalysis>;
}

export default function TaskDeleteListButton({ table }: IProps) {
  const selectedRows = table.getSelectedRowModel().flatRows.map((row) => row.original);
  return (
    <CustomButtonDeleteList
      count={selectedRows.length}
      onSubmit={() => {
        return service_EAQAnalysis.deleteListTaskDetailAnalysis(selectedRows);
      }}
      onSuccess={() => {
        table.resetRowSelection();
      }}
    />
  );
}
