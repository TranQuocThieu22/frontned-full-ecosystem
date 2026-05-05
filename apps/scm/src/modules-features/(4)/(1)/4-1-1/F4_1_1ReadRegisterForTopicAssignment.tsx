'use client'
import { MyDataTable } from '@/components/DataDisplay/DataTable/MyDataTable';
import MyNumberInput from '@/components/Inputs/NumberInput/MyNumberInput';
import { Button, Fieldset } from '@mantine/core';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo } from 'react';

interface I4_1_1 {
    name: string,
    soGio: number
}
export default function F4_1_1ReadRegisterForTopicAssignment() {
    const columns = useMemo<MRT_ColumnDef<I4_1_1>[]>(
        () => [
            {
                header: "Loại đề tài đăng ký",
                accessorKey: "name"
            },
            {
                header: "Số giờ",
                accessorKey: "soGio",
                Cell: ({ cell }) => {
                    return <MyNumberInput value={cell.getValue<string>()} />
                }
            },
        ],
        []
    );
    return (
        <Fieldset legend="Đăng ký nhiệm vụ đề tài">
            <MyDataTable data={data} columns={columns} renderRowActions={() => <Button>Lưu</Button>} />
        </Fieldset>
    )
}

const data: I4_1_1[] = [
    { name: "Giacomo Guilizzoni Founder & SEO", soGio: 40 }
]