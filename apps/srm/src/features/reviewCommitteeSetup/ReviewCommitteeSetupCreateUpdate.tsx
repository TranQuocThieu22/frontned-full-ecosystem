import { reviewCommitteeService } from "@/shared/APIs/reviewCommitteeService";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMReviewCommittee } from "@/shared/interfaces/SRMReviewCommittee";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomTabs } from "@aq-fe/core-ui/shared/components/navigation/CustomTabs/CustomTabs";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconInfoCircle, IconListDetails, IconUsersGroup } from "@tabler/icons-react";
import { useEffect } from "react";
import ReviewCommitteeSetupGeneralInfoTab from "./ReviewCommitteeSetupGeneralInfoTab";
import ReviewCommitteeSetupMemberTab from "./ReviewCommitteeSetupMemberTab";
import ReviewCommitteeSetupProposalsTab from "./ReviewCommitteeSetupProposalsTab";

export default function ReviewCommitteeSetupCreateUpdate({ values }: { values?: SRMReviewCommittee }) {
    const isUpdate = values != undefined
    const academicYearStore = useAcademicYearStore()
    const form = useForm<SRMReviewCommittee>({
        mode: "uncontrolled",
        validate: {
            code: isNotEmpty("Không được để trống"),
            name: isNotEmpty("Không được để trống"),
            attachmentDetail: isNotEmpty("Vui lòng chọn file")
        }
    })
    useEffect(() => {
        if (!values) return
        form.setValues(values)
        form.setInitialValues(values)
    }, [values])
    return (
        <CustomButtonCreateUpdate
            isUpdate={isUpdate}
            modalProps={{
                size: "90em"
            }}
            onSubmit={(formValues) => {
                const payLoad: SRMReviewCommittee = {
                    ...formValues,
                    srmReviewMembers: formValues.srmReviewMembers?.filter(item => item.tempStatus != undefined).map(item => {
                        const { user, ...rest } = item
                        return {
                            ...rest
                        }
                    }),
                    srmReviewProposals: formValues.srmReviewProposals?.filter(item => item.tempStatus != undefined).map(item => {
                        const { srmTaskProposal, ...rest } = item
                        return {
                            isEnabled: true,
                            code: srmTaskProposal?.code,
                            name: srmTaskProposal?.name,
                            ...rest
                        }
                    }),
                    academicYearId: academicYearStore.state.academicYear?.id
                }
                if (isUpdate) return reviewCommitteeService.update(payLoad)
                return reviewCommitteeService.create(payLoad)
            }}
            form={form}
        >
            <CustomTabs
                tabs={[
                    {
                        label: "Thông tin chung",
                        leftSection: <IconInfoCircle />,
                        children: (
                            <ReviewCommitteeSetupGeneralInfoTab
                                isUpdate={isUpdate}
                                form={form}
                            />
                        ),
                    },
                    {
                        label: "Thành viên",
                        leftSection: <IconUsersGroup />,
                        children: (
                            <ReviewCommitteeSetupMemberTab
                                values={form.getValues().srmReviewMembers || []}
                                onChange={(values) => form.setFieldValue("srmReviewMembers", values)}
                            />
                        ),
                    },
                    {
                        label: "Danh sách đề xuất",
                        leftSection: <IconListDetails />,
                        children: (
                            <ReviewCommitteeSetupProposalsTab
                                values={form.getValues().srmReviewProposals || []}
                                onChange={(values) => form.setFieldValue("srmReviewProposals", values)}
                            />
                        )
                    }
                ]}
            />
        </CustomButtonCreateUpdate>
    )
}
