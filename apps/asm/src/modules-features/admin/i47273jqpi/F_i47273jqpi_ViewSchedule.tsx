'use client'
import MyCalendar from '@/components/Calendar/MyCalendar';

const dataThu = ['', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];
const elements = [
    { tiet: 1, thu2: 'Toán', thu3: '', thu4: '', thu5: '', thu6: '', thu7: '', chunhat: '' },
    { tiet: 2, thu2: 'Toán', thu3: '', thu4: '', thu5: '', thu6: '', thu7: '', chunhat: '' },
    { tiet: 3, thu2: 'Toán', thu3: '', thu4: '', thu5: '', thu6: '', thu7: '', chunhat: '' },
    { tiet: 4, thu2: '', thu3: '', thu4: '', thu5: '', thu6: '', thu7: '', chunhat: '' },
    { tiet: 5, thu2: '', thu3: '', thu4: '', thu5: '', thu6: '', thu7: '', chunhat: '' },
    { tiet: 6, thu2: '', thu3: '', thu4: '', thu5: '', thu6: '', thu7: '', chunhat: '' },
    { tiet: 7, thu2: '', thu3: '', thu4: '', thu5: '', thu6: '', thu7: '', chunhat: '' },
    { tiet: 8, thu2: '', thu3: '', thu4: '', thu5: '', thu6: '', thu7: '', chunhat: '' },
    { tiet: 9, thu2: '', thu3: '', thu4: '', thu5: '', thu6: '', thu7: '', chunhat: '' },
    { tiet: 10, thu2: '', thu3: '', thu4: '', thu5: '', thu6: '', thu7: '', chunhat: '' },
    { tiet: 11, thu2: '', thu3: '', thu4: '', thu5: '', thu6: '', thu7: '', chunhat: '' },
    { tiet: 12, thu2: '', thu3: '', thu4: '', thu5: '', thu6: '', thu7: '', chunhat: '' },
    { tiet: 13, thu2: '', thu3: '', thu4: '', thu5: '', thu6: '', thu7: '', chunhat: '' },
    { tiet: 14, thu2: '', thu3: '', thu4: '', thu5: '', thu6: '', thu7: '', chunhat: '' },
    { tiet: 15, thu2: '', thu3: '', thu4: '', thu5: '', thu6: '', thu7: '', chunhat: '' },
];

export default function F_i47273jqpi_ViewSchedule() {
    return <MyCalendar />
    // const rows = elements.map((element, idx) => {
    //     const isFirstOfMerged = idx === 0; // Kiểm tra hàng đầu tiên
    //     const isPartOfMerged = idx < 3; // Chỉ gộp 3 tiết đầu

    //     return (
    //         <Table.Tr key={idx}>
    //             <Table.Td w={'100px'}>Tiết {element.tiet}</Table.Td>
    //             {isFirstOfMerged && (
    //                 <Table.Td rowSpan={3} style={{ verticalAlign: 'middle' }}>
    //                     {element.thu2}
    //                 </Table.Td>
    //             )}
    //             {!isFirstOfMerged && isPartOfMerged && null}
    //             <Table.Td>{element.thu3}</Table.Td>
    //             <Table.Td>{element.thu4}</Table.Td>
    //             <Table.Td>{element.thu5}</Table.Td>
    //             <Table.Td>{element.thu6}</Table.Td>
    //             <Table.Td>{element.thu7}</Table.Td>
    //             <Table.Td>{element.chunhat}</Table.Td>
    //         </Table.Tr>
    //     );
    // });

    // return (
    //     <Paper p={'md'}>
    //         <Title order={4}>Thời khóa biểu</Title>
    //         <Space my={'md'} />
    //         <Table stickyHeader stickyHeaderOffset={60}>
    //             <Table.Thead>
    //                 <Table.Tr>
    //                     {dataThu.map((item, index) => (
    //                         <Table.Th key={index}>{item}</Table.Th>
    //                     ))}
    //                 </Table.Tr>
    //             </Table.Thead>
    //             <Table.Tbody>{rows}</Table.Tbody>
    //         </Table>
    //     </Paper>
    // );
}
