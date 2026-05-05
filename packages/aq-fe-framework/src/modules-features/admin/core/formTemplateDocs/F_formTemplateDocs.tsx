import { MyFlexEnd } from '@/components/Layouts/FlexEnd/MyFlexEnd'
import { Space } from '@mantine/core'
import { F_formTemplateDocs_Create } from './F_formTemplateDocs_Create'
import { F_formTemplateDocs_Read } from './F_formTemplateDocs_Read'

export function F_formTemplateDocs({ FormTypeId
}: {
    FormTypeId: number
}) {
    return (
        < >
            <MyFlexEnd>
                <F_formTemplateDocs_Create FormTypeId={FormTypeId} />
            </MyFlexEnd>
            <Space />
            <F_formTemplateDocs_Read FormTypeId={FormTypeId} />
        </>
    )
}
