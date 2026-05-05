"use client"
import { Grid, Table } from "@mantine/core";
export default function F_testRoom_GeneralInfo() {
    return (
        <Grid>
            <Grid.Col span={4}>
                <Table variant="vertical" layout="fixed" withTableBorder>
                    <Table.Tbody>
                        <Table.Tr>
                            <Table.Th w={160}>Họ và tên</Table.Th>
                            <Table.Td>Tô Ngọc Lanh</Table.Td>
                        </Table.Tr>

                        <Table.Tr>
                            <Table.Th>Ngày thi</Table.Th>
                            <Table.Td>25/-5/2025</Table.Td>
                        </Table.Tr>
                    </Table.Tbody>
                </Table>
            </Grid.Col>

            <Grid.Col span={4}>
                <Table variant="vertical" layout="fixed" withTableBorder>
                    <Table.Tbody>
                        <Table.Tr>
                            <Table.Th>Giờ thi</Table.Th>
                            <Table.Td>09:00</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Th>Môn thi</Table.Th>
                            <Table.Td w={'200px'}>
                                CSDLCB - Cơ sở dữ liệu cơ bản
                            </Table.Td>
                        </Table.Tr>
                    </Table.Tbody>
                </Table>
            </Grid.Col>


            <Grid.Col span={4}>
                <Table variant="vertical" layout="fixed" withTableBorder>
                    <Table.Tbody>
                        <Table.Tr>
                            <Table.Th>Thời gian làm bài</Table.Th>
                            <Table.Td>90 phút</Table.Td>
                        </Table.Tr>

                        <Table.Tr>
                            <Table.Th>Nhóm thi</Table.Th>
                            <Table.Td>room1</Table.Td>
                        </Table.Tr>

                    </Table.Tbody>
                </Table>
            </Grid.Col>
        </Grid>
    )
}
