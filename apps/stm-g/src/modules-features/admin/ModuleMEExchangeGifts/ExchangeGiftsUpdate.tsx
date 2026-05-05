import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import { Group, SimpleGrid, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MySelect } from "aq-fe-framework/components";
import { useMemo } from "react";
import { IExchangeGifts, IGiftItem, IStudent } from "./ExchangeGiftsLayout";

export default function ExchangeGiftsUpdate({ values }: { values: IExchangeGifts }) {
    const form = useForm({
        initialValues: {
            ...values
        }
    })
    const totalTickets = useMemo(() => {
        return mockDataStudent.find(item => item.code === form.values.studentCode)?.totalTickets || 0
    }, [form.values.studentCode])

    const gift = useMemo(() => {
        return mockDataGift.find(item => item.code === form.values.gift.code)
    }, [form.values.gift.code])

    return (
        <MyActionIconUpdate
            title="Chi tiết đổi quà"
            onSubmit={() => { }}
            form={form}
            modalSize={'lg'}
        >
            <MySelect
                data={mockDataStudent.map(item => ({
                    value: item.code.toString(),
                    label: item.name
                }))}
                label="Học viên"
                {...form.getInputProps('studentCode')}
                inputContainer={(children) => (
                    <SimpleGrid cols={2} spacing="md">
                        {children}
                        <Group gap={6}>
                            <Text>Tổng số ticker hiện có:</Text>
                            <Text color="red" fw={500}> {totalTickets}</Text>
                        </Group>
                    </SimpleGrid>
                )}
            />

            <MySelect
                data={mockDataGift.map(item => ({
                    value: item.code.toString(),
                    label: item.name
                }))}
                label="Quà"
                {...form.getInputProps('gift.code')}
                inputContainer={(children) => (
                    <SimpleGrid cols={2} spacing="md">
                        {children}
                        <Group gap={6}>
                            <Text>Số ticker cần có:</Text>
                            <Text color="red" fw={500}> {gift?.sticker}</Text>
                        </Group>
                    </SimpleGrid>
                )}
            />
        </MyActionIconUpdate>
    );
}


const mockDataStudent: IStudent[] = [
    {
        id: 1,
        code: "HS00101",
        name: "Nguyễn An Bình",
        totalTickets: 100
    },
    {
        id: 2,
        code: "HS00102",
        name: "Lê Minh Duy",
        totalTickets: 50
    },
    {
        id: 3,
        code: "HS00103",
        name: "Phạm Thị Linh",
        totalTickets: 200
    },
    {
        id: 4,
        code: "HS00104",
        name: "Võ Hoàng Anh",
        totalTickets: 350
    },
    {
        id: 5,
        code: "HS00105",
        name: "Đặng Thị Nga",
        totalTickets: 500
    }
]

const mockDataGift: IGiftItem[] = [
    {
        id: 1,
        code: "QUA001",
        name: "Bút chì màu cao cấp",
        sticker: 50,
        stock: 50
    },
    {
        id: 2,
        code: "QUA005",
        name: "Móc khóa hình thú dễ thương",
        sticker: 20,
        stock: 150
    },
    {
        id: 3,
        code: "QUA004",
        name: "Bình nước giữ nhiệt 500ml",
        sticker: 80,
        stock: 60
    },
    {
        id: 4,
        code: "QUA003",
        name: "Bộ đồ dùng học tập",
        sticker: 150,
        stock: 30
    },
    {
        id: 5,
        code: "QUA008",
        name: "Balo học sinh",
        sticker: 500,
        stock: 5
    }
]