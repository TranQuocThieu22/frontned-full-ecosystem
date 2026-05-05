import { FileInput, FileInputProps } from "@mantine/core";
import { AQFileDetail } from "../../interfaces/AQFileDetail";
import { SafeOmitType } from "../../types/safeOmitType";
import { fileUtils } from "../../utils/fileUtils";

interface CustomAQFileInputProps extends SafeOmitType<FileInputProps, "value" | "defaultValue" | "onChange"> {
    label?: string
    attachmentPath?: string
    onChange?: (value?: AQFileDetail) => void
}

export default function CustomAQFileInput({
    label,
    attachmentPath,
    onChange,
    ...rest
}: CustomAQFileInputProps) {
    return (
        <FileInput
            label={label}
            placeholder={label ? `Chọn ${label?.toLowerCase()}` : ""}
            value={attachmentPath ? new File([], attachmentPath) : null}
            onChange={async (file) => {
                if (!file) {
                    onChange?.(undefined)
                    return
                };
                onChange?.(await fileUtils.fileToAQDocumentType(file))
            }}
            {...rest}
        />
    )
}
