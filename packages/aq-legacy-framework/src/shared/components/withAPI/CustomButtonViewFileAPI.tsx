"use client"
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { AQFileDetail } from "@aq-fe/aq-legacy-framework/shared/interfaces/AQFileDetail";
import { CustomApiResponse } from "@aq-fe/aq-legacy-framework/shared/libs/core/createBaseApi";
import { useDisclosure, UseDisclosureReturnValue } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { CustomButtonViewFile, CustomButtonViewFileProps } from "../button/CustomButtonViewFile";

interface CustomButtonViewFileAPIProps extends CustomButtonViewFileProps {
    filePath?: string
    externalDisc?: UseDisclosureReturnValue
}

export function CustomButtonViewFileAPI({ filePath, externalDisc, ...rest }: CustomButtonViewFileAPIProps) {
    const internalDisc = useDisclosure(); // always called
    const disc = externalDisc ?? internalDisc; // choose which one to use
    const query = useQuery({
        queryKey: ["viewFile", filePath],
        queryFn: async () => {
            const res = await axiosInstance.get<CustomApiResponse<AQFileDetail>>("/AQ/GetFile?filePath=" + filePath);
            return res.data.data;
        },
        enabled: filePath != undefined && disc[0]
    });
    return (
        <CustomButtonViewFile
            file={query.data}
            loading={query.isLoading}
            disclosure={disc}
            {...rest}
            buttonProps={{ disabled: filePath == undefined, ...rest.buttonProps }}
            actionIconProps={{
                toolTipProps: {
                    label: filePath ? undefined : "Không có đường dẫn file",
                    ...rest.actionIconProps?.toolTipProps
                }
            }}
        />
    )
}
