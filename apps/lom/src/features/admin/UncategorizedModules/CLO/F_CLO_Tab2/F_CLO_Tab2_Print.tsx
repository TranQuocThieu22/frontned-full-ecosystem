'use client'
import { COECLO } from "@/interfaces/shared-interfaces/COECLO";
import useFilterGradeStore from "@/shared/features/FilterGradeSelect/useFilterGradeStore";
import { CustomButtonPrintPDF } from "@aq-fe/core-ui/shared/components/button/CustomButtonPrintPDF";
import { Stack, Table, Text } from "@mantine/core";

export default function F_CLO_Tab2_Print({ data }: { data: COECLO[] }) {
    const store = useFilterGradeStore();

    // Group CLOs theo coecg.code
    const groupedData = data.reduce<Record<string, COECLO[]>>((acc, item) => {
        const code = item.coecg?.code ?? "Khác";
        if (!acc[code]) acc[code] = [];
        acc[code].push(item);
        return acc;
    }, {});

    // Render rows theo nhóm
    const rows = Object.entries(groupedData).map(([code, cloList], groupIdx) => {
        const groupRows = cloList.map((element, idx) => (
            <Table.Tr key={`${groupIdx}-${idx}`}>
                {/* Chỉ hiển thị coecg.code ở dòng đầu tiên của nhóm */}
                {idx === 0 ? (
                    <Table.Td rowSpan={cloList.length} ta={'center'} style={{ border: "1px solid black" }}>
                        {code}
                    </Table.Td>
                ) : null}
                <Table.Td style={{ border: "1px solid black" }}>{element.code}</Table.Td>
                <Table.Td style={{ border: "1px solid black" }}>{element.densityCLO}%</Table.Td>
                <Table.Td style={{ border: "1px solid black" }}>{element.name}</Table.Td>
                <Table.Td style={{ border: "1px solid black" }}>
                    {element.coeclopi?.map((pi) => pi.code).join(", ")}
                </Table.Td>
            </Table.Tr>
        ));
        return groupRows;
    });

    return (
        <CustomButtonPrintPDF>
            <Stack p={'lg'}>
                <Stack ta={'center'} gap={2}>
                    <Text>Bộ giáo dục và đào tạo</Text>
                    <Text fw={'bold'} tt={"uppercase"}>Trường đại học ABC</Text>
                </Stack>
                <Stack ta={'center'} gap={2}>
                    <Text fw={'bold'} tt={"uppercase"}>Chuẩn đầu ra môn học</Text>
                    <Text fw={'bold'} tt={"uppercase"}>Chương trình: {store.state.program?.name}</Text>
                </Stack>
                <Text>Chuẩn đầu ra (CĐR) môn học</Text>
                <Text>Học xong môn này, người học có khả năng</Text>
                <Table style={{ border: "1px solid black" }}>
                    <Table.Thead style={{ border: "1px solid black" }}>
                        <Table.Tr style={{ border: "1px solid black" }}>
                            <Table.Th style={{ border: "1px solid black" }}>Mục tiêu môn học</Table.Th>
                            <Table.Th style={{ border: "1px solid black" }}>CĐR môn học (CLO)</Table.Th>
                            <Table.Th style={{ border: "1px solid black" }}>Tỷ trọng</Table.Th>
                            <Table.Th style={{ border: "1px solid black" }}>Mô tả CĐR</Table.Th>
                            <Table.Th style={{ border: "1px solid black" }}>Quan hệ PIs</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </Stack>
        </CustomButtonPrintPDF>
    );
}
