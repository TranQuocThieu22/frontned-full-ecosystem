import React, { useState } from 'react';
import { TextInput, Badge, Group, ActionIcon, Stack, Text, Tooltip } from '@mantine/core';
import { IconSearch, IconX, IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { useDBToolStore } from '../stores/dbToolStore';
import styles from '../styles/TableSearch.module.css';
import { TableNodeData } from './ERDCanvas';

const TableSearch: React.FC = () => {
    const {
        nodes,
        searchedTableIds,
        addSearchedTable,
        removeSearchedTable,
        clearSearchedTables
    } = useDBToolStore();

    const [searchQuery, setSearchQuery] = useState('');
    const [isMinimized, setIsMinimized] = useState(false);

    const handleSearch = (query: string) => {
        setSearchQuery(query);

        if (!query.trim()) {
            return;
        }

        // Find tables matching the search query
        const matchingTables = nodes.filter((node) =>
            (node.data as TableNodeData).table.name.toLowerCase().includes(query.toLowerCase())
        );

        // Add all matching tables to search results
        matchingTables.forEach((node) => {
            if (!searchedTableIds.has(node.id)) {
                addSearchedTable(node.id);
            }
        });
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch(searchQuery);
        }
    };

    const getTableName = (tableId: string) => {
        const node = nodes.find((n) => n.id === tableId);
        return node ? (node.data as TableNodeData).table.name : tableId;
    };

    return (
        <div className={styles.searchPanel}>
            <Group justify="space-between" mb={8} gap={4}>
                <Text size="sm" fw={600}>Table Search</Text>
                <Tooltip label={isMinimized ? 'Expand' : 'Minimize'}>
                    <ActionIcon
                        size="sm"
                        variant="subtle"
                        onClick={() => setIsMinimized(!isMinimized)}
                    >
                        {isMinimized ? <IconChevronDown size={16} /> : <IconChevronUp size={16} />}
                    </ActionIcon>
                </Tooltip>
            </Group>

            {!isMinimized && (
                <>
                    <TextInput
                        placeholder="Search tables..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={handleKeyPress}
                        leftSection={<IconSearch size={16} />}
                        rightSection={
                            searchQuery && (
                                <ActionIcon
                                    size="sm"
                                    variant="transparent"
                                    onClick={() => setSearchQuery('')}
                                >
                                    <IconX size={14} />
                                </ActionIcon>
                            )
                        }
                        styles={{
                            input: {
                                fontSize: 13,
                            }
                        }}
                    />

                    <Text mt={5} size='xs' c={'dimmed'}>Press 'enter' to search</Text>
                </>
            )}

            {!isMinimized && searchedTableIds.size > 0 && (
                <Stack gap={4} mt={5}>
                    <Group justify="space-between" align="center">
                        <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--mantine-color-gray-7)' }}>
                            Found ({searchedTableIds.size})
                        </span>
                        <ActionIcon
                            size="xs"
                            variant="subtle"
                            color="gray"
                            onClick={clearSearchedTables}
                        >
                            <IconX size={12} />
                        </ActionIcon>
                    </Group>
                    <div className={styles.searchResults}>
                        {Array.from(searchedTableIds).map((tableId) => (
                            <Badge
                                key={tableId}
                                variant="light"
                                color="blue"
                                rightSection={
                                    <ActionIcon
                                        size="xs"
                                        variant="transparent"
                                        onClick={() => removeSearchedTable(tableId)}
                                    >
                                        <IconX size={10} />
                                    </ActionIcon>
                                }
                                styles={{
                                    root: {
                                        paddingRight: 4,
                                        cursor: 'default',
                                    }
                                }}
                            >
                                {getTableName(tableId)}
                            </Badge>
                        ))}
                    </div>
                </Stack>
            )}

            {isMinimized && searchedTableIds.size > 0 && (
                <Text size="xs" c="dimmed" mt={4}>
                    {searchedTableIds.size} table{searchedTableIds.size !== 1 ? 's' : ''} found
                </Text>
            )}
        </div>
    );
};

export default TableSearch;
