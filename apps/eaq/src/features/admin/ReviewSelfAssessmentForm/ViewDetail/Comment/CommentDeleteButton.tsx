import { service_EAQComment } from "@/shared/APIs/service_EAQComment";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";

interface Props {
    id: number,
    code?: string
}

export default function CommentDeleteButton({ id, code }: Props) {
    return (
        <CustomActionIconDelete
            contextData={code}
            onSubmit={() => {
                return service_EAQComment.delete(id);
            }}
        />
    )
}
