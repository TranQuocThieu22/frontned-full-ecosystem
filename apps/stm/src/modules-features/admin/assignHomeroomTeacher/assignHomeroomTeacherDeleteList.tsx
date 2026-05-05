'use client'

import { MyButtonDeleteList } from "aq-fe-framework/components"
import { IBaseEntity } from 'aq-fe-framework/interfaces'


export default function AssignHomeroomTeacherDeleteList({ values }: { values: IBaseEntity[] }) {
  return <MyButtonDeleteList
    actionIconProps={{
      disabled: values.length === 0
    }}
    contextData={values.map(item => item.code).join(",")}
    onSubmit={() => { }
    }
  />
}

