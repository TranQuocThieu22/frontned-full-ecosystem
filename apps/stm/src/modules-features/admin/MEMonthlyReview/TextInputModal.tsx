import { Modal, Textarea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

export default function TextInputModal({ defautValue }: { defautValue: string }) {
    const [value, setValue] = useState(defautValue);
    const [opened, { open, close }] = useDisclosure();

    return (
        <>
            <Textarea
                readOnly
                maxRows={5}
                minRows={5}
                value={value}
                onClick={open}
            />

            <Modal
                title="Nhập liệu"
                size="50%"
                opened={opened}
                onClose={close}
            >
                <Textarea
                    data-autofocus
                    value={value}
                    onChange={(event) => setValue(event.currentTarget.value)}
                />
            </Modal>
        </>
    );
}
