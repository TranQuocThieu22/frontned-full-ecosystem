import { service_EAQAnalysis } from "@/shared/APIs/service_EAQAnalysis";
import { ITaskDetailEvidence } from "@/shared/interfaces/evidence/ITaskDetailEvidence";
import { MRT_TableInstance } from "mantine-react-table";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";

interface IProps {
  table: MRT_TableInstance<ITaskDetailEvidence>;
}

export default function EvidenceDeleteListButton({ table }: IProps) {
  const selectedRows = table.getSelectedRowModel().flatRows.map((row) => row.original);
  return (
    <CustomButtonDeleteList
      count={selectedRows.length}
      onSubmit={() => {
        return service_EAQAnalysis.deleteListTaskDetailEvidenceAnalysis(
          selectedRows.map((item) => ({ id: item.id }))
        );
      }}
      onSuccess={() => {
        table.resetRowSelection();
      }}
    />
  );
}
