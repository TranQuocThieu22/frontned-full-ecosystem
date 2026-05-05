import { ITask } from "@/shared/interfaces/task/ITask";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";
import { MRT_Row } from "mantine-react-table";

interface Props {
    values: MRT_Row<ITask>[];
    onDeleteList: (values: MRT_Row<ITask>[]) => void;
}

export default function TaskAssignmentTabDeleteList(
    {
        values,
        onDeleteList,
    }: Props
) {
    return (
        <CustomButtonDeleteList
            count={values.length}
            onSubmit={() => onDeleteList(values)}
        />
    )
}
