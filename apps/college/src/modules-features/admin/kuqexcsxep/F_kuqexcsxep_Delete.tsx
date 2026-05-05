'use client'
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";
import MySelect from "@/components/Combobox/Select/MySelect";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { SimpleGrid } from "@mantine/core";
import { IconInfoTriangle } from '@tabler/icons-react';

export default function F_kuqexcsxep_Delete({ id }: { id: number }) {

    return <MyActionIconDelete title="Xác nhận xóa dữ liệu ?" onSubmit={() => { }} >
        <SimpleGrid cols={{ base: 1, md: 2, xl: 2 }}>
            <MyTextInput label='Mã nguồn kinh phí' />
            <MyTextInput label='Tên nguồn kinh phí' />
            <MySelect data={['Ngân sách tinh', 'Ngân sách tinh tự chủ', 'Ngân sách tinh không tự chủ']} label='Thuộc loại' />
            <MyTextInput label='Ghi chú' />
        </SimpleGrid>
        <IconInfoTriangle size={416} />
    </MyActionIconDelete>
}

