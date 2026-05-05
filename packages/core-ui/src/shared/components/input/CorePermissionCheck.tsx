import { colorsObject } from "@aq-fe/core-ui/shared/consts/object/colorsObject";
import { Center, Checkbox, Flex, MantineColor, Paper, ScrollArea, Skeleton, Stack, Table, Text } from "@mantine/core";
import { IconEye, IconFileExport, IconPencil, IconPlus, IconPrinter, IconTrash } from "@tabler/icons-react";
import React, { ReactNode } from "react";

export interface Permission {
    id?: string,
    name?: string,
    isRead?: boolean,
    isCreate?: boolean,
    isUpdate?: boolean,
    isDelete?: boolean,
    isPrint?: boolean,
    isExport?: boolean
    groupTitle?: string
}

interface IActionTypeProps {
    text?: string;
    icon?: ReactNode;
    iconColor?: MantineColor;
}

const actionType: IActionTypeProps[] = [
    { text: "Xem", icon: <IconEye />, iconColor: "gray" },
    { text: "Thêm", icon: <IconPlus />, iconColor: "blue" },
    { text: "Sửa", icon: <IconPencil />, iconColor: "yellow" },
    { text: "Xóa", icon: <IconTrash />, iconColor: "red" },
    { text: "In", icon: <IconPrinter />, iconColor: "cyan" },
    { text: "Xuất", icon: <IconFileExport />, iconColor: "green" }
];


const permissionKeys = [
    "isRead",
    "isCreate",
    "isUpdate",
    "isDelete",
    "isPrint",
    "isExport"
] as const;

type PermissionKey = typeof permissionKeys[number];


interface CorePermissionCheckProps {
    isLoading?: boolean
    value?: Permission[];
    onChange?: (value: Permission[]) => void;
}

export default function CorePermissionCheck({ value = [], onChange, isLoading }: CorePermissionCheckProps) {
    const handleCheckboxChange = (menuIndex: number, key: keyof Permission) => {
        const updated = [...value];
        const current = updated[menuIndex]?.[key];
        updated[menuIndex]![key] = !current as any;
        onChange?.(updated);
    };

    const handleCheckAllAction = (key: PermissionKey, checked: boolean) => {
        const updated = structuredClone(value);
        updated.forEach(menu => {
            menu[key] = checked;
        });
        onChange?.(updated);
    };

    const getDuplicateMenuIds = (data: Permission[] = []) => {
        const allIds = data.map(menu => menu.id).filter(Boolean);
        const countMap = new Map<string, number>();
        for (const id of allIds) {
            countMap.set(id!, (countMap.get(id!) || 0) + 1);
        }
        return new Set([...countMap.entries()].filter(([_, count]) => count > 1).map(([id]) => id));
    };

    const groupMenusByTitle = (menus: Permission[]) => {
        const map = new Map<string, Permission[]>();
        menus.forEach(menu => {
            const key = menu.groupTitle || "Chưa phân nhóm";
            if (!map.has(key)) map.set(key, []);
            map.get(key)!.push(menu);
        });
        return Array.from(map.entries());
    };

    const duplicateIds = getDuplicateMenuIds(value);
    const groupedMenus = groupMenusByTitle(value);

    return (
        <Paper>
            <ScrollArea>
                {isLoading ? (
                    <Table>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>
                                    <Skeleton height={12} width="80%" />
                                </Table.Th>
                                {Array.from({ length: permissionKeys.length }).map((_, idx) => (
                                    <Table.Th key={idx}>
                                        <Skeleton height={12} width={40} />
                                    </Table.Th>
                                ))}
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {Array.from({ length: 5 }).map((_, rowIdx) => (
                                <Table.Tr key={rowIdx}>
                                    <Table.Td>
                                        <Skeleton height={14} width="60%" />
                                    </Table.Td>
                                    {Array.from({ length: permissionKeys.length }).map((_, colIdx) => (
                                        <Table.Td key={colIdx}>
                                            <Skeleton height={16} circle />
                                        </Table.Td>
                                    ))}
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                ) : (
                    <Table.ScrollContainer minWidth={500} maxHeight={'70vh'}>
                        <Table stickyHeader>
                            <Table.Thead >
                                <Table.Tr>
                                    <Table.Th>Danh sách chức năng</Table.Th>
                                    {actionType.map((item, idx) => {
                                        const key = permissionKeys[idx];
                                        const allChecked = value.every(menu => menu[key!]);

                                        return (
                                            <Table.Th key={idx}>
                                                <Stack align="center" gap={4}>
                                                    <Checkbox
                                                        checked={allChecked}
                                                        onChange={(e) => handleCheckAllAction(key!, e.currentTarget.checked)}
                                                    />
                                                    <Flex direction="row" align="center" gap="sm">
                                                        <Text size="xs">{item.text}</Text>
                                                        {item.icon}
                                                    </Flex>
                                                </Stack>
                                            </Table.Th>
                                        );
                                    })}
                                </Table.Tr>
                            </Table.Thead>

                            <Table.Tbody>
                                {groupedMenus.map(([groupTitle, menus], gIdx) => (
                                    <React.Fragment key={gIdx}>
                                        <Table.Tr bg={colorsObject.mantineBackgroundBlueLight}>
                                            <Table.Td fw={'bold'} fs={"italic"} colSpan={7}>{groupTitle}</Table.Td>
                                        </Table.Tr>
                                        {menus.map((menu, mIdx) => {
                                            const menuIndex = value.indexOf(menu);
                                            const isDuplicate = menu.id && duplicateIds.has(menu.id);
                                            return (
                                                <Table.Tr key={mIdx} bg={isDuplicate ? "red.1" : undefined}>
                                                    <Table.Td>
                                                        <Flex direction="column">
                                                            {menu.name}
                                                            {isDuplicate && (
                                                                <Text size="xs" color="red">
                                                                    ID trùng: {menu.id}
                                                                </Text>
                                                            )}
                                                        </Flex>
                                                    </Table.Td>
                                                    {permissionKeys.map((key, pIdx) => (
                                                        <Table.Td key={pIdx}>
                                                            <Center>
                                                                <Checkbox
                                                                    checked={menu[key] ?? false}
                                                                    onChange={() => handleCheckboxChange(menuIndex, key)}
                                                                />
                                                            </Center>
                                                        </Table.Td>
                                                    ))}
                                                </Table.Tr>
                                            );
                                        })}
                                    </React.Fragment>
                                ))}
                            </Table.Tbody>
                        </Table>
                    </Table.ScrollContainer>
                )}
            </ScrollArea>
        </Paper>
    );
}

