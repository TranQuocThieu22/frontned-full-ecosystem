'use client'
import { MyButtonModal } from '@/components/Buttons/ButtonModal/MyButtonModal';
import { Button, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';


export enum HinhThuc {
    tinhnhutinchi = "Tính như tín chỉ",
    nienchecotinh = "Tính như niên chế, có tính",
    nienchekhong = "Tính như niên chế, không",
    khongtinhhocphi = "Không tính học phí"
}

export interface I_v16j3xr0cc {
    hinhthuc?: HinhThuc; // Hình thức tính học phí
}
export default function F_v16j3xr0cc_UpdateBox() {
    const disc = useDisclosure()
    const form = useForm<I_v16j3xr0cc>({
        
    })
    const [selectedValue, setSelectedValue] = useState<string | null>(HinhThuc.tinhnhutinchi);

    return (
        
        <MyButtonModal
        title="Gán chung" modalSize={'md'} disclosure={disc} label={'Gán chung'} color='green'  >
             <Select
                            placeholder="Chọn hình thức"
                             data={Object.values(HinhThuc).map(ht => ({ value: ht, label: ht }))}
                             defaultValue={selectedValue}
                            searchable
                            onChange={(value) => console.log("Hình thức chọn:", value)}
                        />
                        <Button color='green'>Gán</Button>
        </MyButtonModal>
    )
}