import { MyActionIconDelete } from "aq-fe-framework/components";

export default function QuestionCatalogDelete({ code, id }: { code: string, id: string }) {
    return <MyActionIconDelete contextData={code} onSubmit={() => { }} />
}