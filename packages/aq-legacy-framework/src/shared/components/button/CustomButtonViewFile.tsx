import { AQFileDetail } from "@aq-fe/aq-legacy-framework/shared/interfaces/AQFileDetail";
import { fileUtils } from "@aq-fe/aq-legacy-framework/shared/utils/fileUtils";
import { Button, Center, Loader, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDownload } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { CustomButtonModal, CustomButtonModalProps } from "./CustomButtonModal/CustomButtonModal";

export interface CustomButtonViewFileProps extends Omit<CustomButtonModalProps, "disclosure"> {
    file?: AQFileDetail;
    disclosure?: ReturnType<typeof useDisclosure>;
    loading?: boolean;
}

export function CustomButtonViewFile({
    file,
    disclosure,
    loading,
    ...rest
}: CustomButtonViewFileProps) {
    const internalDisc = useDisclosure();
    const disc = disclosure || internalDisc;
    const [previewUrl, setPreviewUrl] = useState<string>();
    const getMimeType = (extension?: string): string => {
        switch (extension?.toLowerCase()) {
            case ".pdf":
                return "application/pdf";
            case ".png":
                return "image/png";
            case ".jpg":
            case ".jpeg":
                return "image/jpeg";
            case ".doc":
                return "application/msword";
            case ".docx":
                return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
            default:
                return "application/octet-stream";
        }
    };

    const isPreviewable = (extension?: string): boolean => {
        const ext = extension?.toLowerCase();
        return ext === ".pdf" || ext === ".png" || ext === ".jpg" || ext === ".jpeg";
    };

    const downloadFile = () => {
        if (!file) return;
        const mimeType = getMimeType(file.fileExtension);
        const link = document.createElement("a");
        link.href = `data:${mimeType};base64,${file.fileBase64String}`;
        link.download = file.fileName || "download";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    useEffect(() => {
        if (!file?.fileBase64String) return;
        const mimeType = getMimeType(file.fileExtension);
        const url = fileUtils.base64ToBlobUrl(file.fileBase64String, mimeType);
        setPreviewUrl(url);

        return () => {
            if (url) URL.revokeObjectURL(url); // cleanup
        };
    }, [file]);

    return (
        <CustomButtonModal
            disclosure={disc}
            {...rest}
            modalProps={{ title: "Xem tài liệu trực tiếp", size: isPreviewable(file?.fileExtension) ? "80%" : 'auto', ...rest.modalProps }}
            buttonProps={{
                actionType: "viewFile",
                ...rest.buttonProps
            }}
            actionIconProps={{
                actionType: "viewFile",
                toolTipProps: {
                    label: file ? undefined : "Không có file để hiển thị",
                },
                ...rest.actionIconProps
            }}
        >
            {loading ? (
                <Center style={{ width: "30rem", height: "30vh" }}>
                    <Loader size="lg" />
                </Center>
            ) : file && isPreviewable(file.fileExtension) ? (
                <iframe
                    src={previewUrl}
                    style={{ width: "100%", height: "80vh", border: "none" }}
                    title={file.fileName}
                />
            ) : (
                <>
                    <Text>
                        Không thể xem trước loại tệp này. Bạn có thể tải về để xem.
                    </Text>
                    <Button mt="md" onClick={downloadFile} leftSection={<IconDownload />}>
                        Tải xuống
                    </Button>
                </>
            )}
        </CustomButtonModal>
    );
}
