import MySelect from '@/components/Combobox/Select/MySelect';
import { Button, Flex, Modal, Text } from '@mantine/core';
import { useState } from 'react';
import F_vnyrext6ag_ConfirmExam from './F_vnyrext6ag_ConfirmExam';
export default function F_vnyrext6ag_ExamSelect() {
    const [opened, setOpened] = useState(false);
    const [openedConfirm, setOpenedConfirm] = useState(false);
    const dataKyThi = ["2024-1-T1 - Thi cuối kỳ", "2024-2-T1 - Thi dữa kỳ"]
    return (
        <>
            <Button bg={"green"} onClick={() => setOpened(true)}>Đồng bộ</Button>
            <Modal opened={opened} onClose={() => setOpened(false)} title={"Chọn kỳ thi cần đồng bộ"} centered>
                <Flex
                    justify={"space-between"}
                    align={"center"}
                >
                    <Text>Kỳ thi</Text>
                    <MySelect placeholder={dataKyThi[0]} w={"80%"} data={dataKyThi} />
                </Flex>
                <Flex
                    mt={20}
                    justify="flex-end"
                >
                    <Button
                        color="green"
                        onClick={() => {
                            setOpenedConfirm(true);
                            setOpened(false);
                        }}
                    >
                        Thực hiện
                    </Button>
                </Flex>
            </Modal>
            <F_vnyrext6ag_ConfirmExam
                isOpen={openedConfirm}
                onClose={() => setOpenedConfirm(false)} // Pass a callback to close the export modal
            />
        </>
    );
}