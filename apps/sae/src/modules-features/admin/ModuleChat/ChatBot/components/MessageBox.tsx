'use client'
import { Badge, Center, Group, Paper, Stack, TypographyStylesProvider } from "@mantine/core";
import dayjs from "dayjs";
import vi from 'dayjs/locale/vi';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';
import weekday from 'dayjs/plugin/weekday';
import React, { RefObject, useEffect, useRef } from "react";
import ReactMarkdown from 'react-markdown';
import { useChatBotStore } from "../stores/ChatBotStore";
import MessageLoading from "./MessageLoading";

dayjs.locale(vi);
dayjs.extend(weekday);
dayjs.extend(isToday);
dayjs.extend(isYesterday);

function formatDateMarker(timestamp: number): string {
    const date = dayjs(timestamp);
    if (date.isToday()) return 'Hôm nay';
    if (date.isYesterday()) return 'Hôm qua';
    return date.format('ddd, DD/MM/YYYY');
}

interface MessageBoxComponetProps {
    typingRef: RefObject<{ updateLoading: (loading: boolean) => void }>,
}

export default function MessageBox({ typingRef }: MessageBoxComponetProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const messages = useChatBotStore((s) => s.data.message);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div style={{ flex: 1, minHeight: 0, overflow: 'auto' }}>
            <Stack>
                {messages.map((msg, index) => {
                    const prevMsg = messages[index - 1];
                    const currentMarker = formatDateMarker(msg.timestamp);
                    const prevMarker = prevMsg ? formatDateMarker(prevMsg.timestamp) : '';
                    const showDateMarker = index === 0 || currentMarker !== prevMarker;
                    return (
                        <React.Fragment key={index}>
                            {showDateMarker && (
                                <Center>
                                    <Badge
                                        variant="light"
                                        color="gray.9"
                                        size="xs"
                                        style={{ textTransform: "none" }}
                                    >
                                        {currentMarker}
                                    </Badge>
                                </Center>
                            )}

                            <Group
                                title={dayjs(msg.timestamp).format('dddd DD/MM/YYYY HH:mm:ss')}
                                justify={msg.sender === 'user' ? 'flex-end' : 'flex-start'}
                            >
                                <Paper
                                    maw="85%"
                                    p="xs"
                                    radius="md"
                                    bg={msg.sender === 'user' ? 'blue.7' : 'gray.3'}
                                    c={msg.sender === 'user' ? 'white' : 'gray.9'}
                                    style={{ wordBreak: "break-word", overflowWrap: "break-word" }}
                                >
                                    <TypographyStylesProvider>
                                        <ReactMarkdown
                                            components={{
                                                p: ({ children }) => <div>{children}</div>,
                                                ol: ({ children }) => <ul style={{ paddingLeft: '2rem' }}>{children}</ul>,
                                                li: ({ children }) => <li style={{ marginBottom: 4 }}>{children}</li>,
                                            }}
                                        >
                                            {msg.content.replace(/\n/g, '  \n')}
                                        </ReactMarkdown>
                                    </TypographyStylesProvider>
                                </Paper>
                            </Group>
                        </React.Fragment>
                    )
                })}
                <MessageLoading bgDotColor="#999" ref={typingRef} />
                <div ref={scrollRef} />
            </Stack>
        </div>
    );
}
