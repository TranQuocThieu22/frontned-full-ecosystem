import { emailTemplateService } from '@/APIs/emailTemplateService'
import { MyActionIconDelete } from '@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete'
import { IBaseEntity } from '@/interfaces'


export function MailTemplateDeleteButton({ values }: { values: IBaseEntity }) {
    return (
        <MyActionIconDelete
            contextData={values?.name}
            onSubmit={() => {
                return emailTemplateService.delete(values.id!)
            }}
        />
    )
}
