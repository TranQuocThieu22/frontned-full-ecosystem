import { IEvaluationPlan } from "@/shared/interfaces/evaluationPlan/IEvaluationPlan";
import { IResource } from "@/shared/interfaces/resource/IResource";
import { ITask } from "@/shared/interfaces/task/ITask";
import { service_EAQStandard } from "@/shared/APIs/service_EAQStandard";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconInfoCircle, IconUsers, IconUsersGroup } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import useS_Shared_AssessmentCouncilDecisionId from "./store/AssessmentCouncilDecisionStore";
import Tab_GeneralInfo from "./Tab_GeneralInfo";
import Tab_Resource from "./Tab_Resource";
import Tab_TaskAssignment from "./Tab_TaskAssignment";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomTabs } from "@aq-fe/core-ui/shared/components/navigation/CustomTabs/CustomTabs";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";

interface ProgramSelfAssessmentCreateOrUpdateProps {
    data?: IEvaluationPlan;
    onSubmit: (value: IEvaluationPlan) => Promise<void>;
    loading?: boolean;
    viewOnly?: boolean;
}

export default function ProgramSelfAssessmentCreateOrUpdate({
    data,
    onSubmit,
    loading,
    viewOnly = false,
}: ProgramSelfAssessmentCreateOrUpdateProps) {
    const disclosure = useDisclosure();
    const store = useS_Shared_Filter();
    const [taskList, setTaskList] = useState<ITask[]>([]);
    const [resourceList, setResourceList] = useState<IResource[]>([]);
    const currentCouncilId = useS_Shared_AssessmentCouncilDecisionId().state.Id;
    const [originalCouncilId, setOriginalCouncilId] = useState<number | null>(null);
    const [loadingSubmitForm, setLoadingSubmitForm] = useState(false);


    const standardQuery = useCustomReactQuery({
        queryKey: ["StandardQuery_GetByStandardSetId_GetAll", store.state.StandardSet?.id],
        axiosFn: async () => (
            await service_EAQStandard.GetAllByEAQStandardSetId({
                eaqStandardSetId: store.state.StandardSet?.id
            })),
        options: {
            enabled: store.state.StandardSet?.id !== undefined && disclosure[0],
        }
    })

    const form = useForm<IEvaluationPlan>({
        initialValues: {
            code: "",
            name: "",
            startDate: undefined,
            endDate: undefined,
            signer: "",
            assessmentObjective: "",
            evaluationScope: "",
            eaqAssessmentCouncilDecisionId: undefined,
            attachment: undefined,
            attachmentDetail: undefined,
            attachmentPath: "",
            eaqTasks: [],
            eaqResources: [],
        },
        validate: {
            code: (value) => (value?.length ?? 0) > 0 ? null : "Vui lòng nhập mã kế hoạch",
            name: (value) => (value?.length ?? 0) > 0 ? null : "Vui lòng nhập tên kế hoạch",
            startDate: (start) => {
                const end = form.getValues().endDate;
                if (start && end && new Date(start) > new Date(end)) {
                    return "Ngày bắt đầu phải nhỏ hơn ngày kết thúc";
                }
                return null;
            },
            endDate: (end) => {
                const start = form.getValues().startDate;
                if (start && end && new Date(start) > new Date(end)) {
                    return "Ngày kết thúc phải lớn hơn ngày bắt đầu";
                }
                return null;
            },
        }
    });

    useEffect(() => {
        if (data && disclosure[0]) {
            form.setValues({
                ...data,
                eaqTasks: data.eaqTasks ?? [],
                eaqResources: data.eaqResources ?? [],
                eaqPhaseId: data?.eaqPhase?.id,
                eaqAssessmentCouncilDecisionId: data?.eaqAssessmentCouncilDecision?.id,
            });

            // Mark all existing tasks as isOld: true (not modified yet)
            setTaskList((data.eaqTasks ?? []).map(t => ({ ...t, isOld: true })));
            setResourceList(data.eaqResources ?? []);
            setOriginalCouncilId(data.eaqAssessmentCouncilDecisionId ?? null);
        } else if (data && !disclosure[0]) {
            form.reset();
            form.clearErrors();
            setTaskList([]);
            setResourceList([]);
        }
    }, [data, disclosure[0]]);

    useEffect(() => {
        if (currentCouncilId === originalCouncilId) {
            // Restore original tasks with isOld: true
            setTaskList((form.getValues().eaqTasks ?? []).map(t => ({ ...t, isOld: true })));
        } else if (currentCouncilId !== originalCouncilId) {
            setTaskList([]);
        }
    }, [currentCouncilId]);

    return (
        <CustomButtonModal
            modalProps={{ size: "100%", }}
            isActionIcon={!!data}
            disclosure={disclosure}
            buttonProps={{
                loading: loading,
                actionType: "create"
            }}
            actionIconProps={{
                loading: loading,
                actionType: viewOnly ? "view" : "update"
            }}
        >
            <CustomTabs
                tabs={[
                    {
                        label: "Thông tin chung",
                        leftSection: <IconInfoCircle />,
                        children: <Tab_GeneralInfo
                            form={form}
                            isUpdate={!!data}
                            mainDisclosure={disclosure}
                            viewOnly={viewOnly}
                        />
                    },
                    {
                        label: "Phân công nhiệm vụ",
                        leftSection: <IconUsers />,
                        children: <Tab_TaskAssignment
                            form={form}
                            standardData={standardQuery.data || []}
                            taskList={taskList}
                            setTaskList={setTaskList}
                            viewOnly={viewOnly}
                        />
                    },
                    {
                        label: "Huy động nguồn lực",
                        leftSection: <IconUsersGroup />,
                        children: <Tab_Resource
                            resourceList={resourceList}
                            setResourceList={setResourceList}
                            standardData={standardQuery.data || []}
                            viewOnly={viewOnly}
                        />
                    },
                ]} />

            <Stack>
                {!viewOnly && <CustomButton
                    actionType="save"
                    loading={loadingSubmitForm}
                    onClick={async () => {
                        try {

                            const { hasErrors } = form.validate();
                            if (hasErrors) {
                                notifications.show({
                                    title: "Thông báo",
                                    color: 'red',
                                    message: "Vui lòng nhập đầy đủ các thông tin bắt buộc",
                                });
                                return;
                            }

                            // Process Tasks
                            let finalTasks: ITask[];
                            if (currentCouncilId !== originalCouncilId) {
                                const current = form.getValues().eaqTasks ?? [];
                                finalTasks = [
                                    ...current.map(t => ({ ...t, isEnabled: false })),
                                    ...taskList.filter(t => t.isOld !== true)
                                ];
                            } else {
                                finalTasks = taskList.filter(t => {
                                    if (t.isOld !== true) return true;
                                    if (t.isEnabled === false) return true;
                                    return false;
                                });
                            }

                            // Process Resources (same logic as tasks)
                            const finalResources = resourceList.filter(r => {
                                if (r.isOld !== true) return true; // Modified or new
                                if (r.isEnabled === false) return true; // Deleted
                                return false;
                            });


                            setLoadingSubmitForm(true);
                            await onSubmit({
                                ...form.getValues(),
                                eaqTasks: finalTasks.map(t => {
                                    // For deleted items with id, only send id and isEnabled
                                    if (t.isEnabled === false && t.id) {
                                        return {
                                            id: t.id,
                                            isEnabled: false,
                                        } as ITask;
                                    }

                                    // For updated items with id, send only necessary fields
                                    if (t.id && t.id > 0) {
                                        return {
                                            id: t.id,
                                            evidenceCollectionTime: t.evidenceCollectionTime,
                                            note: t.note,
                                            isEnabled: t.isEnabled,
                                            eaqStandardId: t.eaqStandardId,
                                            eaqCouncilGroupId: t.eaqCouncilGroupId,
                                        } as ITask;
                                    }

                                    // For newly created items (no id), send full data
                                    return {
                                        ...t,
                                        eaqCouncilGroup: undefined,
                                        eaqStandard: undefined,
                                        isOld: undefined,
                                        code: undefined,
                                        name: undefined,
                                        concurrencyStamp: undefined,
                                        startDate: undefined,
                                        endDate: undefined,
                                        eaqEvaluationPlanId: data?.id,
                                    } as ITask;
                                }),
                                eaqResources: finalResources.map(r => {
                                    // For deleted items with id, only send id and isEnabled
                                    if (r.isEnabled === false && r.id) {
                                        return {
                                            id: r.id,
                                            isEnabled: false,
                                        } as IResource;
                                    }

                                    // For updated items with id, send only necessary fields
                                    if (r.id && r.id > 0) {
                                        return {
                                            id: r.id,
                                            activity: r.activity,
                                            resourcesToMobilize: r.resourcesToMobilize,
                                            mobilizationTime: r.mobilizationTime,
                                            note: r.note,
                                            isEnabled: r.isEnabled,
                                            eaqStandardId: r.eaqStandardId,
                                        } as IResource;
                                    }

                                    // For newly created items (no id), send full data
                                    return {
                                        ...r,
                                        eaqStandard: undefined,
                                        isOld: undefined,
                                        code: undefined,
                                        name: undefined,
                                        concurrencyStamp: undefined,
                                        eaqEvaluationPlanId: data?.id,
                                    } as IResource;
                                }),
                                eaqPhase: undefined,
                            });

                            setLoadingSubmitForm(false);
                            if (!data) {
                                notifications.show({
                                    title: "Lưu thành công",
                                    message: "Dữ liệu được lưu thành công!",
                                    color: 'green'
                                });
                            }
                            form.reset();
                            disclosure[1].close();
                        } catch (error) {
                            setLoadingSubmitForm(false);
                            notifications.show({
                                title: 'Thông báo',
                                color: "red",
                                message: "Có lỗi xảy ra, vui lòng thử lại!!",
                            });
                        }
                    }}
                />}
            </Stack>
        </CustomButtonModal>
    );
}
