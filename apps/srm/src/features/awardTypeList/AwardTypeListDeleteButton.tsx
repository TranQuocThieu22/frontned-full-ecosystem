"use client";

import { AwardTypeService } from "@/shared/APIs/awardTypeService";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";

interface Props {
    id?: number;
    code?: string;
}

export default function AwardTypeListDeleteButton({ id, code }: Props) {
    return (
        <CustomActionIconDelete
            contextData={code}
            onSubmit={() => {
                return AwardTypeService.delete(id || -1);
            }}
        />
    );
}
