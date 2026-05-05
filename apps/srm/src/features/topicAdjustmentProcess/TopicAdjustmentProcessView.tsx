import { SRMContractDetail } from "@/shared/interfaces/SRMContractDetail";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomTabs } from "@aq-fe/core-ui/shared/components/navigation/CustomTabs/CustomTabs";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";
import Tab_TAP_ApplicantList from "./TopicAdjustmentProcessDetail/Tab_TAP_ApplicantList";
import Tab_TAP_GeneralInfo from "./TopicAdjustmentProcessDetail/Tab_TAP_GeneralInfo";


export default function TopicAdjustmentProcessView({ data, loading }: { data?: SRMContractDetail, loading?: boolean }) {
    const disclosure = useDisclosure();
    const form = useForm<SRMContractDetail>({ initialValues: data, });
    useEffect(() => {
        if (data) form.setValues(data);

        if (!disclosure[0]) {
            form.reset();
            form.clearErrors();
        }
    }, [data, disclosure[0]]);


    return (
        <CustomButtonModal
            modalProps={{
                title: "Chi tiết thông tin đề tài",
                size: "100%",
            }}

            isActionIcon
            actionIconProps={{
                actionType: "view",
                loading: loading,
            }}
            disclosure={disclosure}
        >
            <CustomTabs
                tabs={[
                    {
                        label: "Thông tin chung",
                        children: (
                            <Tab_TAP_GeneralInfo form={form} />
                        )
                    },
                    {
                        label: "Thành viên",
                        children: (
                            <Tab_TAP_ApplicantList data={form.values.srmContract?.srmTopic?.srmTopicMembers ?? []} />
                        )
                    }
                ]}
            />
        </CustomButtonModal>
    )
}
