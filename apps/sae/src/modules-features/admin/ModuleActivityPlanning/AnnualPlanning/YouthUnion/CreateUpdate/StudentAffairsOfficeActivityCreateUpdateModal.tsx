import { Stack, Tabs } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";

import { BodyDeleteEventRegister, BodyEventRegister, EventCreate, service_event } from "@/api/services/service_event";
import { Event } from "@/interfaces/event";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconInfoCircle, IconUsers } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ExtracurricularPlanInfo from "./TabGeneralInfo/ExtracurricularPlanInfo";
import RegisterObject from "./TabRegisterObject/RegisterObject";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";

// Types for state
type PendingChangeItem = { toAdd: any[]; toDelete: any[] };
type PendingChangesState = Record<
    "FACULTY" | "MAJOR" | "CLASS" | "STUDENT_LIST",
    PendingChangeItem
>;

interface Props {
    futurePlanId: number;
    values?: Event;
    loadingActionIcon?: boolean
}

export default function StudentAffairsOfficeActivityCreateUpdateModal({ futurePlanId, values, loadingActionIcon }: Props) {
    const isUpdate = !!values;
    const disc = useDisclosure();
    const queryClient = useQueryClient();

    // Tabs
    const [loading, setLoading] = useState(false);

    // Pending changes per target
    const [pendingChangesByTarget, setPendingChangesByTarget] = useState<PendingChangesState>({
        FACULTY: { toAdd: [], toDelete: [] },
        MAJOR: { toAdd: [], toDelete: [] },
        CLASS: { toAdd: [], toDelete: [] },
        STUDENT_LIST: { toAdd: [], toDelete: [] },
    });
    // Create form with initial valuess based on whether it's create or update
    const form = useForm<Event>({//IStudentAffairsOfficeActivityViewModel
        initialValues: {

            standardId: values?.standardId ?? 0,
            source: values?.source ?? 1,
            registerType: values?.registerType ?? 1,

            eventGroupId: values?.eventGroupId ?? 0,
            quantity: values?.quantity ?? 1,

            name: values?.name || "",
            code: values?.code ?? "",

            facultyId: values?.facultyId ?? 0,
            host: values?.host ?? 0,
            reviewedBy: values?.reviewedBy ?? 0,
            completedBy: values?.completedBy ?? 0,
            location: values?.location ?? "",
            session: values?.session ?? 1,
            futurePlanId: futurePlanId,

            isTemplate: values?.isTemplate ?? false,
            isCompleted: values?.isCompleted ?? false,
            isRequired: values?.isRequired ?? false,

            minPoint: values?.minPoint ?? 0,
            maxPoint: values?.maxPoint ?? 1,

            startDate: values?.startDate
                ? new Date(values.startDate).toLocaleDateString('en-CA')
                : new Date().toLocaleDateString('en-CA'),
            endDate: values?.endDate
                ? new Date(values.endDate).toLocaleDateString('en-CA')
                : new Date(new Date().getFullYear(), 11, 31).toLocaleDateString('en-CA')
        },
        validate: {
            standardId: (value) => (!value ? 'Vui lòng chọn điều' : null),
            source: (value) => (!value ? "Vui lòng chọn nguồn ghi nhận" : null),
            registerType: (value) => (!value ? "Vui lòng chọn đối tượng đăng ký" : null),
            location: (value) => (!value ? "Vui lòng nhập địa điểm tổ chức" : null),

            eventGroupId: (value) => (!value ? "Vui lòng chọn nhóm hoạt động" : null),
            quantity: (value) => {
                if (value === null || value === undefined || value.toString() === "") {
                    return "Vui lòng nhập số lượng";
                }
                if (value <= 0) return "Số lượng phải lớn hơn 0";
                return null;
            },

            name: (value) => (!value ? "Vui lòng nhập tên hoạt động ngoại khóa" : null),

            host: (value) => !value ? 'Đơn vị tổ chức không được để trống' : null,
            reviewedBy: (value) => !value ? "Đơn vị ghi nhận không được để trống" : null,
            completedBy: (value) => !value ? 'Đơn vị công nhận không được để trống' : null,

            session: (value) => (!value ? "Vui lòng chọn buổi" : null),

            minPoint: (value) => {
                if (value === null || value === undefined || value.toString() === "") {
                    return "Điểm tối thiểu không được để trống";
                }
                if (value < 0) return "Điểm tối thiểu không được âm";
                if (value > 100) return "Điểm tối thiểu không được vượt quá 100";
                return null;
            },

            maxPoint: (value, values) => {
                if (!value || value <= 0) return "Điểm tối đa phải lớn hơn 0";
                if (value > 100) return "Điểm tối đa không được vượt quá 100";
                if (values.minPoint && value < values.minPoint) {
                    return "Điểm tối đa phải lớn hơn hoặc bằng điểm tối thiểu";
                }
                return null;
            },

            startDate: (value) => {
                if (!value) return "Vui lòng chọn ngày bắt đầu";
                return null;
            },

            endDate: (value, values) => {
                if (!value) return "Vui lòng chọn ngày kết thúc";
                const startDateOnly = new Date(values.startDate!).setHours(0, 0, 0, 0);
                const endDateOnly = new Date(value).setHours(0, 0, 0, 0);
                if (startDateOnly && (endDateOnly < startDateOnly)) return "Ngày kết thúc phải sau ngày bắt đầu";
                return null;
            },
        },
    });

    // Update form values when values prop changes
    useEffect(() => {
        if (values) {
            const convertedValues = {
                ...values,
                startDate: values.startDate ?? "",
                endDate: values.endDate ?? "",
            };
            form.setValues(convertedValues);
        }
    }, [values]);

    function resetState() {
        disc[1].close();
        setPendingChangesByTarget({
            FACULTY: { toAdd: [], toDelete: [] },
            MAJOR: { toAdd: [], toDelete: [] },
            CLASS: { toAdd: [], toDelete: [] },
            STUDENT_LIST: { toAdd: [], toDelete: [] },
        });
        setLoading(false);
        form.reset();
    }

    function getEventRegisterBody(eventId: number, registerType: number) {
        const eventRegisterBody: BodyEventRegister = {
            isEnabled: true,
            eventId,
            registerType,
            facultyIds: [],
            majorIds: [],
            classIds: [],
            studentIds: [],
        };

        // lay data eventRegister tu state
        switch (registerType) {
            case 2:
                eventRegisterBody.facultyIds = pendingChangesByTarget["FACULTY"].toAdd.map((i) => i.id);
                break;
            case 3:
                eventRegisterBody.majorIds = pendingChangesByTarget["MAJOR"].toAdd.map((i) => i.id);
                break;
            case 4:
                eventRegisterBody.classIds = pendingChangesByTarget["CLASS"].toAdd.map((i) => i.id);
                break;
            case 5:
                eventRegisterBody.studentIds = pendingChangesByTarget["STUDENT_LIST"].toAdd.map((i) => i.id);
                break;
        }
        return eventRegisterBody;
    }

    const createEventRegisterMutation = useCustomReactMutation({
        axiosFn: (updatePayload: EventCreate) => service_event.createEventRegister(updatePayload),
        mutationType: "create",
        successNotification: "Danh sách đối tượng đăng ký đã lưu thành công",
    })

    const createFutureEventMutation = useMutation({
        mutationFn: async (payload: any) => {
            let res = await service_event.createFutureEvent(payload)
            if (res.data.isSuccess === 1) {
                return res;
            }
            if (res.data.isSuccess === 0) {
                throw new Error(res.data.message === null ? "Lỗi chưa xác định" : res.data.message);
            }
        },
        onSuccess: async (response) => {
            notifications.show({
                color: 'green',
                message: 'Dữ liệu đã được tạo thành công',
                autoClose: 3000,
            });

            const eventId = response?.data?.data?.id;
            if (!eventId) return;

            const registerType = response?.data?.data?.registerType;

            // Nếu registerType === 1 thi chi create event
            if (registerType === 1 || !registerType) {
                queryClient.invalidateQueries({ queryKey: ["FuturePlan"] });
                resetState();
                return;
            }

            const eventRegisterBody = getEventRegisterBody(eventId, registerType);
            await createEventRegisterMutation.mutateAsync(eventRegisterBody);
            resetState();
        },
        onError: () => {
            notifications.show({
                color: 'red',
                message: 'Lỗi, lưu dữ liệu thất bại',
                autoClose: 3000,
            });
            setLoading(false);
        }
    });

    const updateFutureEventMutation = useMutation({
        mutationFn: async (payload: any) => {
            let res = await service_event.update(payload)
            if (res.data.isSuccess === 1) {
                return res;
            }
            if (res.data.isSuccess === 0) {
                throw new Error(res.data.message === null ? "Lỗi chưa xác định" : res.data.message);
            }
        },
        onSuccess: async (response) => {
            notifications.show({
                color: 'green',
                message: 'Dữ liệu đã được cập nhật thành công',
                autoClose: 3000,
            });

            const eventId = response?.data?.data?.id;
            if (!eventId) return;

            // kiem tra co doi tuong tham gia nao xoa khong
            const hasItemsToDelete = Object.values(pendingChangesByTarget).some(
                (target) => target.toDelete.length > 0
            );

            // neu co thi xoa doi tuong tham gia
            if (hasItemsToDelete) {
                const eventRegisterDeleteBody: BodyDeleteEventRegister = {
                    eventId: eventId,
                    facultyIds: pendingChangesByTarget["FACULTY"].toDelete.map((i) => i.id),
                    majorsIds: pendingChangesByTarget["MAJOR"].toDelete.map((i) => i.id),
                    classIds: pendingChangesByTarget["CLASS"].toDelete.map((i) => i.id),
                    studentIds: pendingChangesByTarget["STUDENT_LIST"].toDelete.map((i) => i.id),
                };
                await service_event.deleteListEventRegisters(eventRegisterDeleteBody);
            }

            const registerType = response?.data?.data?.registerType;

            // neu la toan truong thi khong can cap nhat doi tuong tham gia
            if (registerType === 1 || !registerType) {
                queryClient.invalidateQueries({ queryKey: ["FuturePlan"] });
                resetState();
                return;
            }

            // kiem tra co doi tuong tham gia nao dươc them khong
            const hasItemsToAdd = Object.values(pendingChangesByTarget).some(
                (target) => target.toAdd.length > 0
            );

            // neu co add them doi tuong tham gia
            if (hasItemsToAdd) {
                const eventRegisterBody = getEventRegisterBody(eventId, registerType);
                await createEventRegisterMutation.mutateAsync(eventRegisterBody);
            } else {
                queryClient.invalidateQueries({ queryKey: ["FuturePlan"] })
            }
            resetState();
        },
        onError: () => {
            notifications.show({
                color: 'red',
                message: 'Lỗi, lưu dữ liệu thất bại',
                autoClose: 3000,
            });
            setLoading(false);
        }
    });

    const handleSave = async (values: any) => {
        if (form.validate().hasErrors) {
            return;
        }
        setLoading(true);

        const payload = {
            ...form.values,
            ...(isUpdate && { id: values.id }),
        };

        if (isUpdate) {
            updateFutureEventMutation.mutate(payload);
        } else {
            createFutureEventMutation.mutate(payload);
        }
    };

    return (
        <CustomButtonModal
            isActionIcon={values ? true : false}
            actionIconProps={{
                actionType: "update",
                loading: loadingActionIcon
            }}
            buttonProps={{
                actionType: "create",
                loading: loadingActionIcon
            }}
            modalProps={{
                size: "100%",
                centered: true,
            }}
            disclosure={disc}
        >
            <form onSubmit={form.onSubmit((values) => handleSave(values))}>
                <Stack>
                    <Tabs
                        variant="default"
                        defaultValue="info"
                        styles={{
                            tab: {
                                fontWeight: 500,
                                padding: '12px 12px',
                            },
                            tabLabel: {
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: "15px",
                                gap: 6,
                            },
                        }}>
                        <Tabs.List mb={10} grow justify="space-between">
                            <Tabs.Tab
                                value="info"
                                leftSection={<IconInfoCircle size={16} />}
                                style={{ backgroundColor: '#e3f2fd', color: '#0d47a1' }}
                            >
                                Thông tin kế hoạch
                            </Tabs.Tab>
                            <Tabs.Tab
                                value="objects"
                                leftSection={<IconUsers size={16} />}
                                style={{ backgroundColor: '#e8f5e9', color: '#2e7d32' }}
                            >
                                Đối tượng đăng ký
                            </Tabs.Tab>
                        </Tabs.List>

                        {/* Tab 1: Main Info */}
                        <Tabs.Panel value="info" mih="66vh">
                            <ExtracurricularPlanInfo disclosure={disc} form={form} isUpdate={isUpdate} />
                        </Tabs.Panel>

                        {/* Tab 2: Register Objects */}
                        <Tabs.Panel value="objects" mih="66vh">
                            <RegisterObject
                                form={form}
                                pendingChangesByTarget={pendingChangesByTarget}
                                setPendingChangesByTarget={setPendingChangesByTarget}
                                oldRegisterType={values?.registerType}
                            />
                        </Tabs.Panel>
                    </Tabs>
                    <CustomButton actionType="save" loading={loading} />
                </Stack>

            </form>
        </CustomButtonModal>
    );
}
