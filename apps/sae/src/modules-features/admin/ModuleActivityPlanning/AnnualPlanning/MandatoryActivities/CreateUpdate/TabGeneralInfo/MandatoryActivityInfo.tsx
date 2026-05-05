import { service_department } from "@/api/services/service_department";
import { service_eventGroup } from "@/api/services/service_eventGroup";
import { service_faculty } from "@/api/services/service_faculty";
import { service_standard } from "@/api/services/service_standard";
import { schoolCode } from "@/constants/object/schoolCode";
import { generateEventCode } from "@/modules-features/admin/ModuleActivityPlanning/AnnualPlanning/ExtracurricularPlanRegister/Helper/GenerateEventCode";
import { APP_CONFIG } from "@/shared/configs/appConfig";
import { CustomDateInput } from "@aq-fe/core-ui/shared/components/input/CustomDateInput";
import { CustomNumberInput } from "@aq-fe/core-ui/shared/components/input/CustomNumberInput";
import { CustomRichTextEditor } from "@aq-fe/core-ui/shared/components/input/CustomRichTextEditor";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Button, Group, SelectProps, SimpleGrid, Text } from "@mantine/core";
import { TimePicker } from "@mantine/dates";
import { IconCheck } from "@tabler/icons-react";
import { debounce } from "lodash";
import { useCallback, useEffect, useMemo } from "react";

// Enum Nguồn đăng kí
export enum RegisterType {
    School = 1,
    Faculty = 2,
    Major = 3,
    Class = 4,
    Students = 5,
}

export const registerTypeLabels: Record<RegisterType, string> = {
    [RegisterType.School]: "Toàn trường",
    [RegisterType.Faculty]: "Khoa",
    [RegisterType.Major]: "Ngành",
    [RegisterType.Class]: "Lớp",
    [RegisterType.Students]: "Sinh viên",
};

export const registerTypeOptions = Object.entries(registerTypeLabels).map(
    ([value, label]) => ({ value: value.toString(), label })
);

export enum Session {
    Morning = 1,
    Noon = 2,
    Afternoon = 3,
}

export const sessionLabels: Record<Session, string> = {
    [Session.Morning]: "Buổi sáng",
    [Session.Noon]: "Buổi trưa",
    [Session.Afternoon]: "Buổi chiều",
};

export const sessionOptions = Object.entries(sessionLabels).map(
    ([value, label]) => ({ value: value.toString(), label })
);

export enum SourceType {
    Participate = 1,
    StudyResult = 2,
    FileVerification = 3,
}

export const sourceTypeLabels: Record<SourceType, string> = {
    [SourceType.Participate]: "Điểm danh",
    [SourceType.StudyResult]: "Kết quả học tập",
    [SourceType.FileVerification]: "Xác duyệt minh chứng",
};

export const sourceTypeOptions = Object.entries(sourceTypeLabels).map(
    ([value, label]) => ({ value, label })
);

interface IExtracurricularPlanInfoProps {
    form: any;
    disclosure: any;
    isUpdate: boolean;
    futurePlanId?: number
}

