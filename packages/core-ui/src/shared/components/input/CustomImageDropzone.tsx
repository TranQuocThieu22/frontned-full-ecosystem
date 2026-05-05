import {
    ActionIcon,
    Center,
    Image,
    InputWrapper,
    InputWrapperProps,
    LoadingOverlay,
    Modal,
    Paper,
    Stack,
    Text
} from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { IconX } from "@tabler/icons-react";
import { useState } from "react";

export interface CustomImageDropzoneProps extends Omit<InputWrapperProps, "value" | "onChange" | "defaultValue"> {
    defaultValue?: File | null;
    value?: File | null,
    onChange?: (value: File | null) => void
    loading?: boolean
}

export default function CustomImageDropzone({
    value,
    onChange,
    defaultValue = null,
    loading,
    ...rest
}: CustomImageDropzoneProps) {
    const [opened, setOpened] = useState(false);
    const [internalValue, setInternalValue] = useState<File | null>(defaultValue);
    const file = value !== undefined ? value : internalValue;
    const isImage = file?.type.startsWith("image/");
    const previewUrl = isImage && file ? URL.createObjectURL(file) : null;

    const handleChange = (file: File | null) => {
        if (value === undefined) {
            setInternalValue(file);
        }
        onChange?.(file);
    };
    return (
        <InputWrapper {...rest}>
            <Dropzone
                multiple={false}
                onDrop={async (files) => {
                    handleChange?.(files[0]!)
                }}
                styles={{
                    root: {
                        border: "2px dashed #ced4da",
                        borderColor: rest.error ? "red" : "#ced4da",
                        borderRadius: 12,
                        padding: 12,
                        minHeight: 95,
                        position: "relative",
                        cursor: "pointer",
                        overflow: "hidden",
                    },
                }}
            >
                <LoadingOverlay
                    visible={loading}
                    zIndex={10}
                    overlayProps={{ radius: "md", blur: 2 }}
                />
                {file ? (
                    <Paper h={95} radius="md" style={{ position: "relative" }}>
                        {/* ❌ Clear */}
                        <ActionIcon
                            size="sm"
                            radius="xl"
                            color="red"
                            variant="filled"
                            style={{ position: "absolute", top: 8, right: 8, zIndex: 2 }}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleChange?.(null);
                            }}
                        >
                            <IconX size={14} />
                        </ActionIcon>

                        {/* ===== IMAGE ===== */}
                        {isImage && previewUrl ? (
                            <Image
                                src={previewUrl}
                                alt={file?.name}
                                fit="contain"
                                h={'100%'}
                                style={{ cursor: "pointer", overflow: "hidden", }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setOpened(true);
                                }}
                                onLoad={() => URL.revokeObjectURL(previewUrl)}
                            />
                        ) : (
                            /* ===== NON IMAGE ===== */
                            <Center h={120}>
                                <Text size="sm" fw={500}>
                                    {file.name}
                                </Text>
                            </Center>
                        )}
                    </Paper>
                ) : (
                    <Center h={95}>
                        <Stack c={rest.error ? "red" : undefined} align="center" gap={4}>
                            <Text fw={500}>Kéo thả file vào đây</Text>
                            <Text size="sm" c={rest.error ? "red" : "dimmed"}>
                                Hoặc click để chọn
                            </Text>
                        </Stack>
                    </Center>
                )}
            </Dropzone>

            {/* 🖼️ Modal chỉ cho IMAGE */}
            {isImage && previewUrl && (
                <Modal
                    opened={opened}
                    onClose={() => setOpened(false)}
                    size="90%"
                    centered
                    title={file?.name}
                >
                    <Image src={previewUrl} fit="contain" radius="md" />
                </Modal>
            )}
        </InputWrapper>
    );
}
