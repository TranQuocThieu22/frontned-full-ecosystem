import { branchService } from "@/shared/APIs/branchService";
import { MyButtonDeleteList } from 'aq-fe-framework/components'
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity"

export default function F_gqe7967fsa_DeleteList({ values }: { values: BaseEntity[] }) {
    return <MyButtonDeleteList
        contextData={values.map(item => item.code).join(", ")}
        onSubmit={() => branchService.deleteList(values)}
    />
}
