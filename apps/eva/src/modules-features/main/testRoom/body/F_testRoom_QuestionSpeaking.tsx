import { CustomFlexRow } from "@aq-fe/core-ui/shared/components/layout/CustomFlexRow";
import { Button, Group, Modal, Space, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useRef, useState } from "react";
import MyQuestionContainer, { MyQuestionContainerProps } from "./MyQuestionContainer";

interface QuestionSpeakingProps extends MyQuestionContainerProps { }

export function F_testRoom_QuestionSpeaking({ ...rest }: QuestionSpeakingProps) {
    const [opened, { open, close }] = useDisclosure(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const [audioURL, setAudioURL] = useState<string | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [duration, setDuration] = useState<number | null>(null);
    const [recordingTime, setRecordingTime] = useState(0);
    const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        audioChunksRef.current = [];
        setDuration(null);
        setRecordingTime(0);

        mediaRecorder.ondataavailable = (event) => {
            audioChunksRef.current.push(event.data);
        };

        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
            const url = URL.createObjectURL(audioBlob);
            setAudioURL(url);
            clearInterval(recordingIntervalRef.current!);
        };

        mediaRecorder.start();
        mediaRecorderRef.current = mediaRecorder;
        setIsRecording(true);

        // Bắt đầu đếm giờ ghi
        recordingIntervalRef.current = setInterval(() => {
            setRecordingTime((prev) => prev + 1);
        }, 1000);
    };

    const stopRecording = () => {
        mediaRecorderRef.current?.stop();
        setIsRecording(false);
    };

    const deleteRecording = () => {
        setAudioURL(null);
        setDuration(null);
        audioChunksRef.current = [];
        setRecordingTime(0);
    };

    // Format giây → phút:giây
    const formatDuration = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m}:${s.toString().padStart(2, "0")} phút`;
    };

    const formatHHMMSS = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, "0")}:${m
            .toString()
            .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    };

    useEffect(() => {
        if (audioURL && audioRef.current) {
            const audioEl = audioRef.current;

            const handleLoadedMetadata = () => {
                if (audioEl.duration !== Infinity) {
                    setDuration(audioEl.duration);
                }
            };

            audioEl.addEventListener("loadedmetadata", handleLoadedMetadata);
            return () => {
                audioEl.removeEventListener("loadedmetadata", handleLoadedMetadata);
            };
        }
    }, [audioURL]);

    return (
        <MyQuestionContainer {...rest}>
            <Space></Space>
            <Stack>
                <Group>
                    <Button onClick={open}>🎤 Ghi âm</Button>
                </Group>

                {audioURL && (
                    <CustomFlexRow>
                        <Text size="sm">🎧 Bản ghi âm của bạn:</Text>
                        <audio ref={audioRef} controls src={audioURL} />
                        {duration !== null && isFinite(duration) && (
                            <Text size="xs" color="dimmed">
                                ⏱ Tổng thời lượng: {formatDuration(duration)}
                            </Text>
                        )}
                        {audioURL && (
                            <Button color="red" variant="light" onClick={deleteRecording}>
                                🗑 Xóa bản ghi
                            </Button>
                        )}
                    </CustomFlexRow>
                )}

                <Modal opened={opened} onClose={close} title="Ghi âm giọng nói" centered>
                    <Stack>
                        <Button
                            onClick={() => {
                                if (isRecording) {
                                    stopRecording()
                                    close()
                                    return
                                }
                                startRecording()
                            }}
                            color={isRecording ? "red" : "blue"}
                        >
                            {isRecording ? "⏹ Dừng ghi âm" : "🎙 Bắt đầu ghi âm"}
                        </Button>

                        {isRecording && (
                            <Text size="sm" color="red">
                                🔴 Đang ghi: {formatHHMMSS(recordingTime)}
                            </Text>
                        )}
                    </Stack>
                </Modal>
            </Stack>
        </MyQuestionContainer>
    );
}
