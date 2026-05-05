'use client';

import AQButtonCreateByImportFile from '@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile';
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MyCenterFull from '@/components/CenterFull/MyCenterFull';
import { MyDataTable } from '@/components/DataDisplay/DataTable/MyDataTable';
import MyFileInput from '@/components/Inputs/FileInput/MyFileInput';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { Button, Select, SimpleGrid, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useQuery } from '@tanstack/react-query';
import F_rihlieosdm_Delete from './F_rihlieosdm_Delete';

// Define the interface
interface I {
    id?: number; // STT
    soQuyetDinh?: string; // Số quyết định
    lyDoQuyetDinh?: string; // Lý do quyết định
    ten?: string; // Tên quyết định
    ngayQuyetDinh?: string; // Ngày quyết định
    nguoiKy?: string; // Người ký
    ghiChu?: string; // Ghi chú
    dinhKemFile?: string; // Đính kèm file quyết định
}

// Define the data for the table rows
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

export default function F_rihlieosdm_Create() {
    // Form handling for the modal
    const form = useForm<I>({
        initialValues: {
            soQuyetDinh: '',
            lyDoQuyetDinh: '',
            ten: '',
            ngayQuyetDinh: '',
            nguoiKy: '',
            ghiChu: '',
            dinhKemFile: '',
        },
        validate:{
            soQuyetDinh:(value)=>(value?null:'Số quyết định là bắt buộc'),
            lyDoQuyetDinh: (value)=>(value?null:'Lý do quyết định là bắt buộc'),
            ten: (value)=>(value?null:'Tên là bắt buộc'),
            ngayQuyetDinh: (value)=>(value?null:'Ngày quyết định là bắt buộc'),
            nguoiKy: (value)=>(value?null:'Người ký là bắt buộc'),
            ghiChu: (value)=>(value?null:'Ghi chú là bắt buộc'),
            dinhKemFile: (value)=>(value?null:'Đính kèm file là bắt buộc'),
        }
    });

    // Disclosure for the modal
    const disc = useDisclosure(false);

    // Query for table data
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

    // Import data handler
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: [],
        },
    });

    if (tableQuery.isLoading) return <div>Đang tải dữ liệu...</div>;
    if (tableQuery.isError) return <div>Không có dữ liệu...</div>;

    return (
        <MyButtonCreate form={form} onSubmit={() => { }} objectName='Chi tiết quyết định tốt nghiệp' modalSize="60%">
            {/* Số quyết định and Lý do quyết định */}
            <SimpleGrid cols={2} spacing="lg">
                <MyTextInput
                    label="Số quyết định"
                    placeholder="Nhập số quyết định"
                    {...form.getInputProps('soQuyetDinh')}
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
                {...form.getInputProps('ten')}
            />

            {/* Ngày quyết định and Người ký */}
            <SimpleGrid cols={2} spacing="lg">
                <MyTextInput
                    label="Ngày quyết định"
                    placeholder="Nhập ngày quyết định (DD/MM/YYYY)"
                    {...form.getInputProps('ngayQuyetDinh')}
                />
                <Select
                    label="Người ký"
                    placeholder="Chọn người ký"
                    data={[
                        { value: 'Hiệu trưởng - Nguyễn Hữu Quốc', label: 'Hiệu trưởng - Nguyễn Hữu Quốc' },
                        { value: 'Phó hiệu trưởng - Lê Văn A', label: 'Phó hiệu trưởng - Lê Văn A' },
                    ]}
                    {...form.getInputProps('nguoiKy')}
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
                {...form.getInputProps('dinhKemFile')}
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
        </MyButtonCreate>
    );
}
