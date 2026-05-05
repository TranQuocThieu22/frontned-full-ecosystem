import { service_certificate } from '@/api/services/service_certificate'
import { MyButtonDeleteList } from 'aq-fe-framework/components'
import { IBaseEntity } from 'aq-fe-framework/interfaces'

export default function F_4rnlp1kp26_DeleteList({ values }: { values: IBaseEntity[] }) {
    return <MyButtonDeleteList
        contextData={values.map(item => item.code).join(",")}
        onSubmit={() => service_certificate.deleteList(values)}
    />
}