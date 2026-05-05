import { contractService } from "@/shared/APIs/contractService";
import { SRMContract } from "@/shared/interfaces/SRMContract";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomTabs } from "@aq-fe/core-ui/shared/components/navigation/CustomTabs/CustomTabs";
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";
import { Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconClipboardText, IconClockHour9, IconCoins, IconUpload } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import AcceptanceRequestTab from "./AcceptanceRequestTab";
import BudgetUsageTab from "./BudgetUsageTab";
import WeightDistributionTab from "./WeightDistributionTab";

interface IProps {
    actionType?: "update" | "viewDetail",
    values?: SRMContract;
}
export default function FinalReportUpdateOrDetailButton({ values, actionType = "update" }: IProps) {
    const isUpdate = values != undefined;
    const disclosure = useDisclosure();
    const queryClient = useQueryClient();
    const [submitWeightFn, setSubmitWeightFn] = useState<() => void>();
    const form = useForm<SRMContract>({
        initialValues: values,
        validate: {
        },
    });

    const handleRegisterSubmit = useCallback((fn: () => void) => {
        setSubmitWeightFn(() => fn);
    }, []);

    const mutation = useCustomReactMutation({
        axiosFn: () => contractService.contractSubmitFinalReport({ SRMContractId: form.getValues().id! }),
        mutationType: "update",
        successNotification: "Nộp báo cáo thành công!",
        options: {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["contractFinalReportQuery"] });
                disclosure[1].close();
            },
        }
    })

    useEffect(() => {
        if (!values) return;
        const finalValues: SRMContract = {
            ...values,
            acceptanceRequest: values.acceptanceRequest ?? "",
            acceptanceAttachmentDetail: {
                fileName: values.acceptanceAttachmentPath,
            },
        };
        form.setInitialValues(finalValues); // dùng để reset sau này
        form.setValues(finalValues);
    }, [values]);


    return (
        <CustomButtonCreateUpdate
            scrollAreaAutosizeProps={{
                h: "auto",
            }}

            modalProps={{
                title: actionType == "update" ? "Cập nhật đề tài"
                    : "Chi tiết đề tài",
                size: "80%"
            }}
            disclosure={disclosure}
            onSubmit={() => {
                const totalAllocation = form.getValues().srmTopic?.srmTopicMembers?.reduce(
                    (sum, item) => sum + (item.timeAllocation || 0),
                    0
                ) || 0;
                if (totalAllocation > 100) {
                    return false;
                }
                if (actionType == "update") {
                    return contractService.updateContractFinalReport({
                        id: form.getValues().id,
                        code: form.getValues().code,
                        name: form.getValues().name,
                        concurrencyStamp: form.getValues().concurrencyStamp,
                        isEnabled: form.getValues().isEnabled,
                        usedTotalCost: form.getValues().usedTotalCost,
                        usedCentralBudget: form.getValues().usedCentralBudget,
                        usedProvincialBudget: form.getValues().usedProvincialBudget,
                        usedUniversityBudget: form.getValues().usedUniversityBudget,
                        usedOtherBudget: form.getValues().usedOtherBudget,
                        acceptanceRequest: form.getValues().acceptanceRequest,
                        acceptanceAttachmentPath: form.getValues().acceptanceAttachmentPath,
                        acceptanceAttachmentDetail: form.getValues().acceptanceAttachmentDetail
                    })
                }
            }}
            form={form}
            isUpdate={isUpdate}
            actionIconProps={{
                ...(actionType == "viewDetail" && ({
                    actionType: "view",
                    toolTipProps: { label: "Xem" },
                })),
            }}
            submitButtonProps={{
                hidden: true
            }}
        >
            <CustomTabs
                tabs={[
                    {
                        label: "Phân bố khối lượng",
                        leftSection: <IconClockHour9 size={16} />,
                        children: <WeightDistributionTab form={form} actionType={actionType} onSubmit={handleRegisterSubmit} />
                    },
                    {
                        label: "Kinh phí sử dụng",
                        leftSection: <IconCoins size={16} />,
                        children: <BudgetUsageTab form={form} actionType={actionType} />
                    },
                    {
                        label: "Đề nghị nghiệm thu",
                        leftSection: <IconClipboardText size={16} />,
                        children: <AcceptanceRequestTab form={form} actionType={actionType} />
                    }
                ]}
            />
            {
                actionType === "viewDetail" ? null :
                    <Group justify="end">
                        <CustomButton onClick={() => mutation.mutate()} leftSection={<IconUpload />} >Nộp báo cáo</CustomButton>
                        <CustomButton color="blue" onClick={() => submitWeightFn && submitWeightFn()} actionType={actionType === "update" ? "save" : undefined} >Lưu</CustomButton>
                    </Group>
            }
        </CustomButtonCreateUpdate >
    );
}
