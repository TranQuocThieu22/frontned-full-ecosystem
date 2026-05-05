'use client'

import { MyButton } from "@/components/Buttons/Button/MyButton"
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal"
import { Alert, Center, Group } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { IconAlertTriangleFilled } from "@tabler/icons-react"

export default function F_6mrciv44x4_Delete({ handleDelete, selectedRowCount }: { handleDelete: any, selectedRowCount: number }) {
    const disc = useDisclosure()
    return <>
        <MyButtonModal
            modalSize={"sm"}
            disclosure={disc}
            title="Xác nhận xóa dữ liệu?"
            label="Xóa"
            color="red"
            crudType="delete"
        >
            {selectedRowCount == 0 ? (
                <>
                    <Alert variant="transparent" color="yellow" radius="xs" title="" icon={<IconAlertTriangleFilled />}>
                        Bạn chưa chọn bất kỳ dòng nào.
                    </Alert>
                </>
            )
                : (
                    <>
                        <Alert variant="transparent" color="yellow" radius="xs" title="" icon={<IconAlertTriangleFilled />}>
                            Bạn sắp chuyển dữ liệu không thi của {selectedRowCount} dòng được chọn. Bạn có chắc chắn muốn tiếp tục?
                        </Alert>
                        <Center>
                            <Group>
                                <MyButton crudType="default" color="red" onClick={() => { disc[1].close(); handleDelete() }}>Xác nhận xóa</MyButton>
                                <MyButton crudType="default" onClick={() => { disc[1].close() }}>Hủy thao tác</MyButton>
                            </Group>
                        </Center>
                    </>
                )
            }
        </MyButtonModal>
    </>
}