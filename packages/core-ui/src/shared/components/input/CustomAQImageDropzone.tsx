import { useEffect, useMemo } from "react";
import { aqService } from "../../APIs/aqService";
import { useCustomReactQuery } from "../../hooks/useCustomReactQuery";
import { AQFileDetail } from "../../interfaces/AQFileDetail";
import { SafeOmitType } from "../../types/safeOmitType";
import { fileUtils } from "../../utils/fileUtils";
import CustomImageDropzone, { CustomImageDropzoneProps } from "./CustomImageDropzone";

interface CustomAQImageDropzoneProps extends SafeOmitType<CustomImageDropzoneProps,
    "value" | "onChange" | "defaultValue"> {
    filePath?: string
    value?: AQFileDetail,
    defaultValue?: AQFileDetail
    onChange?: (value?: AQFileDetail) => void
}

export default function CustomAQImageDropzone({
    value,
    defaultValue,
    onChange,
    filePath,
    ...rest
}: CustomAQImageDropzoneProps) {
    const query = useCustomReactQuery({
        queryKey: ["getFile", filePath],
        axiosFn: async () => {
            return aqService.getFile({ filePath })
        },
        options: {
            enabled: filePath != undefined
        }
    });
    const fileDefault = useMemo(() => {
        if (!query.data) return
        if (filePath == undefined) {
            return null
        }
        const fileConvert = fileUtils.AQDocumentTypeToFile(query.data)
        // onChange?.(query.data)
        return fileConvert
    }, [defaultValue, query.data]);
    useEffect(() => {
        if (query.data) {
            onChange?.({ fileName: query.data.fileName });
        }
    }, [query.data]);
    const handleFileChange = async (file: File | null) => {
        if (!file) {
            onChange?.(undefined);
            return;
        }
        const aqDoc = await fileUtils.fileToAQDocumentType(file);
        onChange?.(aqDoc);
    };
    return (
        <CustomImageDropzone
            loading={query.isLoading}
            key={query.data?.fileName}
            defaultValue={fileDefault}
            onChange={handleFileChange}
            {...rest}
        />
    )

}
