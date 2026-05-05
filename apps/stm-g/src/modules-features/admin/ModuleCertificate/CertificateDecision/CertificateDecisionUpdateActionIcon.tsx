"use client"
import baseAxios from '@/api/config/baseAxios'
import MyCenterFull from '@/components/CenterFull/MyCenterFull'
import { ENUM_GENDER } from '@/constants/enum/global'
import { ActionIcon, Button, Checkbox, FileInput, Grid, Group, Modal, Select, Textarea, TextInput } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import { IconEdit, IconUsersPlus, IconX } from '@tabler/icons-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { utils_date_dateToDDMMYYYString } from 'aq-fe-framework/utils'
import { MantineReactTable, MRT_ColumnDef, useMantineReactTable } from 'mantine-react-table'
import { MRT_Localization_VI } from 'mantine-react-table/locales/vi/index.cjs'
import { useEffect, useMemo, useState } from 'react'
import { file2Base64 } from './CertificateDecisionCreateButton'
import { ICertificateResult } from './Interfaces/ICertificateResult'
import { ICertificateDecision, ICertificateDecisionViewModelWithFile, ICertificateInfoViewModel } from './Interfaces/Interfaces'

const mockSignatureUser = [
    {
        id: 1075,
        code: 'GV001',
        fullName: 'Nguyễn Văn A',
    },
    {
        id: 1076,
        code: 'GV002',
        fullName: 'Nguyễn Văn B',
    },
    {
        id: 1077,
        code: 'GV003',
        fullName: 'Nguyễn Văn C',
    },
    {
        id: 1078,
        code: 'lam',
        fullName: 'lam123123',
    },
    {
        id: 1079,
        code: 'luan',
        fullName: 'luan',
    },
    {
        id: 1080,
        code: 'abc',
        fullName: 'Nhi Nguyen',
    }
]

