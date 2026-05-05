import { service_event } from "@/api/services/service_event";
import { CustomButtonViewFile } from "@aq-fe/core-ui/shared/components/button/CustomButtonViewFile";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { ActionIcon, Group, Image, Modal, Paper, Text, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconLivePhoto, IconMaximize, IconMinimize } from "@tabler/icons-react";
import { useState } from "react";

interface EventProofModalProps {
    modalSize?: string;
    filePath: string;
}

export default function EventProofModal({ filePath, modalSize = '80%', ...rest }: EventProofModalProps) {
    const disc = useDisclosure(false);
    const fullScreen = useState(false);
    const hSize = useState("80vh");

    // Gọi API để lấy file từ đường dẫn
    const data = useCustomReactQuery({
        queryKey: ["getEventFile", filePath],
        axiosFn: () => service_event.getFile({ filePath }),
    });

    // Xác định loại file dựa vào phần mở rộng
    const isImage = data?.data?.fileExtension?.match(/(jpg|jpeg|png|gif)/i);
    const isPDF = data?.data?.fileExtension?.match(/(pdf)/i);

    return (
        <>
            {!isImage ? <CustomButtonViewFile file={data?.data} /> : (
                <>
                    <Tooltip label="Xem tài liệu trực tiếp" >
                        <ActionIcon color="cyan" onClick={disc[1].open} {...rest}>
                            <IconLivePhoto />
                        </ActionIcon>
                    </Tooltip>
                    <Modal
                        fullScreen={fullScreen[0]}
                        opened={disc[0]}
                        onClose={disc[1].close}
                        size={modalSize}
                        title={
                            <Group>
                                <Text>Xem tài liệu trực tiếp</Text>
                                {fullScreen[0] ? (
                                    <ActionIcon
                                        onClick={() => {
                                            fullScreen[1](false);
                                            hSize[1]("80vh");
                                        }}>
                                        <IconMinimize />
                                    </ActionIcon>
                                ) : (
                                    <ActionIcon
                                        onClick={() => {
                                            fullScreen[1](true);
                                            hSize[1]("90vh");
                                        }}>
                                        <IconMaximize />
                                    </ActionIcon>
                                )}
                            </Group>
                        }>
                        <Paper>
                            <Image
                                src={`data:image/${data?.data?.fileExtension};base64,${data?.data?.fileBase64String}`}
                                alt="Minh chứng"
                                style={{
                                    maxWidth: "100%",
                                    maxHeight: "90vh",
                                    objectFit: "contain",
                                }}
                            />
                        </Paper>
                    </Modal>
                </>
            )}
        </>
    );
}
