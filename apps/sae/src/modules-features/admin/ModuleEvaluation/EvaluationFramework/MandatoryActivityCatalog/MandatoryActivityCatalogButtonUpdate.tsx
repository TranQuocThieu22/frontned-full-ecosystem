'use client'

import { service_department } from '@/api/services/service_department';
import { service_event } from '@/api/services/service_event';
import { service_standard } from '@/api/services/service_standard';
import { EnumSourceTypeLabel } from '@/enum/EnumSourceType';
import { Event } from '@/interfaces/event';
import { CustomButtonCreateUpdate } from '@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate';
import { CustomNumberInput } from '@aq-fe/core-ui/shared/components/input/CustomNumberInput';
import { CustomRichTextEditor } from '@aq-fe/core-ui/shared/components/input/CustomRichTextEditor';
import { CustomSelect } from '@aq-fe/core-ui/shared/components/input/CustomSelect';
import { CustomTextInput } from '@aq-fe/core-ui/shared/components/input/CustomTextInput';
import { useCustomReactQuery } from '@aq-fe/core-ui/shared/hooks/useCustomReactQuery';
import { Grid } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export const sourceTypeOptions = Object.entries(EnumSourceTypeLabel).map(
    ([value, label]) => ({ value, label })
);

export default function MandatoryActivityCatalogButtonUpdate({ values }: { values: Event }) {
    const disc = useDisclosure();
    const standardQuery = useCustomReactQuery({
        queryKey: ["MandatoryActivityCatalogButtonUpdate_Standard_GetAll"],
        axiosFn: () => service_standard.getAll(),
        options: {
            enabled: disc[0],
        },
    });

    const departmentGetWorkingUnitQuery = useCustomReactQuery({
        queryKey: ["getWorkingUnit"],
        axiosFn: () => service_department.getWorkingUnit(),
        options: {
            enabled: disc[0],
        },
    });

    const departmentOnlyQuery = useCustomReactQuery({
        queryKey: ["getDepartmentOnly"],
        axiosFn: () => service_department.getDepartmentOnly(),
        options: {
            enabled: disc[0],
        },
    })

    const updateMutation = useMutation({
        mutationFn: async (body: Event) => {
            const transformedValues = {
                ...body,
                maxPoint: Number(body.maxPoint),
                minPoint: Number(body.minPoint),
            };
            return await service_event.update(transformedValues);
        },

        onSuccess: async (res) => {
            // utils_notification_show({ message: "Cập nhật thành công!", color: "green" });
            disc[1].close();
        },
        onError: (error: any) => {
            // utils_notification_show({ message: "Có lỗi đã xảy ra, vui lòng thử lại sau!", color: "red" });
        },
    });

    const [fileData, setFileData] = useState<any[]>([]);

    const form = useForm({
        initialValues: {
            ...values,
            standardId: values.standardId ?? 0,
            host: values.host ?? 0,
            reviewedBy: values.reviewedBy ?? 0,
            completedBy: values.completedBy ?? 0,
            source: values.source ?? 0,
        },
        validate: {
            code: (value) => value ? null : 'Không được để trống',
            name: (value) => value ? null : 'Không được để trống',
            maxPoint: (value) => {
                if (value === null || value === undefined || value.toString() === "") {
                    return "Không được để trống"
                } else if (value < 0) {
                    return "Điểm tối đa không được âm"
                }
            },
            minPoint: (value) => {
                if (value === null || value === undefined || value.toString() === "") {
                    return "Không được để trống"
                } else if (value < 0) {
                    return "Điểm tối thiểu không được âm"
                } else if (form.values.maxPoint && value > form.values.maxPoint) {
                    return "Điểm tối thiểu không được lớn hơn điểm tối đa"
                }
            }
        },

    });

    useEffect(() => {
        if (values) {
            form.setValues({
                ...values,
                host: values.host ?? 0,
                reviewedBy: values.reviewedBy ?? 0,
                completedBy: values.completedBy ?? 0,
                standardId: values.standardId ?? 0,
                source: values.source ?? 0
            });
        }
    }, [values]);


    return (
        <CustomButtonCreateUpdate
            isUpdate
            modalProps={{
                size: "70vw"
            }}
            disclosure={disc}
            form={form}
            onSubmit={async (values) => updateMutation.mutateAsync(values)} >
            <Grid>
                <Grid.Col span={6} >
                    <CustomSelect
                        withAsterisk
                        error={form.errors.standardId}
                        label="Điều"
                        {...form.getInputProps("standardId")}
                        data={
                            standardQuery.isSuccess
                                ? standardQuery.data.map((reg: any) => ({
                                    value: reg.id.toString(),
                                    label: `${reg.code} - ${reg.name}`,
                                }))
                                : []
                        }
                        value={String(form.values.standardId ?? "")}
                        onChange={(value) => form.setFieldValue("standardId", parseInt(value?.toString() ?? ""))}
                    />


                </Grid.Col>
                <Grid.Col span={6} >
                    <CustomSelect
                        {...form.getInputProps("source")}
                        label='Nguồn ghi nhận điểm' data={sourceTypeOptions}
                        value={String(form.values.source ?? "")}
                        onChange={(value) => form.setFieldValue("source", Number(value))}
                        searchable={true}
                        clearable={false}
                    />
                </Grid.Col>
                <Grid.Col span={6} py={0}>
                    <CustomTextInput
                        withAsterisk
                        disabled
                        error={form.errors.eventGroup}
                        label="Mã hoạt động"
                        {...form.getInputProps("code")}
                    />


                </Grid.Col>
                <Grid.Col span={12} >
                    <CustomRichTextEditor error={form.errors.name as string | undefined}
                        label="Hoạt động cố định"
                        value={form.values.name}
                        onChange={(value: any) => form.setFieldValue("name", value)} />
                </Grid.Col>
                <Grid.Col span={4}>
                    <CustomSelect
                        error={form.errors.DepartmentOnly}
                        label="Đơn vị tổ chức"
                        {...form.getInputProps("host")}
                        data={departmentGetWorkingUnitQuery.isSuccess
                            ? departmentGetWorkingUnitQuery.data.map((reg: any) => ({
                                value: reg.id.toString(),
                                label: `${reg.code} - ${reg.name}`,
                            }))
                            : []
                        }
                        value={String(form.values.host ?? "")}
                        onChange={(value) => form.setFieldValue("host", parseInt(value?.toString() ?? ""))}
                    />
                </Grid.Col>
                <Grid.Col span={4}>
                    <CustomSelect
                        error={form.errors.WorkingUnit}
                        label="Đơn vị ghi nhận"
                        {...form.getInputProps("reviewedBy")}
                        data={departmentGetWorkingUnitQuery.isSuccess
                            ? departmentGetWorkingUnitQuery.data.map((reg: any) => ({
                                value: reg.id.toString(),
                                label: `${reg.code} - ${reg.name}`,
                            }))
                            : []
                        }
                        value={String(form.values.reviewedBy ?? "")}
                        onChange={(value) => form.setFieldValue("reviewedBy", parseInt(value?.toString() ?? ""))}

                    />
                </Grid.Col>
                <Grid.Col span={4}>
                    <CustomSelect
                        error={form.errors.WorkingUnit}
                        label="Đơn vị công nhận"
                        {...form.getInputProps("completedBy")}
                        data={departmentGetWorkingUnitQuery.isSuccess
                            ? departmentGetWorkingUnitQuery.data.map((reg: any) => ({
                                value: reg.id.toString(),
                                label: `${reg.code} - ${reg.name}`,
                            }))
                            : []
                        }
                        value={String(form.values.completedBy ?? "")}
                        onChange={(value) => form.setFieldValue("completedBy", parseInt(value?.toString() ?? ""))}
                    />
                </Grid.Col>
                <Grid.Col span={4}>
                    <CustomNumberInput
                        withAsterisk
                        label='Điểm tối thiểu'
                        {...form.getInputProps("minPoint")}
                        min={0}
                    />
                </Grid.Col>
                <Grid.Col span={4}>
                    <CustomNumberInput
                        withAsterisk
                        label='Điểm tối đa'
                        {...form.getInputProps("maxPoint")}
                        min={0}
                    />
                </Grid.Col>
            </Grid>

        </CustomButtonCreateUpdate>
    )
}
