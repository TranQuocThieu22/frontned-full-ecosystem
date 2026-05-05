import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { MyButtonDeleteList } from 'aq-fe-framework/components';

export default function F_uqjkcmbrwq_DeleteList({ values }: { values: BaseEntity[] }) {
  return (
    <MyButtonDeleteList
      actionIconProps={{
        disabled: values.length === 0
      }}
      contextData={values.map(item => item.code).join(",")}
      onSubmit={() =>
        baseAxios.post("/account/deleteList", values.map(item => ({
          id: item.id,
          isEnabled: false
        })))
      }
    />
  )
}


