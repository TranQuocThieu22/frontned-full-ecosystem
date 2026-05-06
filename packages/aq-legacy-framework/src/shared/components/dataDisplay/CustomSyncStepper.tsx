import { SyncBatchLogStatusEnum, SyncBatchLogStatusLabel } from "@aq-fe/aq-legacy-framework/shared/const/enum/syncBatchLogStatusEnum";
import { SyncLogStepEnum, SyncLogStepLabel } from "@aq-fe/aq-legacy-framework/shared/const/enum/syncLogStepEnum";
import { Stepper } from "@mantine/core";
import { IconCircleX } from "@tabler/icons-react";
import { ComponentPropsWithoutRef, JSX, useMemo } from "react";
import { removeSyncMessagePrefix } from "@aq-fe/aq-legacy-framework/shared/const/enum/syncMessageEnum";
import { SyncBatchLog } from "@aq-fe/aq-legacy-framework/shared/interfaces/SyncBatchLog";

type StepState = "idle" | "pending" | "progress" | "completed" | "error";

interface CustomSyncStepperProps extends Omit<ComponentPropsWithoutRef<typeof Stepper>, "children" | "active" | "allowNextStepsSelect"> {
    steps: SyncLogStepEnum[];
    syncData?: SyncBatchLog | null;
}

export default function CustomSyncStepper({
    steps,
    syncData,
    iconSize = 40,
    ...rest
}: CustomSyncStepperProps) {
    // 4. Stepper state
    const activeStep = useMemo(() => {
        if (!syncData) return 0;

        // Thành công → tất cả step completed
        if (syncData.status === SyncBatchLogStatusEnum.Succeeded) return steps.length;

        const idx = steps.findIndex(s => s === syncData.currentStep);
        return idx >= 0 ? idx : 0;
    }, [syncData, steps]);

    const getStepState = (step: SyncLogStepEnum): StepState => {
        if (!syncData) return "idle";

        const stepIndex = steps.indexOf(step);
        const currentIndex = steps.indexOf(syncData.currentStep ?? -1);

        if (syncData.status === SyncBatchLogStatusEnum.Pending) {
            return stepIndex === 0 ? "pending" : "idle";
        }

        if (syncData.status === SyncBatchLogStatusEnum.Succeeded) {
            return "completed";
        }

        if (syncData.status === SyncBatchLogStatusEnum.Failed && stepIndex === currentIndex) {
            return "error";
        }

        if (stepIndex < currentIndex) return "completed";
        if (stepIndex === currentIndex) return "progress";

        return "idle";
    };

    const getStepDescription = (step: SyncLogStepEnum): string => {
        if (!syncData) return "Chưa bắt đầu";

        const stepIndex = steps.indexOf(step);
        const currentIndex = steps.indexOf(syncData.currentStep ?? -1);

        if (syncData.status === SyncBatchLogStatusEnum.Failed && stepIndex === currentIndex) {
            return SyncBatchLogStatusLabel[SyncBatchLogStatusEnum.Failed];
        }

        if (syncData.status === SyncBatchLogStatusEnum.Succeeded) {
            return SyncBatchLogStatusLabel[SyncBatchLogStatusEnum.Succeeded];
        }

        if (syncData.status === SyncBatchLogStatusEnum.Pending && stepIndex === 0) {
            return SyncBatchLogStatusLabel[SyncBatchLogStatusEnum.Pending];
        }

        if (stepIndex < currentIndex) {
            return SyncBatchLogStatusLabel[SyncBatchLogStatusEnum.Succeeded];
        }

        if (stepIndex === currentIndex) {
            return removeSyncMessagePrefix(syncData.message) || SyncBatchLogStatusLabel[SyncBatchLogStatusEnum.Processing];
        }

        return "Chưa bắt đầu";
    };

    const stepPresentation: Record<StepState, { state: "stepCompleted" | "stepProgress" | "stepInactive"; color?: string; icon?: JSX.Element }> = {
        completed: { state: "stepCompleted" },
        error: { state: "stepProgress", color: "red", icon: <IconCircleX size={16} color='red' /> },
        progress: { state: "stepProgress" },
        pending: { state: "stepProgress" },
        idle: { state: "stepInactive" },
    };

    return (
        <Stepper
            pt={5}
            iconSize={iconSize}
            active={activeStep}
            allowNextStepsSelect={false}
            orientation='vertical'
            {...rest}
        >
            {steps.map(step => {
                const state = getStepState(step);
                const presentation = stepPresentation[state];
                return (
                    <Stepper.Step
                        key={step}
                        label={SyncLogStepLabel[step]}
                        description={getStepDescription(step)}
                        loading={state === "progress" || state === "pending"}
                        state={presentation.state}
                        color={presentation.color}
                        icon={presentation.icon}
                    />
                );
            })}
        </Stepper>
    );
}