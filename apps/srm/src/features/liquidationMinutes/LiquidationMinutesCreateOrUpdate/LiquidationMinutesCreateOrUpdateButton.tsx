import { liquidationMinuteService } from "@/shared/APIs/liquidationMinuteService";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMLiquidationMinute } from "@/shared/interfaces/SRMLiquidationMinute";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { Tabs } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconCoins, IconInfoCircle } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import GeneralInfomationTab from "./GeneralInfomationTab";
import PaymentDetailTab from "./PaymentDetailTab";

interface IProps {
    actionType?: "update" | "create",
    values?: SRMLiquidationMinute;
}
export default function LiquidationMinutesCreateOrUpdate({ values, actionType = "create" }: IProps) {
    const academicYearStore = useAcademicYearStore();
    const isUpdate = values != undefined;
    const disclosure = useDisclosure();
    const queryClient = useQueryClient();
    const form = useForm<SRMLiquidationMinute>({
        initialValues: values,
        mode: "uncontrolled",
        validate: {
            srmContractId: (value) => value ? null : 'Đề tài thanh lý được để trống',
            liquidationDate: (value) => value ? null : 'Ngày biên bản được để trống',
            minuteNumber: (value) => value ? null : 'Số biên bản được để trống',
        },
        onValuesChange: (values) => {
            form.setFieldValue(
                "totalCost",
                (values.centralBudget || 0) +
                (values.provincialBudget || 0) +
                (values.universityBudget || 0) +
                (values.otherBudget || 0)
            );
        }
    });

    function handleSubmit(formValues: SRMLiquidationMinute, isUpdate: boolean) {
        if (!isUpdate) {
            return liquidationMinuteService.create(
                {
                    ...formValues,
                    academicYearId: academicYearStore?.state?.academicYear?.id || 0,
                });
        }
        else {
            return liquidationMinuteService.update(
                {
                    ...formValues,
                    academicYearId: academicYearStore?.state?.academicYear?.id || 0,
                });
        }
    }

    useEffect(() => {
        if (!values) return;
        const finalValues: SRMLiquidationMinute = {
            ...values,
            attachmentDetail: {
                fileName: values.attachmentPath,
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
                size: "80%"
            }}
            disclosure={disclosure}
            onSubmit={() => handleSubmit(form.getValues(), isUpdate)}
            form={form}
            isUpdate={isUpdate}
        >
            <Tabs
                variant="default"
                defaultValue="generalInfomation"
                styles={{
                    tab: {
                        fontWeight: 500,
                        padding: "12px 12px",
                    },
                    tabLabel: {
                        display: "flex",
                        alignItems: "center",
                        fontSize: "15px",
                        gap: 6,
                    },
                }}
            >
                <Tabs.List mb={10} grow justify="space-between">
                    <Tabs.Tab
                        value="generalInfomation"
                        leftSection={<IconInfoCircle />}
                        style={{ backgroundColor: "#e3f2fd", color: "#0d47a1" }}
                    >
                        Thông tin chung
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="paymentDetail"
                        leftSection={<IconCoins size={16} />}
                        style={{ backgroundColor: "#e8f5e9", color: "#2e7d32" }}
                    >
                        Chi tiết thanh toán
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="generalInfomation" mt={16}>
                    <GeneralInfomationTab values={values} form={form} actionType={actionType} />
                </Tabs.Panel>

                <Tabs.Panel value="paymentDetail" mt={16}>
                    <PaymentDetailTab form={form} actionType={actionType} />
                </Tabs.Panel>

            </Tabs>
        </CustomButtonCreateUpdate >
    );
}
