import { service_timeType } from '@/api/services/service_timeType'
import { MyActionIconDelete } from 'aq-fe-framework/components'
import { IBaseEntity } from 'aq-fe-framework/interfaces'

export default function F_timeType_DeleteTimeType({ values }: { values: IBaseEntity }) {
    return (
        <MyActionIconDelete
            contextData={values.code}
            onSubmit={() => service_timeType.delete(values.id!)}
        />
    )
}


