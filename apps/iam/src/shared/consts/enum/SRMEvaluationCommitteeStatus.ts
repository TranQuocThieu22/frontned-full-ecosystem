import { MantineColor } from "@mantine/core";
import { IconCheck, IconClock, TablerIcon } from "@tabler/icons-react";

export enum SRMEvaluationCommitteeStatusEnum {
    WaitingForMeeting = 1,
    Completed = 2
}

export const SRMEvaluationCommitteeStatusLabel: Record<SRMEvaluationCommitteeStatusEnum, string> = {
    [SRMEvaluationCommitteeStatusEnum.WaitingForMeeting]: "Chờ họp",
    [SRMEvaluationCommitteeStatusEnum.Completed]: "Hoàn thành",
};

export const SRMEvaluationCommitteeStatusColor: Record<SRMEvaluationCommitteeStatusEnum, MantineColor> = {
    [SRMEvaluationCommitteeStatusEnum.WaitingForMeeting]: "yellow",
    [SRMEvaluationCommitteeStatusEnum.Completed]: "green",
};

export const SRMEvaluationCommitteeStatusIcon: Record<SRMEvaluationCommitteeStatusEnum, TablerIcon> = {
    [SRMEvaluationCommitteeStatusEnum.WaitingForMeeting]: IconClock,
    [SRMEvaluationCommitteeStatusEnum.Completed]: IconCheck,
};

