import { service_event } from "@/api/services/service_event";
import { EnumRegisterType, EnumStringRegisterType } from "@/enum/EnumEventRegisterType";
import { Event } from "@/interfaces/event";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import ExtracurricularPlanInfo from "./MandatoryActivityCatalogForm";

type PendingChangeItem = { toAdd: any[]; toDelete: any[] };
export type PendingChangesState = Record<
    EnumStringRegisterType.Faculty |
    EnumStringRegisterType.Major |
    EnumStringRegisterType.Class |
    EnumStringRegisterType.StudentList,
    PendingChangeItem
>;

interface Props {
    values?: Event;
    loadingActionIcon?: boolean
}

export default function MandatoryActivityCatalogCreateUpdate({ values, loadingActionIcon }: Props) {
    const isUpdate = !!values;
    const disc = useDisclosure();
    const queryClient = useQueryClient();

    const form = useForm<Event>({
        initialValues: {
            id: values?.id ?? undefined,
            standardId: values?.standardId ?? 0,
            source: values?.source ?? 1,
            registerType: EnumRegisterType.AllStudents, // mặc định toàn trường
            name: values?.name || "",
            code: values?.code ?? "",
            host: values?.host ?? 0,
            completedBy: values?.completedBy ?? 0,
            isTemplate: values?.isTemplate ?? true, // hoạt động bắt buộc ??
            isCompleted: values?.isCompleted ?? false,
            eventGroupId: values?.eventGroupId ?? undefined,
            isRequired: true, // hoạt động bắt buộc
            approvalStatus: 3, // Bỏ qua phê duyệt
            minPoint: values?.minPoint ?? 0,
            maxPoint: values?.maxPoint ?? 1,
        },
        validate: {
            code: (value) => value?.trim() ? null : "Mã là bắt buộc",
            standardId: (value) => (!value ? 'Vui lòng chọn điều' : null),
            source: (value) => (!value ? "Vui lòng chọn nguồn ghi nhận" : null),
            name: (value) => (!value ? "Vui lòng nhập tên hoạt động ngoại khóa" : null),
            host: (value) => !value ? 'Đơn vị tổ chức không được để trống' : null,
            completedBy: (value) => !value ? 'Đơn vị công nhận không được để trống' : null,
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
        },
    });

    function setFormValue(values?: Event) {
        if (!values) return;
        form.setValues({
            ...values,
            startDate: values.startDate ?? undefined,
            endDate: values.endDate ?? undefined,
            location: values.location ?? '',
        });
    }

    useEffect(() => {
        setFormValue(values);
    }, [values]);

    const createEventMutation = useMutation({
        mutationFn: (payload: any) => service_event.createEventRequired(payload),
        onSuccess: async (res) => {
            // if error push notification immediately
            if (res.data.isSuccess === 0) {
                throw new Error(res.data.message ?? (res.data.data as any)?.Code ?? "Lỗi không xác định");
            }

            notifications.show({ message: "Tạo thành công", color: "green" });
            disc[1].close();
            form.reset();
            queryClient.invalidateQueries({ queryKey: ['EventRequiredGetAll'] });
        },
        onError: (error) => {
            notifications.show({
                color: "red",
                autoClose: 5000,
                title: "Đã xảy ra lỗi, vui lòng thử lại",
                message: error.message,
            });
        }
    });

    const updateEventMutation = useMutation({
        mutationFn: async (payload: any) => await service_event.update(payload),
        onSuccess: async (res) => {
            // if error push notification immediately
            if (res.data.isSuccess === 0) {
                throw new Error(res.data.message ?? "Lỗi không xác định");
            }

            notifications.show({ message: "Cập nhật thành công", color: "green" });
            disc[1].close();
            form.reset();
            queryClient.invalidateQueries({ queryKey: ["EventRequiredGetAll"] });
        },
        onError: (error) => {
            notifications.show({
                color: "red",
                autoClose: 5000,
                title: "Đã xảy ra lỗi, vui lòng thử lại",
                message: error.message,
            });
        }
    });

    const handleSave = async (formValues: any) => {
        if (form.validate().hasErrors) return;
        if (isUpdate) {
            updateEventMutation.mutate(formValues);
            return;
        }
        createEventMutation.mutate(formValues);
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
                size: "80%",
                centered: true,
                title: "Thông tin hoạt động"
            }}
            disclosure={disc}
        >
            <form onSubmit={form.onSubmit((values) => handleSave(values))}>
                <ExtracurricularPlanInfo disclosure={disc} form={form} isUpdate={isUpdate} />
                <CustomButton
                    mt="xl"
                    fullWidth
                    actionType="save"
                    loading={
                        createEventMutation.isPending ||
                        updateEventMutation.isPending
                    }
                />
            </form>
        </CustomButtonModal >
    );
}