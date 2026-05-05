import { contractService } from "@/shared/APIs/contractService";
import { EnumContractExecutionStatus } from "@/shared/consts/enum/EnumContractExecutionStatus";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMContract } from "@/shared/interfaces/SRMContract";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";
import { Tabs } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconCash, IconInfoCircle } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import TabCounterpartFunding from "./ExecuteContractCreateOrUpdate/TabCounterpartFunding";
import TabGeneralInfo from "./ExecuteContractCreateOrUpdate/TabGeneralInfo";

export default function ExecuteContractCreateOrUpdate(
    {
        data,
        loading
    }: {
        data?: any,
        loading?: boolean
    }
) {
    const queryClient = useQueryClient();
    const store = useAcademicYearStore();
    const disclosure = useDisclosure();

    const form = useForm<SRMContract>({
        // mode: "uncontrolled",
        initialValues: data ? {
            ...data,
        } : {
            code: "",
            name: "",
            contractNumber: "",
            srmTypeId: null,
            signingDate: null,
            duration: "",
            fromDate: null,
            toDate: null,
            attachmentDetail: null,
            attachmentPath: "",
            academicYearId: store.state.academicYear?.id,
            executionStatus: EnumContractExecutionStatus.InProgress
        },
        validate: {
            srmTopicId: (value) => (value ?? 0) > 0 ? null : "Vui lòng chọn mã đăng ký",
            code: (value) => (value?.length ?? 0) > 0 ? null : "Vui lòng nhập mã đề tài",
            name: (value) => (value?.length ?? 0) > 0 ? null : "Vui lòng nhập tên đề tài",
            fromDate: (start) => {
                const end = form.getValues().toDate;
                if (start && end && new Date(start) > new Date(end)) {
                    return "Ngày bắt đầu phải nhỏ hơn ngày kết thúc";
                }
                return null;
            },

            toDate: (end) => {
                const start = form.getValues().fromDate;
                if (start && end && new Date(start) > new Date(end)) {
                    return "Ngày kết thúc phải lớn hơn ngày bắt đầu";
                }
                return null;
            },

        },
    });

    const mutateCreate = useCustomReactMutation({
        axiosFn: () => contractService.create(form.getValues()),
        enableDefaultSuccess: false,
        enableDefaultError: false,
        options: {
            onSuccess: () => {
                disclosure[1].close();
                form.reset();
                queryClient.invalidateQueries({ queryKey: ["executeContractQuery_GetAll"] });
            },
            onError: () => {
            }
        }
    });
    const mutateUpdate = useCustomReactMutation({
        axiosFn: () => contractService.update(form.getValues()),
        enableDefaultSuccess: false,
        enableDefaultError: false,
        options: {
            onSuccess: () => {
                disclosure[1].close();
                form.reset();
                queryClient.invalidateQueries({ queryKey: ["executeContractQuery_GetAll"] });
            },
            onError: () => {
            }
        }
    });

    const handleSubmit = () => {
        if (mutateCreate.isPending || mutateUpdate.isPending) return;
        const validationResult = form.validate();
        if (validationResult.hasErrors) {
            // utils_notification_show({ crudType: "error", message: "Vui lòng kiểm tra lại thông tin nhập vào!" });
            return false;
        }
        if (!!data) {
            return mutateUpdate.mutate();
        } else {
            return mutateCreate.mutate();
        }
    }

    useEffect(() => {
        if (data && disclosure[0]) {
            form.setValues(data);
        }

        if (!disclosure[0]) {
            form.reset();
            form.clearErrors();
        }
    }, [data, disclosure[0]])

    return (
        <CustomButtonCreateUpdate
            isUpdate={!!data}

            modalProps={{
                title: "Chi tiết kiểm tra hồ sơ",
                size: "100%",
                // h: "800px",
            }}
            actionIconProps={{
                loading: loading,
                loaderProps: { color: "orange.5" },

            }}
            buttonProps={{
                loading: loading,

            }}

            submitButtonProps={{
                loading: mutateCreate.isPending || mutateUpdate.isPending

            }}
            disclosure={disclosure}
            onSubmit={handleSubmit}
            form={form}
        >
            <Tabs p={10} defaultValue="GeneralInformation" >
                <Tabs.List>
                    <Tabs.Tab
                        bg="rgba(131, 204, 235, 0.3)"
                        color="rgba(131, 204, 235, 1)"
                        value="GeneralInformation"
                        flex={1}
                        leftSection={<IconInfoCircle />}
                    >
                        Thông tin chung
                    </Tabs.Tab>

                    <Tabs.Tab
                        bg="rgba(247, 216, 54, 0.3)"
                        color="rgba(247, 216, 54, 1)"
                        value="CounterpartFunding"
                        flex={1}
                        leftSection={<IconCash />}
                    >
                        Kinh phí đối ứng
                    </Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel pt={20} value="GeneralInformation">
                    <TabGeneralInfo form={form} parentDisclosure={disclosure} isUpdate={!!data} />
                </Tabs.Panel>
                <Tabs.Panel pt={20} value="CounterpartFunding">
                    <TabCounterpartFunding form={form} />
                </Tabs.Panel>
            </Tabs>

            {/* <Stack p={10}>
                <MyButton 
                actionType="update"
                // onSubmit={handleSubmit}
                onClick={handleSubmit} 
                loading={mutateCreate.isPending || mutateUpdate.isPending} 
                disabled={mutateCreate.isPending || mutateUpdate.isPending} />
            </Stack> */}
        </CustomButtonCreateUpdate>
    )
}