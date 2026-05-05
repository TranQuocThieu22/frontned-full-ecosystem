'use client'
import { ActionIcon, Flex, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconBrandTelegram } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { RefObject, useEffect, useRef } from "react";
import ChatWithAIToolsMenuButton from "./ChatWithAIToolsMenuButton";
import { ChatBotStore_AddMessage, MessageContent } from "./stores/ChatBotStore";

interface FormComponetProps {
    typingRef: RefObject<{ updateLoading: (loading: boolean) => void }>,
}

export default function ChatWithAISendMessageForm({ typingRef }: FormComponetProps) {
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
            // demo loading KHI GẮN API NHỚ BỎ KẺO TỐN THÊM 2 GIÂY
            await new Promise(resolve => setTimeout(resolve, 2000));
            return {
                data: [
                    {
                        "text": "Trong tháng 4/2025 có các sự kiện sau:\n\n1.  **HD\\_NHOM\\_19:** Tham gia thực hiện phiếu phản hồi thông tin về môn học và giảng viên (đánh giá giảng viên trực tuyến), từ 09/04/2025 đến 20/04/2025.\n2.  **HD\\_NHOM\\_123:** Ý thức chấp hành các nội quy, quy chế và các quy định của nhà trường, từ 07/04/2025 đến 09/04/2025.\n3.  **Da:** test, diễn ra vào 23/04/2025."
                    },
                ]
            }
            // return await axios.post("https://bd04-210-245-33-111.ngrok-free.app/webhook/chat", {
            //     "message": value.content,
            //     "sessionId": ChatBotStore_GetOrCreateSessionId() // import from "./stores/ChatBotStore";
            // })
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
                    createBotMessage("🥹 Lỗi rồi! Vui lòng thử lại.")
                );
            }
        },
        onError: (error: any) => {
            setLoading(false);
            const isNetworkError = error.isAxiosError && !error.response;
            ChatBotStore_AddMessage(createBotMessage(
                isNetworkError
                    ? "😭 Xin lỗi! Hiện tại không thể kết nối với máy chủ."
                    : "🥹 Lỗi rồi! Vui lòng thử lại.",
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
                    <ChatWithAIToolsMenuButton />
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

