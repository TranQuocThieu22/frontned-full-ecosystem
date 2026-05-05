"use client";
import baseAxios from "@/shared/config/baseAxios";
import {
    ActionIcon,
    Button,
    Group,
    LoadingOverlay,
    Modal,
    Paper,
    Text,
    Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconLivePhoto, IconMaximize, IconMinimize } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface IMyButtonViewPDF {
    modalSize?: string;
    label?: string;
    id?: number;
    src?: string;
    isActionIcon?: boolean;
    filePath?: string;
}
/**
 * @deprecated Component này không xài nữa nha mấy ní
 * Vui lòng dùng `MyButtonViewFileAPI` thay thế.
 */
export function MyButtonViewPDF({
    id,
    modalSize = "80%",
    label = "Xem file",
    src,
    isActionIcon = false,
    filePath,
}: IMyButtonViewPDF) {
    const [opened, { open, close }] = useDisclosure(false);
    const [fullscreen, setFullscreen] = useState(false);
    const [height, setHeight] = useState("80vh");
    const [blobUrl, setBlobUrl] = useState<string | null>(null);

    const query = useQuery({
        queryKey: ["MyButtonViewPDF", id, filePath],
        queryFn: async () => {
            if (filePath) {
                const res = await baseAxios.get("/AQ/GetFile?filePath=" + filePath);
                return res.data.data;
            }
            const res = await baseAxios.get("/Document/Get?id=" + id);
            return res.data.data;
        },
        enabled: opened && !src,
    });

    useEffect(() => {
        if (!query.data) return;

        // Xử lý base64 -> Blob URL
        const base64String = filePath
            ? query.data?.fileBase64String
            : query.data?.fileDetail?.fileBase64String;

        if (!base64String) return;

        const byteCharacters = atob(base64String);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "application/pdf" });
        const newBlobUrl = URL.createObjectURL(blob);
        setBlobUrl(newBlobUrl);

        return () => {
            URL.revokeObjectURL(newBlobUrl);
        };
    }, [query.data]);
    useEffect(() => {
        if (opened) {
            query.refetch();
        } else {
            setBlobUrl(null);
        }
    }, [opened]);
    return (
        <>
            <Tooltip label="Xem tài liệu trực tiếp">
                {isActionIcon ? (
                    <ActionIcon onClick={open}>
                        <IconLivePhoto />
                    </ActionIcon>
                ) : (
                    <Button color="cyan" onClick={open} leftSection={<IconLivePhoto />}>
                        {label}
                    </Button>
                )}
            </Tooltip>

            <Modal
                fullScreen={fullscreen}
                opened={opened}
                onClose={() => {
                    close();
                    setBlobUrl(null); // cleanup
                }}
                size={modalSize}
                title={
                    <Group>
                        <Text>Xem tài liệu trực tiếp</Text>
                        <ActionIcon
                            onClick={() => {
                                setFullscreen(!fullscreen);
                                setHeight(fullscreen ? "80vh" : "90vh");
                            }}
                        >
                            {fullscreen ? <IconMinimize /> : <IconMaximize />}
                        </ActionIcon>
                    </Group>
                }
            >
                <Paper h={height} p="lg" pos="relative">
                    <LoadingOverlay
                        visible={query.isLoading || (!blobUrl && !!query.data)}
                        zIndex={1000}
                        overlayProps={{ radius: "sm", blur: 2 }}
                    />

                    {blobUrl || src ? (
                        <iframe
                            src={blobUrl ?? src}
                            width="100%"
                            height="100%"
                            allow="fullscreen"
                            style={{ border: "none" }}
                        />
                    ) : (
                        <Text></Text>
                    )}
                </Paper>
            </Modal>
        </>
    );
}
