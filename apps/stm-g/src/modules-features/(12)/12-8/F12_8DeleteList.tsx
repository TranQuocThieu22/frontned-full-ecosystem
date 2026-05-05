import { service_timeCluster } from '@/api/services/service_timeCluster'
import { MyButtonDeleteList } from 'aq-fe-framework/components'
import { IBaseEntity } from "aq-fe-framework/interfaces"

export default function F12_8DeleteList({ values }: { values: IBaseEntity[] }) {
    return <MyButtonDeleteList
        contextData={values.map(item => item.code).join(", ")}
        onSubmit={() =>
            service_timeCluster.deleteList(values)
        }
    />
}