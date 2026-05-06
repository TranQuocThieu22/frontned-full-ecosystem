import { pageService } from "@aq-fe/aq-legacy-framework/shared/APIs/pageService"
import { CustomButton } from "@aq-fe/aq-legacy-framework/shared/components/button/CustomButton/CustomButton"
import { useLegacyReactMutation } from "@aq-fe/aq-legacy-framework/shared/hooks/core/useLegacyReactMutation"
import { Page } from "@aq-fe/aq-legacy-framework/shared/interfaces/Page"

export default function PageContentSave({ values }: { values: Page[] }) {
    const mutation = useLegacyReactMutation({
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