export default function MandatoryActivityInfo({ form, disclosure, isUpdate }: IExtracurricularPlanInfoProps) {

    // Data queries for selections
    const standardQuery = useCustomReactQuery({
        queryKey: ["ActivityButtonUpdate_Standard_GetAll"],
        axiosFn: () => service_standard.getAll(),
        options: {
            enabled: disclosure[0],
        }
    });

    const eventGroupQuery = useCustomReactQuery({
        queryKey: ["eventGroup"],
        axiosFn: () => service_eventGroup.getAll(),
        options: {
            enabled: disclosure[0],
        }
    })

    const departmentQuery = useCustomReactQuery({
        queryKey: ["department"],
        axiosFn: () => service_department.getAll(),
        options: {
            enabled: disclosure[0],
        }
    })

    const facultyQuery = useCustomReactQuery({
        queryKey: ["faculty"],
        axiosFn: () => service_faculty.getAll(),
        options: {
            enabled: disclosure[0],
        }
    })

    // const addressQuery = useCustomReactQuery({
    //     queryKey: ["address"],
    //     axiosFn: () => service_address.getAll(),
    //     options: {
    //         enabled: disclosure[0],
    //     }
    // })

    // Auto generate attributes for selects on create mode
    useEffect(() => {
        const activityGroup = form.values.activityGroup;
        if (activityGroup && !form.values.activityCode && !isUpdate) {
            const groupPrefix = activityGroup.substring(0, 3).toUpperCase();
            const timestamp = Date.now().toString().slice(-4);
            form.setFieldValue('activityCode', `${groupPrefix}${timestamp}`);
        }
    }, [form, form.values.activityGroup, isUpdate]);

    useEffect(() => {
        if (standardQuery.data && standardQuery.data.length > 0 && !isUpdate) {
            form.setFieldValue('standardId', standardQuery.data[0]?.id)
        }
    }, [standardQuery.data,]);

    useEffect(() => {
        if (eventGroupQuery.data && eventGroupQuery.data?.length > 0 && !isUpdate) {
            const value = eventGroupQuery.data[0]?.id
            form.setFieldValue("eventGroupId", value)
            generateEventCode().then(code => {
                form.setFieldValue("code", code);
            });
        }
    }, [eventGroupQuery.data,]);

    useEffect(() => {
        if (departmentQuery.data && departmentQuery.data.length > 0 && !isUpdate) {
            form.setFieldValue('host', departmentQuery.data[0]?.id)
            form.setFieldValue('reviewedBy', departmentQuery.data[0]?.id)
            form.setFieldValue('completedBy', departmentQuery.data[0]?.id)
        }
    }, [departmentQuery.data,]);

    useEffect(() => {
        if (facultyQuery.data && facultyQuery.data.length > 0 && !isUpdate) {
            form.setFieldValue('facultyId', facultyQuery.data[0]?.id)
        }
    }, [facultyQuery.data,]);

    // useEffect(() => {
    //     if (addressQuery.data && addressQuery.data.length > 0 && !isUpdate) {
    //         form.setFieldValue('address', addressQuery.data[0]?.id)
    //     }
    // }, [addressQuery.data,]);

    const enhancedVisualOption: SelectProps['renderOption'] = ({ option, checked }) => (
        <Group style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {checked && <IconCheck style={{ marginInlineEnd: 'auto' }}
                {...{ stroke: 1.5, color: 'currentColor', opacity: 0.6, size: 18, }} />}
            <div style={{ maxWidth: '450px', wordWrap: 'break-word', overflow: 'hidden' }}>
                <Text fz="sm" opacity={0.7}>{option.label}</Text>
            </div>
        </Group>
    );

    const standardOptions = useMemo(() => {
        return (
            standardQuery.data?.map((standard) => ({
                value: standard.id?.toString() ?? '',
                label: 'Mã: ' + standard.code + ' - ' + standard.name,
            })) || []
        );
    }, [standardQuery.data]);

    const departmentOptions = useMemo(() => {
        return (
            departmentQuery.data?.map((department: any) => ({
                value: department.id?.toString() ?? "",
                label: `Mã: ${department.code} - ${department.name}`,
            })) || []
        );
    }, [departmentQuery.data]);

    const eventGroupOptions = useMemo(() => {
        return (
            eventGroupQuery.data?.map((eventGroup) => ({
                value: eventGroup.id?.toString() ?? '',
                label: 'Mã: ' + eventGroup.code + ' - ' + eventGroup.name,
            })) || []
        )
    }, [eventGroupQuery.data]);

    // Sử dụng giải pháp debouncing để giải quyết vấn đề lag khi nhập
    const debouncedSetFieldValue = useCallback(
        debounce((value: string) => {
            form.setFieldValue("name", value);
        }, 300), // delay 300ms sau mỗi lần gõ
        [form]
    );

    return (
        <>
            <Group grow>

                <CustomSelect
                    withAsterisk
                    label="Điều"
                    isLoading={standardQuery.isLoading}
                    data={standardOptions}
                    value={form.getValues().standardId?.toString()}
                    error={form.errors.standardId}
                    onChange={(value) => form.setFieldValue("standardId", Number(value))}
                    renderOption={enhancedVisualOption}
                    searchable
                    clearable={false}
                />

                <CustomSelect
                    withAsterisk
                    label="Nguồn ghi nhận"
                    data={sourceTypeOptions}
                    defaultValue={form.getValues().source?.toString() ?? sourceTypeOptions[0]?.value}
                    value={form.getValues().source?.toString()}
                    onChange={(value) => form.setFieldValue("source", Number(value))}
                    searchable
                    clearable={false}
                />

                <CustomSelect
                    withAsterisk
                    label="Đối tượng đăng ký"
                    data={registerTypeOptions}
                    defaultValue={form.getValues().registerType?.toString() ?? registerTypeOptions[0]?.value}
                    value={form.getValues().registerType?.toString()}
                    onChange={(value) => form.setFieldValue("registerType", Number(value))}
                    searchable
                    clearable={false}
                />
            </Group>

            <Group grow>
                <CustomSelect
                    withAsterisk
                    label="Nhóm hoạt động"
                    isLoading={eventGroupQuery.isLoading}
                    value={form.getValues().eventGroupId?.toString()}
                    data={eventGroupOptions}
                    onChange={(value) => {
                        form.setFieldValue("eventGroupId", Number(value))
                        generateEventCode().then(code => {
                            form.setFieldValue("code", code);
                        });
                    }}
                    renderOption={enhancedVisualOption}
                    searchable
                    clearable={false}
                />

                <Group wrap="nowrap" gap={5}>
                    <CustomTextInput
                        w={isUpdate ? "100%" : { base: "50%", lg: "64%" }}
                        readOnly={isUpdate}
                        label="Mã hoạt động"
                        withAsterisk
                        placeholder="Tự động tạo dựa trên bộ đếm tương ứng"
                        {...form.getInputProps("code")}
                    />
                    {!isUpdate &&
                        <Button
                            variant="light"
                            color="blue"
                            mt={24}
                            w={{ base: "50%", lg: "36%" }}
                            onClick={async () => form.setFieldValue("code", await generateEventCode())}
                        >
                            Tạo mã tự động
                        </Button>
                    }
                </Group>

                <CustomNumberInput
                    label="Số lượng đăng ký tối đa"
                    min={1}
                    max={1000000}

                    {...form.getInputProps("quantity")}
                />
            </Group>

            <CustomRichTextEditor
                inputWrapperProps={{
                    label: 'Mô tả hoạt động ngoại khóa',
                    withAsterisk: true,
                    error: form.errors.name
                }}
                value={form.getValues().name}
                onChange={(value) => debouncedSetFieldValue(value)}
            />

            <SimpleGrid cols={3}>
                <CustomSelect
                    label="Đơn vị tổ chức"
                    withAsterisk
                    data={departmentOptions}
                    isLoading={departmentQuery.isLoading}
                    value={form.getValues().host?.toString()}
                    defaultValue={form.getValues().host?.toString()}
                    error={form.errors.host}
                    onChange={(value) => {
                        form.setFieldValue("host", Number(value))
                        if (APP_CONFIG.schoolCode == schoolCode.FTU) {
                            form.setFieldValue("reviewedBy", Number(value))
                        }
                    }}
                    renderOption={enhancedVisualOption}
                    clearable={false}
                    searchable
                />

                {APP_CONFIG.schoolCode != schoolCode.FTU && (
                    <CustomSelect
                        label="Đơn vị ghi nhận"
                        withAsterisk
                        data={departmentOptions}
                        isLoading={departmentQuery.isLoading}
                        value={form.getValues().reviewedBy?.toString()}
                        defaultValue={form.getValues().reviewedBy?.toString()}
                        error={form.errors.reviewedBy}
                        onChange={(value) => {
                            form.setFieldValue("reviewedBy", Number(value))
                        }}
                        renderOption={enhancedVisualOption}
                        clearable={false}
                        searchable
                    />
                )}

                <CustomSelect
                    label="Đơn vị công nhận"
                    withAsterisk
                    data={departmentOptions}
                    isLoading={departmentQuery.isLoading}
                    value={form.getValues().completedBy?.toString()}
                    defaultValue={form.getValues().completedBy?.toString()}
                    error={form.errors.completedBy}
                    onChange={(value) => form.setFieldValue("completedBy", Number(value))}
                    renderOption={enhancedVisualOption}
                    clearable={false}
                />
                <CustomTextInput
                    withAsterisk
                    label="Địa điểm tổ chức"
                    {...form.getInputProps("location")}
                />
                <CustomDateInput
                    label="Ngày bắt đầu"
                    // minDate={new Date(new Date().setDate(new Date().getDate() + 1))} // lấy ngày mai
                    {...form.getInputProps("startDate")}
                    clearable={false}
                />
                <CustomDateInput
                    label="Ngày kết thúc"
                    minDate={
                        new Date(
                            new Date(form.getValues().startDate || new Date()).getTime() + 24 * 60 * 60 * 1000
                        )
                    }
                    {...form.getInputProps("endDate")}
                    clearable={false}
                />

                <CustomSelect
                    label="Buổi"
                    data={sessionOptions}
                    value={form.getValues().session?.toString()}
                    onChange={(value) => form.setFieldValue("session", Number(value))}
                    clearable={false}
                    searchable
                />
                <TimePicker
                    disabled={!form.getValues()?.startDate}
                    label="Giờ bắt đầu"
                    format="24h"
                    defaultValue={(() => {
                        const startDate = form.getValues().startDate;
                        if (!startDate) return undefined;

                        // If it's already a Date object
                        if (startDate instanceof Date) {
                            return startDate.toTimeString().slice(0, 5);
                        }

                        // If it's a string (ISO format like "2024-01-01T14:30:00")
                        if (typeof startDate === 'string' && startDate.includes('T')) {
                            return startDate.split('T')[1]?.slice(0, 5);
                        }

                        // If it's a string date, try to convert to Date first
                        if (typeof startDate === 'string') {
                            const date = new Date(startDate);
                            return date.toTimeString().slice(0, 5);
                        }

                        return undefined;
                    })()}
                    onChange={(value) => {
                        if (value) {
                            const startDate = form.getValues().startDate;
                            let newDate;

                            if (startDate instanceof Date) {
                                newDate = new Date(startDate);
                            } else if (typeof startDate === 'string') {
                                newDate = new Date(startDate);
                            } else {
                                // If no existing date, use today
                                newDate = new Date();
                            }

                            const dateSplit = value.split(':');
                            newDate.setHours(parseInt(dateSplit[0] ?? ''), parseInt(dateSplit[1] ?? ''), 0, 0);
                            form.setFieldValue("startDate", `${startDate.split("T")[0]}T${dateSplit[0]}:${dateSplit[1]}:00`);
                        }
                    }}
                />
                <Group grow>
                    <CustomNumberInput
                        withAsterisk
                        label="Điểm tối thiểu"
                        min={0}
                        max={100}
                        precision={1}
                        defaultValue={0}
                        {...form.getInputProps("minPoint")}
                    />
                    <CustomNumberInput
                        withAsterisk
                        label="Điểm tối đa"
                        min={form.getValues().minScore || 0}
                        max={100}
                        precision={1}
                        {...form.getInputProps("maxPoint")}
                    />
                </Group>

            </SimpleGrid>
        </>
    );
}
