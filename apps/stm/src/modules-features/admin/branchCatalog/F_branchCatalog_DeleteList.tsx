import { service_branch } from '@/api/services/service_branch'
import { MyButtonDeleteList } from 'aq-fe-framework/components'
import { IBaseEntity } from 'aq-fe-framework/interfaces'

export default function F_branchCatalog_DeleteList({ values }: { values: IBaseEntity[] }) {
    return <MyButtonDeleteList
        contextData={values.map(item => item.code).join(", ")}
        onSubmit={() => service_branch.deleteList(values)}
    />
}
