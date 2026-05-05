import { service_COEGrade } from "@/api/services/service_COEGrade";
import { COEGrade } from "@/interfaces/shared-interfaces/COEGrade";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";
import { Indicator } from "@mantine/core";
import { notifications } from "@mantine/notifications";

interface SaveButtonProps {
    dataChange: COEGrade[];
    resetLocalChange: () => void;
}

export default function IRMApplySaveButton({ dataChange, resetLocalChange }: SaveButtonProps) {

    const gradeUpdateListMutation = useCustomReactMutation({
        axiosFn: () => service_COEGrade.updateList(dataChange),
        options: {
            onSuccess: () => {
                resetLocalChange();
            },
            onError: (error) => {
                notifications.show({
                    message: error.message,
                    color: "red",
                });
            }
        },
        mutationType: "update"
    })

    if (dataChange.length === 0) return <CustomButton actionType="save" disabled />

    return <Indicator
        inline
        label={String(dataChange.length)}
        size={17}
        color="red"
        offset={3}
    >
        <CustomButton
            actionType="save"
            onClick={() => {
                gradeUpdateListMutation.mutate();
            }}
        />
    </Indicator>

};
