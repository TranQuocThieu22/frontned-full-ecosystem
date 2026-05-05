'use client'
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import { Box, Button, Checkbox, NumberInput, Text } from "@mantine/core";
import { useForm } from "@mantine/form";

interface I {
    datTatCa: boolean;
    tinChiMinMax: boolean;
    soTCMin?: number;
    soTCMax?: number;
}

export default function F_sofaqgcmfh_Setting() {
    const form = useForm<I>({
        initialValues: {
            datTatCa: false,
            tinChiMinMax: false,
            soTCMin: undefined,
            soTCMax: undefined,
        },
    });

    return (
        <MyButtonCreate
            label="Cài đặt"
            title="Điều kiện tự chọn"
            submitButton={<Button type="submit">Lưu</Button>}
            leftSection={undefined}
            form={form}
            onSubmit={() => {}}
        >
            <Checkbox
                label="Đạt tất cả"
                {...form.getInputProps("datTatCa", { type: "checkbox" })}
            />

            <Box mt="sm" style={{ border: "1px solid #ced4da", padding: "10px", borderRadius: "4px" }}>
                <Checkbox
                    label="Tín chỉ min/ max"
                    {...form.getInputProps("tinChiMinMax", { type: "checkbox" })}
                />
                <Box mt="sm" ml="lg">
                    <NumberInput
                        label={<Text size="sm">Số TC Min</Text>}
                        placeholder="Số TC Min"
                        {...form.getInputProps("soTCMin")}
                    />
                    <NumberInput
                        label={<Text size="sm">Số TC Max</Text>}
                        placeholder="Số TC Max"
                        mt="sm"
                        {...form.getInputProps("soTCMax")}
                    />
                </Box>
            </Box>
        </MyButtonCreate>
    );
}
