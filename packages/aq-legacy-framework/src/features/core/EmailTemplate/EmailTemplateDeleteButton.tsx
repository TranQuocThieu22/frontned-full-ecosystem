import { emailTemplateService } from '@aq-fe/aq-legacy-framework/shared/APIs/emailTemplateService'
import { CustomActionIconDelete } from '@aq-fe/aq-legacy-framework/shared/components/button/CustomActionIconDelete'
import { BaseEntity } from '@aq-fe/aq-legacy-framework/shared/interfaces/BaseEntity'


export function MailTemplateDeleteButton({ values }: { values: BaseEntity }) {
    return (
        <CustomActionIconDelete
            contextData={values?.name}
            onSubmit={() => {
                return emailTemplateService.delete(values.id!)
            }}
        />
    )
}
