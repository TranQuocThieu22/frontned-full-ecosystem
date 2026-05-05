import { service_certificate } from '@/api/services/service_certificate'
import { MyActionIconDelete } from 'aq-fe-framework/components'
import { IBaseEntity } from 'aq-fe-framework/interfaces'

export default function F_4rnlp1kp26_Delete({ values }: { values: IBaseEntity }) {
    return (
        <MyActionIconDelete
            contextData={values.code}
            onSubmit={() => service_certificate.delete(values.id!)}
        />
    )
}
