'use client'
import { MyActionIconModal } from "@/components/ui/ActionIcons/ActionIconModal/MyActionIconModal";
import { IBaseEntity } from "@/interfaces/shared-interfaces/Base";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { ComponentProps } from "react";

interface IActionIconDelete extends Omit<ComponentProps<typeof MyActionIconModal>, "disclosure"> {
    onSubmit: () => void;
    onSuccess?: () => void;
    onError?: () => void;
}
export default function F_AssignEvaluationUnitDeleteList({ values }: { values: IBaseEntity[] }) {
    return <CustomButtonDeleteList
        contextData={values.map(item => item.code).join(",")}
        onSubmit={() =>
            baseAxios.post("/COEGradeSubject/deleteList", values.map(item => ({
                id: item.id,
                isEnabled: false
            })))
        }
    />
}
