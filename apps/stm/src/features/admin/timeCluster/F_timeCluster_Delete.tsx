import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { MyActionIconDelete } from 'aq-fe-framework/components';
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";

export default function F_timeCluster_Delete({ values }: { values: BaseEntity }) {
    return (
        <MyActionIconDelete
            contextData={values.code}
            onSubmit={() => baseAxios.post("/TimeCluster/delete", { id: values.id })}
        />
    )
}
