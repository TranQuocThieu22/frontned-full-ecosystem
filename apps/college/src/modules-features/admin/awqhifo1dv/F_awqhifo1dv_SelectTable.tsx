import { MyDataTable } from '@/components/DataDisplay/DataTable/MyDataTable';
import { Box, Button, Fieldset, Flex, Group, Modal, TextInput } from '@mantine/core';
import { IconChevronLeft, IconChevronRight, IconChevronsLeft, IconChevronsRight } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo, useState } from 'react';
import { I } from './F_awqhifo1dv_Read';
import F_awqhifo1dv_TableResult from './F_awqhifo1dv_TableResult';

export default function F_awqhifo1dv_SelectTable() {
    const [opened, setOpened] = useState(false);
    const [openedTable, setOpenedTable] = useState(false);

    const examActivityPointsQuery = useQuery<I[]>({
        queryKey: [`ListOfReasons`],
        queryFn: async () => [
            {
                id: 1,
                mssv: "34234234",
                name: "Nguyễn Văn A",
                size: 34,
                note: "Một vài thông tin",
                abbreviationName: "Nguyễn A",
            },
            {
                id: 2,
                mssv: "36324233",
                name: "Nguyễn Văn B",
                size: 37,
                note: "Một vài thông tin",
                abbreviationName: "Nguyễn A",
            },
            {
                id: 3,
                mssv: "342223344",
                name: "Nguyễn Văn C",
                size: 23,
                note: "Một vài thông tin",
                abbreviationName: "Nguyễn A",
            },
        ],
    });

    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
        { header: "Mã field", accessorKey: "mssv", size: 190 },
        { header: "Tên field", accessorKey: "name", size: 190 },
    ], []);

    const column2 = useMemo<MRT_ColumnDef<I>[]>(() => [
        { header: "Mã field", accessorKey: "mssv", size: 190 },
        { header: "Tên field", accessorKey: "name", size: 190 },
        {
            header: "Cột map",
            id: "actions",
            size: 170,
            Cell: ({ row }) => (
                <TextInput
                    size="xs"
                    w={150}
                    defaultValue={"..."}
                    onChange={(event) => {
                        console.log(`Row ${row.id} updated with: ${event.currentTarget.value}`);
                    }}
                />
            ),
        },
    ], []);

    // Callback to reopen SelectTable modal from TableResult
    const handleBackToSelectTable = () => {
        setOpenedTable(false); // Close TableResult
        setOpened(true); // Reopen SelectTable
    };

    return (
        <>
            <Button variant="default" onClick={() => setOpened(true)}>
                Tiếp tục
            </Button>
            <Modal size="auto" opened={opened} onClose={() => setOpened(false)} title={'Import'} centered>
                <Box bg={"white"} p={20}>
                    <Flex justify={"space-between"} align={"center"}>
                        <Fieldset legend={"Danh sách trường thông tin"}>
                            <MyDataTable
                                enableRowSelection={false}
                                enableRowNumbers={false}
                                columns={columns}
                                data={examActivityPointsQuery.data ?? []}
                            />
                        </Fieldset>
                        <Box mx={50} w={"full"}>
                            <Flex gap="md" justify="center" align="center" direction="column">
                                <Button variant="default" leftSection={<IconChevronsLeft stroke={2} />}>
                                    Tiếp tục
                                </Button>
                                <Button variant="default" leftSection={<IconChevronLeft stroke={2} />}>
                                    Tiếp tục
                                </Button>
                                <Button variant="default" leftSection={<IconChevronRight stroke={2} />}>
                                    Tiếp tục
                                </Button>
                                <Button variant="default" leftSection={<IconChevronsRight stroke={2} />}>
                                    Tiếp tục
                                </Button>
                            </Flex>
                        </Box>
                        <Fieldset legend={"Danh sách trường thông tin được chọn"}>
                            <MyDataTable
                                enableRowNumbers={false}
                                enableRowSelection={false}
                                columns={column2}
                                data={examActivityPointsQuery.data ?? []}
                            />
                        </Fieldset>
                    </Flex>
                    <Group mt={20} justify="flex-end">
                        <Button variant="default" onClick={() => setOpened(false)}>
                            Quay lại
                        </Button>
                        <Button
                            variant="default"
                            onClick={() => {
                                setOpened(false);
                                setOpenedTable(true);
                            }}
                        >
                            Tiếp tục
                        </Button>
                        <Button variant="default" onClick={() => setOpened(false)}>
                            Đóng
                        </Button>
                    </Group>
                </Box>
            </Modal>
            <F_awqhifo1dv_TableResult
                isOpen={openedTable}
                onClose={() => setOpenedTable(false)} // Close TableResult only
                onBack={handleBackToSelectTable} // Pass callback to go back to SelectTable
            />
        </>
    );
}