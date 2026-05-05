'use client';

import { service_EAQCriteria } from '@/shared/APIs/service_EAQCriteria';
import { ICriteria } from '@/shared/interfaces/criteria/Criteria';
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";

interface Props {
    values: ICriteria[]
    clearSelection: Function
}
export default function StandardStructure_DeleteListCriteria({
    values,
    clearSelection
}: Props) {
    return (
        <CustomButtonDeleteList
            count={values.length}
            onSubmit={() => {
                clearSelection()
                return service_EAQCriteria.deleteList(values);
            }}
        />
    );
}
