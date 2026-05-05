import { Button, Group, Modal, Stack, Text, rem } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { IconMicrophone, IconPlayerPause } from "@tabler/icons-react"
import { useRef, useState } from "react"
import { ReactMediaRecorder } from "react-media-recorder"
import Usecase_QuestionWrapper, { Usecase_QuestionWrapperProps } from "./Usecase_QuestionWrapper"

export interface VoiceValue {
    blob: Blob
    url: string
}

interface Props extends Usecase_QuestionWrapperProps {
    value?: VoiceValue
    onChange: (value: VoiceValue) => void
}

export default function UseCase_QuestionVoice({
    value,
    onChange,
    questionIndex,
    title
}: Props) {
    const [opened, { open, close }] = useDisclosure(false)
    const [tempValue, setTempValue] = useState<VoiceValue | undefined>(value)
    const [isRecording, setIsRecording] = useState(false)
    const [seconds, setSeconds] = useState(0)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    // Bắt đầu đếm giờ
    const startTimer = () => {
        setSeconds(0)
        intervalRef.current = setInterval(() => {
            setSeconds((prev) => prev + 1)
        }, 1000)
    }

    const stopTimer = () => {
        if (intervalRef.current) clearInterval(intervalRef.current)
    }

    const formatTime = (s: number) => {
        const m = Math.floor(s / 60).toString().padStart(2, "0")
        const sec = (s % 60).toString().padStart(2, "0")
        return `${m}:${sec}`
    }

    // Khi đóng modal
    const handleClose = () => {
        setTempValue(undefined)
        setIsRecording(false)
        stopTimer()
        close()
    }

    return (
        <Usecase_QuestionWrapper title={title} questionIndex={questionIndex}>
            <Group>
                <Button
                    onClick={open}
                    leftSection={<IconMicrophone size={18} />}
                    color="red"
                    radius="xl"
                    size="md"
                    style={{
                        boxShadow: "0px 4px 12px rgba(0,0,0,0.2)"
                    }}
                >
                    Bắt đầu ghi âm
                </Button>

                {value?.url && (
                    <audio controls src={value.url}></audio>
                )}

            </Group>
            <Modal
                opened={opened}
                onClose={handleClose}
                withCloseButton
                centered
                title="Ghi âm"
                styles={{
                    body: {
                        textAlign: "center",
                    },
                }}
            >
                <ReactMediaRecorder
                    audio
                    onStop={(blobUrl, blob) => {
                        setTempValue({ url: blobUrl, blob })
                    }}
                    render={({ startRecording, stopRecording }) => (
                        <Stack align="center" >
                            <Text size="sm" c="dimmed">
                                Nhấn nút để bắt đầu ghi âm
                            </Text>

                            <Text size="xl" fw={700} style={{ fontFamily: "monospace" }}>
                                {formatTime(seconds)}
                            </Text>

                            <Button
                                onClick={() => {
                                    if (!isRecording) {
                                        startRecording()
                                        startTimer()
                                        setIsRecording(true)
                                    } else {
                                        stopRecording()
                                        stopTimer()
                                        setIsRecording(false)
                                    }
                                }}
                                radius="xl"
                                size="xl"
                                color="red"
                                style={{
                                    borderRadius: rem(9999),
                                }}
                            >
                                {isRecording ? <IconPlayerPause /> : <IconMicrophone />}
                            </Button>

                            <Text size="sm" c="dimmed">
                                Nhấn nút đỏ để {isRecording ? "dừng" : "bắt đầu"} ghi âm
                            </Text>

                            {tempValue?.url && (
                                <>
                                    <audio controls src={tempValue.url}></audio>
                                    <Button
                                        variant="light"
                                        onClick={() => {
                                            onChange(tempValue)
                                            handleClose()
                                        }}
                                    >
                                        ✅ Lưu ghi âm
                                    </Button>
                                </>
                            )}
                        </Stack>
                    )}
                />
            </Modal>
        </Usecase_QuestionWrapper>
    )
}
