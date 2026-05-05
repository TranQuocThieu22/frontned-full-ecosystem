"use client"
import baseAxios from '@/api/config/baseAxios';
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MyCenterFull from '@/components/CenterFull/MyCenterFull';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { ENUM_DAYS_OF_WEEK } from '@/constants/enum/global';
import { ICourseViewModel } from '@/interfacesForViewModels/Course/ICourseViewModel';
import { ISkillCenterInfoViewModel } from '@/interfacesForViewModels/SkillCenter/ISkillCenterInfoViewModel';
import { ITimeClusterInfoViewModel } from '@/interfacesForViewModels/TimeCluster/ITimeClusterInfoViewModel';
import { ITimeTypeViewModel } from '@/interfacesForViewModels/TimeType/ITimeTypeViewModel';
import { ActionIcon, Button, Card, Fieldset, Flex, Grid, Group, Image, Modal, NumberInput, Portal, Select, Text, Textarea } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { Dropzone, DropzoneProps, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconCalendarPlus, IconPhoto, IconUpload, IconX } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { utils_file_fileToAQDocumentType } from 'aq-fe-framework/utils';
import { MantineReactTable, MRT_ColumnDef, useMantineReactTable } from 'mantine-react-table';
import { MRT_Localization_VI } from 'mantine-react-table/locales/vi/index.cjs';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ITimeClusterInfoViewModelWithMaxStudentNumber } from './Interfaces/Interfaces';

