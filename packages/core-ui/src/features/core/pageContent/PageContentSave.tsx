import { pageService } from "@aq-fe/core-ui/shared/APIs/pageService"
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton"
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation"
import { Page } from "@aq-fe/core-ui/shared/interfaces/Page"

export default function PageContentSave({ values }: { values: Page[] }) {
    const mutation = useCustomReactMutation({
        axiosFn: (mutateValue: Page[]) => pageService.updateList(mutateValue),
        mutationType: "update"
    })
    return (
        <CustomButton
            actionType="save"
            loading={mutation.isPending}
            onClick={() => {
                mutation.mutate(values)
            }}>
        </CustomButton>
    )
}
