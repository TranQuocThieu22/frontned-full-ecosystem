'use client'
import { Affix, Button, Group, Transition } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { IconMessageCircle } from "@tabler/icons-react"
import { useRef } from "react"
import ChatBotSendMessageForm from "./ChatBotSendMessageForm"
import MessageBox from "./components/MessageBox"
import ResizableDialog from "./components/ResizableDialog"
import "./ChatBot.css"

export default function ChatBotButton() {
    const [opened, { toggle, close }] = useDisclosure(false);
    const typingRef = useRef<{ updateLoading: (loading: boolean) => void; }>(null);

    return (
        <>
            <Affix position={{ bottom: 10, right: 10 }} zIndex={199}>
                <Transition transition="slide-up" mounted={true}>
                    {(transitionStyles) => (
                        <Button
                            style={transitionStyles}
                            onClick={toggle}
                            radius="xl"
                            size="md"
                            px="md"
                            color="blue"
                            className="hover-show"
                        >
                            <Group gap={0}>
                                <IconMessageCircle size={18} />
                                <span className="btn-text">Tư vấn Đảm bảo chất lượng</span>
                            </Group>
                        </Button>
                    )}
                </Transition>
            </Affix>

            <ResizableDialog
                isOpened={opened}
                onDialogClose={close}
                dialogTitle="Chat bot Tư vấn Đảm bảo chất lượng"
            >
                {opened &&
                    <>
                        <MessageBox typingRef={typingRef} />
                        <ChatBotSendMessageForm typingRef={typingRef} />
                    </>
                }
            </ResizableDialog>
        </>
    );
}