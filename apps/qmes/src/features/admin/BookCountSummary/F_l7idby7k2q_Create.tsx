'use client'
import MyButtonCreate from '@/components/ui/Buttons/ButtonCRUD/MyButtonCreate';
import MyTextInput from '@/components/ui/Inputs/TextInput/MyTextInput';
import { NumberInput, Select } from '@mantine/core';
import { useForm } from '@mantine/form';


interface I {
    id?: number;
    statisticalIndicator?: string;
    quantity?: number;
    reportYear?: string;     // Năm báo cáo (Extracted from effectiveDate)
    notes?: string;            // Ghi chú
    nguoiCapNhat?: string; // Người cập nhật
    ngayCapNhat?: Date;   // Ngày cập nhật
}

export default function F_l7idby7k2q_Create() {
    const currentYear = new Date().getFullYear().toString(); // Get the current year as a string
    const form = useForm<I>({
        initialValues: {
            statisticalIndicator: "Số đầu sách điện tử có thể truy cập trực tuyến",
            quantity: 0,
            reportYear: currentYear,
            notes: "",
        },
    })

    return (
        <MyButtonCreate form={form} onSubmit={() => { }} objectName='Chi tiết đầu sách'>
            <Select
                label="Chỉ số thống kê"
                {...form.getInputProps("statisticalIndicator")}
                data={[
                    {
                        value: "Số đầu sách điện tử có thể truy cập trực tuyến", label:
                            "Số đầu sách điện tử có thể truy cập trực tuyến",
                    }
                    , {
                        value: "Số đầu sách có bản in", label:
                            "Số đầu sách có bản in",
                    },
                    {
                        value: "Số đầu sách in có thể mượn trực tiếp", label: "Số đầu sách in có thể mượn trực tiếp"
                    }


                ]}

            />
            <NumberInput label="Số lượng" {...form.getInputProps("quantity")} min={0} />
            <MyTextInput readOnly label="Năm báo cáo" {...form.getInputProps("reportYear")} value={currentYear} />
            <MyTextInput label="Ghi chú" {...form.getInputProps("notes")} />
        </MyButtonCreate>
    )
}


