'use client'
import { COECG } from "@/interfaces/shared-interfaces/COECG";
import useFilterGradeStore from "@/shared/features/FilterGradeSelect/useFilterGradeStore";
import { CustomButtonPrintPDF } from "@aq-fe/core-ui/shared/components/button/CustomButtonPrintPDF";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { Table, Text } from "@mantine/core";
export default function F_CLO_Tab1_Print({ data }: { data: COECG[] }) {
    const store = useFilterGradeStore()
    const rows = data.map((element, idx) => (
        <Table.Tr key={idx}>
            <Table.Td style={{ border: "1px solid black" }}>{element.code}</Table.Td>
            <Table.Td style={{ border: "1px solid black" }}>{element.description}</Table.Td>
            <Table.Td style={{ border: "1px solid black" }}>{element.coeCGPIs?.map(item => item.code).join(", ")}</Table.Td>
        </Table.Tr>
    ));
    return (
        <CustomButtonPrintPDF>
            <CustomFlexColumn p={'lg'}>
                <CustomFlexColumn ta={'center'} gap={2}>
                    <Text >Bộ giáo dục và đào tạo</Text>
                    <Text fw={'bold'} tt={"uppercase"}>Trường đại học ABC</Text>
                </CustomFlexColumn>
                <CustomFlexColumn ta={'center'} gap={2}>
                    <Text fw={'bold'} tt={"uppercase"}>Mục tiêu môn học</Text>
                    <Text fw={'bold'} tt={"uppercase"}>Chương trình: {store.state.program?.name}</Text>
                </CustomFlexColumn>
                <Text>Chuẩn đầu ra (CĐR) môn học</Text>
                <Text>Học xong môn này, người học có khả năng</Text>
                <Table style={{ border: "1px solid black" }}>
                    <Table.Thead style={{ border: "1px solid black" }}>
                        <Table.Tr style={{ border: "1px solid black" }}>
                            <Table.Th style={{ border: "1px solid black" }}>Mục tiêu môn học</Table.Th>
                            <Table.Th style={{ border: "1px solid black" }}>Mô tả</Table.Th>
                            <Table.Th style={{ border: "1px solid black" }}>CĐR CTĐT phân bổ cho môn học - Pis</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </CustomFlexColumn>
        </CustomButtonPrintPDF>
    )
}

