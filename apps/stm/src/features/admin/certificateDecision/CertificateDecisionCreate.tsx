"use client"
import { ENUM_GENDER } from '@/constants/enum/global';
import { utils_date_dateToDDMMYYYString } from '@/utils/date';
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { ActionIcon, Button, Center, Checkbox, FileInput, Grid, Group, Modal, Select, Textarea, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconUsersPlus, IconX } from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { MantineReactTable, MRT_ColumnDef, useMantineReactTable } from 'mantine-react-table';
import { MRT_Localization_VI } from 'mantine-react-table/locales/vi/index.cjs';
import { useEffect, useMemo, useState } from 'react';
import {
    CertificateResultViewModel,
    ICertificateDecisionViewModelWithFile,
    ICertificateInfoViewModel
} from './interfaces';

export const file2Base64 = (file: File): Promise<string | null> => {
    return new Promise<string | null>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const base64String = reader.result?.toString() || null;
            const base64 = base64String === null ? null : base64String.split(',')[1];
            if (!base64) return;
            resolve(base64);
        };
        reader.onerror = () => reject(null);
    });
}

const mockSignatureUser = [
    { id: 1075, code: 'GV001', fullName: 'Nguyễn Văn A' },
    { id: 1076, code: 'GV002', fullName: 'Nguyễn Văn B' },
    { id: 1077, code: 'GV003', fullName: 'Nguyễn Văn C' },
    { id: 1078, code: 'lam', fullName: 'lam123123' },
    { id: 1079, code: 'luan', fullName: 'luan' },
    { id: 1080, code: 'abc', fullName: 'Nhi Nguyen' },
]

