import { emailTemplateService } from '@aq-fe/core-ui/shared/APIs/emailTemplateService'
import { CustomActionIconDelete } from '@aq-fe/core-ui/shared/components/button/CustomActionIconDelete'
import { BaseEntity } from '@aq-fe/core-ui/shared/interfaces/BaseEntity'


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
