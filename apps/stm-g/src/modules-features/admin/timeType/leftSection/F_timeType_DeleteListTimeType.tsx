import { service_timeType } from '@/api/services/service_timeType'
import { MyButtonDeleteList } from 'aq-fe-framework/components'
import { IBaseEntity } from 'aq-fe-framework/interfaces'

export default function F_timeType_DeleteListTimeType({ values }: { values: IBaseEntity[] }) {
    return <MyButtonDeleteList
        contextData={values.map(item => item.code).join(",")}
        onSubmit={() =>
            service_timeType.deleteList(values)
        }
    />
}

