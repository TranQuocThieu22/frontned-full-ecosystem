import { IBranch } from '@/interfaces/branch';
import { IRoomType } from '@/interfaces/roomType';
import { Box, Button, Checkbox, Group, Stack, Table } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconSearch } from '@tabler/icons-react';
import { MyDateInput, MyFieldset, MyFlexRow, MyNumberInput, MySelect } from 'aq-fe-framework/components';

interface ISearchFreeRoomsFilter {
    roomType?: IRoomType;
    branch?: IBranch;
    capacity?: number;
    fromDate?: Date | null;
    toDate?: Date | null;
    selectedTiets?: number[];
}

export default function SearchFreeRoomsFilter() {
    const form = useForm<ISearchFreeRoomsFilter>({
        initialValues: {
            roomType: roomTypeData[0],
            branch: branchData[0],
            capacity: 20,
            fromDate: new Date(),
            toDate: new Date(),
            selectedTiets: [],
        },
    });

    const handleTietChange = (tietNumber: number, checked: boolean) => {
        const currentTiets = form.values.selectedTiets || [];
        if (checked) {
            form.setFieldValue('selectedTiets', [...currentTiets, tietNumber]);
        } else {
            form.setFieldValue(
                'selectedTiets',
                currentTiets.filter((tiet) => tiet !== tietNumber)
            );
        }
    };

    const tiets = Array.from({ length: 10 }, (_, i) => i + 1);

    return (
        <>
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
                <MyFieldset
                    title="Chọn bộ lọc"
                >
                    <Stack gap="lg">
                        <MyFlexRow style={{ gap: '16px' }}>
                            <Box style={{ flex: 1, position: 'relative' }}>
                                <MySelect
                                    clearable
                                    placeholder="Chọn tính chất phòng"
                                    label="Tính chất phòng"
                                    data={roomTypeData.map((item) => ({
                                        value: item.id?.toString()!,
                                        label: item.name! == null ? '' : item.name!,
                                    }))}
                                    defaultValue={form.values.roomType?.id?.toString()}
                                    onChange={(value: any) => {
                                        const selectedRoom = roomTypeData.find((room) => room.id?.toString() === value);
                                        form.setFieldValue('roomType', selectedRoom);
                                    }}
                                />
                            </Box>

                            <Box style={{ flex: 1, position: 'relative' }}>
                                <MySelect
                                    clearable
                                    placeholder="Chọn chi nhánh"
                                    label="Chi nhánh"
                                    data={branchData.map((item) => ({
                                        value: item.id?.toString()!,
                                        label: item.name! == null ? '' : item.name!,
                                    }))}
                                    defaultValue={form.values.branch?.id?.toString()}
                                    onChange={(value: any) => {
                                        const selectedBranch = branchData.find((branch) => branch.id?.toString() === value);
                                        form.setFieldValue('branch', selectedBranch);
                                    }}
                                />
                            </Box>

                            <Box style={{ flex: 1, position: 'relative' }}>
                                <MyNumberInput label="Sức chứa tối thiểu" {...form.getInputProps('capacity')} />
                            </Box>
                        </MyFlexRow>

                        <MyFlexRow style={{ gap: '16px' }}>
                            <Box style={{ flex: 1, position: 'relative' }}>
                                <MyDateInput label="Từ ngày" {...form.getInputProps('fromDate')} />
                            </Box>
                            <Box style={{ flex: 1, position: 'relative' }}>
                                <MyDateInput label="Đến ngày" {...form.getInputProps('toDate')} />
                            </Box>
                        </MyFlexRow>
                    </Stack>
                    <MyFieldset title="Khung thời gian" mt={10}>
                        <Box w="100%">
                            <Table striped highlightOnHover withTableBorder>
                                <Table.Thead>
                                    <Table.Tr>
                                        {tiets.map((tiet) => (
                                            <Table.Th key={tiet} style={{ textAlign: 'center', minWidth: '80px' }}>
                                                Tiết {tiet}
                                            </Table.Th>
                                        ))}
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>
                                    <Table.Tr>
                                        {tiets.map((tiet) => (
                                            <Table.Td
                                                key={tiet}
                                                style={{
                                                    textAlign: 'center',
                                                    backgroundColor: form.values.selectedTiets?.includes(tiet) ? '#e7f5ff' : 'transparent',
                                                    cursor: 'pointer',
                                                    transition: 'background-color 0.2s ease'
                                                }}
                                                onClick={() => handleTietChange(tiet, !form.values.selectedTiets?.includes(tiet))}
                                            >
                                                <Checkbox
                                                    checked={form.values.selectedTiets?.includes(tiet) || false}
                                                    onChange={(event) => handleTietChange(tiet, event.currentTarget.checked)}
                                                    size="sm"
                                                    color="blue"
                                                    style={{
                                                        pointerEvents: 'none',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center'
                                                    }}
                                                />
                                            </Table.Td>
                                        ))}
                                    </Table.Tr>
                                </Table.Tbody>
                            </Table>
                        </Box>
                    </MyFieldset>
                    <Group justify="flex-end" mt="md">
                        <Button
                            type="submit"
                            color="blue"
                            size="sm"
                            leftSection={<IconSearch size={16} />}
                        >
                            Tìm
                        </Button>
                    </Group>
                </MyFieldset>
            </form>
        </>
    );
}

export const roomTypeData: IRoomType[] = [
    { id: 1, code: 'LT', name: 'Lý thuyết' },
    { id: 2, code: 'TH', name: 'Thực hành' },
    { id: 3, code: 'MT', name: 'Máy tính' },
    { id: 4, code: 'NG', name: 'Ngoại ngữ' },
];

export const branchData: IBranch[] = [
    { id: 1, code: 'TD', name: 'Thủ Đức' },
    { id: 2, code: 'Q1', name: 'Quận 1' },
    { id: 3, code: 'GV', name: 'Gò Vấp' },
    { id: 4, code: 'BT', name: 'Bình Thạnh' },
];

export const capacityOptions = [20, 25, 30, 35, 40, 50];