export default function CertificateDecisionCreate() {
    const discCreateModal = useDisclosure(false);
    const discTableSelectCertificateResult = useDisclosure(false);
    const queryClient = useQueryClient();

    const [selectedCertificateResult, setSelectedCertificateResult] = useState<CertificateResultViewModel[]>([]);

    const form = useForm<ICertificateDecisionViewModelWithFile>({
        initialValues: {
            id: 0,
            code: '',
            name: '',
            concurrencyStamp: "string",
            isEnabled: true,
            certificateId: null,
            signatureUserId: null,
            date: null,
            note: '',
            path: '',
            fileInput: null,
            fileDetail: { fileBase64String: null, fileExtension: null, fileName: null },
            certificateResultIdList: [],
        },
    })

    const mutation = useMutation({
        mutationFn: async (values: any) => {
            const certificateResultIds = selectedCertificateResult.map((item) => item.id!)
            if (form.values.fileInput !== null) {
                const file = form.getValues().fileInput!
                const fileBase64String = await file2Base64(file);
                form.setFieldValue("fileDetail", {
                    fileBase64String,
                    fileExtension: file.name.split('.').pop() || null,
                    fileName: file.name
                })
            }
            const bodyData = { ...form.getValues(), certificateResultIdList: certificateResultIds }
            delete bodyData.fileInput
            return baseAxios.post(`/CertificateDecision/CreateAndUpdateCertificateDecision`, bodyData)
        },
        onSuccess: (response) => {
            if (response.data.isSuccess === 1) {
                queryClient.invalidateQueries({ queryKey: [`allCertificateDecision`] });
                discCreateModal[1].close();
                notifications.show({ title: "Thao tác thành công", message: "Dữ liệu đã được lưu", color: "green" })
                form.reset();
                setSelectedCertificateResult([])
            }
        },
        onError: () => {
            notifications.show({ title: "Thao tác thất bại", message: "Dữ liệu chưa được lưu", color: "red" })
        },
    });

    const allCertificates = useQuery<ICertificateInfoViewModel[]>({
        queryKey: [`allCertificate`],
        queryFn: async () => {
            const response = await baseAxios.get(`/Certificate/GetAll`);
            return response.data.data || [];
        },
        refetchOnWindowFocus: false,
    })

    const allCertificateResultsByCertificateId = useQuery<CertificateResultViewModel[]>({
        queryKey: [`allCertificateResultByCertificateId`, form.getValues().certificateId],
        queryFn: async () => {
            if (!form.getValues().certificateId) return []
            const response = await baseAxios.get(`/CertificateResult/GetCertificateResultByCertificate?CertificateId=${form.getValues().certificateId}`);
            return response.data.data || [];
        },
        refetchOnWindowFocus: false,
    })

    const allSignatureUsers = useQuery<any[]>({
        queryKey: [`allSignatureUser`],
        queryFn: async () => mockSignatureUser,
        refetchOnWindowFocus: false,
    })

    const certificateResultSelectColumns = useMemo<MRT_ColumnDef<CertificateResultViewModel>[]>(() => [
        { header: "Họ tên", accessorKey: "user.fullName" },
        { header: "Giới tính", accessorFn: (row) => ENUM_GENDER[row.user?.gender!] },
        { header: "Ngày sinh", accessorFn: (row) => row.user!.dateOfBirth ? utils_date_dateToDDMMYYYString(new Date(row.user!.dateOfBirth!)) : '' },
        { header: "Khóa thi", accessorKey: "exam.name" },
        { header: "Đợt xét", accessorKey: "exam.certificateReviewBatch.name" },
        { header: "Điểm thi", accessorKey: "point" },
        {
            header: "Đạt",
            accessorFn: (row) => row.isPass ? "Đạt" : "Không đạt",
            Cell: ({ row }) => <Checkbox color="green" readOnly checked={row.original.isPass} onChange={() => { }} />
        },
    ], []);

    const MRTSelectCertificateResult = useMantineReactTable({
        columns: certificateResultSelectColumns,
        data: allCertificateResultsByCertificateId.data || [],
        enableRowNumbers: true,
        layoutMode: "semantic",
        displayColumnDefOptions: { "mrt-row-numbers": { Header: "STT", size: 70 } },
        enableColumnPinning: true,
        enableRowSelection: true,
        getRowId: (row) => row.id!.toString(),
        initialState: { density: "md", pagination: { pageIndex: 0, pageSize: 10 } },
        enableColumnResizing: true,
        localization: MRT_Localization_VI,
        renderTopToolbarCustomActions: () => (
            <Group>
                <Button onClick={handleSelectCertificateResult}>Chọn</Button>
            </Group>
        )
    });

    const certificateResultDisplayColumns = useMemo<MRT_ColumnDef<CertificateResultViewModel>[]>(() => [
        { header: "Họ tên", accessorKey: "user.fullName" },
        { header: "Giới tính", accessorFn: (row) => ENUM_GENDER[row.user?.gender!] },
        { header: "Ngày sinh", accessorFn: (row) => row.user!.dateOfBirth ? utils_date_dateToDDMMYYYString(new Date(row.user!.dateOfBirth!)) : '' },
        { header: "Khóa thi", accessorKey: "exam.name" },
        { header: "Đợt xét", accessorKey: "exam.certificateReviewBatch.name" },
        { header: "Điểm thi", accessorKey: "point" },
        {
            header: "Đạt",
            accessorFn: (row) => row.isPass ? "Đạt" : "Không đạt",
            Cell: ({ row }) => <Checkbox color="green" readOnly checked={row.original.isPass} onChange={() => { }} />
        },
    ], []);

    const MRTCertificateResultDisplay = useMantineReactTable({
        columns: certificateResultDisplayColumns,
        data: selectedCertificateResult || [],
        enableRowNumbers: true,
        layoutMode: "semantic",
        displayColumnDefOptions: { "mrt-row-numbers": { Header: "STT", size: 70 } },
        enableColumnPinning: true,
        enableRowSelection: true,
        getRowId: (row) => row.id!.toString(),
        initialState: { density: "md", pagination: { pageIndex: 0, pageSize: 10 } },
        enableColumnResizing: true,
        localization: MRT_Localization_VI,
        renderTopToolbarCustomActions: () => (
            <Group>
                <Button my={5} variant="filled" color="cyan" size="sm" leftSection={<IconUsersPlus />} onClick={discTableSelectCertificateResult[1].open}>
                    Danh sách đạt cấp chứng chỉ
                </Button>
            </Group>
        ),
        enableRowActions: true,
        renderRowActions: ({ row }) => (
            <Center>
                <ActionIcon variant="light" color="red" onClick={() => handleRemoveSelection(row.original)}>
                    <IconX />
                </ActionIcon>
            </Center>
        )
    });

    useEffect(() => {
        MRTSelectCertificateResult.setState((prev) => ({ ...prev, rowSelection: {} }))
        setSelectedCertificateResult([])
        allCertificateResultsByCertificateId.refetch()
    }, [form.getValues().certificateId])

    const handleSelectCertificateResult = () => {
        setSelectedCertificateResult(MRTSelectCertificateResult.getSelectedRowModel().rows.map((row) => row.original));
        discTableSelectCertificateResult[1].close();
    }

    const handleRemoveSelection = (row: CertificateResultViewModel) => {
        setSelectedCertificateResult(prev => prev.filter(item => item.id !== row.id));
    }

    return (
        <>
            <Button onClick={discCreateModal[1].open} color="blue">Thêm</Button>
            <Modal size="60%" title="Chi tiết quyết định" opened={discCreateModal[0]} onClose={discCreateModal[1].close}>
                <form onSubmit={form.onSubmit(async (values) => mutation.mutate(values))}>
                    <Grid>
                        <Grid.Col span={{ base: 12, md: 4 }}>
                            <TextInput label="Số quyết định" placeholder="Nhập số quyết định" {...form.getInputProps('code')} />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 4 }}>
                            <DateInput label="Ngày quyết định" placeholder="Nhập ngày quyết định" {...form.getInputProps('date')} />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 4 }}>
                            <Select
                                placeholder="Chọn người ký"
                                label="Người ký"
                                data={allSignatureUsers.data?.map(item => ({ value: item.id!.toString(), label: item.fullName! })) || []}
                                value={form.values.signatureUserId?.toString()}
                                onChange={(value) => form.setFieldValue("signatureUserId", parseInt(value!))}
                            />
                        </Grid.Col>
                        <Grid.Col span={12}>
                            <Select
                                placeholder="Chọn chứng chỉ"
                                label="Chứng chỉ"
                                data={allCertificates.data?.map(item => ({ value: item.id!.toString(), label: item.name! })) || []}
                                value={form.values.certificateId?.toString()}
                                onChange={(value) => form.setFieldValue("certificateId", parseInt(value!))}
                            />
                        </Grid.Col>
                        <Grid.Col span={12}>
                            <TextInput label="Tên quyết định" placeholder="Nhập tên quyết định" {...form.getInputProps('name')} />
                            <Textarea mt={10} label="Ghi chú" placeholder="Nhập ghi chú" minRows={3} {...form.getInputProps('note')} />
                            <FileInput mt={10} mb={12} label="Đính kèm quyết định" placeholder="Chọn file" {...form.getInputProps("fileInput")} />
                        </Grid.Col>
                    </Grid>
                    <MantineReactTable table={MRTCertificateResultDisplay} />
                    <Button mt={10} w="100%" type="submit">Lưu</Button>
                </form>
            </Modal>
            <Modal size="auto" opened={discTableSelectCertificateResult[0]} onClose={discTableSelectCertificateResult[1].close} title="Danh sách đạt cấp chứng chỉ">
                <MantineReactTable table={MRTSelectCertificateResult} />
            </Modal>
        </>
    )
}
