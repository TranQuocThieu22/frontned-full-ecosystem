import MyButtonDeleteList from '@/components/Buttons/ButtonCRUD/MyButtonDeleteList';
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
;

export default function F8_4DeleteListCSSchedule({ values }: { values: BaseEntity[] }) {
    return <MyButtonDeleteList
        contextData={values.map(item => item.code).join(",")}
        onSubmit={() =>
            baseAxios.post("/CourseSection/deleteList", values.map(item => ({
                id: item.id,
                isEnabled: false
            })))
        }
    />
}