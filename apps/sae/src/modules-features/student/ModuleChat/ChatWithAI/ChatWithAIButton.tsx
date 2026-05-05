'use client'
import { Affix, Button, Transition } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { IconMessageCircle } from "@tabler/icons-react"
import { useRef } from "react"
import ChatWithAIMessageBox from "./ChatWithAIMessageBox"
import ChatWithAIResizableDialog from "./ChatWithAIResizableDialog"
import ChatWithAISendMessageForm from "./ChatWithAISendMessageForm"

export default function ChatWithAIButton() {
    const [opened, { toggle, close }] = useDisclosure(false);
    const typingRef = useRef<{ updateLoading: (loading: boolean) => void; }>(null);

    return (
        <>
            <Affix position={{ bottom: 10, right: 10 }}>
                <Transition transition="slide-up" mounted={true}>
                    {(transitionStyles) => (
                        <Button
                            leftSection={<IconMessageCircle size={18} />}
                            style={transitionStyles}
                            onClick={toggle}
                            radius="xl"
                            size="md"
                            color="blue"
                        >
                            Chat
                        </Button>
                    )}
                </Transition>
            </Affix>

            <ChatWithAIResizableDialog
                isOpened={opened}
                onDialogClose={close}
                dialogTitle="Chat với AI"
            >
                {opened &&
                    <>
                        <ChatWithAIMessageBox typingRef={typingRef as any} />
                        <ChatWithAISendMessageForm typingRef={typingRef as any} />
                    </>
                }
            </ChatWithAIResizableDialog>
        </>
    );
}
