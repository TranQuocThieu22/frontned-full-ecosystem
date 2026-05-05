import { Button, Group, Modal } from '@mantine/core';
import { useState } from 'react';
import F_awqhifo1dv_ExportFile from './F_awqhifo1dv_ExportFile';
export default function F_awqhifo1dv_ConfirmExport() {
    const [opened, setOpened] = useState(false);
    const [openedTable, setOpenedTable] = useState(false);
    return (
        <>
            <Button bg={"green"} onClick={() => setOpened(true)}>Xuất file cấu trúc</Button>
            <Modal opened={opened} onClose={() => setOpened(false)} title={'Xác nhận'} centered>
                <p>Bạn có muốn mở file vừa tạo không?</p>
                <Group mt="md">
                    <Button
                        color="green"
                        onClick={() => {
                            setOpenedTable(true);
                            setOpened(false);
                        }}
                    >
                        Có
                    </Button>
                    <Button variant="default" onClick={() => setOpened(false)}>
                        Không
                    </Button>
                </Group>
            </Modal>
            <F_awqhifo1dv_ExportFile
                isOpen={openedTable}
                onClose={() => setOpenedTable(false)} // Pass a callback to close the export modal
            />
        </>
    );
}