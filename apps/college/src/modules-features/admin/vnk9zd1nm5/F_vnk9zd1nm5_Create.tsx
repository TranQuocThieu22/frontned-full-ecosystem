'use client'
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MyDateInput from '@/components/Inputs/DateInput/MyDateInput'; // Giả sử có component nhập ngày
import MyNumberInput from '@/components/Inputs/NumberInput/MyNumberInput';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { Checkbox } from '@mantine/core';
import { useForm } from '@mantine/form';

export interface I_vn9zd1nm5 {
    id?: number; // STT
    code: string; // Mã môn học
    name: string; // Tên môn học
    credit: number | null; // Số tín chỉ
    creditFee: number | null; // Số tín chỉ học phí
    creditFeeLT: number | null; // Số tín chỉ học phí LT (Lý thuyết)
    feeRateLT: number | null; // Mức đóng giá LT
    creditFeeTH: number | null; // Số tín chỉ học phí TH (Thực hành)
    feeRateTH: number | null; // Mức đóng giá TH
    creditFeeTN: number | null; // Số tín chỉ học phí TN (Thí nghiệm)
    feeRateTN: number | null; // Mức đóng giá TN
    exempted?: boolean; // Không miễn giảm
    note?: string; // Ghi chú
}

export default function F_vn9zd1nm5_Create() {
    const form = useForm<I_vn9zd1nm5>({
        initialValues: {
            code: "", // Mã môn học
            name: "", // Tên môn học
            credit: 0, // Số tín chỉ
            creditFee: 0, // Số tín chỉ học phí
            creditFeeLT: 0, // Số tín chỉ học phí LT (Lý thuyết)
            feeRateLT: 0, // Mức đóng giá LT
            creditFeeTH: 0, // Số tín chỉ học phí TH (Thực hành)
            feeRateTH: 0, // Mức đóng giá TH
            creditFeeTN: 0, // Số tín chỉ học phí TN (Thí nghiệm)
            feeRateTN: 0, // Mức đóng giá TN
            exempted: false, // Không miễn giảm
            note: "", // Ghi chú
        },
        validate: {
        },
    });

   
    return (
        <MyButtonCreate form={form} onSubmit={() => {}} objectName='Chi tiết đợt xét'>
            <MyTextInput label='Mã môn học' {...form.getInputProps("code")} />
            <MyTextInput label='Tên môn học' {...form.getInputProps("name")} />
            <MyNumberInput min={0} label='số tín chỉ' {...form.getInputProps("credit")} />
            <MyNumberInput min={0} label='số tín chỉ HP' {...form.getInputProps("creditFee")} />
            <MyNumberInput min={0} label='số tín chỉ HPLT' {...form.getInputProps("creditFeeLT")} />
            <MyNumberInput min={0} label='mức đóng giá LT' {...form.getInputProps("feeRateLT")} />
            <MyNumberInput min={0} label='số tín chỉ HPTH' {...form.getInputProps("creditFeeTH")} />
            <MyNumberInput min={0} label='mức đóng giá TH' {...form.getInputProps("feeRateTH")} />
            <MyNumberInput min={0} label='số tín chỉ HPTN' {...form.getInputProps("creditFeeTN")} />
            <MyNumberInput min={0} label='mức đóng giá TN' {...form.getInputProps("feeRateTN")} />
            <Checkbox 
                label="Không miễn giảm" 
                {...form.getInputProps("exempted", { type: "checkbox" })} 
            />
            <MyTextInput label='ghi chú' {...form.getInputProps("note")} />
        </MyButtonCreate>
    );
}
