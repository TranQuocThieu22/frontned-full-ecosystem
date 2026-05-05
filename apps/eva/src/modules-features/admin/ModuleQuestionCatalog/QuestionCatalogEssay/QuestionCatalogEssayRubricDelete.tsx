import { MyActionIconDelete } from "aq-fe-framework/components";

export default function QuestionCatalogEssayRubricDelete({ code, id }: { code: string, id: number }) {
    return <MyActionIconDelete contextData={code} onSubmit={() => { }} />
}