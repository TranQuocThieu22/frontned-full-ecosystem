import { pageService } from "@/APIs/pageService"
import { MyButton } from "@/core"
import { useMyReactMutation } from "@/hooks/custom-hooks/useMyReactMutation"
import { IPage } from "@/interfaces/IPage"

export default function PageContentSave({ values }: { values: IPage[] }) {
    const mutation = useMyReactMutation({
        axiosFn: (mutateValue: IPage[]) => pageService.updateList(mutateValue),
        mutationType: "update"
    })
    return (
        <MyButton
            actionType="save"
            loading={mutation.isPending}
            onClick={() => {
                mutation.mutate(values)
            }}>
        </MyButton>
    )
}
