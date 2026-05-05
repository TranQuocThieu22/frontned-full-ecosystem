import { branchService } from "@/shared/APIs/branchService";
import { MyActionIconDelete } from 'aq-fe-framework/components'
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity"

export default function F_gqe7967fsa_Delete({ values }: { values: BaseEntity }) {
    return (
        <MyActionIconDelete
            contextData={values.code}
            onSubmit={() => branchService.delete(values.id!)}
        />
    )
}
