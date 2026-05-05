'use client'
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import AQButtonCreateByImportFile from '@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile';
import MyCenterFull from '@/components/CenterFull/MyCenterFull';
import MySelect from '@/components/Combobox/Select/MySelect';
import { MyDataTable } from '@/components/DataDisplay/DataTable/MyDataTable';
import MyDateInput from '@/components/Inputs/DateInput/MyDateInput';
import MyFileInput from '@/components/Inputs/FileInput/MyFileInput';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import MyFlexRow from '@/components/Layouts/FlexRow/MyFlexRow';
import { U0DateToDDMMYYYString } from '@/utils/date';
import { useForm } from '@mantine/form';
import { useQuery } from '@tanstack/react-query';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo, useState } from 'react';
import F_Table_SinhVien_Create from './F_Table_SinhVien_Create';
import F_Table_SinhVien_Delete from './F_Table_SinhVien_Delete';
import F_Table_SinhVien_Update from './F_Table_SinhVien_Update';
interface F_xkbakmsytn_Update {
    soQuyetDinh?: string
    lyDoQuyetDinh?: string
    tenQuyetDinh?: string
    ngayQuyetDinh?: Date
    nguoiKy?: string
    ghiChu?: string
    file?: string
}

interface ITable_xkbakmsytn_Create {
    id?: number //STT
    maSinhVien?: string //Mã sinh viên
    hoLot?: string //Họ Lót
    ten?: string //Tên
    ngaySinh?: Date //Ngày sinh
    gioiTinh?: string //Giới tính
    maLop?: string //Mã lớp
}

export default function F_xkbakmsytn_Update({ data }: { data: F_xkbakmsytn_Update }) {
    const form = useForm<F_xkbakmsytn_Update>({
        initialValues: data
    })

    // Sử dụng useQuery để lấy dữ liệu
    const query = useQuery<ITable_xkbakmsytn_Create[]>({
        queryKey: ["sinhVienData"], // Khóa cache dữ liệu
        queryFn: async () => [
            { id: 1, maSinhVien: "SV0001", hoLot: "Tô Ngọc", ten: "Lâm", ngaySinh: new Date("2020-01-01"), gioiTinh: "Nam", maLop: "IT2024-01" },

        ],
    });

    const [importData, setImportData] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: [],
        },
    });

    // Định nghĩa các cột của bảng
    const columns = useMemo<MRT_ColumnDef<ITable_xkbakmsytn_Create>[]>(
        () => [
            {
                header: "Mã sinh viên",
                accessorKey: "maSinhVien",
            },
            {
                header: "Họ Lót",
                accessorKey: "hoLot",
            },
            {
                header: "Tên",
                accessorKey: "ten",
            },
            {
                header: "Ngày sinh",
                accessorFn: (row) =>
                    row.ngaySinh
                        ? U0DateToDDMMYYYString(new Date(row.ngaySinh))
                        : "N/A",
            },
            {
                header: "Giới tính",
                accessorKey: "gioiTinh",
            },
            {
                header: "Mã lớp",
                accessorKey: "maLop",
            },
        ],
        []
    );

    // Xử lý trạng thái tải dữ liệu
    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";
    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }} modalSize={"80%"}>
            <MyFlexRow style={{ display: 'flex', gap: '1rem', width: '100%' }}>
                <MyTextInput label="Số quyết định" {...form.getInputProps("soQuyetDinh")} readOnly  style={{ flex: 1 }}/>
                <MySelect data={['Quyết định trúng tuyển', 'Quyết định thăng chức']} defaultValue={'Quyết định trúng tuyển'} label="Lý do quyết định" {...form.getInputProps("lyDoQuyetDinh")}  style={{ flex: 1 }}/>
            </MyFlexRow>
            <MyTextInput label="Tên" {...form.getInputProps("tenQuyetDinh")} />
            <MyFlexRow style={{ display: 'flex', gap: '1rem', width: '100%' }}>
                <MyDateInput label="Ngày quyết định" {...form.getInputProps("ngayQuyetDinh")}  style={{ flex: 1 }}/>
                <MySelect data={['Hiệu trưởng - Nguyễn Hữu Quốc', 'Hiệu phó - Trương Văn B']} defaultValue={'Hiệu trưởng - Nguyễn Hữu Quốc'} label="Người ký"  style={{ flex: 1 }}/>
            </MyFlexRow>
            <MyTextInput label="Ghi chú" />
            <MyFileInput label="Đính kèm file quyết định" />

            <MyDataTable
                exportAble
                columns={columns} // Các cột hiển thị
                data={query.data!} // Dữ liệu từ useQuery
                renderTopToolbarCustomActions={() => (
                    <>
                        <F_Table_SinhVien_Create />
                        <AQButtonCreateByImportFile
                            setImportedData={setImportData}
                            form={form_multiple}
                            onSubmit={() => {
                                console.log(form_multiple.values);
                            }}
                        >
                            Nhập từ file
                        </AQButtonCreateByImportFile>
                    </>
                )}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            {/* Thêm chức năng chỉnh sửa hoặc xóa tại đây */}
                            <F_Table_SinhVien_Update data={row.original} />
                            <F_Table_SinhVien_Delete id={row.original.id!} />
                        </MyCenterFull>
                    );
                }}
            />
        </MyActionIconUpdate>
    )
}
