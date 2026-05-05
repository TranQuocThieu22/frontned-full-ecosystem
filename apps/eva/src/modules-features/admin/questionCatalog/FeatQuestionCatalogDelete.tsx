import { questionService } from '@/shared/APIs/questionService'
import { MyActionIconDelete } from 'aq-fe-framework/components'
import { IBaseEntity } from 'aq-fe-framework/interfaces'

export default function FeatQuestionCatalogDelete({ values }: { values: IBaseEntity }) {
    return (
        <MyActionIconDelete
            contextData={values.code}
            onSubmit={() => questionService.delete(values.id!)}
        />
    )
}
