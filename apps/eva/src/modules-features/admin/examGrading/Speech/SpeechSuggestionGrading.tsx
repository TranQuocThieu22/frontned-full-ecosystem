import { Checkbox, Table } from '@mantine/core'
import { MyCenterFull, MyTextInput } from 'aq-fe-framework/components'

export default function SpeechSuggestionGrading() {
    return (
        <Table>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Các tiêu chí</Table.Th>
                    <Table.Th style={{ width: '100px' }}>Tỷ trọng</Table.Th>
                    <Table.Th w={100}>Đánh giá</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                <Table.Tr >
                    <Table.Td>
                        <MyTextInput
                            readOnly
                            defaultValue={'Trình bày rõ ràng mạch lạc'}
                        />
                    </Table.Td>

                    <Table.Td>
                        <MyTextInput
                            readOnly
                            value={'25%'}
                        />
                    </Table.Td>
                    <Table.Td>
                        <MyCenterFull>
                            <Checkbox />
                        </MyCenterFull>
                    </Table.Td>

                </Table.Tr>
                <Table.Tr >
                    <Table.Td>
                        <MyTextInput
                            readOnly
                            defaultValue={'Hiểu cơ bản về SQL'}
                        />
                    </Table.Td>

                    <Table.Td>
                        <MyTextInput
                            readOnly
                            value={'25%'}
                        />
                    </Table.Td>
                    <Table.Td>
                        <MyCenterFull>
                            <Checkbox />
                        </MyCenterFull>
                    </Table.Td>

                </Table.Tr>
                <Table.Tr >
                    <Table.Td>
                        <MyTextInput
                            readOnly
                            defaultValue={'Biết cách viết code truy vấn'}
                        />
                    </Table.Td>

                    <Table.Td>
                        <MyTextInput
                            readOnly
                            value={'25%'}
                        />
                    </Table.Td>
                    <Table.Td>
                        <MyCenterFull>
                            <Checkbox />
                        </MyCenterFull>
                    </Table.Td>

                </Table.Tr>
                <Table.Tr >
                    <Table.Td>
                        <MyTextInput
                            readOnly
                            defaultValue={'Viết đúng câu lệnh truy vấn'}
                        />
                    </Table.Td>

                    <Table.Td>
                        <MyTextInput
                            readOnly
                            value={'25%'}
                        />
                    </Table.Td>
                    <Table.Td>
                        <MyCenterFull>
                            <Checkbox />
                        </MyCenterFull>
                    </Table.Td>

                </Table.Tr>
            </Table.Tbody>
        </Table>
    )
}