export default function CertificateDecisionUpdateActionIcon({ certificateDecisionValues }: { certificateDecisionValues: ICertificateDecision }) {
    const discUpdateModal = useDisclosure(false);
    const discTableSelectCertificateResult = useDisclosure(false);
    const queryClient = useQueryClient();

    // const [inputFileCertDecision, setInputFileCertDecision] = useState<File>();
    const form = useForm<ICertificateDecisionViewModelWithFile>({
        initialValues: {
            ...certificateDecisionValues,
            date: new Date(certificateDecisionValues.date!),
            fileInput: new File([], certificateDecisionValues.path?.split("/")[certificateDecisionValues.path.split("/").length - 1]!),
            fileDetail: {
                fileBase64String: null,
                fileExtension: null,
                fileName: null
            },
            certificateResultIdList: [],
        },
        // validate: {
        // }
    })

    const mutation = useMutation({
        mutationFn: async (values: ICertificateDecisionViewModelWithFile) => {
            let certificateResultIds = selectedCertificateResult.map((item) => item.id!)
            if (form.values.fileInput !== null) {
                let file = (form.getValues().fileInput!)
                const fileBase64String = await file2Base64(file);
                const fileExtension = file.name.split('.').pop() || null;
                const fileName = file.name;
                form.setFieldValue("fileDetail", {
                    fileBase64String: fileBase64String,
                    fileExtension: fileExtension,
                    fileName: fileName
                })
            }
            let bodyData = {
                ...form.getValues(),
                certificateResultIdList: certificateResultIds
            }
            delete bodyData.fileInput

            let res = await baseAxios.post(`/CertificateDecision/CreateAndUpdateCertificateDecision`, bodyData)
            return res
        },
        onSuccess: (response) => {
            if (response.data.isSuccess === 1) {
                queryClient.invalidateQueries({ queryKey: [`allCertificateDecision`] });
                discUpdateModal[1].close();
                notifications.show({
                    title: "Thao tác thành công",
                    message: "Dữ liệu đã được lưu",
                    color: "green",
                })
                form.reset();
                setSelectedCertificateResult([])
            }
        },
        onError: () => {
            notifications.show({
                title: "Thao tác thất bại",
                message: "Dữ liệu chưa được lưu",
                color: "red",
            })
        },
    });

    const allCertificates = useQuery<ICertificateInfoViewModel[]>({
        queryKey: [`allCertificate`],
        queryFn: async () => {
            const response = await baseAxios.get(`/Certificate/GetAll`);
            return response.data.data || [];
        },
        enabled: discUpdateModal[0] === true,
        refetchOnWindowFocus: false,
    })

    const allCertificateResultsByCertificateId = useQuery<ICertificateResult[]>({
        queryKey: [`allCertificateResultByCertificateId`, form.getValues().certificateId],
        queryFn: async () => {
            if (!form.getValues().certificateId) return []
            const response = await baseAxios.get(`/CertificateResult/GetCertificateResultByCertificate?CertificateId=${form.getValues().certificateId}`);
            return response.data.data || [];
        },
        enabled: discUpdateModal[0] === true,
        refetchOnWindowFocus: false,
    })

    const [selectedCertificateResult, setSelectedCertificateResult] = useState<ICertificateResult[]>([]);

    useEffect(() => {
        MRTSelectCertificateResult.setState((prev) => ({
            ...prev,
            rowSelection: {},
        }))
        setSelectedCertificateResult([])
        allCertificateResultsByCertificateId.refetch()
    }, [form.getValues().certificateId])

    const allSignatureUsers = useQuery<any[]>({
        queryKey: [`allSignatureUser`],
        queryFn: async () => {
            return mockSignatureUser || []
        },
        refetchOnWindowFocus: false,
    })

    const certificateResultSelectMRTColumns = useMemo<MRT_ColumnDef<ICertificateResult>[]>(() => [
        {
            header: "Họ tên",
            accessorKey: "user.fullName",
        },
        {
            header: "Giới tính",
            accessorFn(originalRow) {
                return (ENUM_GENDER[originalRow.user?.gender!])
            },
        },
        {
            header: "Ngày sinh",
            accessorFn(row) {
                return (row.user!.dateOfBirth === null ? '' : utils_date_dateToDDMMYYYString(new Date(row.user!.dateOfBirth!)))
            },
        },
        {
            header: "Khóa thi",
            accessorKey: "exam.name",
        },
        {
            header: "Đợt xét",
            accessorKey: "exam.certificateReviewBatch.name",
        },
        {
            header: "Điểm thi",
            accessorKey: "point",
        },
        {
            header: "Đạt",
            accessorFn: (row) => row.isPass ? "Đạt" : "Không đạt",
            Cell: ({ row }) => {
                return (
                    <>
                        <Checkbox
                            color='green'
                            readOnly={true}
                            checked={row.original.isPass}
                        />
                    </>
                )
            }
        },
    ], []);

    const MRTSelectCertificateResult = useMantineReactTable({
        columns: certificateResultSelectMRTColumns,
        data: allCertificateResultsByCertificateId.data || [],
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
        getRowId: (originalRow: ICertificateResult) => originalRow.id!.toString(),
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
                        onClick={handleSelectCertificateResult}
                    >
                        Chọn
                    </Button>
                </Group>
            );
        }
    });

    const allCertificateResultsByCertificateDecisionId = useQuery<any[]>({
        queryKey: [`allCertificateResultsByCertificateDecisionId`, certificateDecisionValues.id],
        queryFn: async () => {
            const response = await baseAxios.get(`/CertificateResult/GetCertificateResultDecision?CertificateDecisionId=${certificateDecisionValues.id}`);
            let initCertificateResultIds = response.data.data.map((item: any) => item.id)
            form.setFieldValue("certificateResultIdList", initCertificateResultIds)

            await response.data.data.forEach((item: any) => {
                MRTSelectCertificateResult.setState((prev) => ({
                    ...prev,
                    rowSelection: {
                        ...prev.rowSelection,
                        [item.id!.toString()]: true
                    }
                }))
            })

            return response.data.data || [];
        },
        refetchOnWindowFocus: false,
        enabled: discUpdateModal[0] === true && allCertificateResultsByCertificateId.isSuccess
    })

    useEffect(() => {
        //todo
        console.log(allCertificateResultsByCertificateDecisionId.isSuccess);
        const selectedRows = MRTSelectCertificateResult.getSelectedRowModel().rows.map((row) => row.original);
        setSelectedCertificateResult(selectedRows);
    }, [allCertificateResultsByCertificateDecisionId.isSuccess])

    const handleSelectCertificateResult = () => {
        const selectedRows = MRTSelectCertificateResult.getSelectedRowModel().rows.map((row) => row.original);
        setSelectedCertificateResult(selectedRows);
        discTableSelectCertificateResult[1].close();
    }

    const certificateResultSelectionDisplayMRTColumns = useMemo<MRT_ColumnDef<ICertificateResult>[]>(() => [
        {
            header: "Họ tên",
            accessorKey: "user.fullName",
        },
        {
            header: "Giới tính",
            accessorFn(originalRow) {
                return (ENUM_GENDER[originalRow.user?.gender!])
            },
        },
        {
            header: "Ngày sinh",
            accessorFn(row) {
                return (row.user!.dateOfBirth === null ? '' : utils_date_dateToDDMMYYYString(new Date(row.user!.dateOfBirth!)))
            },
        },
        {
            header: "Khóa thi",
            accessorKey: "exam.name",
        },
        {
            header: "Đợt xét",
            accessorKey: "exam.certificateReviewBatch.name",
        },
        {
            header: "Điểm thi",
            accessorKey: "point",
        },
        {
            header: "Đạt",
            accessorFn: (row) => row.isPass ? "Đạt" : "Không đạt",
            Cell: ({ row }) => {
                return (
                    <>
                        <Checkbox
                            color='green'
                            readOnly={true}
                            checked={row.original.isPass}
                        />
                    </>
                )
            }
        },
    ],
        [allCertificateResultsByCertificateDecisionId.isSuccess]
    );

    const MRTCertificateResultSelectionDisplay = useMantineReactTable({
        columns: certificateResultSelectionDisplayMRTColumns,
        data: selectedCertificateResult || [],
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
        getRowId: (originalRow: ICertificateResult) => originalRow.id!.toString(),
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
                        variant="filled" color="cyan"
                        size="sm"
                        leftSection={<IconUsersPlus />}
                        onClick={discTableSelectCertificateResult[1].open}
                    >
                        Danh sách đạt cấp chứng chỉ
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
                        onClick={() => handleRemoveCertificateResultSelection(row.original)}
                    >
                        <IconX />
                    </ActionIcon>
                </MyCenterFull>
            )
        }
    });

    const handleRemoveCertificateResultSelection = (row: ICertificateResult) => {
        setSelectedCertificateResult(prev =>
            prev.filter(item => item.id !== row.id)
        );
        delete MRTSelectCertificateResult.getState().rowSelection[row.id!.toString()];
    }

    return (
        <>
            <ActionIcon
                variant="light"
                radius="sm"
                color='yellow'
                onClick={discUpdateModal?.[1].open}
            >
                <IconEdit />
            </ActionIcon>
            <Modal
                size='60%'
                title="Chi tiết quyết định"
                opened={discUpdateModal?.[0]}
                onClose={discUpdateModal[1].close}>
                <form onSubmit={form.onSubmit((values) => {
                    mutation.mutate(values);
                })}>
                    <Grid >
                        <Grid.Col span={{ base: 12, md: 4 }}>
                            <TextInput
                                label="Số quyết định"
                                placeholder="Nhập số quyết định"
                                {...form.getInputProps('code')}
                            />
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 4 }}>
                            <DateInput
                                label="Ngày quyết định"
                                placeholder="Nhập ngày quyết định"
                                {...form.getInputProps('date')}
                            />
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 4 }}>
                            <Select
                                placeholder={"Chọn người ký"}
                                label="Người ký"
                                data={allSignatureUsers.data?.map((item) => (
                                    {
                                        value: item.id!.toString(),
                                        label: item.fullName!
                                    }
                                )) || []}
                                value={form.values.signatureUserId?.toString()}
                                onChange={(value) => form.setFieldValue("signatureUserId", parseInt(value!))}
                            />
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <TextInput
                                label="Tên quyết định"
                                placeholder="Nhập tên quyết định"
                                {...form.getInputProps('name')}
                            />
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <Select
                                placeholder={"Chọn chứng chỉ"}
                                label="Chứng chỉ"
                                data={allCertificates.data?.map((item: ICertificateInfoViewModel) => (
                                    {
                                        value: item.id!.toString(),
                                        label: item.name!
                                    }
                                )) || []}
                                value={form.values.certificateId?.toString()}
                                onChange={(value) => form.setFieldValue("certificateId", parseInt(value!))}
                            />
                        </Grid.Col>

                        <Grid.Col span={{ base: 12 }}>
                            <Textarea
                                label="Ghi chú"
                                placeholder="Nhập ghi chú"
                                minRows={3}
                                {...form.getInputProps('note')}
                            />
                            <FileInput
                                mb={12}
                                label="Đính kèm quyết định"
                                placeholder="Chọn file"
                                {...form.getInputProps("fileInput")}
                            />
                        </Grid.Col>

                        <Grid.Col span={{ base: 12 }}>
                            <MantineReactTable
                                table={MRTCertificateResultSelectionDisplay}
                            />
                            <Button
                                mt={16}
                                w={"100%"}
                                type="submit"
                            >
                                Lưu
                            </Button>
                        </Grid.Col>
                    </Grid>
                </form>
            </Modal>
            <Modal
                size={'auto'}
                opened={discTableSelectCertificateResult[0]}
                onClose={discTableSelectCertificateResult[1].close}
                title="Danh sách đạt cấp chứng chỉ"
            >
                <MantineReactTable
                    table={MRTSelectCertificateResult}
                />
            </Modal>
        </>
    )
}
