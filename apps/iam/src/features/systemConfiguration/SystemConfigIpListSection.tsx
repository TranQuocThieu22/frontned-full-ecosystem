"use client"

import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton"
import { CustomTabs } from "@aq-fe/core-ui/shared/components/navigation/CustomTabs/CustomTabs"
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput"
import { CloseButton, Group, Stack, Table, Text } from "@mantine/core"
import { useMemo, useState } from "react"

interface SystemConfigIpListSectionProps {
    allowlist: string
    blocklist: string
    onChangeAllowlist: (value: string) => void
    onChangeBlocklist: (value: string) => void
}

function parseList(value: string) {
    return value
        .split(/\r?\n/)
        .map((v) => v.trim())
        .filter(Boolean)
}

export default function SystemConfigIpListSection({
    allowlist,
    blocklist,
    onChangeAllowlist,
    onChangeBlocklist,
}: SystemConfigIpListSectionProps) {
    const allowlistItems = useMemo(() => parseList(allowlist), [allowlist])
    const blocklistItems = useMemo(() => parseList(blocklist), [blocklist])

    const [allowInput, setAllowInput] = useState("")
    const [blockInput, setBlockInput] = useState("")
    const [allowSearch, setAllowSearch] = useState("")
    const [blockSearch, setBlockSearch] = useState("")

    const filteredAllowlist = allowlistItems.filter((ip) =>
        ip.toLowerCase().includes(allowSearch.toLowerCase().trim()),
    )
    const filteredBlocklist = blocklistItems.filter((ip) =>
        ip.toLowerCase().includes(blockSearch.toLowerCase().trim()),
    )

    const syncAllowlist = (items: string[]) => {
        onChangeAllowlist(items.join("\n"))
    }

    const syncBlocklist = (items: string[]) => {
        onChangeBlocklist(items.join("\n"))
    }

    const handleAddAllow = () => {
        const value = allowInput.trim()
        if (!value) return
        if (allowlistItems.includes(value)) {
            setAllowInput("")
            return
        }
        syncAllowlist([...allowlistItems, value])
        setAllowInput("")
    }

    const handleAddBlock = () => {
        const value = blockInput.trim()
        if (!value) return
        if (blocklistItems.includes(value)) {
            setBlockInput("")
            return
        }
        syncBlocklist([...blocklistItems, value])
        setBlockInput("")
    }

    return (
        <CustomTabs
            tabs={[
                {
                    label: "IP Allowlist",
                    children: (
                        <Stack gap={4}>
                            <Group align="flex-end" gap="xs">
                                <CustomTextInput
                                    label="Thêm IP vào Allowlist"
                                    placeholder="VD: 192.168.1.0/24"
                                    style={{ flex: 1 }}
                                    value={allowInput}
                                    onChange={(e) => setAllowInput(e.currentTarget.value)}
                                />
                                <CustomButton
                                    style={{ whiteSpace: "nowrap" }}
                                    onClick={handleAddAllow}
                                >
                                    Thêm
                                </CustomButton>
                            </Group>
                            <CustomTextInput
                                label="Tìm kiếm IP trong Allowlist"
                                placeholder="Nhập IP/CIDR để lọc"
                                value={allowSearch}
                                onChange={(e) => setAllowSearch(e.currentTarget.value)}
                            />
                            <Table withTableBorder withColumnBorders>
                                <Table.Thead>
                                    <Table.Tr>
                                        <Table.Th>IP/CIDR</Table.Th>
                                        <Table.Th style={{ width: 80 }}>Xóa</Table.Th>
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>
                                    {filteredAllowlist.map((ip) => (
                                        <Table.Tr key={ip}>
                                            <Table.Td>{ip}</Table.Td>
                                            <Table.Td>
                                                <CloseButton
                                                    size="sm"
                                                    aria-label="Xóa IP"
                                                    onClick={() =>
                                                        syncAllowlist(
                                                            allowlistItems.filter(
                                                                (x) => x !== ip,
                                                            ),
                                                        )
                                                    }
                                                />
                                            </Table.Td>
                                        </Table.Tr>
                                    ))}
                                    {filteredAllowlist.length === 0 && (
                                        <Table.Tr>
                                            <Table.Td colSpan={2}>
                                                <Text size="xs" c="dimmed">
                                                    Chưa có IP nào trong Allowlist.
                                                </Text>
                                            </Table.Td>
                                        </Table.Tr>
                                    )}
                                </Table.Tbody>
                            </Table>
                        </Stack>
                    ),
                },
                {
                    label: "IP Blocklist",
                    children: (
                        <Stack gap={4}>
                            <Group align="flex-end" gap="xs">
                                <CustomTextInput
                                    label="Thêm IP vào Blocklist"
                                    placeholder="VD: 203.0.113.0/24"
                                    style={{ flex: 1 }}
                                    value={blockInput}
                                    onChange={(e) => setBlockInput(e.currentTarget.value)}
                                />
                                <CustomButton
                                    style={{ whiteSpace: "nowrap" }}
                                    color="red"
                                    onClick={handleAddBlock}
                                >
                                    Thêm
                                </CustomButton>
                            </Group>
                            <CustomTextInput
                                label="Tìm kiếm IP trong Blocklist"
                                placeholder="Nhập IP/CIDR để lọc"
                                value={blockSearch}
                                onChange={(e) => setBlockSearch(e.currentTarget.value)}
                            />
                            <Table withTableBorder withColumnBorders>
                                <Table.Thead>
                                    <Table.Tr>
                                        <Table.Th>IP/CIDR</Table.Th>
                                        <Table.Th style={{ width: 80 }}>Xóa</Table.Th>
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>
                                    {filteredBlocklist.map((ip) => (
                                        <Table.Tr key={ip}>
                                            <Table.Td>{ip}</Table.Td>
                                            <Table.Td>
                                                <CloseButton
                                                    size="sm"
                                                    aria-label="Xóa IP"
                                                    color="red"
                                                    onClick={() =>
                                                        syncBlocklist(
                                                            blocklistItems.filter(
                                                                (x) => x !== ip,
                                                            ),
                                                        )
                                                    }
                                                />
                                            </Table.Td>
                                        </Table.Tr>
                                    ))}
                                    {filteredBlocklist.length === 0 && (
                                        <Table.Tr>
                                            <Table.Td colSpan={2}>
                                                <Text size="xs" c="dimmed">
                                                    Chưa có IP nào trong Blocklist.
                                                </Text>
                                            </Table.Td>
                                        </Table.Tr>
                                    )}
                                </Table.Tbody>
                            </Table>
                        </Stack>
                    ),
                },
            ]}
        />
    )
}

