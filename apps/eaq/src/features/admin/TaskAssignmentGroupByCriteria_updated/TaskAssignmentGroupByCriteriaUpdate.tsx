"use client";

import { ITask } from "@/shared/interfaces/task/ITask";
import { ITaskCriteriaUpdate } from "@/shared/interfaces/task/ITaskCriteriaUpdate";
import { ITaskDetail } from "@/shared/interfaces/task/ITaskDetail";
import { service_EAQEvaluationPlan } from "@/shared/APIs/service_EAQEvaluationPlan";
import { utils_notification_show } from "@/shared/utils/notification";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconInfoCircle, IconUserEdit } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import TabAssignmentTaskTable from "./TabAssignmentTaskTable";
import TabGenralInfo from "./TabGenralInfo";
import { CustomTabs } from "@aq-fe/core-ui/shared/components/navigation/CustomTabs/CustomTabs";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";

export default function TaskAssignmentGroupByCriteriaUpdate(
    {
        task,
        loading,
        readOnly
    }: {
        task: ITask,
        loading?: boolean,
        readOnly?: boolean
    }) {
    const queryClient = useQueryClient();
    const modalHandler = useDisclosure();


    const taskDetailQuery = useCustomReactQuery({
        queryKey: ["taskDetailQuery_getEAQTaskDetailByEAQTaskId"],
        axiosFn: async () => {
            let res = await service_EAQEvaluationPlan.getEAQTaskDetailByEAQTaskId({
                eaqTaskId: task.id
            })
            mainModalForm.setFieldValue("eaqTaskDetails", res.data.data);
            return res;
        },
        options: {
            enabled: modalHandler[0],
        },
    })

    const usersQuery = useCustomReactQuery({
        queryKey: ["usersQuery"],
        axiosFn: async () => {
            let res = await service_EAQEvaluationPlan.GetCoucilGroupMemberByCouncilGroupId({
                EAQCouncilGroupId: task.eaqCouncilGroupId || 0,
            });

            return res;
        },
        options: {
            enabled: modalHandler[0],
        },
    });

    const mainModalForm = useForm<ITaskCriteriaUpdate>({

        initialValues: {
            id: task.id,
            startDate: task.startDate,
            endDate: task.endDate,
            note: task.note === null ? "" : task.note,
            eaqTaskDetails: [],
        },
        validate: {
            startDate: (start) => {
                const end = mainModalForm.getValues().endDate;
                if (start && end && new Date(start) > new Date(end)) {
                    return "Ngày bắt đầu phải nhỏ hơn ngày kết thúc";
                }
                return null;
            },

            endDate: (end) => {
                const start = mainModalForm.getValues().startDate;
                if (start && end && new Date(start) > new Date(end)) {
                    return "Ngày kết thúc phải lớn hơn ngày bắt đầu";
                }
                return null;
            },
        },
    });

    const handleSave = () => {
        try {
            if (mainModalForm.validate().hasErrors) {
                utils_notification_show({
                    crudType: "error",
                    message: "Thông tin nhập vào bị sai, vui lòng kiểm tra lại!"
                });
                return;
            }
            //update api
            const curentTaskDetailList: ITaskDetail[] = mainModalForm.getValues().eaqTaskDetails ?? [];
            const taskDetailListForUpdate: ITaskDetail[] = curentTaskDetailList.filter((item) => item.isEnabled);

            mainModalForm.setFieldValue("eaqTaskDetails", taskDetailListForUpdate);

            service_EAQEvaluationPlan.UpdateEAQTaskDetails(mainModalForm.getValues()).then((res) => {
                if (res.status !== 200) {
                    utils_notification_show({
                        crudType: "error",
                        message: "Có lỗi xảy ra ở phía server, vui lòng thử lại sau!"
                    });
                    modalHandler[1].close();
                    return;
                }

                if (res.data.isSuccess !== 1) {
                    utils_notification_show({
                        crudType: "error",
                        message: "Cập nhật thất bại, vui lòng thử lại sau!"
                    });
                    modalHandler[1].close();
                    return;
                }

                utils_notification_show({
                    crudType: "update",
                    message: "Cập nhật thành công!"
                })
                queryClient.invalidateQueries({ queryKey: ["queryGetTaskByStandardId_GetAll"] });
                modalHandler[1].close();
                return;
            });
        } catch (error) {
            utils_notification_show({
                crudType: "error",
                message: "Có lỗi xảy ra trong quá trình cập nhật, vui lòng thử lại sau!"
            })
        }
    }

    return (
        <CustomButtonModal
            disclosure={modalHandler}
            buttonProps={{
                children: "Chi tiết",
                variant: "outline",
                color: "orange",
                loading: loading
            }}
            modalProps={{
                size: "80%",
                title: 'Chi tiết kế hoạch phân công'
            }}
        >
            <CustomTabs
                tabs={[
                    {
                        label: 'Thông tin chung',
                        leftSection: <IconInfoCircle size={16} />,
                        children: <TabGenralInfo
                            form={mainModalForm}
                            standardName={task.eaqStandard?.name ?? ""}
                            readOnly={readOnly}
                        />
                    },
                    {
                        label: 'Phân công nhiệm vụ',
                        leftSection: <IconUserEdit size={16} />,
                        children: <TabAssignmentTaskTable
                            form={mainModalForm}
                            taskDetails={taskDetailQuery.data ?? []}
                            users={usersQuery.data ?? []}
                            readOnly={readOnly}
                        />
                    },

                ]} />
            {!readOnly ? <CustomButton actionType="save" onClick={handleSave} /> : <></>}
        </CustomButtonModal>
    );
}
