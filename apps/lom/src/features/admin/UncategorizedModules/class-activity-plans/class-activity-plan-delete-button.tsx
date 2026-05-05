'use client'
import { ClassActivityPlanService } from "@/api/services/ClassActivityPlanService";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";

interface ClassActivityPlanDeleteButtonProps {
    id?: number,
    classCode?: string
}

export default function ClassActivityPlanDeleteButton({ id, classCode }: ClassActivityPlanDeleteButtonProps) {
    const contentDelete = "Lớp" + (classCode ?? "");

    return (
        <CustomActionIconDelete
            contextData={contentDelete}
            onSubmit={
                id
                    ? () => ClassActivityPlanService.delete(id)
                    : () => { }
            }
        />
    )
}

