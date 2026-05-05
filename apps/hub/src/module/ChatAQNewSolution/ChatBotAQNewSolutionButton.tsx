'use client'
import { Affix, Button, Transition } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { IconMessageCircle } from "@tabler/icons-react"
import { useRef } from "react"
import ChatBotAQNewSolutionForm from "./ChatBotAQNewSolutionForm"
import MessageBox from "./components/MessageBox"
import ResizableDialog from "./components/ResizableDialog"
import { useChatBotStore } from "./stores/ChatAQNewSolutionStore"

export default function ChatBotAQNewSolutionButton() {
    const [opened, { toggle, close }] = useDisclosure(false);
    const typingRef = useRef<{ updateLoading: (loading: boolean) => void; }>(null);
    const messages = useChatBotStore((s) => s.data.message);

    return (
        <>
            <Affix position={{ bottom: 10, right: 10 }} zIndex={199}>
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
                            Tư vấn Đảm bảo chất lượng
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
                        <MessageBox typingRef={typingRef} messages={messages} />
                        <ChatBotAQNewSolutionForm typingRef={typingRef} />
                    </>
                }
            </ResizableDialog>
        </>
    );
}