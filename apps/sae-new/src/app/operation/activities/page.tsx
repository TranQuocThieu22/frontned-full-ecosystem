"use client"
import { ActivitiesLeftPanel } from "@/features/operation/activities/ActivitiesLeftPanel";
import ActivitiesRightPanel from "@/features/operation/activities/ActivitiesRightPanel";
import { ActionIcon, Box, Divider, Drawer, Flex, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconChevronRight } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export default function Page() {
    const [selectedId, setSelectedId] = useState<string>("");
    const isMobile = useMediaQuery("(max-width: 768px)");
    const [leftOpened, setLeftOpened] = useState(true);

    useEffect(() => {
        if (isMobile) {
            setLeftOpened(false);
        } else {
            setLeftOpened(true);
        }
    }, [isMobile]);

    return (
        <Flex direction="row" style={{ height: "calc(100vh - 120px)", overflow: "hidden" }}>
            <Box
                style={{
                    width: leftOpened ? (isMobile ? "100%" : 380) : 0,
                    minWidth: leftOpened ? (isMobile ? "100%" : 300) : 0,
                    transition: "width 0.25s ease, min-width 0.25s ease",
                    overflow: "hidden",
                }}
                p={{ base: leftOpened ? "xs" : 0, md: leftOpened ? "md" : 0 }}
            >
                <ActivitiesLeftPanel
                    selectedId={selectedId}
                    onSelectRowAction={(id) => {
                        setSelectedId(id);
                        if (isMobile) setLeftOpened(false);
                    }}
                />
            </Box>
            
            {!isMobile && leftOpened && <Divider orientation="vertical" />}

            <Box
                style={{
                    flex: 1,
                    display: isMobile && leftOpened ? "none" : "flex",
                    flexDirection: "column",
                    overflow: "auto",
                    height: "100%",
                }}
                p={{ base: "xs", md: "md" }}
            >
                {selectedId ? (
                    <ActivitiesRightPanel
                        selectedId={selectedId}
                        onToggleLeft={() => setLeftOpened((o) => !o)}
                        leftOpen={leftOpened}
                    />
                ) : (
                    <Box
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100%",
                            color: "var(--mantine-color-dimmed)",
                            gap: "md"
                        }}
                    >
                        <Text>Chọn một hoạt động để xem chi tiết</Text>
                        {!leftOpened && (
                            <ActionIcon variant="light" size="lg" onClick={() => setLeftOpened(true)}>
                                <IconChevronRight size={20} />
                            </ActionIcon>
                        )}
                    </Box>
                )}
            </Box>
        </Flex>
    )
}