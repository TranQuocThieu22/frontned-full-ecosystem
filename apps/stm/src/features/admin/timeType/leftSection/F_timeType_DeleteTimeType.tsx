import { timeTypeService } from "@/shared/APIs/timeTypeService";
import { MyActionIconDelete } from 'aq-fe-framework/components'
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity"

export default function F_timeType_DeleteTimeType({ values }: { values: BaseEntity }) {
    return (
        <MyActionIconDelete
            contextData={values.code}
            onSubmit={() => timeTypeService.delete(values.id!)}
        />
    )
}


