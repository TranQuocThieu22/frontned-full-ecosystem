'use client'
import { courseService } from "@/shared/APIs/courseService";
import { skillCenterService } from "@/shared/APIs/skillCenterService";
import { timeClusterService } from "@/shared/APIs/timeClusterService";
import { timeTypeService } from "@/shared/APIs/timeTypeService";
import { ENUM_DAYS_OF_WEEK, ENUM_COURSE_STATUS } from "@/constants/enum/global";
import { Course } from "@/shared/interfaces/course";
import { TimeCluster } from "@/shared/interfaces/timeCluster";
import { ITimeClusterInfoViewModelWithMaxStudentNumber } from "./interfaces";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { fileUtils } from "@aq-fe/core-ui/shared/utils/fileUtils";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import {
    ActionIcon, Button, Card, Center, Fieldset,
    Flex, Grid, Group, Image, Modal, NumberInput,
    Select, Stack, Text, Textarea
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconCalendarPlus, IconPhoto, IconUpload, IconX } from "@tabler/icons-react";
import { Buffer } from "buffer";
import { MantineReactTable, MRT_ColumnDef, useMantineReactTable } from "mantine-react-table";
import { MRT_Localization_VI } from "mantine-react-table/locales/vi/index.cjs";
import React, { useEffect, useMemo, useRef, useState } from "react";

const COURSE_STATUS_DATA = [
    { value: "1", label: "Chưa mở đăng ký" },
    { value: "2", label: "Đang mở đăng ký" },
    { value: "3", label: "Đóng đăng ký" },
    { value: "4", label: "Đã bắt đầu" },
    { value: "5", label: "Đang tạm dừng" },
    { value: "6", label: "Hoàn thành" },
    { value: "7", label: "Đã đóng" },
    { value: "8", label: "Bị hủy" },
]

