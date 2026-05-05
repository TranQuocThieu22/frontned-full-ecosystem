import { service_codeFormula } from "@/api/services/service_codeFormula";
import { service_department } from "@/api/services/service_department";
import { service_eventGroup } from "@/api/services/service_eventGroup";
import { service_standard } from "@/api/services/service_standard";
import { schoolCode } from "@/constants/object/schoolCode";
import { EnumBusinessType } from "@/enum/EnumBusinessType";
import { EnumSourceType, EnumSourceTypeLabel } from "@/enum/EnumSourceType";
import { APP_CONFIG } from "@/shared/configs/appConfig";
import { CustomNumberInput } from "@aq-fe/core-ui/shared/components/input/CustomNumberInput";
import { CustomRichTextEditor } from "@aq-fe/core-ui/shared/components/input/CustomRichTextEditor";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { Button, Group, Input, SimpleGrid } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconRefresh } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { debounce } from "lodash";
import { useCallback, useEffect, useMemo } from "react";

interface IExtracurricularPlanInfoProps {
    form: any;
    disclosure: any;
    isUpdate: boolean;
}

export default function ExtracurricularPlanInfo({ form, disclosure, isUpdate }: IExtracurricularPlanInfoProps) {

    // STANDARD
    const standardQuery = useCustomReactQuery({
        queryKey: ["standard"],
        axiosFn: () => service_standard.getAll(),
        options: {
            enabled: disclosure[0],
        }
    });

    const standardOptions = useMemo(() => {
        return (
            standardQuery.data?.map((standard) => ({
                value: standard.id?.toString() ?? '',
                label: 'Mã: ' + standard.code + ' - ' + standard.name,
            })) || []
        );
    }, [standardQuery.data]);

    useEffect(() => {
        if (!standardQuery.data || isUpdate) return;
        form.setFieldValue('standardId', standardQuery.data[0]?.id);
    }, [standardQuery.data]);

    // EVENT GROUP
    const eventGroupQuery = useCustomReactQuery({
        queryKey: ["eventGroup"],
        axiosFn: () => service_eventGroup.getAll(),
        options: {
            enabled: disclosure[0],
        }
    })

    const eventGroupOptions = useMemo(() => {
        return (
            eventGroupQuery.data?.map((eventGroup) => ({
                value: eventGroup.id?.toString() ?? '',
                label: 'Mã: ' + eventGroup.code + ' - ' + eventGroup.name,
            })) || []
        )
    }, [eventGroupQuery.data]);

    // DEPARTMENT
    const departmentQuery = useCustomReactQuery({
        queryKey: ["department"],
        axiosFn: () => service_department.getAll(),
        options: {
            enabled: disclosure[0],
        }
    })

    const departmentOptions = useMemo(() => {
        return (
            departmentQuery.data?.map((department: any) => ({
                value: department.id?.toString() ?? "",
                label: `Mã: ${department.code} - ${department.name}`,
            })) || []
        );
    }, [departmentQuery.data]);

    useEffect(() => {
        if (!departmentQuery.data || isUpdate) return;
        form.setFieldValue('host', departmentQuery.data[0]?.id);
        form.setFieldValue('reviewedBy', departmentQuery.data[0]?.id);
        form.setFieldValue('completedBy', departmentQuery.data[0]?.id);
    }, [departmentQuery.data]);

    // GENERATE EVENT CODE
    const generateEventCodeQuery = useQuery({
        queryKey: ["generate_event_code"],
        queryFn: () => service_codeFormula.getCodeFormulaByType({ operationType: EnumBusinessType.ExtracurricularActivityList }),
        enabled: disclosure[0] && !form.getValues().id,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    })

    useEffect(() => {
        if (!generateEventCodeQuery.data?.data?.data || isUpdate || form.getValues().id) return;
        form.setFieldValue("code", generateEventCodeQuery.data?.data?.data);
    }, [generateEventCodeQuery.data?.data?.data]);

    useEffect(() => {
        if (!generateEventCodeQuery.error || isUpdate || form.getValues().id) return;
        const message = generateEventCodeQuery.error?.message
        const messageData = (generateEventCodeQuery.error as any)?.response?.data?.exception?.message
        notifications.show({
            title: "Tạo mã thất bại",
            message: messageData ?? message ?? "Lỗi bất định",
            color: "red"
        });
    }, [generateEventCodeQuery.error]);

    const debouncedSetFieldValue = useCallback(
        debounce((value: string) => {
            form.setFieldValue("name", value);
        }, 300), // delay 300ms sau mỗi lần gõ
        [form]
    );

    return (
        <>
            <SimpleGrid cols={{ sm: 2, lg: 2 }} mb={5}>
                <CustomSelect
                    withAsterisk
                    label="Điều"
                    isLoading={standardQuery.isLoading}
                    data={standardOptions}
                    value={form.getValues().standardId?.toString()}
                    error={form.errors.standardId}
                    onChange={(value) => form.setFieldValue("standardId", Number(value))}
                    searchable
                    clearable={false}
                />

                <CustomSelect
                    withAsterisk
                    label="Nguồn ghi nhận"
                    data={converterUtils.mapEnumToSelectData(EnumSourceType, EnumSourceTypeLabel)}
                    defaultValue={form.getValues().source?.toString() ?? 1}
                    value={form.getValues().source?.toString()}
                    onChange={(value) => form.setFieldValue("source", Number(value))}
                    searchable
                    clearable={false}
                />

                <CustomSelect
                    label="Nhóm hoạt động"
                    isLoading={eventGroupQuery.isLoading}
                    value={form.getValues().eventGroupId?.toString()}
                    data={eventGroupOptions}
                    onChange={(value) => {
                        form.setFieldValue("eventGroupId", Number(value))
                    }}
                    searchable
                    clearable={true}
                />

                <Input.Wrapper label="Mã hoạt động" withAsterisk error={form.errors.code}>
                    <Group wrap="nowrap" gap="xs" align="start">
                        <Input
                            w="100%"
                            readOnly={isUpdate}
                            placeholder={generateEventCodeQuery.isFetching ? "Đang tạo mã từ bộ đếm..." : "Tạo từ bộ đếm hoặc nhập"}
                            error={form.errors.code}
                            defaultValue={form.getValues().code}
                            key={Date.now()}
                            onBlur={(e) => form.setFieldValue("code", e.target.value)}
                        />
                        {!isUpdate &&
                            <Button
                                miw="40%"
                                variant="light"
                                color={generateEventCodeQuery.isError ? "red" : "blue"}
                                leftSection={generateEventCodeQuery.isError ? <IconRefresh /> : undefined}
                                loading={generateEventCodeQuery.isFetching}
                                onClick={async () => {
                                    await generateEventCodeQuery.refetch();
                                    form.setFieldValue("code", generateEventCodeQuery.data?.data?.data);
                                }}
                            >
                                {generateEventCodeQuery.isError ? "Thử lại" : "Tạo mã tự động"}
                            </Button>
                        }
                    </Group>
                </Input.Wrapper>
            </SimpleGrid>

            <CustomRichTextEditor
                label="Mô tả hoạt động ngoại khóa"
                withAsterisk
                error={form.errors.name}
                value={form.getValues().name}
                onChange={(value) => debouncedSetFieldValue(value)}
            />

            <SimpleGrid cols={{ sm: 2, lg: 2 }} mt={5}>
                <CustomSelect
                    label="Đơn vị tổ chức"
                    withAsterisk
                    value={form.getValues().host?.toString()}
                    defaultValue={form.getValues().host?.toString()}
                    error={form.errors.host}
                    isLoading={departmentQuery.isLoading}
                    data={departmentOptions}
                    onChange={(value) => {
                        form.setFieldValue("host", Number(value))
                        if (APP_CONFIG.schoolCode == schoolCode.FTU) {
                            form.setFieldValue("reviewedBy", Number(value))
                        }
                    }}
                    clearable={false}
                    searchable
                />

                <CustomSelect
                    label="Đơn vị công nhận"
                    withAsterisk
                    value={form.getValues().completedBy?.toString()}
                    defaultValue={form.getValues().completedBy?.toString()}
                    error={form.errors.completedBy}
                    data={departmentOptions}
                    isLoading={departmentQuery.isLoading}
                    onChange={(value) => form.setFieldValue("completedBy", Number(value))}
                    clearable={false}
                    searchable
                />

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
            </SimpleGrid>
        </>
    );
}
