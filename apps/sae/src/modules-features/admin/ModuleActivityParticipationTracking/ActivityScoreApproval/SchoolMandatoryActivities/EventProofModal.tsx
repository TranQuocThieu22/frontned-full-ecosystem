import { service_event } from "@/api/services/service_event";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { ActionIcon, Image, Modal, Text } from "@mantine/core";
import { IconEye } from "@tabler/icons-react";
import { useEffect, useState } from "react";

interface EventProofModalProps {
  filePath: string;
}

export default function EventProofModal({ filePath }: EventProofModalProps) {
  const [imageOpened, setImageOpened] = useState(false);
  const [pdfOpened, setPdfOpened] = useState(false);
  const [isFileRequested, setIsFileRequested] = useState(false);

  const { data, isLoading, refetch } = useCustomReactQuery({
    queryKey: ["getEventFile"],
    axiosFn: () => service_event.getFile({ filePath })
  });

  useEffect(() => {
    if (isFileRequested) {
      refetch();
    }
  }, [isFileRequested, refetch]);

  const handleViewClick = () => {
    setIsFileRequested(true);

    const extension = filePath.split('.').pop()?.toLowerCase();
    if (extension?.match(/(jpg|jpeg|png|gif)/i)) {
      setImageOpened(true);
    } else if (extension?.match(/(pdf)/i)) {
      setPdfOpened(true);
    }
  };

  return (
    <>
      <ActionIcon
        color="blue"
        size="md"
        onClick={handleViewClick}
      >
        <IconEye size={18} />
      </ActionIcon>

      <Modal
        opened={imageOpened}
        onClose={() => setImageOpened(false)}
        title="Minh chứng"
        centered
        styles={{
          body: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          },
          content: {
            width: "auto",
            maxWidth: "80vw",
            maxHeight: "90vh",
            overflowY: "auto",
          },
        }}
      >
        {isLoading ? (
          <Text>Đang tải...</Text>
        ) : (
          <Image
            src={`data:image/${data?.fileExtension};base64,${data?.fileBase64String}`}
            alt="Minh chứng"
            style={{
              maxWidth: "100%",
              maxHeight: "90vh",
              objectFit: "contain",
            }}
          />
        )}
      </Modal>

      <Modal
        opened={pdfOpened}
        onClose={() => setPdfOpened(false)}
        title="Minh chứng"
        size="90%"
        centered
        styles={{
          body: { overflow: "hidden" },
          content: { maxHeight: "none" },
        }}
      >
        {isLoading ? (
          <Text>Đang tải...</Text>
        ) : (
          <iframe
            src={`data:application/pdf;base64,${data?.fileBase64String}`}
            width="100%"
            height="600px"
          />
        )}
      </Modal>
    </>
  );
}
