import { activityService } from "@/shared/APIs/activityService";
import { ActivityStateEnum, ActivityStateLabel } from "@/shared/interfaces/Activity";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { useCustomReactMutation } from "@aq-fe/aq-core-framework/shared/hooks/useCustomReactMutation";
import { useAuthenticateStore } from "@aq-fe/aq-core-framework/shared/stores/useAuthenticateStore";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { useDisclosure } from "@mantine/hooks";
import { IconBolt } from "@tabler/icons-react";
import { useState } from "react";

export default function ActivitiesUpdateState({
    activityId,
    initState,
}: {
    activityId?: string;
    initState?: number;
}) {
    const authenticateStore = useAuthenticateStore()
    const activityState = useState<number | undefined>(initState)
    const disc = useDisclosure(false);
    const updateMutation = useCustomReactMutation({
        mutationType: "update",
        serviceFn: () => activityService.changeState({
            id: activityId,
            state: Number(activityState[0])
        }),
        onSuccess: () => {
            disc[1].close()
        }
    })
    return (
        <CustomButtonModal
            disclosure={disc}
            modalProps={{
                title: "Thay đổi trạng thái",
                description: "Thay đổi trạng thái hoạt động",
            }}

            buttonProps={{
                actionType: "update",
                variant: "filled",
                leftSection: <IconBolt size={16} />,
                children: "Thay đổi trạng thái",
                color: "green"
            }}
        >
            <CustomSelect
                data={converterUtils.mapEnumToSelectData(ActivityStateEnum, ActivityStateLabel)}
                value={activityState[0]?.toString()}
                onChange={(value) => activityState[1](Number(value))}
            />
            <CustomButton
                actionType="save"
                onClick={() => updateMutation.mutate()}
                loading={updateMutation.isPending}
            >
                Cập nhật trạng thái
            </CustomButton>
        </CustomButtonModal>
    )
}
