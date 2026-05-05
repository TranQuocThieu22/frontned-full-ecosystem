import { titleService } from "@/shared/APIs/titleService";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";

interface Props {
    id: number,
    code?: string
}

export default function TopicRoleListDelete({ id, code }: Props) {
    return (
        <CustomActionIconDelete contextData={code} onSubmit={() => { return titleService.delete(id) }} />
    )
}
