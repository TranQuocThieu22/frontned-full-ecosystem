'use client'
import { ActionIcon, Flex, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconBrandTelegram } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { RefObject, useEffect, useRef } from "react";
import { MessageContent } from "./components/IChat";
import ToolsMenuButton from "./components/ToolsMenuButton";
import { ChatBotStore_AddMessage, ChatBotStore_ResetSession } from "./stores/ChatAQNewSolutionStore";

interface FormComponetProps {
    typingRef: RefObject<{ updateLoading: (loading: boolean) => void }>,
}

export default function ChatBotAQNewSolutionForm({ typingRef }: FormComponetProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const form = useForm<MessageContent>({
        mode: "uncontrolled",
        initialValues: {
            content: "",
            sender: "user",
            timestamp: Date.now()
        },
    });

    const mutation = useMutation({
        mutationFn: async (value: MessageContent) => {
            setLoading(true);
            ChatBotStore_AddMessage(value);
            textareaRef.current!.value = "";
            form.reset();
            return await axios.post("https://vp.aqtech.edu.vn/CoreApiChat/ask-aqnew-solution-chat", {
                "question": value.content,
            })
        },
        onSuccess: (response) => {
            setLoading(false);
            if (response.data) {
                const messages = response.data;
                messages.forEach((msg: { text: string }) => {
                    ChatBotStore_AddMessage(
                        createBotMessage(msg.text)
                    )
                });
            } else {
                ChatBotStore_AddMessage(
                    createBotMessage("🥹 Đã xảy ra lỗi! Vui lòng thử lại.")
                );
            }
        },
        onError: (error: any) => {
            setLoading(false);
            const isNetworkError = error.isAxiosError && !error.response;
            ChatBotStore_AddMessage(createBotMessage(
                isNetworkError
                    ? "😭 Hiện tại không thể kết nối với máy chủ."
                    : "🥹 Đã xảy ra lỗi! Vui lòng thử lại.",
            ));
        },
    });

    // handle loading
    const setLoading = (l: boolean) => {
        typingRef.current?.updateLoading(l);
    }

    // create bot message
    const createBotMessage = (message: string): MessageContent => {
        return {
            content: message,
            sender: "bot",
            timestamp: Date.now()
        }
    }

    // handle enter keydown
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    // handle submit
    const handleSubmit = form.onSubmit((values) => {
        if (values.content !== "") {
            mutation.mutate(values)
        }
    });

    useEffect(() => {
        textareaRef.current?.focus();
    }, [mutation.isPending]);

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Flex mt="sm" justify="flex-end" align="center" direction="row" gap={4}>
                    <ToolsMenuButton resetMessage={ChatBotStore_ResetSession} />
                    <Textarea
                        radius="md"
                        placeholder="Nhập tin nhắn"
                        minRows={1}
                        maxRows={2}
                        onKeyDown={handleKeyDown}
                        ref={textareaRef}
                        disabled={mutation.isPending}
                        {...form.getInputProps("content")}
                    />
                    <ActionIcon type="submit" size={32} variant="transparent" loading={mutation.isPending}>
                        <IconBrandTelegram style={{ width: "7rem", height: "7rem" }} stroke={1.5} />
                    </ActionIcon>
                </Flex>
            </form>
        </>
    );
}

