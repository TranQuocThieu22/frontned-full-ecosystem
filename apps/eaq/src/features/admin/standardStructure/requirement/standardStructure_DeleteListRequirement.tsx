"use client";

import { service_EAQRequirement } from "@/shared/APIs/service_EAQRequirement";
import { IRequirement } from "@/shared/interfaces/requirement/Requirement";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";

interface Props {
    values: IRequirement[]
    clearSelection: Function
}
export default function StandardStructure_DeleteListRequirement({ values, clearSelection }: Props) {
    return <CustomButtonDeleteList
        count={values.length}
        onSubmit={() => {
            clearSelection()
            return service_EAQRequirement.deleteList(values);
        }
        }
    />
}
