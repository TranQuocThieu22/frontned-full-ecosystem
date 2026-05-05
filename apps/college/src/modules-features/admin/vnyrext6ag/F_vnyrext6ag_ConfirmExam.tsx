'use client';
import { Box, Button, Flex, Modal } from '@mantine/core';

interface ConfirmButtonProps {
    confirmTitle?: string;
    confirmMessage?: string;
    isOpen: boolean;
    onClose: () => void;
}

export default function F_vnyrext6ag_ConfirmExam({
    isOpen,
    onClose,
}: ConfirmButtonProps) {
    return (
        <Modal
            size="auto"
            opened={isOpen}
            onClose={onClose}
            title={"Thông báo"}
            centered
        >
            <Box p={5}>Bạn đã đồng bộ thành công n dữ liệu tính chất thi môn học</Box>
            <Flex
                mt={10}
                justify={"center"}
                align={"center"}
            >
                <Button onClick={onClose} bg={"green"}>Đồng ý</Button>
            </Flex>
        </Modal>
    );
}