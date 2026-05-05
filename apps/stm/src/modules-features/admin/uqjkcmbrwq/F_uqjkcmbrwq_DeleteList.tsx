import baseAxios from '@/api/config/baseAxios'
import { ISimpleViewModel } from '@/interfacesForViewModels/BaseModel/ISimpleViewModel'
import { MyButtonDeleteList } from 'aq-fe-framework/components'

export default function F_uqjkcmbrwq_DeleteList({ values }: { values: ISimpleViewModel[] }) {
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


