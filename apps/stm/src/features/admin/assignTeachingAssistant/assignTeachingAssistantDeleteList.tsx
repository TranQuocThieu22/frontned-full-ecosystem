'use client'

import { CustomButtonDeleteList as MyButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList"
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity"

export default function AssignTeachingAssistantDeleteList({ values }: { values: BaseEntity[] }) {
    return <MyButtonDeleteList
        actionIconProps={{
            disabled: values.length === 0
        }}
        contextData={values.map(item => item.code).join(",")}
        onSubmit={() => { }}
    />
}

