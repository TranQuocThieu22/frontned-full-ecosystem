import { examSectionService } from "@/shared/APIs/examSectionService";
import { IExam, examService } from "@/shared/APIs/examService";
import { Tabs } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { MyActionIconModal, MyButton } from "aq-fe-framework/components";
import { useMyReactQuery } from "aq-fe-framework/hooks";
import { utils_notification_show } from "aq-fe-framework/utils";
import { useRef } from "react";
import { ExamSectionStatus } from "./ExamCreate";
import ExamSectionListUpdateView from "./ExamSection/Update/ExamSectionListUpdateView";
import GeneralInfoUpdateView, { GeneralInfoUpdateViewRef } from "./ExamSection/Update/GeneralInfoUpdateView";
import useS_Exam from "./useS_Exam";
interface Props {
    examData: IExam

}
export default function ExamUpdate({ examData }: Props) {
    const disc = useDisclosure();
    const queryClient = useQueryClient();
    const generalInfoRef = useRef<GeneralInfoUpdateViewRef>(null);
    const store = useS_Exam()
    const examSectionData = useMyReactQuery({
        queryKey: ['examUpdate', examData],
        axiosFn: async () => examSectionService.getExamSectionsByExamId({ examId: examData.id }),
        options: {
            enabled: disc[0],
            refetchOnWindowFocus: false
        }

    })
    const handleSubmit = (values: IExam) => {
        console.log('====================================');
        console.log('Exam data:', values);
        console.log('store.state.ExamSectionUpdateView', store.state.ExamSectionUpdateView);
        console.log('store.state.deletedSections', store.state.deletedSections);
        console.log('====================================');
        const now = new Date();
        const updatedSections = store.state.ExamSectionUpdateView?.map(({ id, isTemp, startDate, startTime, duration, ...section }) => {
            const status = getStatus(now, startDate, startTime, duration)
            return {
                evaExamId: examData.id,
                evaSubjectId: section.evaSubjectId,
                group: section.group || "",
                note: section.note || "",
                roundRule: section.roundRule,
                startDate: startDate ? new Date(startDate).toISOString().slice(0, 19) : undefined,
                startTime: startTime,
                duration: duration,
                concurrencyStamp: section.concurrencyStamp,
                status,
                ...(isTemp ? {} : { id }) // Only include id if it's not a temp item
            };
        })
        const body: IExam = {
            id: examData.id,
            code: values.code,
            name: values.name,
            concurrencyStamp: examData.concurrencyStamp,
            isEnabled: true,
            startDate: values.startDate ? new Date(values.startDate).toISOString().slice(0, 19) : undefined,
            endDate: values.endDate ? new Date(values.endDate).toISOString().slice(0, 19) : undefined,
            note: values.note,
            evaExamSections: updatedSections && updatedSections.length > 0
                ? updatedSections
                : []
        };
        console.log('body', body);
        if (store.state.deletedSections && store.state.deletedSections.length > 0) {
            examSectionService.deleteList(store.state.deletedSections)
        }
        return examService.update(body).then(() => {
            generalInfoRef.current?.reset();
            queryClient.invalidateQueries();
            utils_notification_show({ crudType: "update", message: "Cập nhật thành công" });
            disc[1].close();
        }).catch(() => {
            utils_notification_show({ crudType: "error" })
            disc[1].close()
        })
    };
    const handleSaveClick = () => {
        generalInfoRef.current?.submit();
    };
    function getStatus(
        now: Date,
        startDate: string | undefined,
        startTime: string | undefined,
        duration: number | undefined) {
        // Parse startDate and startTime into a Date object
        const [hours, minutes] = (startTime ?? "00:00").split(":").map(Number);
        const start = new Date(startDate ?? "");
        start.setHours(hours!, minutes, 0, 0);

        // Calculate end time
        const end = new Date(start.getTime() + (duration || 0) * 60000);
        let status: ExamSectionStatus = ExamSectionStatus.UPCOMING;
        if (now >= start && now < end) {
            status = ExamSectionStatus.ONGOING; // Ongoing
        } else if (now >= end) {
            status = ExamSectionStatus.FINISHED; // Finished
        }
        return status
    }
    return (
        <MyActionIconModal
            disclosure={disc}
            title="Chi tiết kỳ thi"
            crudType="update"
            modalSize={"80%"}
        >
            <Tabs variant="pills" defaultValue="ThongTinChung">
                <Tabs.List>
                    <Tabs.Tab value="ThongTinChung">
                        Thông tin chung
                    </Tabs.Tab>
                    <Tabs.Tab value="DanhSachMonThi">
                        Danh sách nhóm thi
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="ThongTinChung">
                    <GeneralInfoUpdateView examData={examData} ref={generalInfoRef} onSubmit={handleSubmit} />
                </Tabs.Panel>

                <Tabs.Panel value="DanhSachMonThi">
                    <ExamSectionListUpdateView examSectionData={examSectionData.data || []} isLoading={examSectionData.isLoading} isError={examSectionData.isError} />
                </Tabs.Panel>
            </Tabs>

            <MyButton crudType="create" bg={"green"} onClick={handleSaveClick}>
                Lưu
            </MyButton>
        </MyActionIconModal>
    );
}