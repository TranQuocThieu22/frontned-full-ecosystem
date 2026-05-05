import { } from "@/shared/APIs/contractService";
import { SRMContractReportHistory } from "@/shared/interfaces/SRMContractReportHistory";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { Tabs } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import ProgressReportCompletedProductsTable from "./CompletedProducts/ProgressReportCompletedProductsTable";
import ProgressReportMainJobsTable from "./MainJobs/ProgressReportMainJobsTable";
import ProgressReportBudgedForm from "./ProgressReportBudgedForm";
import ProgressReportSelfAssessmentForm from "./ProgressReportSelfAssessmentForm";
import ProgressReportTrainingResultsTable from "./TrainingResults/ProgressReportTrainingResultsTable";
import { useProgressReportStore } from "./useProgressReportStore";

export default function ProgressReportUpdate({ isCheck, readOnly, historyReport }: { isCheck?: boolean, readOnly?: boolean, historyReport?: SRMContractReportHistory }) {
    const disc = useDisclosure()
    const store = useProgressReportStore()

    return (
        <CustomButtonModal
            modalProps={{
                title: "Cập nhật báo cáo định kỳ",
                size: "80vw"
            }}
            isActionIcon
            disclosure={disc}
            actionIconProps={{
                onClick: () => { store.setProperty("historyReportId", historyReport?.id) },
                actionType: readOnly == true ? "view" : "update"
            }}
        >
            <Tabs defaultValue="mainJobs">
                <Tabs.List>
                    <Tabs.Tab value="mainJobs" >
                        Công việc chính
                    </Tabs.Tab>
                    <Tabs.Tab value="completedProducts">
                        Sản phẩm hoàn thành
                    </Tabs.Tab>
                    <Tabs.Tab value="TrainingResults" >
                        Kết quả đào tạo
                    </Tabs.Tab>
                    <Tabs.Tab value="budget" >
                        Kinh phí
                    </Tabs.Tab>
                    <Tabs.Tab value="selfAssessment" >
                        Tự đánh giá
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="mainJobs" pt={'md'}>
                    <CustomFieldset title="Danh sách công việc">
                        <ProgressReportMainJobsTable readOnly={readOnly} mainTasksData={historyReport?.srmMainTasks} />
                    </CustomFieldset>
                </Tabs.Panel>

                <Tabs.Panel value="completedProducts" pt={'md'}>
                    <CustomFieldset title="Danh sách sản phẩm hoàn thành">
                        <ProgressReportCompletedProductsTable readOnly={readOnly} completedProductData={historyReport?.srmCompletedProducts} />
                    </CustomFieldset>
                </Tabs.Panel>

                <Tabs.Panel value="TrainingResults" pt={'md'}>
                    <CustomFieldset title="Danh sách kết quả đào tạo">
                        <ProgressReportTrainingResultsTable readonly={readOnly} trainingOutcomesData={historyReport?.srmTrainingOutcomes} />
                    </CustomFieldset>
                </Tabs.Panel>

                <Tabs.Panel value="budget" pt={'md'}>
                    <ProgressReportBudgedForm readonly={readOnly} totalCost={historyReport?.srmContract?.totalCost || 0} values={historyReport} />
                </Tabs.Panel>
                <Tabs.Panel value="selfAssessment" pt={'md'}>
                    <ProgressReportSelfAssessmentForm readOnly={readOnly} disc={disc} values={historyReport} />
                </Tabs.Panel>
            </Tabs>

        </CustomButtonModal>
    )
}


// {
//     "id": 1,
//     "reportedAllocatedBudget": 1111,
//     "allocatedBudget": 2222,
//     "reportedUsedBudget": 333,
//     "usedBudget": 44,
//     "remainingBudget": 55,
//     "nextRequestedBudget": 66
// }