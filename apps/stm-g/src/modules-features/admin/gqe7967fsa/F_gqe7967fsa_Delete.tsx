import { service_branch } from '@/api/services/service_branch'
import { MyActionIconDelete } from 'aq-fe-framework/components'
import { IBaseEntity } from 'aq-fe-framework/interfaces'

export default function F_gqe7967fsa_Delete({ values }: { values: IBaseEntity }) {
    return (
        <MyActionIconDelete
            contextData={values.code}
            onSubmit={() => service_branch.delete(values.id!)}
        />
    )
}
