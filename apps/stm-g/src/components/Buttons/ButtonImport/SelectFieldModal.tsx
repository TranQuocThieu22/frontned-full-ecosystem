import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import MyFlexEnd from "@/components/Layouts/FlexEnd/MyFlexEnd";
import { Button, Divider, Fieldset, Modal, SimpleGrid, Table, useModalsStack } from "@mantine/core";
import { IconArrowBackUp, IconArrowBigRight, IconSquareArrowLeft, IconSquareArrowLeftFilled, IconSquareArrowRight, IconSquareArrowRightFilled, IconSquareRoundedX } from "@tabler/icons-react";

interface SelectFieldModalProps {
    stack: ReturnType<typeof useModalsStack<"select-file-page" | "select-field-page" | "implement-page">>
}
export default function SelectFieldModal({ stack }: SelectFieldModalProps) {
    return (
        <Modal fullScreen {...stack.register('select-field-page')} title="Import">
            <SimpleGrid cols={{ base: 3 }}>
                <Fieldset legend="Danh sách trường thông tin">
                    <Table stickyHeader stickyHeaderOffset={60}>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Mã field</Table.Th>
                                <Table.Th>Tên field</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            <Table.Tr>
                                <Table.Td></Table.Td>
                                <Table.Td></Table.Td>
                            </Table.Tr>
                        </Table.Tbody>
                    </Table>
                </Fieldset>
                <MyFlexColumn>
                    <Button leftSection={<IconSquareArrowRightFilled />}>Tiếp tục</Button>
                    <Button leftSection={<IconSquareArrowRight />}>Tiếp tục</Button>
                    <Divider my={0} />
                    <Button leftSection={<IconSquareArrowLeft />}>Tiếp tục</Button>
                    <Button leftSection={<IconSquareArrowLeftFilled />}>Tiếp tục</Button>
                </MyFlexColumn>
                <Fieldset legend="Danh sách trường thông tin được chọn">
                    <Table stickyHeader stickyHeaderOffset={60}>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Mã field</Table.Th>
                                <Table.Th>Tên field</Table.Th>
                                <Table.Th>Cột map</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>

                        </Table.Tbody>
                    </Table>
                </Fieldset>
            </SimpleGrid>
            <Divider></Divider>
            <MyFlexEnd>
                <Button leftSection={<IconArrowBackUp />} onClick={() => stack.close("select-field-page")} color="gray.7">Quay lại</Button>
                <Button color="blue.8" leftSection={<IconArrowBigRight />} onClick={() => stack.close("select-field-page")}>Tiếp tục</Button>
                <Button leftSection={<IconSquareRoundedX />} onClick={() => stack.closeAll()} color="red.6">Đóng</Button>
            </MyFlexEnd>
        </Modal>
    )
}
