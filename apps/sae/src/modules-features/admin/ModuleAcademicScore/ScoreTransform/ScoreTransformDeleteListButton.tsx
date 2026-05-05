'use client'
import { service_scoreTransform } from "@/api/services/service_scoreTransform";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";


export default function ScoreTransformDeleteListButton({ id }: { id: number }) {
    return <CustomButtonDeleteList

        onSubmit={async () => {
            return await service_scoreTransform.delete(id)
        }} />
}
