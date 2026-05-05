import { service_eventGroup } from '@/api/services/service_eventGroup'
import { CustomButtonDeleteList } from '@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList';
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";


export default function EventGroupDeleteListButton({ values }: { values: BaseEntity[] }) {
    return <CustomButtonDeleteList
        contextData={values.map(item => item.code).join(", ")}
        onSubmit={() =>
            service_eventGroup.deleteList(values)
        }
    />
}
