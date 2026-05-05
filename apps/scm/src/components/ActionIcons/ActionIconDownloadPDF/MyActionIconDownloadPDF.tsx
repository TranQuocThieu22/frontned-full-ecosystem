import { U0MyDownloadPDF } from "@/utils/pdf";
import { ActionIcon, Tooltip } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";

export default function MyActionIconDownloadPDF({ pdfLink = "https://datafiles.chinhphu.vn/cpp/files/vbpq/2021/07/17-bgd.signed.pdf" }: { pdfLink: string }) {
    return (
        <Tooltip label="Nhấp để tải xuống">
            <ActionIcon onClick={async () => await U0MyDownloadPDF(pdfLink)} color="red">
                <IconDownload />
            </ActionIcon>
        </Tooltip>
    );
}
