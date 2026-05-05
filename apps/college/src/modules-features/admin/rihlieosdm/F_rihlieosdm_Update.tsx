'use client';

import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import AQButtonCreateByImportFile from '@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile';
import MyCenterFull from '@/components/CenterFull/MyCenterFull';
import { MyDataTable } from '@/components/DataDisplay/DataTable/MyDataTable';
import MyFileInput from '@/components/Inputs/FileInput/MyFileInput';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { Button, Select, SimpleGrid, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useQuery } from '@tanstack/react-query';
import F_rihlieosdm_Delete from './F_rihlieosdm_Delete';
import { I_rihlieosdm } from './F_rihlieosdm_Read';
export interface ITableRow {
    id: number;
    studentCode: string;
    lastName: string;
    firstName: string;
    dob: string;
    gender: string;
    classCode: string;
}

// Mock Table Columns
const tableColumns = [
    { header: "Mã sinh viên", accessorKey: "studentCode" },
    { header: "Họ lót", accessorKey: "lastName" },
    { header: "Tên", accessorKey: "firstName" },
    { header: "Ngày sinh", accessorKey: "dob" },
    { header: "Giới tính", accessorKey: "gender" },
    { header: "Mã lớp", accessorKey: "classCode" },

];

export default function F_rkgjotusmn_Update({ data }: { data: I_rihlieosdm }) {
    const form = useForm<I_rihlieosdm>({
        initialValues: {
            decisionNumber: data?.decisionNumber || '',
            promulgateDate: data?.promulgateDate || new Date(),
            decisionName: data?.decisionName || '',
            signer: data?.signer || '',
            fileLink: data?.fileLink || '',
            id: 0
        },
    });

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: [],
        },
    });
    const tableQuery = useQuery<ITableRow[]>({
        queryKey: ["StudentTableData"], // Cache key
        queryFn: async () => [
            {
                id: 1,
                studentCode: "SV0001",
                lastName: "Tô Ngọc",
                firstName: "Lâm",
                dob: "2000-01-01",
                gender: "Nam",
                classCode: "IT2024-01",
            },
        ],
    });


    return (
        <MyActionIconUpdate
            modalSize={"100%"}
            form={form}
            onSubmit={() => {
                // Perform your update logic here
                console.log(form.values);
            }}
        >
            {/* Số quyết định and Lý do quyết định */}
            <SimpleGrid cols={2} spacing="lg">
                <MyTextInput
                    disabled
                    label="Số quyết định"
                    placeholder="Nhập số quyết định"
                    {...form.getInputProps('decisionNumber')}
                />
                <Select
                    label="Lý do quyết định"
                    placeholder="Chọn lý do quyết định"
                    data={[
                        { value: 'Quyết định tốt nghiệp', label: 'Quyết định tốt nghiệp' },
                        { value: 'Quyết định kỷ luật', label: 'Quyết định kỷ luật' },
                    ]}
                    {...form.getInputProps('lyDoQuyetDinh')}
                />
            </SimpleGrid>

            {/* Tên quyết định */}
            <MyTextInput
                label="Tên"
                placeholder="Nhập tên quyết định"
                {...form.getInputProps('decisionName')}
            />

            <SimpleGrid cols={2} spacing="lg">
                <MyTextInput
                    label="Ngày quyết định"
                    placeholder="Nhập ngày quyết định (DD/MM/YYYY)"
                    {...form.getInputProps('promulgateDate')}
                />
                <Select
                    label="Người ký"
                    placeholder="Chọn người ký"
                    data={[
                        { value: 'Hiệu trưởng - Nguyễn Hữu Quốc', label: 'Hiệu trưởng - Nguyễn Hữu Quốc' },
                        { value: 'Phó hiệu trưởng - Lê Văn A', label: 'Phó hiệu trưởng - Lê Văn A' },
                    ]}
                    {...form.getInputProps('signer')}
                />
            </SimpleGrid>

            {/* Ghi chú */}
            <Textarea
                label="Ghi chú"
                placeholder="Nhập ghi chú"
                {...form.getInputProps('ghiChu')}
                autosize
                minRows={3}
            />

            {/* Đính kèm file quyết định */}
            <MyFileInput
                label="Đính kèm file quyết định"
                placeholder="Chọn file"
                {...form.getInputProps('fileLink')}
            />

            {/* Data Table */}
            <MyDataTable
                exportAble
                columns={tableColumns}
                data={tableQuery.data!} // Use fetched data
                renderTopToolbarCustomActions={() => (
                    <>
                        <Button>Thêm</Button>
                        <AQButtonCreateByImportFile
                            setImportedData={(data) => console.log('Imported data', data)}
                            form={form_multiple}
                            onSubmit={() => {
                                console.log(form_multiple.values);
                            }}
                        >
                            Import
                        </AQButtonCreateByImportFile>
                    </>
                )}
                renderRowActions={({ row }) => (
                    <MyCenterFull>
                        {/* Thêm chức năng chỉnh sửa hoặc xóa tại đây */}
                        <F_rihlieosdm_Delete id={row.original.id!} />
                    </MyCenterFull>
                )}
            />
        </MyActionIconUpdate>
    );
}
