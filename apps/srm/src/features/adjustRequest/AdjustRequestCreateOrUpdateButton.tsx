import { contractDetailService } from "@/shared/APIs/contractDetailService";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMContract } from "@/shared/interfaces/SRMContract";
import { SRMContractDetail } from "@/shared/interfaces/SRMContractDetail";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomFileInput } from "@aq-fe/core-ui/shared/components/input/CustomFileInput";
import { CustomNumberInput } from "@aq-fe/core-ui/shared/components/input/CustomNumberInput";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { formValuesType } from "@aq-fe/core-ui/shared/types/types";
import { fileUtils } from "@aq-fe/core-ui/shared/utils/fileUtils";
import { Box, Divider, Group, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import ChoseContractButton from "./ChoseContractButton";

interface IProps {
    initValues?: SRMContractDetail;
    actionType?: "create" | "update" | "viewDetail";
}

export default function AdjustRequestCreateOrUpdateButton({ initValues, actionType }: IProps) {
    const disc = useDisclosure();
    const academicYearStore = useAcademicYearStore();
    const [selectedContract, setSelectedContract] = useState<SRMContract | null>(initValues?.srmContract || null);

    const form = useForm<formValuesType<SRMContractDetail>>({
        mode: "uncontrolled",
        validate: {
            srmContractId: (value) => value ? null : 'Vui lòng chọn đề tài',
        }
    });

    useEffect(() => {
        if (!initValues) return;
        setSelectedContract(initValues.srmContract || null);
        form.setInitialValues(initValues);
        form.setValues(initValues);
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
                size: "60vw",
            }}
            scrollAreaAutosizeProps={{
                h: "auto"
            }}
            onSubmit={(formValues) => {
                if (actionType === "update" && initValues) {
                    setSelectedContract(null);
                    return contractDetailService.update(
                        {
                            ...formValues,
                            academicYearId: academicYearStore.state.academicYear?.id || 0,
                        }
                    );
                }
                setSelectedContract(null);
                return contractDetailService.create(
                    {
                        ...formValues,
                        academicYearId: academicYearStore.state.academicYear?.id || 0,
                    }
                );
            }}
            actionIconProps={{
                ...(actionType == "viewDetail" && ({
                    actionType: "view",
                    toolTipProps: { label: "Xem" },
                })),
            }}
            submitButtonProps={{
                hidden: actionType === "viewDetail",
            }}
            form={form}
            isUpdate={!!initValues}
        >
            <Group align="flex-end">
                <CustomTextInput
                    label="Tên đề tài"
                    value={topicName}
                    placeholder="Tìm kiếm đề tài"
                    readOnly={true}
                    leftSection={<IconSearch />}
                    flex={1}
                    disabled={actionType === "update"}
                    onClick={
                        () => !initValues && disc[1].open()
                    }
                    error={form.errors.srmContractId}
                />
                <Box display="none">
                    <ChoseContractButton
                        form={form}
                        disclosure={disc}
                        onSelect={handleContractSelected}
                    />
                </Box>
            </Group>
            <Divider
                my="xs"
                size="md"
                labelPosition="center"
                label={
                    <>
                        <Text size="sm" ml={5}>Danh sách các nội dung cần điều chỉnh</Text>
                    </>
                }
            />
            <CustomTextArea
                label="Nội dung điều chỉnh (giải trình lý do và nội dung thay đổi)"
                minRows={3}
                {...form.getInputProps("amendmentContent")}
                readOnly={actionType === "viewDetail"}
            />
            <CustomTextInput
                label="Thời gian thực hiện"
                {...form.getInputProps("duration")}
                readOnly={actionType === "viewDetail"}
            />
            <CustomTextInput
                label="Mục tiêu nghiên cứu"
                {...form.getInputProps("objective")}
                readOnly={actionType === "viewDetail"}
            />
            <CustomTextInput
                label="Nội dung của đề tài"
                {...form.getInputProps("content")}
                readOnly={actionType === "viewDetail"}
            />
            <CustomNumberInput
                label="Kinh phí thực hiện"
                {...form.getInputProps('totalCost')}
                inputType="currency"
                readOnly={actionType === "viewDetail"}
            />
            <CustomTextInput
                label="Sản phẩm đề tài"
                {...form.getInputProps("output")}
                readOnly={actionType === "viewDetail"}
            />
            <CustomTextInput
                label="Thành viên tham gia đề tài"
                {...form.getInputProps("member")}
                readOnly={actionType === "viewDetail"}
            />
            <CustomTextInput
                label="Đơn vị phối hợp thực hiện đề tài"
                {...form.getInputProps("collaboratingInstitution")}
                readOnly={actionType === "viewDetail"}
            />
            <CustomTextInput
                label="Tiến độ thực hiện đề tài"
                {...form.getInputProps("implementationProgress")}
                readOnly={actionType === "viewDetail"}
            />
            <CustomTextInput
                label="Phương pháp nghiên cứu đề tài"
                {...form.getInputProps("method")}
                readOnly={actionType === "viewDetail"}
            />
            <CustomFileInput
                label="File phiếu điều chỉnh"
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
                readOnly={actionType === "viewDetail"}
            />
        </CustomButtonCreateUpdate>
    );
}