export default function CourseCreateButton(props: Partial<DropzoneProps>) {
    let [sumAfterSelectionState, setSumAfterSelectionState] = useState({
        totalPeriods: 0,
        totalHours: 0
    });

    const form = useForm<ICourseViewModel>({
        initialValues: {
            id: 0,
            code: "",
            name: "",
            concurrencyStamp: "string",
            isEnabled: true,
            status: null,
            programId: null,
            startDateRegistration: null,
            endDateRegistration: null,
            testDate: null,
            studyDate: null,
            endDate: null,
            // price: 0,
            branchId: null,
            skillCenterId: null,
            image: "",
            description: "",
            fileDetail: {
                fileName: "",
                fileExtension: "",
                fileBase64String: ""
            },
        },
        validate: {
            code: (value) => value ? null : 'Không được để trống',
            name: (value) => value ? null : 'Không được để trống',
            skillCenterId: (value) => value ? null : 'Không được để trống',
            programId: (value) => value ? null : 'Không được để trống',
            branchId: (value) => value ? null : 'Không được để trống',
            status: (value) => value ? null : 'Không được để trống',
            studyDate: (value) => value ? null : 'Không được để trống',
            startDateRegistration: (value) => value ? null : 'Không được để trống',
            testDate: (value) => {
                const selectedProgram = AllSelectionBySkillCenterId.data?.program?.find(item => item.id?.toString() === form.values.programId);
                if (selectedProgram?.isTesting && !value) {
                    return 'Không được để trống do chương trình học có tổ chức thi';
                }
                return null;
            },
            endDate: (value) => {
                const selectedProgram = AllSelectionBySkillCenterId.data?.program?.find(item => item.id?.toString() === form.values.programId);
                if (selectedProgram?.isTesting && !value) {
                    return 'Không được để trống do chương trình học có tổ chức thi';
                }
                return null;
            }
        }
    })

    const openRef = useRef<() => void>(null);
    const [bannerFiles, setBannerFiles] = useState<FileWithPath[]>([]);

    const bannerPreviews = bannerFiles.map((file, index) => {
        console.log(file);
        const imageUrl = URL.createObjectURL(file);
        return (
            <React.Fragment key={index}>
                <Card radius={0} withBorder p={20}>
                    <Card.Section mb={5}>
                        <Group h={20}>
                            <Button
                                leftSection={<IconUpload />}
                                size="compact-xs"
                                variant="default"
                                color='black'
                                onClick={() => openRef.current?.()}
                                style={{ pointerEvents: 'all' }}
                            >
                                Thay đổi ảnh
                            </Button>
                            {/* <Text fz="xs" fw={600}>
                                Ảnh banner khóa học
                            </Text> */}
                            <ActionIcon
                                variant="white"
                                color="red"
                                radius="xl"
                                size="sm"
                                style={{
                                    pointerEvents: 'all',
                                    cursor: 'pointer',
                                    position: 'absolute',
                                    top: 5,
                                    right: 5,
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setBannerFiles([]);
                                }}
                            >
                                <IconX size={16} />
                            </ActionIcon>
                        </Group>
                    </Card.Section>
                    <Card.Section>
                        <Image
                            draggable={false}
                            style={{
                                pointerEvents: 'all',
                                cursor: 'pointer'
                            }}
                            h={200}
                            w="auto"
                            fit="contain"
                            key={index} src={imageUrl}
                            onLoad={() => URL.revokeObjectURL(imageUrl)
                            }
                            onClick={() => {
                                openRef.current?.()
                            }}
                        />
                    </Card.Section>
                </Card>
            </React.Fragment>
        )
    });

    const AllSkillCenters = useQuery<ISkillCenterInfoViewModel[]>({
        queryKey: [`AllSkillCenters`],
        queryFn: async () => {
            const response = await baseAxios.get("/SkillCenter/GetAll")
            return response.data.data
        },
        refetchOnWindowFocus: false
    })

    const AllSelectionBySkillCenterId = useQuery<ISkillCenterInfoViewModel>({
        queryKey: [`AllProgramsBySkillCenterId`],
        queryFn: async () => {
            let cols = "Program,Branch";
            const response = await baseAxios.get(`/SkillCenter/Get?id=${form.values.skillCenterId}&cols=${cols}`);
            return response.data.data
        },
        enabled: form.getValues().skillCenterId != null,
        refetchOnWindowFocus: false
    })

    useEffect(() => {
        if (Number.isNaN(form.values.skillCenterId)) {
            form.setValues({
                ...form.values,
                skillCenterId: null,
                programId: null,
                branchId: null
            })
        } else {
            form.setValues({
                ...form.values,
                programId: null,
                branchId: null
            })
            AllSelectionBySkillCenterId.refetch()
        }
    }, [form.values.skillCenterId])

    useEffect(() => {
        let newSum = {
            totalPeriods: AllSelectionBySkillCenterId.data?.program?.find((item) => item.id?.toString() === form.values.programId)?.totalClassPeriodNumber ?? 0,
            totalHours: AllSelectionBySkillCenterId.data?.program?.find((item) => item.id?.toString() === form.values.programId)?.totalHours ?? 0
        }
        setSumAfterSelectionState(newSum)
    }, [form.values.programId])

    const AllTimeClusters = useQuery<ITimeClusterInfoViewModel[]>({
        queryKey: [`AllTimeClusters`],
        queryFn: async () => {
            let cols = "TimeClusterDetails";
            const response = await baseAxios.get(`/TimeCluster/GetAll?cols=${cols}`);
            return response.data.data
        },
        refetchOnWindowFocus: false
    })

    const AllTimeTypes = useQuery<ITimeTypeViewModel[]>({
        queryKey: [`AllTimeTypes`],
        queryFn: async () => {
            let cols = "TimeTypeDetails";
            const response = await baseAxios.get(`/TimeType/GetAll?cols=${cols}`);
            return response.data.data
        },
        refetchOnWindowFocus: false
    })

    const handleMappingMinutesForEachTimeTypeDetail = (timeCluster: ITimeClusterInfoViewModel) => {
        timeCluster.timeClusterDetails = timeCluster.timeClusterDetails?.sort((a, b) => a.dayOfWeek! - b.dayOfWeek!);
        const minute = timeCluster.timeClusterDetails!.map(tcd => {
            if (!AllTimeTypes.data) return 0;
            const timeTypeDetails = AllTimeTypes.data!.find(tt => tt.id === timeCluster.timeTypeId)?.timeTypeDetails;
            if (!timeTypeDetails) {
                return 0;
            }
            return timeTypeDetails.filter((ttd) => ttd.order! >= tcd.classPeriodStart! && ttd.order! <= tcd.classPeriodEnd!).reduce((acc, cur) => acc + cur.minuteNumber!, 0)
        });
        return minute
    }

    const discTableSelectTimeCluster = useDisclosure(false);

    const timeClusterSelectMRTColumns = useMemo<MRT_ColumnDef<ITimeClusterInfoViewModel>[]>(() => [
        {
            header: "Mã cụm thời gian",
            accessorKey: "code",
        },
        {
            header: "Tên cụm thời gian",
            accessorKey: "name",
        },
        {
            header: "Danh sách thứ",
            accessorFn: (row) => {
                row.timeClusterDetails?.length === 0 ? "" : row.timeClusterDetails?.map((tc) => ENUM_DAYS_OF_WEEK[tc.dayOfWeek!]).join(", ")
            }
            ,
            Cell: ({ row }) => {
                return (
                    <>
                        <div style={{ whiteSpace: 'pre-wrap' }}>
                            {row.original.timeClusterDetails?.length === 0 ? "" : row.original.timeClusterDetails?.map((tc) => ENUM_DAYS_OF_WEEK[tc.dayOfWeek!]).join("\n")}
                        </div>
                    </>
                )
            },
        },
        {
            header: "Tiết bắt đầu",
            accessorFn: (row) => {
                row.timeClusterDetails?.length === 0 ? "" : row.timeClusterDetails?.map((tc) => tc.classPeriodStart).join(", ")
            },
            Cell: ({ row }) => {
                return (
                    <>
                        <div style={{ whiteSpace: 'pre-wrap' }}>
                            {row.original.timeClusterDetails?.length === 0 ? "" : row.original.timeClusterDetails?.map((tc) => tc.classPeriodStart).join("\n")}
                        </div>
                    </>
                )
            },
            size: 150
        },
        {
            header: "Số tiết",
            accessorFn: (row) => {
                row.timeClusterDetails?.length === 0 ? "" : row.timeClusterDetails?.map((tc) => Number(tc.classPeriodEnd) - Number(tc.classPeriodStart) + 1).join(", ")
            },
            Cell: ({ row }) => {
                return (
                    <>
                        <div style={{ whiteSpace: 'pre-wrap' }}>
                            {row.original.timeClusterDetails?.length === 0 ? "" : row.original.timeClusterDetails?.map((tc) => Number(tc.classPeriodEnd) - Number(tc.classPeriodStart) + 1).join("\n")}
                        </div>
                    </>
                )
            },
            size: 50
        },
        {
            header: "Số phút",
            accessorFn: (row) => {
                if (row.timeType?.timeTypeDetails?.length === 0) {
                    return 0
                }
                return handleMappingMinutesForEachTimeTypeDetail(row)
            },
            Cell: ({ cell }) => {
                if (cell.getValue<string[]>() == undefined) return
                return (
                    <>
                        <div style={{ whiteSpace: 'pre-wrap' }}>
                            {cell.getValue<string[]>().map((text) => text).join("\n")}
                        </div>
                    </>
                )
            },
            size: 50
        },
    ], [
        AllTimeTypes.data
    ]);

    const MRTSelectTimeCluster = useMantineReactTable({
        columns: timeClusterSelectMRTColumns,
        data: AllTimeClusters.data || [],
        enableRowNumbers: true,
        layoutMode: "semantic",
        displayColumnDefOptions: {
            "mrt-row-numbers": {
                Header: "STT",
                size: 70
            },
        },
        enableColumnPinning: true,
        enableRowSelection: true,
        getRowId: (originalRow: ITimeClusterInfoViewModel) => originalRow.id!.toString(),
        initialState: {
            density: "md",
            pagination: { pageIndex: 0, pageSize: 10 },
            columnPinning: { right: ["mrt-row-actions"] },
            columnVisibility: {
                nguoiCapNhat: false,
                ngayCapNhat: false
            }
        },
        enableColumnResizing: true,
        mantineTableHeadCellProps: {
            style: {
                verticalAlign: "middle",
                paddingTop: "2px",
                paddingBottom: "2px",
            },
        },
        mantineTableBodyCellProps: {
            style: {
                paddingTop: "2px",
                paddingBottom: "2px",
            },
        },
        localization: MRT_Localization_VI,
        renderTopToolbarCustomActions: ({ table }) => {
            return (
                <Group>
                    <Button
                        onClick={handleSelectTimeCluster}
                    >
                        Chọn
                    </Button>
                </Group>
            );
        }
    });

    const [selectedTimeClusterWithMaxStudentNumber, setSelectedTimeClusterWithMaxStudentNumber] = useState<ITimeClusterInfoViewModelWithMaxStudentNumber[]>([]);

    const handleSelectTimeCluster = () => {
        const rowValues = structuredClone(MRTSelectTimeCluster.getSelectedRowModel().rows.map((item) => (item.original)));
        let mappedTimeClusterSelections = rowValues.map((item) => ({
            ...item,
            maxStudent: 0
        }));

        const currentSelections = selectedTimeClusterWithMaxStudentNumber;

        mappedTimeClusterSelections.forEach(newItem => {
            const existingIndex = currentSelections.find(item => item.id === newItem.id);
            if (!existingIndex) {
                currentSelections.push(newItem);
            }
        });

        // Remove unselected items
        const finalSelections = currentSelections.filter(item =>
            mappedTimeClusterSelections.some(newItem => newItem.id === item.id)
        );

        setSelectedTimeClusterWithMaxStudentNumber(finalSelections);
        discTableSelectTimeCluster[1].close();
    }

    const handleFieldChange = (row: ITimeClusterInfoViewModelWithMaxStudentNumber, fieldValue: number) => {
        if (fieldValue === undefined || fieldValue === null) fieldValue = 0

        setSelectedTimeClusterWithMaxStudentNumber((prev) => {
            const existingIndex = prev.findIndex((item) => item.id === row.id);
            const updatedTimeClusterWithMaxStudentNumber = [...prev];
            updatedTimeClusterWithMaxStudentNumber[existingIndex] = {
                ...updatedTimeClusterWithMaxStudentNumber[existingIndex],
                maxStudent: fieldValue
            };
            return updatedTimeClusterWithMaxStudentNumber;
        });
    };

    const timeClusterWithMaxStudentNumberMRTColumns = useMemo<MRT_ColumnDef<ITimeClusterInfoViewModelWithMaxStudentNumber>[]>(() => [
        {
            header: "Mã cụm thời gian",
            accessorKey: "code",
        },
        {
            header: "Tên cụm thời gian",
            accessorKey: "name",
        },
        {
            header: "Danh sách thứ",
            accessorFn: (row) => {
                row.timeClusterDetails?.length === 0 ? "" : row.timeClusterDetails?.map((tc) => ENUM_DAYS_OF_WEEK[tc.dayOfWeek!]).join(", ")
            }
            ,
            Cell: ({ row }) => {
                return (
                    <>
                        <div style={{ whiteSpace: 'pre-wrap' }}>
                            {row.original.timeClusterDetails?.length === 0 ? "" : row.original.timeClusterDetails?.map((tc) => ENUM_DAYS_OF_WEEK[tc.dayOfWeek!]).join("\n")}
                        </div>
                    </>
                )
            },
        },
        {
            header: "Tiết bắt đầu",
            accessorFn: (row) => {
                row.timeClusterDetails?.length === 0 ? "" : row.timeClusterDetails?.map((tc) => tc.classPeriodStart).join(", ")
            },
            Cell: ({ row }) => {
                return (
                    <>
                        <div style={{ whiteSpace: 'pre-wrap' }}>
                            {row.original.timeClusterDetails?.length === 0 ? "" : row.original.timeClusterDetails?.map((tc) => tc.classPeriodStart).join("\n")}
                        </div>
                    </>
                )
            },
            size: 150
        },
        {
            header: "Số tiết",
            accessorFn: (row) => {
                row.timeClusterDetails?.length === 0 ? "" : row.timeClusterDetails?.map((tc) => Number(tc.classPeriodEnd) - Number(tc.classPeriodStart) + 1).join(", ")
            },
            Cell: ({ row }) => {
                return (
                    <>
                        <div style={{ whiteSpace: 'pre-wrap' }}>
                            {row.original.timeClusterDetails?.length === 0 ? "" : row.original.timeClusterDetails?.map((tc) => Number(tc.classPeriodEnd) - Number(tc.classPeriodStart) + 1).join("\n")}
                        </div>
                    </>
                )
            },
            size: 50
        },
        {
            header: "Số phút",
            accessorFn: (row) => {
                if (row.timeType?.timeTypeDetails?.length === 0) {
                    return 0
                }
                return handleMappingMinutesForEachTimeTypeDetail(row)
            },
            Cell: ({ cell }) => {
                if (cell.getValue<string[]>() == undefined) return
                return (
                    <>
                        <div style={{ whiteSpace: 'pre-wrap' }}>
                            {cell.getValue<string[]>().map((text) => text).join("\n")}
                        </div>
                    </>
                )
            },
            size: 50
        },
        {
            header: "Số lượng tối đa",
            accessorKey: "maxStudent",
            Cell: ({ row }) => {
                return (
                    <>
                        <NumberInput
                            value={row.original.maxStudent ?? 0}
                            onBlur={(e) => handleFieldChange(row.original, Number(e.currentTarget.value))}
                        />
                    </>
                )
            },
            size: 150
        },
    ],
        [
            AllTimeTypes.data, selectedTimeClusterWithMaxStudentNumber
        ]
    );

    const MRTTimeClusterWithMaxStudentNumber = useMantineReactTable({
        columns: timeClusterWithMaxStudentNumberMRTColumns,
        data: selectedTimeClusterWithMaxStudentNumber || [],
        enableRowNumbers: true,
        layoutMode: "semantic",
        displayColumnDefOptions: {
            "mrt-row-numbers": {
                Header: "STT",
                size: 70
            },
        },
        enableColumnPinning: true,
        initialState: {
            density: "md",
            pagination: { pageIndex: 0, pageSize: 10 },
            columnPinning: { right: ["mrt-row-actions"] },
            columnVisibility: {
                nguoiCapNhat: false,
                ngayCapNhat: false
            }
        },
        enableColumnResizing: true,
        mantineTableHeadCellProps: {
            style: {
                verticalAlign: "middle",
                paddingTop: "2px",
                paddingBottom: "2px",
            },
        },
        mantineTableBodyCellProps: {
            style: {
                paddingTop: "2px",
                paddingBottom: "2px",
            },
        },
        localization: MRT_Localization_VI,
        renderTopToolbarCustomActions: ({ table }) => {
            return (
                <Group>
                    <Button
                        my={5}
                        leftSection={<IconCalendarPlus />}
                        variant="filled" color="cyan"
                        size="sm"
                        onClick={discTableSelectTimeCluster[1].open}
                    >
                        Danh sách cụm thời gian
                    </Button>
                </Group>
            );
        },
        enableRowActions: true,
        renderRowActions: ({ row }) => {
            return (
                <MyCenterFull>
                    <ActionIcon
                        variant="light" color='red'
                        onClick={() => handleRemoveTCSelection(row.original)}
                    >
                        <IconX />
                    </ActionIcon>
                </MyCenterFull>
            )
        }
    });

    const handleRemoveTCSelection = (row: ITimeClusterInfoViewModelWithMaxStudentNumber) => {
        setSelectedTimeClusterWithMaxStudentNumber(prev =>
            prev.filter(item => item.id !== row.id)
        );
        delete MRTSelectTimeCluster.getState().rowSelection[row.id!.toString()];
    }

    return (
        <>
            <MyButtonCreate
                modalSize={'1000px'}
                objectName="Khóa học"
                form={form}
                onSubmit={async () => {
                    let courseTimeClusters = selectedTimeClusterWithMaxStudentNumber.map((tc) => {
                        return {
                            "id": 0,
                            "code": null,
                            "name": null,
                            "concurrencyStamp": "string",
                            "isEnabled": true,
                            "courseId": 0,
                            "timeClusterId": tc.id,
                            "maxStudent": tc.maxStudent,
                        }
                    });
                    form.setFieldValue("courseTimeClusters", courseTimeClusters);

                    if (!bannerFiles[0]) return

                    let fileDetail = await utils_file_fileToAQDocumentType(bannerFiles[0]);
                    form.setFieldValue("fileDetail", fileDetail);

                    const response = await baseAxios.post("/Course/Create", form.getValues());
                    if (!response.data.isSuccess) {
                        throw new Error(response.data.message);
                    }
                    if (response.data.isSuccess) {
                        setSelectedTimeClusterWithMaxStudentNumber([]);
                        MRTSelectTimeCluster.resetRowSelection();
                        setBannerFiles([]);
                        setSelectedTimeClusterWithMaxStudentNumber([]);
                    }
                    return response;
                }}
                onError={() => {
                    notifications.show({
                        color: "red",
                        message: "Tạo dữ liệu không thành công!"
                    })
                }}
            >
                <Fieldset legend="Chi tiết khóa học">
                    <Grid gutter="xs">
                        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                            <MyTextInput withAsterisk label="Mã khóa học" {...form.getInputProps("code")} />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                            <MyTextInput withAsterisk label="Tên khóa học" {...form.getInputProps("name")} />
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                            {AllSkillCenters.data &&
                                <Select
                                    withAsterisk
                                    clearable
                                    placeholder='Chọn trung tâm'
                                    label='Trung tâm'
                                    data={AllSkillCenters.data?.map(item => ({
                                        value: item.id?.toString()!,
                                        label: item.name!
                                    }))}
                                    {...form.getInputProps("skillCenterId")}
                                />
                            }
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                            <Select
                                withAsterisk
                                clearable
                                placeholder='Chọn chi nhánh'
                                label='Chi nhánh'
                                data={AllSelectionBySkillCenterId.data?.branch?.map(item => ({
                                    value: item.id?.toString()!,
                                    label: item.name!
                                })) || []}
                                {...form.getInputProps("branchId")}
                            />
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                            <Select
                                withAsterisk
                                clearable
                                placeholder='Chọn chương trình'
                                label='Chương trình'
                                data={AllSelectionBySkillCenterId.data?.program?.map(item => ({
                                    value: item.id?.toString()!,
                                    label: item.name!
                                })) || []}
                                {...form.getInputProps("programId")}
                            />
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                            <Select
                                withAsterisk
                                clearable
                                placeholder='Chọn trạng thái'
                                label='Trạng thái'
                                data={[
                                    {
                                        value: "1",
                                        label: "Chưa mở đăng ký"
                                    },
                                    {
                                        value: "2",
                                        label: "Đang mở đăng ký"
                                    },
                                    {
                                        value: "3",
                                        label: "Đóng đăng ký"
                                    },
                                    {
                                        value: "4",
                                        label: "Đã bắt đầu"
                                    },
                                    {
                                        value: "5",
                                        label: "Đang tạm dừng"
                                    },
                                    {
                                        value: "6",
                                        label: "Hoàn thành"
                                    },
                                    {
                                        value: "7",
                                        label: "Đã đóng"
                                    },
                                    {
                                        value: "8",
                                        label: "Bị hủy"
                                    },
                                ]}
                                {...form.getInputProps("status")}
                            />
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
                            <Group justify='space-between'>
                                <Group>
                                    <Text><strong>Tổng số tiết: </strong>
                                        {sumAfterSelectionState.totalPeriods}

                                    </Text>
                                    <Text><strong>Tổng số giờ: </strong>
                                        {sumAfterSelectionState.totalHours}
                                    </Text>
                                </Group>
                            </Group>
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                            <DateInput
                                withAsterisk
                                label="Ngày khai giảng"
                                placeholder="Chọn ngày"
                                {...form.getInputProps("studyDate")}
                            />
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                            <DateInput
                                withAsterisk={form.values.programId ? AllSelectionBySkillCenterId.data?.program?.find(item => item.id?.toString() === form.values.programId)?.isTesting! : false}
                                label="Ngày thi"
                                placeholder="Chọn ngày"
                                {...form.getInputProps("testDate")}
                            />
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                            <DateInput flex={1}
                                withAsterisk={form.values.programId ? AllSelectionBySkillCenterId.data?.program?.find(item => item.id?.toString() === form.values.programId)?.isTesting! : false}
                                label="Ngày kết thúc (dự kiến)"
                                placeholder="Chọn ngày"
                                {...form.getInputProps("endDate")}
                            />
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                            <DateInput
                                withAsterisk
                                label="Ngày bắt đầu đăng ký"
                                placeholder="Chọn ngày"
                                {...form.getInputProps("startDateRegistration")}
                            />
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
                            <DateInput
                                pr={{ base: 0, md: 5, lg: 5 }}
                                w={{ base: '100%', md: '50%', lg: '50%' }}
                                label="Ngày kết thúc đăng ký"
                                placeholder="Chọn ngày"
                                {...form.getInputProps("endDateRegistration")}
                            />
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 12, lg: 6 }}>
                            <Textarea
                                w={{ base: '100%' }}
                                descriptionProps={{ style: { color: 'red' } }}
                                description="*tối đa 200 ký tự"
                                label="Mô tả khóa học"
                                placeholder="Nhập nội dung giới thiệu chi tiết khóa học"
                                maxLength={200}
                                {...form.getInputProps("description")}
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 12, lg: 6 }}>
                            <div>
                                <Dropzone
                                    w={'100%'}
                                    openRef={openRef}
                                    activateOnClick={bannerFiles.length === 0 ? true : false}
                                    hidden={false}
                                    multiple={false}
                                    onDrop={(files) => {
                                        setBannerFiles(files)
                                    }}
                                    onReject={(files) => console.log('rejected files', files)}
                                    maxSize={5 * 1024 ** 2}
                                    accept={IMAGE_MIME_TYPE}
                                    {...props}
                                >
                                    <Group
                                        mih={210}
                                        style={{ pointerEvents: 'none' }}
                                        justify="center"
                                        gap="xl"
                                    >
                                        {bannerFiles.length > 0 ?
                                            <Flex
                                                gap="md"
                                                justify="center"
                                                align="center"
                                                direction="row"
                                                wrap="wrap"
                                            >
                                                {bannerPreviews}
                                            </Flex>
                                            :
                                            <>
                                                <Flex
                                                    gap="md"
                                                    justify="center"
                                                    align="center"
                                                    direction="row"
                                                    wrap="wrap"
                                                >
                                                    <Dropzone.Accept>
                                                        <IconUpload size={52} color="var(--mantine-color-blue-6)" stroke={1.5} />
                                                    </Dropzone.Accept>
                                                    <Dropzone.Reject>
                                                        <IconX size={52} color="var(--mantine-color-red-6)" stroke={1.5} />
                                                    </Dropzone.Reject>
                                                    <Dropzone.Idle>
                                                        <IconPhoto size={52} color="var(--mantine-color-dimmed)" stroke={1.5} />
                                                    </Dropzone.Idle>
                                                    <Text size="xl" inline>
                                                        Kéo thả hoặc nhấn để chọn ảnh banner
                                                    </Text>
                                                    <Text size="sm" c="dimmed" inline>
                                                        Định dạng hợp lệ: png, jpg, jpeg. Kích thước tối đa 5MB.
                                                    </Text>
                                                </Flex>
                                            </>
                                        }
                                    </Group>
                                </Dropzone>
                            </div>
                        </Grid.Col>
                    </Grid>
                </Fieldset>

                {MRTTimeClusterWithMaxStudentNumber.getState().isFullScreen ? (
                    <Portal>
                        <MantineReactTable
                            table={MRTTimeClusterWithMaxStudentNumber}
                        />
                    </Portal>
                ) : (
                    <MantineReactTable
                        table={MRTTimeClusterWithMaxStudentNumber}
                    />
                )}
            </MyButtonCreate>

            <Modal
                size={'auto'}
                opened={discTableSelectTimeCluster[0]}
                onClose={discTableSelectTimeCluster[1].close}
                title="Danh sách cụm thời gian"
            >
                {MRTSelectTimeCluster.getState().isFullScreen ? (
                    <Portal>
                        <MantineReactTable
                            table={MRTSelectTimeCluster}
                        />
                    </Portal>
                ) : (
                    <MantineReactTable
                        table={MRTSelectTimeCluster}
                    />
                )}
            </Modal>
        </>
    )
}