export default function CourseListCreateUpdate({ values }: { values?: Course }) {
    const isUpdate = !!values

    const [skillCenterId, setSkillCenterId] = useState<number | undefined>(values?.skillCenterId)
    const [selectedTimeClusters, setSelectedTimeClusters] = useState<ITimeClusterInfoViewModelWithMaxStudentNumber[]>([])
    const [bannerFiles, setBannerFiles] = useState<FileWithPath[]>([])
    const [discSelectTC, discSelectTCHandlers] = useDisclosure(false)
    const openRef = useRef<() => void>(null)

    const skillCentersQuery = useCustomReactQuery({
        queryKey: ["skillCenterService.getAll"],
        axiosFn: () => skillCenterService.getAll()
    })

    const skillCenterDetailQuery = useCustomReactQuery({
        queryKey: ["skillCenterService.get", skillCenterId],
        axiosFn: () => skillCenterService.get({ id: skillCenterId, params: "?cols=Program,Branch" }),
        options: { enabled: !!skillCenterId }
    })

    const timeClustersQuery = useCustomReactQuery({
        queryKey: ["timeClusterService.getAll"],
        axiosFn: () => timeClusterService.getAll({ cols: ["TimeClusterDetails"] })
    })

    const timeTypesQuery = useCustomReactQuery({
        queryKey: ["timeTypeService.getAll"],
        axiosFn: () => timeTypeService.getAll({ cols: ["TimeTypeDetails"] })
    })

    const form = useForm<Course>({
        mode: "uncontrolled",
        validate: {
            code: (v) => v ? null : "Không được để trống",
            name: (v) => v ? null : "Không được để trống",
            skillCenterId: (v) => v ? null : "Không được để trống",
            programId: (v) => v ? null : "Không được để trống",
            branchId: (v) => v ? null : "Không được để trống",
            status: (v) => v ? null : "Không được để trống",
            studyDate: (v) => v ? null : "Không được để trống",
            startDateRegistration: (v) => v ? null : "Không được để trống",
        }
    })

    // Load initial form values + banner + time clusters for update
    useEffect(() => {
        if (!values) return
        form.setInitialValues({
            ...values,
            testDate: values.testDate ? new Date(values.testDate) : undefined,
            studyDate: values.studyDate ? new Date(values.studyDate) : undefined,
            endDate: values.endDate ? new Date(values.endDate) : undefined,
            startDateRegistration: values.startDateRegistration ? new Date(values.startDateRegistration) : undefined,
            endDateRegistration: values.endDateRegistration ? new Date(values.endDateRegistration) : undefined,
            description: values.description ?? "",
        })
        form.setValues({
            ...values,
            testDate: values.testDate ? new Date(values.testDate) : undefined,
            studyDate: values.studyDate ? new Date(values.studyDate) : undefined,
            endDate: values.endDate ? new Date(values.endDate) : undefined,
            startDateRegistration: values.startDateRegistration ? new Date(values.startDateRegistration) : undefined,
            endDateRegistration: values.endDateRegistration ? new Date(values.endDateRegistration) : undefined,
            description: values.description ?? "",
        })
        // Load banner image
        if (values.image) {
            skillCenterService.getAll() // dummy - replaced below
        }
    }, [values])

    // Load banner for update
    useEffect(() => {
        if (!isUpdate || !values?.image) return
        const loadBanner = async () => {
            try {
                const res = await axiosInstance.get(`/AQ/GetFile?filePath=${values.image}`)
                if (res.data.isSuccess === 1 && res.data.data.fileName !== null) {
                    const base64String = res.data.data.fileBase64String
                    const buff = Buffer.from(base64String, "base64")
                    const file = new File([buff], res.data.data.fileName)
                    setBannerFiles([file])
                }
            } catch { /* ignore */ }
        }
        loadBanner()
    }, [values?.image])

    // Load initial time cluster selections for update
    useEffect(() => {
        if (!isUpdate || !timeClustersQuery.data || !values?.courseTimeClusters) return
        const initial = values.courseTimeClusters
            .filter(ctc => ctc.isEnabled !== false)
            .map(ctc => {
                const tc = timeClustersQuery.data.find(t => t.id === ctc.timeClusterId)
                if (!tc) return null
                return { ...tc, maxStudent: ctc.maxStudent }
            })
            .filter(Boolean) as ITimeClusterInfoViewModelWithMaxStudentNumber[]
        setSelectedTimeClusters(initial)

        // Restore MRT row selection
        initial.forEach(item => {
            MRTSelectTC.setState(prev => ({
                ...prev,
                rowSelection: { ...prev.rowSelection, [item.id!.toString()]: true }
            }))
        })
    }, [timeClustersQuery.isSuccess])

    const getMinutesForTimeCluster = (tc: TimeCluster) => {
        if (!timeTypesQuery.data) return []
        const sorted = [...(tc.timeClusterDetails ?? [])].sort((a, b) => a.dayOfWeek! - b.dayOfWeek!)
        return sorted.map(tcd => {
            const ttDetails = timeTypesQuery.data.find(tt => tt.id === tc.timeTypeId)?.timeTypeDetails
            if (!ttDetails) return 0
            return ttDetails
                .filter(ttd => ttd.order! >= tcd.classPeriodStart! && ttd.order! <= tcd.classPeriodEnd!)
                .reduce((acc, cur) => acc + cur.minuteNumber!, 0)
        })
    }

    const tcBaseColumns = useMemo<MRT_ColumnDef<ITimeClusterInfoViewModelWithMaxStudentNumber>[]>(() => [
        { header: "Mã cụm thời gian", accessorKey: "code" },
        { header: "Tên cụm thời gian", accessorKey: "name" },
        {
            header: "Danh sách thứ",
            accessorFn: () => "",
            Cell: ({ row }) => (
                <div style={{ whiteSpace: "pre-wrap" }}>
                    {row.original.timeClusterDetails?.map(tc => ENUM_DAYS_OF_WEEK[tc.dayOfWeek!]).join("\n")}
                </div>
            ),
        },
        {
            header: "Tiết bắt đầu",
            accessorFn: () => "",
            Cell: ({ row }) => (
                <div style={{ whiteSpace: "pre-wrap" }}>
                    {row.original.timeClusterDetails?.map(tc => tc.classPeriodStart).join("\n")}
                </div>
            ),
            size: 150
        },
        {
            header: "Số tiết",
            accessorFn: () => "",
            Cell: ({ row }) => (
                <div style={{ whiteSpace: "pre-wrap" }}>
                    {row.original.timeClusterDetails?.map(tc => Number(tc.classPeriodEnd) - Number(tc.classPeriodStart) + 1).join("\n")}
                </div>
            ),
            size: 50
        },
        {
            header: "Số phút",
            accessorFn: (row) => getMinutesForTimeCluster(row),
            Cell: ({ cell }) => {
                const val = cell.getValue<number[]>()
                if (!val) return null
                return <div style={{ whiteSpace: "pre-wrap" }}>{val.join("\n")}</div>
            },
            size: 50
        },
    ], [timeTypesQuery.data])

    const handleSelectTC = () => {
        const rowValues = structuredClone(MRTSelectTC.getSelectedRowModel().rows.map(r => r.original as ITimeClusterInfoViewModelWithMaxStudentNumber))
        const mapped = rowValues.map(item => ({ ...item, maxStudent: item.maxStudent ?? 0 }))
        const current = [...selectedTimeClusters]
        mapped.forEach(newItem => {
            if (!current.find(item => item.id === newItem.id)) current.push(newItem)
        })
        const final = current.filter(item => mapped.some(newItem => newItem.id === item.id))
        setSelectedTimeClusters(final)
        discSelectTCHandlers.close()
    }

    const handleRemoveTC = (row: ITimeClusterInfoViewModelWithMaxStudentNumber) => {
        setSelectedTimeClusters(prev => prev.filter(item => item.id !== row.id))
        delete MRTSelectTC.getState().rowSelection[row.id!.toString()]
        if (isUpdate) {
            const updated = form.getValues().courseTimeClusters?.map(item =>
                item.timeClusterId === row.id ? { ...item, isEnabled: false } : item
            )
            form.setFieldValue("courseTimeClusters", updated)
        }
    }

    const MRTSelectTC = useMantineReactTable({
        columns: tcBaseColumns,
        data: (timeClustersQuery.data ?? []) as ITimeClusterInfoViewModelWithMaxStudentNumber[],
        enableRowNumbers: true,
        enableRowSelection: true,
        enableColumnPinning: true,
        enableColumnResizing: true,
        getRowId: (row: TimeCluster) => row.id!.toString(),
        layoutMode: "semantic",
        displayColumnDefOptions: { "mrt-row-numbers": { Header: "STT", size: 70 } },
        initialState: { density: "md", pagination: { pageIndex: 0, pageSize: 10 } },
        localization: MRT_Localization_VI,
        renderTopToolbarCustomActions: () => (
            <Group><Button onClick={handleSelectTC}>Chọn</Button></Group>
        ),
    })

    const selectedTCColumns = useMemo<MRT_ColumnDef<ITimeClusterInfoViewModelWithMaxStudentNumber>[]>(() => [
        ...tcBaseColumns,
        {
            header: "Số lượng tối đa",
            accessorKey: "maxStudent",
            Cell: ({ row }) => (
                <NumberInput
                    value={row.original.maxStudent ?? 0}
                    onBlur={(e) => {
                        const val = Number(e.currentTarget.value) || 0
                        setSelectedTimeClusters(prev => {
                            const idx = prev.findIndex(item => item.id === row.original.id)
                            const next = [...prev]
                            next[idx] = { ...next[idx], maxStudent: val }
                            return next
                        })
                    }}
                />
            ),
            size: 150
        },
    ], [tcBaseColumns, selectedTimeClusters])

    const MRTSelectedTC = useMantineReactTable({
        columns: selectedTCColumns,
        data: selectedTimeClusters,
        enableRowNumbers: true,
        enableColumnPinning: true,
        enableColumnResizing: true,
        enableRowActions: true,
        layoutMode: "semantic",
        displayColumnDefOptions: { "mrt-row-numbers": { Header: "STT", size: 70 } },
        initialState: { density: "md", pagination: { pageIndex: 0, pageSize: 10 } },
        localization: MRT_Localization_VI,
        renderTopToolbarCustomActions: () => (
            <Group>
                <Button leftSection={<IconCalendarPlus />} variant="filled" color="cyan" size="sm" onClick={discSelectTCHandlers.open}>
                    Danh sách cụm thời gian
                </Button>
            </Group>
        ),
        renderRowActions: ({ row }) => (
            <Center>
                <ActionIcon variant="light" color="red" onClick={() => handleRemoveTC(row.original)}>
                    <IconX />
                </ActionIcon>
            </Center>
        ),
    })

    const bannerPreviews = bannerFiles.map((file, index) => {
        const imageUrl = URL.createObjectURL(file)
        return (
            <React.Fragment key={index}>
                <Card radius={0} withBorder p={20}>
                    <Card.Section mb={5}>
                        <Group h={20}>
                            <Button leftSection={<IconUpload />} size="compact-xs" variant="default" onClick={() => openRef.current?.()} style={{ pointerEvents: "all" }}>
                                Thay đổi ảnh
                            </Button>
                            <ActionIcon variant="white" color="red" radius="xl" size="sm"
                                style={{ pointerEvents: "all", cursor: "pointer", position: "absolute", top: 5, right: 5 }}
                                onClick={(e) => { e.stopPropagation(); setBannerFiles([]) }}
                            >
                                <IconX size={16} />
                            </ActionIcon>
                        </Group>
                    </Card.Section>
                    <Card.Section>
                        <Image draggable={false} style={{ pointerEvents: "all", cursor: "pointer" }}
                            h={200} w="auto" fit="contain" src={imageUrl}
                            onLoad={() => URL.revokeObjectURL(imageUrl)}
                            onClick={() => openRef.current?.()}
                        />
                    </Card.Section>
                </Card>
            </React.Fragment>
        )
    })

    const selectedSkillCenter = skillCenterDetailQuery.data
    const isTesting = selectedSkillCenter?.program?.find(
        p => p.id?.toString() === form.getValues().programId?.toString()
    )?.isTesting

    return (
        <CustomButtonCreateUpdate
            isUpdate={isUpdate}
            form={form}
            modalProps={{ title: isUpdate ? "Cập nhật khóa học" : "Thêm khóa học", size: "90%" }}
            onSubmit={async (formValues) => {
                const courseTimeClusters = isUpdate
                    ? [
                        ...selectedTimeClusters.map(item => {
                            const existing = formValues.courseTimeClusters?.find(ctc => ctc.timeClusterId === item.id && ctc.isEnabled)
                            return existing
                                ? { ...existing, maxStudent: item.maxStudent }
                                : { id: 0, code: "", name: "", concurrencyStamp: "string", timeClusterId: item.id, maxStudent: item.maxStudent ?? 0, courseId: values?.id, isEnabled: true }
                        }),
                        ...(formValues.courseTimeClusters?.filter(ctc => ctc.isEnabled === false) ?? [])
                    ]
                    : selectedTimeClusters.map(tc => ({
                        id: 0, code: "", name: "", concurrencyStamp: "string", isEnabled: true,
                        courseId: 0, timeClusterId: tc.id, maxStudent: tc.maxStudent ?? 0
                    }))

                const fileDetail = bannerFiles[0]
                    ? await fileUtils.fileToAQDocumentType(bannerFiles[0])
                    : { fileName: "", fileExtension: "", fileBase64String: "" }

                const { skillCenter, branch, program, ...body } = formValues
                return isUpdate
                    ? courseService.update({ ...body, courseTimeClusters, fileDetail })
                    : courseService.create({ ...body, courseTimeClusters, fileDetail })
            }}
            onSuccess={() => {
                if (!isUpdate) {
                    setSelectedTimeClusters([])
                    setBannerFiles([])
                    MRTSelectTC.resetRowSelection()
                }
            }}
        >
            <Stack gap="xs">
                <Fieldset legend="Chi tiết khóa học">
                    <Grid gutter="xs">
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <Select label="Mã khóa học" disabled={isUpdate} {...form.getInputProps("code")} />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <Select label="Tên khóa học" {...form.getInputProps("name")} />
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <Select
                                withAsterisk clearable label="Trung tâm" placeholder="Chọn trung tâm"
                                data={skillCentersQuery.data?.map(item => ({ value: item.id!.toString(), label: item.name! })) ?? []}
                                value={form.getValues().skillCenterId?.toString() ?? null}
                                onChange={(v) => {
                                    const id = v ? parseInt(v) : undefined
                                    setSkillCenterId(id)
                                    form.setFieldValue("skillCenterId", id)
                                    form.setFieldValue("programId", undefined)
                                    form.setFieldValue("branchId", undefined)
                                }}
                                error={form.errors.skillCenterId}
                            />
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <Select
                                withAsterisk clearable label="Chi nhánh" placeholder="Chọn chi nhánh"
                                data={selectedSkillCenter?.branch?.map(item => ({ value: item.id!.toString(), label: item.name! })) ?? []}
                                {...form.getInputProps("branchId")}
                                value={form.getValues().branchId?.toString() ?? null}
                                onChange={(v) => form.setFieldValue("branchId", v ? parseInt(v) : undefined)}
                            />
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <Select
                                withAsterisk clearable label="Chương trình" placeholder="Chọn chương trình"
                                data={selectedSkillCenter?.program?.map(item => ({ value: item.id!.toString(), label: item.name! })) ?? []}
                                {...form.getInputProps("programId")}
                                value={form.getValues().programId?.toString() ?? null}
                                onChange={(v) => form.setFieldValue("programId", v ? parseInt(v) : undefined)}
                            />
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <Select
                                withAsterisk clearable label="Trạng thái" placeholder="Chọn trạng thái"
                                data={COURSE_STATUS_DATA}
                                value={form.getValues().status?.toString() ?? null}
                                onChange={(v) => form.setFieldValue("status", v ? parseInt(v) : undefined)}
                                error={form.errors.status}
                            />
                        </Grid.Col>

                        <Grid.Col span={12}>
                            <Group>
                                <Text><strong>Tổng số tiết: </strong>{selectedSkillCenter?.program?.find(p => p.id?.toString() === form.getValues().programId?.toString())?.totalClassPeriodNumber ?? 0}</Text>
                                <Text><strong>Tổng số giờ: </strong>{selectedSkillCenter?.program?.find(p => p.id?.toString() === form.getValues().programId?.toString())?.totalHours ?? 0}</Text>
                            </Group>
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <DateInput withAsterisk label="Ngày khai giảng" placeholder="Chọn ngày" {...form.getInputProps("studyDate")} />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <DateInput withAsterisk={!!isTesting} label="Ngày thi" placeholder="Chọn ngày" {...form.getInputProps("testDate")} />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <DateInput withAsterisk={!!isTesting} label="Ngày kết thúc (dự kiến)" placeholder="Chọn ngày" {...form.getInputProps("endDate")} />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <DateInput withAsterisk label="Ngày bắt đầu đăng ký" placeholder="Chọn ngày" {...form.getInputProps("startDateRegistration")} />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <DateInput label="Ngày kết thúc đăng ký" placeholder="Chọn ngày" {...form.getInputProps("endDateRegistration")} />
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <Textarea
                                label="Mô tả khóa học" maxLength={200}
                                description="*tối đa 200 ký tự"
                                descriptionProps={{ style: { color: "red" } }}
                                placeholder="Nhập nội dung giới thiệu chi tiết"
                                {...form.getInputProps("description")}
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <Dropzone
                                openRef={openRef} multiple={false} accept={IMAGE_MIME_TYPE}
                                maxSize={5 * 1024 ** 2}
                                activateOnClick={bannerFiles.length === 0}
                                onDrop={setBannerFiles}
                            >
                                <Group mih={210} style={{ pointerEvents: "none" }} justify="center" gap="xl">
                                    {bannerFiles.length > 0
                                        ? <Flex gap="md" justify="center" align="center" wrap="wrap">{bannerPreviews}</Flex>
                                        : <Flex gap="md" justify="center" align="center" wrap="wrap">
                                            <Dropzone.Accept><IconUpload size={52} color="var(--mantine-color-blue-6)" stroke={1.5} /></Dropzone.Accept>
                                            <Dropzone.Reject><IconX size={52} color="var(--mantine-color-red-6)" stroke={1.5} /></Dropzone.Reject>
                                            <Dropzone.Idle><IconPhoto size={52} color="var(--mantine-color-dimmed)" stroke={1.5} /></Dropzone.Idle>
                                            <Text size="xl" inline>Kéo thả hoặc nhấn để chọn ảnh banner</Text>
                                            <Text size="sm" c="dimmed" inline>Định dạng hợp lệ: png, jpg, jpeg. Tối đa 5MB.</Text>
                                        </Flex>
                                    }
                                </Group>
                            </Dropzone>
                        </Grid.Col>
                    </Grid>
                </Fieldset>

                <MantineReactTable table={MRTSelectedTC} />

                <Modal size="auto" opened={discSelectTC} onClose={discSelectTCHandlers.close} title="Danh sách cụm thời gian">
                    <MantineReactTable table={MRTSelectTC} />
                </Modal>
            </Stack>
        </CustomButtonCreateUpdate>
    )
}
