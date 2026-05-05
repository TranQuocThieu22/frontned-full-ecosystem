'use client';

import { service_EAQStandard } from '@/shared/APIs/service_EAQStandard';
import { IStandard } from '@/shared/interfaces/standard/Standard';
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";

interface Props {
    values: IStandard[]
    clearSelection: Function
}
export default function StandardStructure_DeleteListStandard({
    values,
    clearSelection
}: Props) {
    return (
        <CustomButtonDeleteList
            count={values.length}
            onSubmit={() => {
                clearSelection()
                return service_EAQStandard.deleteList(values);
            }}
        />
    );
}
