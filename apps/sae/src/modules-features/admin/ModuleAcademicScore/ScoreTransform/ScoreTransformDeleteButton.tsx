'use client'
import { service_scoreTransform } from "@/api/services/service_scoreTransform";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";


export default function ScoreTransformDeleteButton({ id }: { id: number }) {
    return <CustomActionIconDelete onSubmit={async () => {
        return await service_scoreTransform.delete(id)
    }} />
}
