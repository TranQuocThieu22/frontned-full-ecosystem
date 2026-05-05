import { Cycle } from "@/shared/interfaces/cycle/Cycle";
import { StandardSetTrainingProgram } from "@/shared/interfaces/standardSetTrainingProgram/TrainingProgramStandardSet";
import { service_EAQTrainingProgram } from "@/shared/APIs/service_EAQTrainingProgram";
import { NumberInput, Stack, Text, Table, Paper, Divider, Group, Badge } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";
import {
    CustomButtonCreateUpdate
} from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";

interface Props {
    standardSetTrainingProgram?: StandardSetTrainingProgram
    currentCycle?: Cycle
    isUpdate?: boolean
}

export function CycleCreateUpdate({ standardSetTrainingProgram, currentCycle, isUpdate }: Props) {
    const disc = useDisclosure();
    const form = useForm({
        initialValues: {
            order: currentCycle?.order || 1,
            startYear: currentCycle?.startYear || new Date().getFullYear(),
        },
        validate: {
            order: (value) => !value || isNaN(Number(value)) ? "Thứ tự chu kỳ không hợp lệ" : null,
            startYear: (value) => !value || isNaN(Number(value)) ? "Năm đánh giá không hợp lệ" : null,
        }
    });

    function handleSubmit(formValues: Cycle) {
        const validationResult = form.validate();
        if (validationResult.hasErrors) {
            return false;
        }
        type formPayload = Pick<Cycle, 'id' | 'eaqStandardSetTrainingProgramId' | 'order' | 'startYear'>
        const payload: formPayload = {
            ...(formValues.id && { id: formValues.id }),
            eaqStandardSetTrainingProgramId: standardSetTrainingProgram?.id,
            order: formValues.order,
            startYear: formValues.startYear
        }

        return isUpdate
            ? service_EAQTrainingProgram.updateCycle(payload)
            : service_EAQTrainingProgram.createCycle(payload);
    }

    useEffect(() => {
        if (currentCycle) {
            form.setValues({
                ...currentCycle,
                order: currentCycle.order || 1,
                startYear: currentCycle.startYear || new Date().getFullYear(),
            });
        }
    }, [currentCycle]);

    return (
        <CustomButtonCreateUpdate
            isUpdate={isUpdate}
            modalProps={{
                title: `Chi tiết chu kỳ kiểm định`,
                size: "80%"
            }}
            onSubmit={() => handleSubmit(form.values)}
            form={form}
            disclosure={disc}
        >
            <Stack gap="md" pb="md">
                {/* Program Information Section */}
                <Paper withBorder p="md" radius="md">
                    <Group mb="xs">
                        <Text fw={600} size="sm" c="dimmed">THÔNG TIN CHƯƠNG TRÌNH</Text>
                    </Group>
                    <Divider mb="md" />
                    <Table horizontalSpacing="md" verticalSpacing="sm">
                        <Table.Tbody>
                            <Table.Tr>
                                <Table.Td w="40%" style={{ verticalAlign: 'top' }}>
                                    <Text fw={500} size="sm">Mã chương trình đào tạo</Text>
                                </Table.Td>
                                <Table.Td>
                                    {standardSetTrainingProgram?.eaqTrainingProgram ? (
                                        <Text size="sm">
                                            <Text span fw={600}>
                                                {standardSetTrainingProgram.eaqTrainingProgram.code}
                                            </Text>
                                            {" - "}
                                            {standardSetTrainingProgram.eaqTrainingProgram.name}
                                        </Text>
                                    ) : (
                                        <Text size="sm" c="dimmed" fs="italic">
                                            Không có thông tin của chương trình đào tạo
                                        </Text>
                                    )}
                                </Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Td style={{ verticalAlign: 'top' }}>
                                    <Text fw={500} size="sm">Mã bộ tiêu chuẩn kiểm định</Text>
                                </Table.Td>
                                <Table.Td>
                                    {standardSetTrainingProgram?.eaqStandardSet ? (
                                        <Text size="sm">
                                            {standardSetTrainingProgram.eaqStandardSet.code}
                                        </Text>
                                    ) : (
                                        <Text size="sm" c="dimmed" fs="italic">
                                            Không có thông tin
                                        </Text>
                                    )}
                                </Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Td style={{ verticalAlign: 'top' }}>
                                    <Text fw={500} size="sm">Tên bộ tiêu chuẩn kiểm định</Text>
                                </Table.Td>
                                <Table.Td>
                                    {standardSetTrainingProgram?.eaqStandardSet ? (
                                        <Text size="sm">
                                            {standardSetTrainingProgram.eaqStandardSet.name}
                                        </Text>
                                    ) : (
                                        <Text size="sm" c="dimmed" fs="italic">
                                            Không có thông tin
                                        </Text>
                                    )}
                                </Table.Td>
                            </Table.Tr>
                        </Table.Tbody>
                    </Table>
                </Paper>

                {/* Cycle Details Section */}
                <Paper withBorder p="md" radius="md">
                    <Group mb="xs">
                        <Text fw={600} size="sm" c="dimmed">CHI TIẾT CHU KỲ</Text>
                    </Group>
                    <Divider mb="md" />
                    <Stack gap="md">
                        <NumberInput
                            label="Thứ tự chu kỳ"
                            description="Nhập số thứ tự của chu kỳ kiểm định"
                            withAsterisk
                            min={1}
                            placeholder="Ví dụ: 1, 2, 3..."
                            {...form.getInputProps("order")}
                        />
                        <NumberInput
                            label="Năm đánh giá"
                            description="Nhập năm bắt đầu đánh giá"
                            withAsterisk
                            min={2000}
                            max={2100}
                            placeholder="Ví dụ: 2024"
                            {...form.getInputProps("startYear")}
                        />
                    </Stack>
                </Paper>
            </Stack>
        </CustomButtonCreateUpdate>
    );
}
