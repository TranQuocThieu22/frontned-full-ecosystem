import { service_event } from "@/api/services/service_event";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { ActionIcon, Group, Image, Modal, Paper, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEye, IconMaximize, IconMinimize } from "@tabler/icons-react";
import { useEffect, useState } from "react";

interface EventProofModalProps {
    filePath: string;
    modalSize?: string;
}

export default function EventProofModal({ filePath, modalSize = '80%', ...rest }: EventProofModalProps) {
    const [opened, { open, close }] = useDisclosure(false);
    const [fullScreen, setFullScreen] = useState(false);
    const [hSize, setHSize] = useState("80vh");

    const { data, isLoading, isError, refetch } = useCustomReactQuery({
        queryKey: ["getEventFile"],
        axiosFn: () => service_event.getFile({ filePath }),
        options: { enabled: false }
    });

    useEffect(() => {
        if (opened) {
            refetch();
        }
    }, [opened, refetch]);

    const isImage = data?.fileExtension?.match(/(jpg|jpeg|png|gif)/i);
    const isPDF = data?.fileExtension?.match(/(pdf)/i);

    return (
        <>
            <ActionIcon
                color="cyan"
                onClick={open}
                {...rest}
            >
                <IconEye size={18} />
            </ActionIcon>

            <Modal
                fullScreen={fullScreen}
                opened={opened}
                onClose={close}
                size={modalSize}
                title={
                    <Group>
                        <Text>Xem tài liệu trực tiếp</Text>
                        {fullScreen ? (
                            <ActionIcon
                                onClick={() => {
                                    setFullScreen(false);
                                    setHSize("80vh");
                                }}
                            >
                                <IconMinimize />
                            </ActionIcon>
                        ) : (
                            <ActionIcon
                                onClick={() => {
                                    setFullScreen(true);
                                    setHSize("90vh");
                                }}
                            >
                                <IconMaximize />
                            </ActionIcon>
                        )}
                    </Group>
                }
            >
                {isLoading ? (
                    <Text>Đang tải dữ liệu...</Text>
                ) : isError || !data ? (
                    <Text>Không có dữ liệu...</Text>
                ) : isImage ? (
                    <Paper>
                        <Image
                            src={`data:image/${data?.fileExtension};base64,${data?.fileBase64String}`}
                            alt="Minh chứng"
                            style={{
                                maxWidth: "100%",
                                maxHeight: "90vh",
                                objectFit: "contain",
                            }}
                        />
                    </Paper>
                ) : isPDF ? (
                    <Paper h={hSize} p={"lg"}>
                        <iframe
                            src={`data:application/pdf;base64,${data?.fileBase64String}`}
                            width="100%"
                            height="100%"
                        />
                    </Paper>
                ) : (
                    <Text>Không tìm thấy file. Vui lòng liên hệ Admin</Text>
                )}
            </Modal>
        </>
    );
}