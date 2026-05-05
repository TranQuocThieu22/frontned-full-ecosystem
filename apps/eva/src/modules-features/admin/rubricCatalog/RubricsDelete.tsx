import { rubricService } from "@/shared/APIs/rubricService";
import { MyActionIconDelete } from "aq-fe-framework/components";

export default function RubricsDelete({ code, id }: { code: string, id: number }) {
    return <MyActionIconDelete contextData={code} onSubmit={() => rubricService.delete(id)} />
}