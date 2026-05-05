import { timeClusterService } from "@/shared/APIs/timeClusterService";
import { MyButtonDeleteList } from 'aq-fe-framework/components'
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity"

export default function F_timeCluster_DeleteList({ values }: { values: BaseEntity[] }) {
    return <MyButtonDeleteList
        contextData={values.map(item => item.code).join(", ")}
        onSubmit={() =>
            timeClusterService.deleteList(values)
        }
    />
}