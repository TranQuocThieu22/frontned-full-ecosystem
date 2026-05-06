"use client";

import {
    Badge,
    Group,
    Text,
    TextInput
} from "@mantine/core";
import { Spotlight, spotlight } from "@mantine/spotlight";
import { IconSearch } from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation.js";
import { useMemo, useState } from "react";
import { I_BasicAppShell_LinkItem } from "@aq-fe/aq-legacy-framework/shared/components/layout/CustomBasicAppShell/types";

export function CustomAppSpotlight({ menu }: { menu: I_BasicAppShell_LinkItem[] }) {
    const router = useRouter();
    const pathName = usePathname();
    const [query, setQuery] = useState("");

    // 🔍 Lấy toàn bộ menu con có chứa link
    const allChildItems = useMemo(() => {
        const result: I_BasicAppShell_LinkItem[] = [];

        const extractChildren = (items: I_BasicAppShell_LinkItem[]) => {
            items.forEach((item) => {
                if (item.link) {
                    result.push(item);
                }
                if (item.links) {
                    extractChildren(item.links);
                }
            });
        };

        extractChildren(menu);
        return result;
    }, [menu]);

    const filteredItems = allChildItems.filter((item) => {
        if (item.parentPageId) return false;
        
        const lowerQuery = query.toLowerCase().trim();
        return (
            item.label.toLowerCase().includes(lowerQuery) ||
            item.note?.toLowerCase().includes(lowerQuery) ||
            item.link?.toLowerCase().includes(lowerQuery)
        );
    });

    return (
        <>
            <TextInput
                mt={"md"}
                placeholder="Tìm menu (Ctrl + K)"
                mx={10}
                component={"button"}
                onClick={spotlight.open}
                leftSection={<IconSearch />}
            >
                Tìm kiếm (Ctrl + K)
            </TextInput>

            <Spotlight.Root
                query={query}
                onQueryChange={setQuery}
            >
                <Spotlight.Search
                    placeholder="Tìm kiếm menu..."
                    leftSection={<IconSearch stroke={1.5} />}
                />
                <Spotlight.ActionsList mah={'70vh'}>
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item, idx) => (
                            <Spotlight.Action
                                key={idx}
                                onClick={() => {
                                    router.push(
                                        `/${pathName.split("/")[1]}/${item.link}`
                                    );
                                    spotlight.close();
                                }}
                            >
                                <Group wrap="nowrap" w="100%">
                                    <div style={{ flex: 1 }}>
                                        <Text>{item.label}</Text>
                                        <Group gap={5}>

                                            {item.note && (
                                                <Text opacity={0.6} size="xs">
                                                    {item.note}
                                                </Text>
                                            )}
                                            <Text opacity={0.6} size="xs">
                                                ({item.link})
                                            </Text>
                                        </Group>

                                    </div>
                                    {item.status && item.status != "Default" && (
                                        getMenuStatusBadge(item.status)
                                    )}
                                </Group>
                            </Spotlight.Action>
                        ))
                    ) : (
                        <Spotlight.Empty>Không tìm thấy trang...</Spotlight.Empty>
                    )}
                </Spotlight.ActionsList>
            </Spotlight.Root>
        </>
    );
}


export function getMenuStatusBadge(status?: string) {
    switch (status) {
        case "Prototype":
            return <Badge color="pink">Prototype</Badge>;
        case "New":
            return <Badge color="blue">New</Badge>;
        case "Menu":
            return <Badge color="gray">Menu</Badge>;
        case "Change":
            return <Badge color="green">Change</Badge>;
        default:
            return null;
    }
}