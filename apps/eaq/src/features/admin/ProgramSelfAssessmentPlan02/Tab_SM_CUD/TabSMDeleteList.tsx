import { IResource } from "@/shared/interfaces/resource/IResource";
import { MRT_Row } from "mantine-react-table";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";

interface Props {
    values: MRT_Row<IResource>[];
    onDeleteList: (rows: MRT_Row<IResource>[]) => void;
}

export default function ResourceMobilizationTabDeleteList(
    { values, onDeleteList }: Props

) {
    return (
        <CustomButtonDeleteList
            count={values.length}
            onSubmit={() => onDeleteList(values)}
        />
    )
}
