import { SRMTopic } from "@/shared/interfaces/SRMTopic";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomTabs } from "@aq-fe/core-ui/shared/components/navigation/CustomTabs/CustomTabs";
import { formValuesType } from "@aq-fe/core-ui/shared/types/types";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";
import Tab_ApplicantList from "./ApplicantRegistrationReviewDetail/Tab_ApplicantList";
import Tab_GeneralInfo from "./ApplicantRegistrationReviewDetail/Tab_GeneralInfo";


export default function ApplicantRegistrationReviewView({ data, loading }: { data?: SRMTopic, loading?: boolean }) {
    const disclosure = useDisclosure();
    const form = useForm<formValuesType<SRMTopic>>({ mode: "uncontrolled", initialValues: data, });
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
                title: "Chi tiết kiểm tra hồ sơ",
                size: "100%",
            }}

            isActionIcon
            actionIconProps={{ actionType: "view", loading: loading }}
            disclosure={disclosure}
        >
            <CustomTabs
                tabs={[
                    {
                        label: "Thông tin chung",
                        children: <Tab_GeneralInfo form={form} />
                    },
                    {
                        label: "Thành viên",
                        children: <Tab_ApplicantList data={form.values.srmTopicMembers ?? []} />
                    }
                ]}
            />
        </CustomButtonModal>
    )
}
