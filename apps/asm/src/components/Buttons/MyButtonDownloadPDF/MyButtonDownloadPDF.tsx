import { U0MyDownloadPDF } from "@/utils/pdf";
import { ActionIcon, Button, ButtonProps, Tooltip } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import { MyButton } from "../Button/MyButton";

interface I extends ButtonProps {
    pdfLink: string
}

export default function MyButtonDownloadPDF({ pdfLink = "https://datafiles.chinhphu.vn/cpp/files/vbpq/2021/07/17-bgd.signed.pdf", ...rest }: I) {
    return (
        <Tooltip label="Nhấp để tải xuống" >
            <Button onClick={async () => await U0MyDownloadPDF(pdfLink)} color="orange" {...rest}>
                <IconDownload />
            </Button>
        </Tooltip>
    );
}
