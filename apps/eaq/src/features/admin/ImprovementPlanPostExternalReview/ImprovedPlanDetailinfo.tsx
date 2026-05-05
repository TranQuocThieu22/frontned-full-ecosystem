import { Stack, Text } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { ITaskDetail } from "@/shared/interfaces/task/ITaskDetail";
import { formValuesType } from "@aq-fe/core-ui/shared/types/types";

interface ImprovedPlanDetailinfoViewModel {
    form: UseFormReturnType<formValuesType<ITaskDetail>>
}
export default function ImprovedPlanDetailinfo({ form }: ImprovedPlanDetailinfoViewModel) {
    return (
        <Stack gap="xs">
            <Text size="sm">
                <Text span fw={600}>
                    Mã hạn chế:
                </Text>{" "}
                {form.values.eaqAnalysis?.eaqLimitation?.code}
            </Text>
            <Text size="sm">
                <Text span fw={600}>
                    Tên hạn chế:
                </Text>{" "}
                {form.values.eaqAnalysis?.eaqLimitation?.name}
            </Text>
            <Text size="sm">
                <Text span fw={600}>
                    Mã công việc:
                </Text>{" "}
                {form.values.code}
            </Text>
            <Text size="sm">
                <Text span fw={600}>
                    Tên công việc:
                </Text>{" "}
                {form.values.name}
            </Text>
        </Stack>
    )
}
