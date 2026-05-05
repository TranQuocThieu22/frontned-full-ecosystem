'use client';


import { service_EAQTrainingProgram } from "@/shared/APIs/service_EAQTrainingProgram";
import { ITrainingProgram } from "@/shared/interfaces/trainingProgram/ITrainingProgram";
import { MRT_TableInstance } from "mantine-react-table";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";

export default function TrainingProgramListDeleteListButton({ table, isLoading }: { table: MRT_TableInstance<ITrainingProgram>, isLoading: boolean }) {
    const selectedRow = table.getSelectedRowModel().flatRows;
    return (
        <CustomButtonDeleteList
            loading={isLoading}
            count={selectedRow.length}
            onSubmit={() => {
                return service_EAQTrainingProgram.deleteList(selectedRow.flatMap((item) => item.original)).then(() => table.resetRowSelection());
            }}
        />
    )
}
