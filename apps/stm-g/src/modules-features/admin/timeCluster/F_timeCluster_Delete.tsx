import baseAxios from '@/api/config/baseAxios'
import { MyActionIconDelete } from 'aq-fe-framework/components'
import { IBaseEntity } from 'aq-fe-framework/interfaces'

export default function F_timeCluster_Delete({ values }: { values: IBaseEntity }) {
    return (
        <MyActionIconDelete
            contextData={values.code}
            onSubmit={() => baseAxios.post("/TimeCluster/delete", { id: values.id })}
        />
    )
}
