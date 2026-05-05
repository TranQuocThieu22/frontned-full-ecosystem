import { SRMReviewProposal } from "@/shared/interfaces/SRMReviewProposal";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomTabs } from "@aq-fe/core-ui/shared/components/navigation/CustomTabs/CustomTabs";
import { useDisclosure } from "@mantine/hooks";
import { IconInfoCircle, IconUsers } from "@tabler/icons-react";
import ReviewCommitteeMettingInfoTab from "./ReviewCommitteeMettingInfoTab";
import ReviewCommitteeMettingMembersTab from "./ReviewCommitteeMettingMembersTab";

export default function ReviewCommitteeMettingUpdate({ values }: { values?: SRMReviewProposal }) {
    const disc = useDisclosure()
    return (
        <CustomButtonModal
            actionIconProps={{
                actionType: "update"
            }}
            disclosure={disc}
            isActionIcon
            modalProps={{
                size: "80%",
                title: "Chi tiết nhận xét của hội đồng tư vấn"
            }}
        >
            <CustomTabs
                tabs={[
                    {
                        label: "Thông tin chung",
                        leftSection: <IconInfoCircle size={16} />,
                        children: (
                            <ReviewCommitteeMettingInfoTab
                                disc={disc}
                                values={values}
                            />
                        )
                    },
                    {
                        label: "Thành viên",
                        leftSection: <IconUsers size={16} />,
                        children: (
                            <ReviewCommitteeMettingMembersTab
                                disc={disc}
                                reviewProposalId={values?.id}
                            />
                        )
                    }
                ]}
            />
        </CustomButtonModal>
    )
}
