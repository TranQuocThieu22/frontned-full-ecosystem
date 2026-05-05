import { service_department } from '@/api/services/service_department'
import { CustomButtonDeleteList } from '@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList';
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";


export default function OrganizingUnitDeleteListButton({ values }: { values: BaseEntity[] }) {
    return <CustomButtonDeleteList
        contextData={values.map(item => item.code).join(", ")}
        onSubmit={() =>
            service_department.deleteList(values)
        }
    />
}
