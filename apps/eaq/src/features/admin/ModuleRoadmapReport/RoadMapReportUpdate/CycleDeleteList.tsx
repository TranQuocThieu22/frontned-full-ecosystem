import { Cycle } from "@/shared/interfaces/cycle/Cycle";
import { service_EAQTrainingProgram } from "@/shared/APIs/service_EAQTrainingProgram";
import { MRT_TableInstance } from "mantine-react-table";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";

interface Props { }

export default function CycleDeleteList({
  table, isLoading
}: {
  table: MRT_TableInstance<Cycle>, isLoading: boolean
}) {
  const selectedRow = table.getSelectedRowModel().flatRows;

  return (
    <CustomButtonDeleteList
      loading={isLoading}
      count={selectedRow.length}
      onSubmit={async () => {
        return await service_EAQTrainingProgram.DeleteListCycle(
          selectedRow.flatMap((item) => item.original)).then(() => table.resetRowSelection());

      }}
    />
  );
}
