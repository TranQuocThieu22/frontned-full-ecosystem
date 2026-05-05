import { IExam, examService } from "@/shared/APIs/examService";
import { Tabs } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { MyButton, MyButtonModal } from "aq-fe-framework/components";
import { utils_notification_show } from "aq-fe-framework/utils";
import { useRef } from "react";
import ExamSectionListCreateView from "./ExamSection/Create/ExamSectionListCreateView";
import GeneralInfo, { GeneralInfoRef } from "./ExamSection/Create/GeneralInfo";
import useS_Exam from "./useS_Exam";

export default function ExamCreate() {
    const disc = useDisclosure();
    const queryClient = useQueryClient();
    const generalInfoRef = useRef<GeneralInfoRef>(null);
    const store = useS_Exam()
    const handleSubmit = (values: IExam) => {
        const now = new Date();
        const updatedSections = store.state.ExamSection?.map(({ id, startDate, startTime, duration, ...section }) => {
            const status = getStatus(now, startDate, startTime, duration)

            return {
                ...section,
                startDate,
                startTime,
                duration,
                status,
            };
        });
        const body: IExam = {
            code: values.code,
            name: values.name,
            concurrencyStamp: 'string',
            isEnabled: true,
            startDate: values.startDate ? new Date(values.startDate).toISOString().slice(0, 19) : undefined,
            endDate: values.endDate ? new Date(values.endDate).toISOString().slice(0, 19) : undefined,
            note: values.note,
            evaExamSections: updatedSections && updatedSections.length > 0
                ? updatedSections
                : []
        };
        console.log('body', body);
        return examService.create(body).then(() => {
            generalInfoRef.current?.reset();
            queryClient.invalidateQueries();

            utils_notification_show({ crudType: "create", message: "Tạo thành công" });
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
        <MyButtonModal
            disclosure={disc}
            title="Chi tiết kỳ thi"
            label="Thêm"
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
                    <GeneralInfo ref={generalInfoRef} onSubmit={handleSubmit} />
                </Tabs.Panel>

                <Tabs.Panel value="DanhSachMonThi">
                    <ExamSectionListCreateView />
                </Tabs.Panel>
            </Tabs>

            <MyButton crudType="create" bg={"green"} onClick={handleSaveClick}>
                Lưu
            </MyButton>
        </MyButtonModal>
    );
}


export enum ExamSectionStatus {
    UPCOMING = 1,
    ONGOING = 2,
    FINISHED = 3,
}
