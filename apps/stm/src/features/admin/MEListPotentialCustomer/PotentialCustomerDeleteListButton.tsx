'use client'
import { CustomButtonDeleteList as MyButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList"
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity"

export default function PotentialCustomerDeleteListButton({ values }: { values: BaseEntity[] }) {
    return <MyButtonDeleteList
        contextData={values.map(item => item.code).join(",")}
        onSubmit={() => { }}
    />
}

