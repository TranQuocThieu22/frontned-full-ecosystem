import { service_EAQLimitation } from "@/shared/APIs/service_EAQLimitation";
import ILimitation from "@/shared/interfaces/limitation/ILimitation";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";

interface Props {
    values: ILimitation[];
    resetRowSelection: Function
}

export default function CouncilRecommendationDeleteList({ values, resetRowSelection }: Props) {
    return (
        <CustomButtonDeleteList
            count={values.length}
            onSubmit={() => service_EAQLimitation.deleteList(values)}
            onSuccess={() => {
                resetRowSelection();
            }}
        />
    );
}
