import { branchService } from "@/shared/APIs/branchService";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";

export default function BranchCatalogDelete({ values }: { values: BaseEntity }) {
    return (
        <CustomActionIconDelete
            contextData={values.code}
            onSubmit={() => branchService.delete(values.id!)}
        />
    )
}
