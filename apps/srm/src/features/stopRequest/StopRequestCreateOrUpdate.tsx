import { contractSuspendService } from "@/shared/APIs/contractSuspendService";
import { EnumContractSuppendType, EnumLabelContractSuppendType } from "@/shared/consts/enum/EnumContractSuppendType";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMContract } from "@/shared/interfaces/SRMContract";
import { SRMContractSuspend } from "@/shared/interfaces/SRMContractSuspend";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomFileInput } from "@aq-fe/core-ui/shared/components/input/CustomFileInput";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { formValuesType } from "@aq-fe/core-ui/shared/types/types";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { fileUtils } from "@aq-fe/core-ui/shared/utils/fileUtils";
import { Box, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import StopRequestChoice from "./StopRequestChoice";

export default function StopRequestCreateOrUpdate({ initValues }: { initValues?: SRMContractSuspend }) {
    const disc = useDisclosure();
    const academicYearStore = useAcademicYearStore();
    const [selectedContract, setSelectedContract] = useState<SRMContract | null>(initValues?.srmContract || null);

    const form = useForm<formValuesType<SRMContractSuspend>>({
        mode: "uncontrolled",
        validate: {
            srmContractId: (value) => value ? null : 'Vui lòng chọn đề tài',
            type: (value) => value ? null : 'Vui lòng chọn loại yêu cầu dừng thực hiện',
        }
    });

    useEffect(() => {
        if (initValues) {
            setSelectedContract(initValues.srmContract || null);
            form.setInitialValues(initValues);
            form.setValues(initValues);
        }
    }, [initValues]);

    const handleContractSelected = (contract: SRMContract) => {
        setSelectedContract(contract);
        form.setFieldValue("srmContractId", contract.id);
        form.setFieldValue("srmContract", contract);
    };

    const topicName = selectedContract ? `${selectedContract?.code} - ${selectedContract?.name}` : "";

    return (
        <CustomButtonCreateUpdate
            modalProps={{
                size: "xl"
            }}
            scrollAreaAutosizeProps={{
                h: "auto"
            }}
            onSubmit={(formValues) => {
                if (!!initValues) {
                    setSelectedContract(null);
                    return contractSuspendService.update(
                        {
                            ...formValues,
                            academicYearId: academicYearStore.state.academicYear?.id || 0,
                        }
                    );
                }
                setSelectedContract(null);
                return contractSuspendService.create(
                    {
                        ...formValues,
                        academicYearId: academicYearStore.state.academicYear?.id || 0,
                    }
                );
            }}
            form={form}
            isUpdate={!!initValues}
        >
            <Group align="flex-end">
                <CustomTextInput
                    label="Chọn đề tài"
                    value={topicName}
                    withAsterisk
                    placeholder="Tìm kiếm đề tài"
                    readOnly={true}
                    leftSection={<IconSearch />}
                    flex={1}
                    onClick={!!initValues ? undefined : disc[1].open}
                    error={form.errors.srmContractId}
                />
                <Box display="none">
                    <StopRequestChoice
                        form={form}
                        disclosure={disc}
                        onSelect={handleContractSelected}
                    />
                </Box>
            </Group>
            <CustomSelect
                label="Loại yêu cầu dừng thực hiện"
                withAsterisk
                data={converterUtils.mapEnumToSelectData(EnumContractSuppendType, EnumLabelContractSuppendType)}
                {...form.getInputProps("type")}
                value={form.values?.type?.toString()}
                onChange={(value: any) => form.setFieldValue("type", parseInt(value))}
            />
            <CustomTextArea
                label="Lý do tạm dừng/ đình chỉ"
                minRows={3}
                {...form.getInputProps("reason")}
            />
            <CustomFileInput
                label="File tờ trình xin tạm dừng/ đình chỉ"
                accept=".pdf"
                placeholder={form.values.attachmentDetail?.fileName || "Chọn file"}
                defaultValue={new File([], initValues?.attachmentPath?.split("/").at(-1) || "")}
                onChange={async (file) => {
                    if (!file) return;
                    form.setFieldValue(
                        "attachmentDetail",
                        await fileUtils.fileToAQDocumentType(file)
                    );
                }}
                error={form.errors.fileDetail}
            />
        </CustomButtonCreateUpdate>
    );
}
