import { Grid, Table, Text } from '@mantine/core';
import { IClassScoreEntry, IProgram } from './interfaces';

export default function EnterComponentScoresClassInfo(
    { data, programDetailData }: { data: IClassScoreEntry, programDetailData: IProgram }
) {
    const heNhapDiem = {
        TRONG_SO: 1,
        TRUNG_BINH_CONG: 2,
        TONG_CONG: 3,
        DIEM_DANH: 4
    }
    return (
        <Grid>
            <Grid.Col span={{ base: 12, lg: 7 }}>
                <Table w={'100%'} variant="vertical" layout="fixed">
                    <Table.Tbody>
                        <Table.Tr>
                            <Table.Th w={160}>Mã lớp</Table.Th>
                            <Table.Td>{data.code}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Th>Tên khóa học</Table.Th>
                            <Table.Td>{data.courseTimeCluster.course.name}</Table.Td>
                        </Table.Tr>
                    </Table.Tbody>
                </Table>
            </Grid.Col>
            <Grid.Col span={{ base: 12, lg: 12 }}>
                <Text>
                    <strong>Cách tổng kết:</strong> {
                        programDetailData.scoreFormula === heNhapDiem.TRONG_SO ? "trọng số" :
                            programDetailData.scoreFormula === heNhapDiem.TRUNG_BINH_CONG ? "trung bình cộng" :
                                programDetailData.scoreFormula === heNhapDiem.TONG_CONG ? "tổng cộng" :
                                    programDetailData.scoreFormula === heNhapDiem.DIEM_DANH ? "điểm danh" :
                                        "không xác định"
                    }
                </Text>
            </Grid.Col>
        </Grid>
    )
}

