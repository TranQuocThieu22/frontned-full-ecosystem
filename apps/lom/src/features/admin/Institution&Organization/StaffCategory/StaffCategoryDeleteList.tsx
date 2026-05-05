import { IBaseEntity } from '@/interfaces/shared-interfaces/Base'
import { CustomButtonDeleteList } from '@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList'
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance"

export default function StaffCategoryDeleteList({ values }: { values: IBaseEntity[] }) {
  return (
    <CustomButtonDeleteList
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


