import { Checkbox, Table } from "@mantine/core"
import { MyFieldset } from "aq-fe-framework/components"

export interface ClassPeriod {
    id?: number,
    name?: string,
    checked?: boolean
}

interface UseCase_SelectClassPeriodProps {
    values?: ClassPeriod[]
    onChange: (values: ClassPeriod[]) => void
}

export default function UseCase_SelectClassPeriod({ values = [], onChange }: UseCase_SelectClassPeriodProps) {

    return (
        <MyFieldset title="Khung thời gian">
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        {values.map((item, idx) => (
                            <Table.Th key={idx}>{item.name}</Table.Th>
                        ))}
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    <Table.Tr>
                        {values.map((item, idx) => (
                            <Table.Td key={idx}>
                                <Checkbox
                                    checked={item.checked ?? false}
                                    onChange={(e) => {
                                        const newChecked = e.currentTarget.checked;

                                        // 1. Clone mảng values để tạo updatedValues
                                        const updatedValues = [...values];

                                        // 2. Tìm phần tử tương ứng bằng find (theo id)
                                        const target = updatedValues.find((v) => v.id === item.id);

                                        // 3. Nếu tìm thấy, cập nhật checked
                                        if (target) {
                                            target.checked = newChecked;
                                            onChange(updatedValues); // Gọi callback với mảng mới
                                        }
                                    }}
                                />
                            </Table.Td>
                        ))}
                    </Table.Tr>
                </Table.Tbody>
            </Table>
        </MyFieldset>
    )
}
