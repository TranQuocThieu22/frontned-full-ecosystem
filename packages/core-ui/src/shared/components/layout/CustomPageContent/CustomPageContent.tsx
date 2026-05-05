"use client";
import { aqService } from "@aq-fe/core-ui/shared/APIs/aqService";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomButtonRouterBack } from "@aq-fe/core-ui/shared/components/button/CustomButtonRouterBack";
import { CustomButtonViewFile } from "@aq-fe/core-ui/shared/components/button/CustomButtonViewFile";
import { getMenuStatusBadge } from "@aq-fe/core-ui/shared/components/extension/CustomAppSpotlight";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { AQFileDetail } from "@aq-fe/core-ui/shared/interfaces/AQFileDetail";
import { Breadcrumbs, Center, Container, Divider, Flex, Group, Stack, Text, Title, Tooltip } from "@mantine/core";
import { useClipboard, useDisclosure } from "@mantine/hooks";
import { notifications } from '@mantine/notifications';
import { IconBrandParsinta } from "@tabler/icons-react";
import { ReactNode, useEffect, useState } from "react";
import { useBasicAppShellStore } from "../CustomBasicAppShell/useBasicAppShellStore";
import { getFinalLinkVieo } from "./utils";


interface IPageContent {
    title?: string;
    canBack?: boolean;
    rightTopBar?: ReactNode;
    children?: ReactNode;
    leftTopBar?: ReactNode;
    status?: "Prototype" | "Menu" | "Beta";
}

// Component riêng cho tiêu đề có trạng thái
function PageTitle({ title, status, note }: { title: string; status?: string, note?: string }) {
    return (
        <Group>
            <CustomFlexColumn gap={0}>
                <Group align="center">
                    <Title order={3}>{title}</Title>
                    {status &&
                        getMenuStatusBadge(status)
                    }

                </Group>
                <Text size="lg" c="dimmed" fs={"italic"}>{note}</Text>
            </CustomFlexColumn>
        </Group>
    );
};

export function CustomPageContent({
    leftTopBar,
    title,
    rightTopBar,
    children,

}: IPageContent) {
    const basicAppShellStore = useBasicAppShellStore();
    const clipboard = useClipboard({ timeout: 500 });
    const fileGuildDetailState = useState<AQFileDetail>()
    const query = useCustomReactQuery({
        queryKey: ["MyButtonViewPDF", basicAppShellStore.state.fileGuildePath],
        axiosFn: async () => {
            return aqService.getFile({ filePath: basicAppShellStore.state.fileGuildePath })
        },
        options: {
            enabled: basicAppShellStore.state.fileGuildePath != undefined
        }
    });
    const videoDisc = useDisclosure()
    const finalTitle = title || basicAppShellStore.state.title;
    useEffect(() => {
        fileGuildDetailState[1](undefined)
        if (!query.data) return
        fileGuildDetailState[1](query.data)
    }, [query.data])
    return (
        <Container p={0} fluid>
            <Group justify="space-between">
                <Group>
                    <CustomButtonRouterBack />
                    <Stack gap={2}>
                        <Flex align={'center'} gap={'10'}>
                            <PageTitle
                                title={finalTitle}
                                status={basicAppShellStore.state.status}
                                note={basicAppShellStore.state.note}
                            />


                            <Tooltip label="Xem video hướng dẫn">
                                <CustomButtonModal
                                    isActionIcon={true}
                                    disclosure={videoDisc}
                                    modalProps={{
                                        title: "Video hướng dẫn",
                                        size: "80%"
                                    }}
                                    actionIconProps={{
                                        children: <IconBrandParsinta />,
                                        disabled: basicAppShellStore.state.videoLink == undefined || basicAppShellStore.state.videoLink == "",
                                        color: "red",
                                        toolTipProps: {
                                            label: "Xem video hướng dẫn"
                                        }
                                    }}
                                >
                                    <Center h={'67vh'} p={'md'}>
                                        {getFinalLinkVieo(basicAppShellStore.state.videoLink || "") == "" ? "Đường dẫn video không hợp lệ" : (
                                            <iframe
                                                width="90%"
                                                height="100%"
                                                src={getFinalLinkVieo(basicAppShellStore.state.videoLink || "")}
                                                title="YouTube video player"
                                                style={{ border: 0 }}
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                        )}

                                    </Center>
                                </CustomButtonModal>
                            </Tooltip>
                            <CustomButtonViewFile
                                isActionIcon={true}
                                actionIconProps={{
                                    disabled: fileGuildDetailState[0] == undefined,
                                    loading: query.isLoading,
                                    toolTipProps: {
                                        label: fileGuildDetailState[0] ? "Xem tài liệu hướng dẫn" : "Không có file để hiển thị"
                                    }
                                }}
                                modalProps={{
                                    title: "Tài liệu hướng dẫn",

                                }}
                                file={fileGuildDetailState[0] || { fileBase64String: "", fileExtension: "", fileName: "" }}
                            />
                        </Flex>
                        <Text>{basicAppShellStore.state.description}</Text>

                    </Stack>
                    {leftTopBar}
                </Group>
                <Group p={'md'}>
                    {rightTopBar}
                    <Breadcrumbs style={{ cursor: "pointer" }} separatorMargin="7" onClick={() => {
                        clipboard.copy(basicAppShellStore.state.breadcrumb?.join(" / "))
                        notifications.show({
                            message: 'Sao chép đường dẫn menu thành công',
                        })
                    }}>
                        {basicAppShellStore.state.breadcrumb?.map((item, idx) => (
                            <Text fw={'600'} c={'blue'} key={idx} >{item}</Text>
                        ))}
                    </Breadcrumbs>
                </Group>
            </Group>
            <Divider my={"xs"} />
            {children}
            <Divider my={"xs"} />
        </Container>
    );
}
