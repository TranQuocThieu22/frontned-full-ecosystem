'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import MyNumberInput from "@/components/Inputs/NumberInput/MyNumberInput";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { useForm } from "@mantine/form";
import { I_tuvpbavwxd_read } from "./F_tuvpbavwxd_Read";
export default function F_tuvpbavwxd_Update({ values }: { values: I_tuvpbavwxd_read }) {
    const form = useForm<I_tuvpbavwxd_read>({
        initialValues: {
            ...values
        },
        validate: {
            maDotThi: (value) => (value ? null : 'Mã đợt thi bắt buộc nhập'),
            tenDotThi: (value) => (value ? null : 'Tên đợt thi bắt buộc nhập'),
            ngayBatDau: (value) => {
                if (!value) return 'Ngày bắt đầu bắt buộc nhập'
                if (form.values.ngayKetThuc && value > form.values.ngayKetThuc) return 'Ngày bắt đầu phải trước ngày kết thúc'
            },
            ngayKetThuc: (value) => {
                if (!value) return 'Ngày kết thúc bắt buộc nhập'
                if (form.values.ngayBatDau && value < form.values.ngayBatDau) return 'Ngày kết thúc phải sau ngày bắt đầu'
            },
            soLuongNhomThi: (value) => (value ? null : 'Số lượng nhóm thi bắt buộc nhập'),
            soLuongThiSinh: (value) => (value ? null : 'Số lượng thí sinh bắt buộc nhập'),
        }
    })
    return (
        <MyActionIconUpdate onSubmit={() => { }} form={form}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <MyTextInput disabled label="Mã đợt thi" {...form.getInputProps('maDotThi')} />
                <MyTextInput label="Tên đợt thi" {...form.getInputProps('tenDotThi')} />
                <MyDateInput label="Ngày bắt đầu" {...form.getInputProps('ngayBatDau')} />
                <MyDateInput label="Ngày kết thúc" {...form.getInputProps('ngayKetThuc')} />
                <MyNumberInput min={1} label="Số lượng nhóm thi" {...form.getInputProps('soLuongNhomThi')} />
                <MyNumberInput min={1} label="Số lượng thí sinh" {...form.getInputProps('soLuongThiSinh')} />
            </div>
        </MyActionIconUpdate>
    )
}


