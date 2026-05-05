import React from 'react'
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";

export default function QualityAssurancePlanDelete({ data }: any) {
    return (
        <CustomActionIconDelete
            contextData={data?.maHanChe}
            onSubmit={() => {
            }}
        />
    )
}
