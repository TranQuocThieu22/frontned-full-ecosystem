'use client'
import { service_department } from '@/api/services/service_department';
import { service_event } from '@/api/services/service_event';
import { service_eventGroup } from '@/api/services/service_eventGroup';
import { service_standard } from '@/api/services/service_standard';
import { EnumSourceTypeLabel } from '@/enum/EnumSourceType';
import { Event } from '@/interfaces/event';
import { CustomButtonCreateUpdate } from '@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate';
import { CustomNumberInput } from '@aq-fe/core-ui/shared/components/input/CustomNumberInput';
import { CustomRichTextEditor } from '@aq-fe/core-ui/shared/components/input/CustomRichTextEditor';
import { CustomSelect } from '@aq-fe/core-ui/shared/components/input/CustomSelect';
import { useCustomReactQuery } from '@aq-fe/core-ui/shared/hooks/useCustomReactQuery';
import { Grid } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useEffect } from 'react';

export const sourceTypeOptions = Object.entries(EnumSourceTypeLabel).map(
    ([value, label]) => ({ value, label })
);

export default function MandatoryActivityCatalogButtonCreate() {
    const disc = useDisclosure();

    const eventGroupQuery = useCustomReactQuery({
        queryKey: ["eventGroupGetAll"],
        axiosFn: () => service_eventGroup.getAll(),
        options: {
            enabled: disc[0],
        },
    });

    const standardQuery = useCustomReactQuery({
        queryKey: ["F_xawveu4zfc_Create_Standard_GetAll"],
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
    })

    const departmentOnlyQuery = useCustomReactQuery({
        queryKey: ["getDepartmentOnly"],
        axiosFn: () => service_department.getDepartmentOnly(),
        options: {
            enabled: disc[0],
        },
    })


    // const createMutation = useCustomReactMutation({
    //     axiosFn: async (body: IEvent) => await service_event.createEventRequired(body),
    //     options: {
    //         onSuccess: async (res) => {
    //             // utils_notification_show({ message: "Tạo thành công!", color: "green" });
    //             disc[1].close();
    //         },
    //         // onError: (error: any) => {
    //         //     // utils_notification_show({ message: "Có lỗi đã xảy ra, vui lòng thử lại sau!", color: "red" });
    //         // },
    //     }
    // });

    const form = useForm<Event>({
        initialValues: {
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
        if (eventGroupQuery.isSuccess && eventGroupQuery.data.length > 0) {
            const first = eventGroupQuery.data[0];
            const defaultCode = `${first?.code}${first?.eventNumber}`;

            form.setValues((prev) => ({
                ...prev,
                code: defaultCode,
                eventGroupId: first?.id,
            }));
        }
    }, [eventGroupQuery.data]);

    useEffect(() => {
        if (
            eventGroupQuery.isSuccess &&
            eventGroupQuery.data.length > 0 &&
            form.values.code === ""
        ) {
            const defaultCode = `${eventGroupQuery.data[0]?.code}${eventGroupQuery.data[0]?.eventNumber}`;
            form.setFieldValue("code", defaultCode);
        }
    }, [eventGroupQuery.isSuccess]);

    return (
        <CustomButtonCreateUpdate
            disclosure={disc}
            modalProps={{
                size: "70vw",
                title: "Hoạt động cố định"
            }}
            form={form}
            onSubmit={(values) => service_event.createEventRequired(values)}
        >
            <Grid>
                <Grid.Col span={6}>
                    <CustomSelect
                        withAsterisk
                        error={form.errors.Standard}
                        label="Điều"
                        data={standardQuery.isSuccess
                            ? standardQuery.data.map((reg: any) => ({
                                value: reg.id.toString(),
                                label: `${reg.code} - ${reg.name}`,
                            }))
                            : []
                        }
                        onChange={(value) => form.setFieldValue("standardId", parseInt(value ? value : "0"))}
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <CustomSelect
                        {...form.getInputProps("source")}
                        label='Nguồn ghi nhận điểm' data={sourceTypeOptions}
                        value={String(form.values.source ?? "")}
                        onChange={(value) => form.setFieldValue("source", Number(value))}
                        searchable={true}
                        clearable={false}
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <CustomSelect
                        disabled
                        withAsterisk
                        error={form.errors.eventGroup}
                        label="Mã hoạt động"
                        value={eventGroupQuery.isSuccess &&
                            eventGroupQuery.data.length > 0 ? `${eventGroupQuery.data[0]?.code}${eventGroupQuery.data[0]?.eventNumber}` : undefined}
                        data={
                            eventGroupQuery.isSuccess
                                ? eventGroupQuery.data.map((item: any) => {
                                    const value = `${item.code}${item.eventNumber}`;
                                    return {
                                        value: value,
                                        label: value,
                                    };
                                })
                                : []
                        }
                        onChange={(value) => form.setFieldValue("code", value ?? "")}
                    />
                </Grid.Col>
                <Grid.Col span={12}>
                    <CustomRichTextEditor error={form.errors.name as string | undefined}
                        label="Hoạt động cố định"
                        withAsterisk
                        value={form.values.name}
                        onChange={(value: any) => form.setFieldValue("name", value)} />
                </Grid.Col>
                <Grid.Col span={4}>
                    <CustomSelect
                        error={form.errors.DepartmentOnly}
                        label="Đơn vị tổ chức"
                        data={departmentGetWorkingUnitQuery.isSuccess
                            ? departmentGetWorkingUnitQuery.data.map((reg: any) => ({
                                value: reg.id.toString(),
                                label: `${reg.code} - ${reg.name}`,
                            }))
                            : []
                        }
                        onChange={(value) => form.setFieldValue("host", parseInt(value ? value : "0"))}
                    />
                </Grid.Col>
                <Grid.Col span={4}>
                    <CustomSelect
                        error={form.errors.WorkingUnit}
                        label="Đơn vị ghi nhận"
                        data={departmentGetWorkingUnitQuery.isSuccess
                            ? departmentGetWorkingUnitQuery.data.map((reg: any) => ({
                                value: reg.id.toString(),
                                label: `${reg.code} - ${reg.name}`,
                            }))
                            : []
                        }
                        onChange={(value) => form.setFieldValue("reviewedBy", parseInt(value ? value : "0"))}
                    />
                </Grid.Col>
                <Grid.Col span={4}>
                    <CustomSelect
                        error={form.errors.WorkingUnit}
                        label="Đơn vị công nhận"
                        data={departmentGetWorkingUnitQuery.isSuccess
                            ? departmentGetWorkingUnitQuery.data.map((reg: any) => ({
                                value: reg.id.toString(),
                                label: `${reg.code} - ${reg.name}`,
                            }))
                            : []
                        }
                        onChange={(value) => form.setFieldValue("completedBy", parseInt(value ? value : "0"))}
                    />
                </Grid.Col>
                <Grid.Col span={4}>
                    <CustomNumberInput
                        withAsterisk
                        label='Điểm tối thiểu'
                        min={0}
                        {...form.getInputProps("minPoint")}
                        onChange={(value) => form.setFieldValue("minPoint", Number(value))}
                    />
                </Grid.Col>
                <Grid.Col span={4}>
                    <CustomNumberInput
                        withAsterisk
                        label='Điểm tối đa'
                        min={0}
                        {...form.getInputProps("maxPoint")}
                        onChange={(value) => form.setFieldValue("maxPoint", Number(value))}
                    />
                </Grid.Col>
            </Grid>

        </CustomButtonCreateUpdate >
    );
}

