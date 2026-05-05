import { Badge } from "@mantine/core";
import {
    IconGitBranch,
    IconGitPullRequest,
    IconSparkles
} from "@tabler/icons-react";

export const ConditionStatusLabel: Record<number, string> = {
  1: "Mới",
  2: "Kế tiếp hướng nghiên cứu của chính nhóm tác giả",
  3: "Kế tiếp hướng nghiên cứu của người khác",
//   4: "Đạt sơ bộ",
};


export function ConditionStatusBadge({ status }: { status: number }) {
    switch (status) {
        case 1:
            return (
                <Badge w="100%" leftSection={<IconSparkles />} variant="light" color="blue" radius="lg">
                    {ConditionStatusLabel[1]}
                </Badge>
            );
        case 2:
            return (
                <Badge w="100%" leftSection={<IconGitPullRequest/>} variant="light" color="blue.5" radius="lg">
                    {ConditionStatusLabel[2]}
                </Badge>
            );
        case 3:
            return (
                <Badge w="100%" leftSection={<IconGitBranch />} variant="light" color="blue.9" radius="lg">
                    {ConditionStatusLabel[3]}
                </Badge>
            );
        // case 4:
        //     return (
        //         <Badge w="100%" leftSection={<IconChecks />} variant="light" color="green" radius="lg">
        //             {ConditionStatusLabel[4]}
        //         </Badge>
        //     );
        default:
            return (
                <></>
                // <Badge w="100%" leftSection={<IconHelpCircle />} variant="light" color="gray" radius="lg">
                //     Không có thông tin
                // </Badge>
            );
    }
}