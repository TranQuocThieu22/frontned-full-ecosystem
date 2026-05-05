import { SRMContract } from "@/shared/interfaces/SRMContract";
import { SRMLiquidationMinute } from "@/shared/interfaces/SRMLiquidationMinute";
import { CustomDateInput } from "@aq-fe/core-ui/shared/components/input/CustomDateInput";
import { CustomFileInput } from "@aq-fe/core-ui/shared/components/input/CustomFileInput";
import { CustomNumberInput } from "@aq-fe/core-ui/shared/components/input/CustomNumberInput";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { fileUtils } from "@aq-fe/core-ui/shared/utils/fileUtils";
import { Box, Group, Stack } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import ChoseContractButton from "./ChoseContractButton";

interface IProps {
    form: UseFormReturnType<SRMLiquidationMinute>;
    actionType?: "update" | "create";
    values?: SRMLiquidationMinute;
}

export default function GeneralInfomationTab({ form, actionType, values }: IProps) {
    const disc = useDisclosure();
    const [selectedContract, setSelectedContract] = useState<SRMContract | null>(values?.srmContract || null);
    const topicName = selectedContract ? `${selectedContract?.code} - ${selectedContract?.srmTopic?.registerName}` : "";
    const totalCost = selectedContract?.totalCost || 0;
    const usedTotalCost = selectedContract?.usedTotalCost || 0;
    const handleContractSelected = (contract: SRMContract) => {
        setSelectedContract(contract);
        form.setFieldValue("srmContractId", contract.id);
        form.setFieldValue("srmContract", contract);
    };
    return (
        <Stack>
            <Group align="flex-end">
                <CustomTextInput
                    label="Chọn đề tài thanh lý"
                    value={topicName}
                    placeholder="Chọn đề tài thanh lý"
                    readOnly={true}
                    leftSection={<IconSearch />}
                    flex={1}
                    disabled={actionType === "update"}
                    onClick={disc[1].open}
                    error={form.errors.srmContractId}
                    withAsterisk
                />
                <Box display="none">
                    <ChoseContractButton
                        form={form}
                        disclosure={disc}
                        onSelect={handleContractSelected}
                    />
                </Box>
            </Group>

            <CustomDateInput label="Ngày biên bản"
                {...form.getInputProps("liquidationDate")}
                withAsterisk
            />
            <CustomTextInput
                label="Số biên bản"
                {...form.getInputProps("minuteNumber")}
                withAsterisk
            />
            <CustomNumberInput
                label="Kinh phí dự đoán"
                value={totalCost}
                inputType="currency"
                disabled={true}
            />
            <CustomNumberInput
                label="Kinh phí đề nghị"
                {...form.getInputProps("proposedBudget")}
                inputType="currency"
            />
            <CustomNumberInput
                label="Kinh phí thanh toán"
                value={usedTotalCost}
                inputType="currency"
                disabled={true}
            />
            <CustomNumberInput
                label="Kinh phí hoàn trả"
                {...form.getInputProps("refundedBudget")}
                inputType="currency"
            />
            <CustomFileInput
                label="File biên bản thanh lý"
                accept=".pdf"
                placeholder={form.values.attachmentDetail?.fileName || "Chọn file"}
                defaultValue={new File([], values?.attachmentPath?.split("/").at(-1) || "")}
                onChange={async (file) => {
                    if (!file) return;
                    form.setFieldValue(
                        "attachmentDetail",
                        await fileUtils.fileToAQDocumentType(file)
                    );
                }}
                error={form.errors.fileDetail}
            />
        </Stack>
    );
}

