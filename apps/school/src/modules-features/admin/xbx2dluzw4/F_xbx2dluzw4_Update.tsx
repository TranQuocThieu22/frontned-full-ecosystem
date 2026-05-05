'use client'

import { useForm } from "@mantine/form"
import { useQuery } from "@tanstack/react-query";
import { MyActionIconUpdate, MyCheckbox, MyDateInput, MyNumberInput, MySelect, MyTextArea, MyTextInput } from "aq-fe-framework/components"

interface Ixbx2dluzw4_UpdateDSVatTuToChucSK {
    maSuKien: string;
    tenSuKien: string;
    ngayToChuc: Date;
    vatTu: string;
    soLuong: number;
    tinhTrang: string;
    tienDoThucHien: string;
    ngayHoanThanh: Date;
    ghiChu: string;
    hoanThanh: boolean;
}

interface ISelectBoxProps {
    label: string;
    value: string;
}

const tinhTrangOption: ISelectBoxProps[] = [
    {
        label: 'Có sẵn',
        value: "1"
    },
    {
        label: 'Thuê',
        value: "2"
    },
    {
        label: 'Mua',
        value: "3"
    },
];

const vatTuOption: ISelectBoxProps[] = [
    {
        label: 'Loa 50W',
        value: "1"
    },
    {
        label: 'Dàn âm ly dj sôi động',
        value: "2"
    },
    {
        label: 'Đèn LED sân khấu',
        value: "3"
    },
]



export default function F_xbx2dluzw4_Update({data}:{data:Ixbx2dluzw4_UpdateDSVatTuToChucSK}) {
    //===initiate===
    const form = useForm<Ixbx2dluzw4_UpdateDSVatTuToChucSK>({
        initialValues: {
            maSuKien: data.maSuKien,
            tenSuKien: data.tenSuKien,
            ngayToChuc: data.ngayToChuc,
            vatTu: data.vatTu,
            soLuong: data.soLuong,
            tinhTrang: data.tinhTrang,
            tienDoThucHien: data.tienDoThucHien,
            ngayHoanThanh: data.ngayHoanThanh,
            ghiChu: data.ghiChu,
            hoanThanh: data.hoanThanh,
        },
        validate: {
            maSuKien: (data:string)=>data?null : 'Không được để trống',
            tenSuKien: (data:string)=>data?null : 'Không được để trống',
        }
    });

    //===pseudo data===
    const tinhTrangQuery = useQuery<ISelectBoxProps[]>({
        queryKey: ['Fxbx2dluzw4_UpdateTinhTrang'],
        queryFn: async () => tinhTrangOption,
    });

    const vatTuQuery = useQuery<ISelectBoxProps[]>({
        queryKey: ['Fxbx2dluzw4_UpdateVatTu'],
        queryFn: async () => vatTuOption,
    });

    

    //===query stage condition===
    if (tinhTrangQuery.isLoading) {
        return "Đang tải dữ liệu...";
    }

    if (tinhTrangQuery.isError) {
        return "Lỗi Tải dữ liệu!";
    }

    if (vatTuQuery.isLoading) {
        return "Đang tải dữ liệu...";
    }

    if (vatTuQuery.isError) {
        return "Lỗi Tải dữ liệu!";
    }

    

    return(
        <MyActionIconUpdate onSubmit={()=>{}} form={form}>
            <MyTextInput label='Mã sự kiện' {...form.getInputProps("maSuKien")} required readOnly/>
            <MyTextInput label='Tên sự kiện' {...form.getInputProps("tenSuKien")} required readOnly/>
            <MyDateInput label='Ngày tổ chức' {...form.getInputProps("ngayToChuc")} readOnly/>
            <MySelect data={vatTuQuery.data!} label='Vật tư' value={form.values.vatTu}/>
            <MyNumberInput clampBehavior="strict" min={1} max={100000} allowDecimal={false} allowNegative={false} label='Số lượng' {...form.getInputProps("soLuong")}/>
            <MySelect data={tinhTrangQuery.data!} label='Tình trạng' value={form.values.tinhTrang}/>
            <MyTextInput label='Tiến độ thực hiện' {...form.getInputProps("tienDoThucHien")}/>
            <MyDateInput label='Ngày hoàn thành' {...form.getInputProps("ngayHoanThanh")} readOnly/>
            <MyTextArea label='Ghi chú' {...form.getInputProps("ghiChu")}/>
            <MyCheckbox label='Đã hoàn thành' defaultChecked={form.values.hoanThanh}/>
        </MyActionIconUpdate> 
    )
}