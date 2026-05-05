'use client'
import { useForm } from "@mantine/form";
import { I6_3_3ReviewResearchOutline } from "./F6_3_3ReadReviewResearchOutline";

export default function F6_3_3CheckReviewResearchOutline({ values }: { values: I6_3_3ReviewResearchOutline }) {
    const form = useForm<I6_3_3ReviewResearchOutline>({
        initialValues
            : values
    })
    return (
        <div></div>
    )
}