import { branchService } from "@/shared/APIs/branchService";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";

export default function BranchCatalogDeleteList({ values }: { values: BaseEntity[] }) {
    return (
        <CustomButtonDeleteList
            contextData={values.map(item => item.code).join(", ")}
            onSubmit={() => branchService.deleteList(values)}
        />
    )
}
