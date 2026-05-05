import { StandardSetTrainingProgram } from "@/shared/interfaces/standardSetTrainingProgram/TrainingProgramStandardSet";
import { service_EAQTrainingProgram } from "@/shared/APIs/service_EAQTrainingProgram";
import { MRT_TableInstance } from "mantine-react-table";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";

export default function StandardSetTrainingProgramDeleteListButton({
    table, isLoading
}: {
    table: MRT_TableInstance<StandardSetTrainingProgram>, isLoading: boolean
}) {
    const selectedRow = table.getSelectedRowModel().flatRows;

    return (
        <CustomButtonDeleteList
            loading={isLoading}
            count={selectedRow.length}
            onSubmit={async () => {
                return await service_EAQTrainingProgram.deleteListAccreditationTrainingPrograms(
                    selectedRow.flatMap((item) => item.original)).then(() => table.resetRowSelection());

            }}
        />
    );
}
