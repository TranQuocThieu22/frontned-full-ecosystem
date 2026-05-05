"use client"
import baseAxios from "@/shared/config/baseAxios";
import { MyApiResponse } from "@/shared/lib/createBaseApi";
import { IAQFileDetail } from "@/utils";
import { useDisclosure, UseDisclosureReturnValue } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { MyButtonViewFile, MyButtonViewFileProps } from "../button/MyButtonViewFile";

interface MyButtonViewFileAPIProps extends MyButtonViewFileProps {
    filePath?: string
    externalDisc?: UseDisclosureReturnValue
}

export function MyButtonViewFileAPI({ filePath, externalDisc, ...rest }: MyButtonViewFileAPIProps) {
    const internalDisc = useDisclosure(); // always called
    const disc = externalDisc ?? internalDisc; // choose which one to use
    const query = useQuery({
        queryKey: ["viewFile", filePath],
        queryFn: async () => {
            const res = await baseAxios.get<MyApiResponse<IAQFileDetail>>("/AQ/GetFile?filePath=" + filePath);
            return res.data.data;
        },
        enabled: filePath != undefined && disc[0]
    });
    return (
        <MyButtonViewFile
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
