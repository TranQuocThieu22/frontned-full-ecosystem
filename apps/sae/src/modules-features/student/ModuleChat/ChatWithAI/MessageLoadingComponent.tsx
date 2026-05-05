import { Group, Paper } from "@mantine/core";
import { forwardRef, useImperativeHandle, useState } from "react";

interface MessageLoaingProps {
    bgDotColor: string,
}

const MessageLoadingComponent = forwardRef(({ bgDotColor }: MessageLoaingProps, ref) => {
    const [isLoading, setLoading] = useState(false);

    useImperativeHandle(ref, () => ({
        updateLoading: (loading: boolean) => {
            setLoading(loading);
        }
    }));

    const stylesLoadingAnimation = `
        .typing-dots-wrapper {
            display: inline-flex;
            gap: 6px;
            align-items: center;
            height: 20px;
        }

        .typing-dot {
            width: 8px;
            height: 8px;
            background-color: ${bgDotColor};
            border-radius: 50%;
            animation: typingBounce 1.4s infinite ease-in-out both;
        }

        .typing-dot:nth-child(1) {
            animation-delay: 0s;
        }

        .typing-dot:nth-child(2) {
            animation-delay: 0.2s;
        }

        .typing-dot:nth-child(3) {
            animation-delay: 0.4s;s
        }

        @keyframes typingBounce {
            0%, 80%, 100% {
                transform: scale(0);
                opacity: 0.3;
            }
            40% {
                transform: scale(1);
                opacity: 1;
            }
    }`
    return (
        <>
            {isLoading &&
                <Group>
                    <Paper
                        p="xs"
                        radius="md"
                        bg={'gray.3'}
                        c={'black'}
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <div className="typing-dots-wrapper">
                            <span className="typing-dot"></span>
                            <span className="typing-dot"></span>
                            <span className="typing-dot"></span>
                        </div>
                        <style>{stylesLoadingAnimation}</style>
                    </Paper>
                </Group>
            }
        </>
    );
});

MessageLoadingComponent.displayName = "MessageLoadingComponent";
export default MessageLoadingComponent;