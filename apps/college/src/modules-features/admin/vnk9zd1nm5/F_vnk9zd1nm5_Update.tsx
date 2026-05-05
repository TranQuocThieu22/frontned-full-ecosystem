'use client'
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MyDateInput from '@/components/Inputs/DateInput/MyDateInput'; // Giả sử có component nhập ngày
import MyNumberInput from '@/components/Inputs/NumberInput/MyNumberInput';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { Checkbox } from '@mantine/core';
import { useForm } from '@mantine/form';

export interface I_vnk9zd1nm5 {
    id?: number; // STT
    code: string; // Mã môn học
    name: string; // Tên môn học
    credit: number; // Số tín chỉ
    creditFee: number; // Số tín chỉ học phí
    creditFeeLT: number; // Số tín chỉ học phí LT (Lý thuyết)
    feeRateLT: number; // Mức đóng giá LT
    creditFeeTH: number; // Số tín chỉ học phí TH (Thực hành)
    feeRateTH: number; // Mức đóng giá TH
    creditFeeTN: number; // Số tín chỉ học phí TN (Thí nghiệm)
    feeRateTN: number; // Mức đóng giá TN
    exempted?: boolean; // Không miễn giảm
    note?: string; // Ghi chú
}

export default function F_vnk9zd1nm5_Update({data}:{data:I_vnk9zd1nm5}) {
    const form = useForm<I_vnk9zd1nm5>({
        initialValues:data
    });

   
    return (
        <MyActionIconUpdate form={form} onSubmit={() => {}} >
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
                    <MyTextInput label='ghi chú' {...form.getInputProps("credit")} />
        </MyActionIconUpdate>
    );
}
