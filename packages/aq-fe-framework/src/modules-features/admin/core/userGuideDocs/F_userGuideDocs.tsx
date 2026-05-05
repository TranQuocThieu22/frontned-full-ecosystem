import { F_userGuideDocs_Read } from "./F_userGuideDocs_Read";

export function F_userGuideDocs({ GuidelineTypeId }: { GuidelineTypeId: number }) {
    return (
        <F_userGuideDocs_Read GuidelineTypeId={GuidelineTypeId} />
    )
}
