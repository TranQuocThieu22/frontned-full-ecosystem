import { timeTypeService } from "@/shared/APIs/timeTypeService";
import { MyButtonDeleteList } from 'aq-fe-framework/components'
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity"

export default function F_timeType_DeleteListTimeType({ values }: { values: BaseEntity[] }) {
    return <MyButtonDeleteList
        contextData={values.map(item => item.code).join(",")}
        onSubmit={() =>
            timeTypeService.deleteList(values)
        }
    />
}

