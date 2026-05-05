import { Event } from "@/interfaces/event";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { Tabs } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconFileDescription, IconInfoCircle, IconUsers } from "@tabler/icons-react";
import { useEffect } from "react";
import PlanningApprovalInfo from "./TabGeneralInfo/PlanningApprovalInfo";
import RegisterObject from "./TabRegisterObject/RegisterObject";
import { CustomTabs } from "@aq-fe/core-ui/shared/components/navigation/CustomTabs/CustomTabs";
import { EnumRegisterType } from "@/enum/EnumEventRegisterType";

interface Props {
    futurePlanId: number;
    values?: any;
    loading?: boolean
}

export default function PlanningApprovalViewModal({ futurePlanId, values, loading }: Props) {
    const disc = useDisclosure();

    // Create form with initial valuess based on whether it's create or update
    const form = useForm<Event>({
        initialValues: {

            standardId: values?.standardId ?? 0,
            source: values?.source ?? 1,
            registerType: values?.registerType ?? EnumRegisterType.AllStudents,

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

            location: (value) => (!value ? "Vui lòng nhập địa điểm tổ chức" : null),

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

    // Update form valuess when values prop changes
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

    return (
        <CustomButtonModal
            buttonProps={{
                loading: loading,
                variant: "outline",
                leftSection: <IconFileDescription />,
                children: "Xem chi tiết"

            }}
            modalProps={{
                size: "100%",

            }}
            disclosure={disc}
        >
            <form>
                <CustomTabs
                    tabs={[
                        {
                            label: "Thông tin kế hoạch",
                            leftSection: < IconInfoCircle size={16} />,
                            children: < PlanningApprovalInfo
                                disclosure={disc}
                                form={form}
                                isUpdate={false}
                            />
                        },
                        {
                            label: "Đối tượng đăng ký",
                            leftSection: < IconUsers size={16} />,
                            children: <RegisterObject form={form} />
                        },
                    ]} />
            </form>
        </CustomButtonModal>
    );
}
