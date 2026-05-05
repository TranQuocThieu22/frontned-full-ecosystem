import { service_EAQAnalysis } from "@/shared/APIs/service_EAQAnalysis";
import { IAnalysis } from "@/shared/interfaces/analysis/IAnalysis";
import { MRT_TableInstance } from "mantine-react-table";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";

interface IProps {
  table: MRT_TableInstance<IAnalysis>;
}

export default function AnalysisDeleteListButton({ table }: IProps) {
  const selectedRows = table.getSelectedRowModel().flatRows.map((row) => row.original);
  return (
    <CustomButtonDeleteList
      count={selectedRows.length}
      onSubmit={() => {
        return service_EAQAnalysis.deleteList(selectedRows);
      }}
      onSuccess={() => {
        table.resetRowSelection();
      }}
    />
  );
}
