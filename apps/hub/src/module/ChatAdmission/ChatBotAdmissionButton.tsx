'use client'
import { Affix, Button, Transition } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { IconMessageCircle } from "@tabler/icons-react"
import { useRef } from "react"
import MessageBox from "../ChatAQNewSolution/components/MessageBox"
import ResizableDialog from "../ChatAQNewSolution/components/ResizableDialog"
import ChatBotAdmissionForm from "./ChatBotAdmissionForm"
import { useChatBotStore } from "./stores/ChatAdmissionStore"

export default function ChatBotAdmissionButton() {
    const [opened, { toggle, close }] = useDisclosure(false);
    const typingRef = useRef<{ updateLoading: (loading: boolean) => void; }>(null);
    const messages = useChatBotStore((s) => s.data.message);

    return (
        <>
            <Affix position={{ bottom: 60, right: 10 }} zIndex={199}>
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
                            Tư vấn tuyển sinh
                        </Button>
                    )}
                </Transition>
            </Affix>

            <ResizableDialog
                isOpened={opened}
                onDialogClose={close}
                dialogTitle="Chat bot Tư vấn tuyển sinh"
            >
                {opened &&
                    <>
                        <MessageBox typingRef={typingRef} messages={messages} />
                        <ChatBotAdmissionForm typingRef={typingRef} />
                    </>
                }
            </ResizableDialog>
        </>
    );
}