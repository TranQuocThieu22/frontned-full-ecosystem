import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { MyButtonDeleteList } from 'aq-fe-framework/components';
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
export default function F12_5DeleteList({ values }: { values: BaseEntity[] }) {
    return <MyButtonDeleteList
        contextData={values.map(item => item.code).join(",")}
        onSubmit={() =>
            baseAxios.post("/roomType/deleteList", values.map(item => ({
                id: item.id,
                isEnabled: false
            })))
        }
    />
}
