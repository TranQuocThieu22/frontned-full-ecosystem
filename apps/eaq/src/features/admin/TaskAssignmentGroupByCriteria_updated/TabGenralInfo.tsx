"use client";

import { ITaskCriteriaUpdate } from "@/shared/interfaces/task/ITaskCriteriaUpdate";
import { SimpleGrid } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { CustomDateInput } from "@aq-fe/core-ui/shared/components/input/CustomDateInput";

export default function TabGenralInfo(
    {
        form,
        standardName,
        readOnly
    }:
        {
            form: UseFormReturnType<ITaskCriteriaUpdate>,
            standardName: string
            readOnly?: boolean
        }
) {
    return (
        <>
            <CustomTextInput
                mt="xs"
                label="Tiêu chuẩn"
                value={standardName}
                readOnly
            />
            <SimpleGrid cols={2}>
                <CustomDateInput
                    readOnly={readOnly}
                    mt="xs"
                    label="Ngày bắt đầu"
                    maxDate={form.getInputProps("endDate").value}
                    {...form.getInputProps("startDate")}
                />

                <CustomDateInput
                    readOnly={readOnly}
                    mt="xs"
                    label="Ngày kết thúc"
                    minDate={form.getInputProps("startDate").value}
                    {...form.getInputProps("endDate")}
                />
            </SimpleGrid>
            <CustomTextArea
                readOnly={readOnly}
                mt="xs"
                maxRows={10}
                label="Ghi chú"
                {...form.getInputProps("note")}
            />
        </>
    );
}
