'use client';

import React, { useCallback, useState, useRef, useEffect } from 'react';
import { MantineProvider, AppShell, Switch, ActionIcon, Badge, Tooltip, Select, Menu, ColorSwatch, Group } from '@mantine/core';
import { IconDatabase, IconMoon, IconSun, IconBolt, IconRefresh } from '@tabler/icons-react';
import { ReactFlowProvider } from '@xyflow/react';
import { useDBToolStore } from '../stores/dbToolStore';
import { loadSchemaManifest, getSchemaFiles, getSchemaById, clearSchemaCache } from '../services/schemaService';
import ERDCanvas from '../components/ERDCanvas';
import SchemaEditor from '../components/SchemaEditor';
import { exportToPNG, exportToJSON } from '../utils/exportUtils';
import styles from '../styles/DBTool.module.css';

const EDGE_COLORS = [
    { value: '#3b82f6', label: 'Blue' },
    { value: '#8b5cf6', label: 'Purple' },
    { value: '#ec4899', label: 'Pink' },
    { value: '#f59e0b', label: 'Amber' },
    { value: '#10b981', label: 'Green' },
    { value: '#ef4444', label: 'Red' },
    { value: '#06b6d4', label: 'Cyan' },
    { value: '#f97316', label: 'Orange' },
    { value: '#84cc16', label: 'Lime' },
    { value: '#6366f1', label: 'Indigo' },
    { value: '#ffffff', label: 'Hidden (Light)' },
    { value: '#2b2d31', label: 'Hidden (Dark)' },
];

const DBToolContent: React.FC = () => {
    const [schemaFiles, setSchemaFiles] = useState<Array<{ value: string; label: string }>>([]);
    const {
        syncMode,
        setSyncMode,
        isDarkMode,
        setDarkMode,
        schema,
        selectedSchemaFile,
        setSelectedSchemaFile,
        setSchema,
        pushHistory,
        edgeColor,
        setEdgeColor,
        edgeHoverColor,
        setEdgeHoverColor,
    } = useDBToolStore();

    const [editorWidth, setEditorWidth] = useState(450);
    const [isResizing, setIsResizing] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseDown = useCallback(() => {
        setIsResizing(true);
    }, []);

    const handleMouseUp = useCallback(() => {
        setIsResizing(false);
    }, []);

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (!isResizing || !containerRef.current) return;

            const containerRect = containerRef.current.getBoundingClientRect();
            const newWidth = containerRect.right - e.clientX;

            // Min width: 300px, Max width: 70% of container
            const minWidth = 300;
            const maxWidth = containerRect.width * 0.7;

            if (newWidth >= minWidth && newWidth <= maxWidth) {
                setEditorWidth(newWidth);
            }
        },
        [isResizing]
    );

    // Load schema manifest and initial schema on mount
    useEffect(() => {
        const loadInitialData = async () => {
            console.log('[DBTool] Loading initial data...');
            // Load manifest first
            const manifest = await loadSchemaManifest();
            console.log('[DBTool] Manifest loaded:', manifest);

            setSchemaFiles(manifest.map(file => ({
                value: file.id,
                label: file.name,
            })));

            // Then load initial schema
            if (manifest.length > 0) {
                const firstSchemaId = selectedSchemaFile || manifest[0]?.id;
                console.log('[DBTool] Loading schema:', firstSchemaId);
                if (firstSchemaId) {
                    const initialSchema = await getSchemaById(firstSchemaId);
                    console.log('[DBTool] Schema loaded:', initialSchema ? 'success' : 'failed');
                    if (initialSchema) {
                        setSchema(initialSchema);
                        if (!selectedSchemaFile) {
                            setSelectedSchemaFile(firstSchemaId);
                        }
                    }
                }
            }
        };
        loadInitialData();
    }, []); // Only run once on mount

    React.useEffect(() => {
        if (isResizing) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [isResizing, handleMouseMove, handleMouseUp]);

    const handleExportPNG = useCallback(() => {
        exportToPNG('erd-canvas', 'erd-diagram.png').catch((error) => {
            console.error('Failed to export PNG:', error);
        });
    }, []);

    const handleExportJSON = useCallback(() => {
        exportToJSON(schema, 'database-schema.json');
    }, [schema]);

    const handleSchemaFileChange = useCallback(async (value: string | null) => {
        console.log('[DBTool] Schema file changed to:', value);
        if (value) {
            const newSchema = await getSchemaById(value);
            console.log('[DBTool] New schema loaded:', newSchema ? 'success' : 'failed');
            if (newSchema) {
                setSelectedSchemaFile(value);
                setSchema(newSchema);
                pushHistory();
            }
        }
    }, [setSelectedSchemaFile, setSchema, pushHistory]);

    const handleRefreshSchemaList = useCallback(async () => {
        console.log('[DBTool] Refreshing schema list...');
        clearSchemaCache();
        const manifest = await loadSchemaManifest();
        console.log('[DBTool] Refreshed manifest:', manifest);
        setSchemaFiles(manifest.map(file => ({
            value: file.id,
            label: file.name,
        })));
    }, []);

    // Debug log
    console.log('[DBTool] Render - schemaFiles:', schemaFiles, 'selectedSchemaFile:', selectedSchemaFile);

    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <div className={styles.title}>
                    <IconDatabase size={28} stroke={1.5} />
                    <div>
                        <span className={styles.titleText}>DBTool - ERD Builder</span>
                        <span className={styles.subtitle}>Database Schema Designer</span>
                    </div>
                </div>

                <div className={styles.headerActions}>
                    {/* Schema File Selector */}
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <Select
                            value={selectedSchemaFile}
                            onChange={handleSchemaFileChange}
                            data={schemaFiles}
                            placeholder="Select schema file"
                            styles={{
                                input: {
                                    minWidth: 200,
                                }
                            }}
                        />
                        <Tooltip label="Refresh schema list">
                            <ActionIcon
                                variant="light"
                                onClick={handleRefreshSchemaList}
                                size="lg"
                            >
                                <IconRefresh size={18} />
                            </ActionIcon>
                        </Tooltip>
                    </div>

                    {/* Edge Color Selector */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
                        <label style={{ fontSize: 11, fontWeight: 500, color: 'var(--mantine-color-gray-7)', margin: 0 }}>
                            Line
                        </label>
                        <Menu shadow="sm" position="bottom" offset={5}>
                            <Menu.Target>
                                <ColorSwatch
                                    color={edgeColor}
                                    size={28}
                                    style={{
                                        cursor: 'pointer',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                        transition: 'transform 0.15s ease, box-shadow 0.15s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'scale(1.1)';
                                        e.currentTarget.style.boxShadow = '0 3px 8px rgba(0,0,0,0.2)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'scale(1)';
                                        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                                    }}
                                />
                            </Menu.Target>
                            <Menu.Dropdown style={{ padding: 8 }}>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6 }}>
                                    {EDGE_COLORS.map((color) => (
                                        <Tooltip key={color.value} label={color.label} position="top" withArrow>
                                            <ColorSwatch
                                                color={color.value}
                                                size={28}
                                                style={{
                                                    cursor: 'pointer',
                                                    border: edgeColor === color.value ? '2px solid #fff' : '1px solid rgba(0,0,0,0.1)',
                                                    boxShadow: edgeColor === color.value ? '0 0 0 3px #4b5563, 0 0 8px rgba(75, 85, 99, 0.4)' : 'none',
                                                    transition: 'all 0.15s ease',
                                                }}
                                                onClick={() => setEdgeColor(color.value)}
                                                onMouseEnter={(e) => {
                                                    if (edgeColor !== color.value) {
                                                        e.currentTarget.style.transform = 'scale(1.15)';
                                                    }
                                                }}
                                                onMouseLeave={(e) => {
                                                    if (edgeColor !== color.value) {
                                                        e.currentTarget.style.transform = 'scale(1)';
                                                    }
                                                }}
                                            />
                                        </Tooltip>
                                    ))}
                                </div>
                            </Menu.Dropdown>
                        </Menu>
                    </div>

                    {/* Edge Hover Color Selector */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
                        <label style={{ fontSize: 11, fontWeight: 500, color: 'var(--mantine-color-gray-7)', margin: 0 }}>
                            Hover
                        </label>
                        <Menu shadow="sm" position="bottom" offset={5}>
                            <Menu.Target>
                                <ColorSwatch
                                    color={edgeHoverColor}
                                    size={28}
                                    style={{
                                        cursor: 'pointer',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                        transition: 'transform 0.15s ease, box-shadow 0.15s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'scale(1.1)';
                                        e.currentTarget.style.boxShadow = '0 3px 8px rgba(0,0,0,0.2)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'scale(1)';
                                        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                                    }}
                                />
                            </Menu.Target>
                            <Menu.Dropdown style={{ padding: 8 }}>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6 }}>
                                    {EDGE_COLORS.map((color) => (
                                        <Tooltip key={color.value} label={color.label} position="top" withArrow>
                                            <ColorSwatch
                                                color={color.value}
                                                size={28}
                                                style={{
                                                    cursor: 'pointer',
                                                    border: edgeHoverColor === color.value ? '2px solid #fff' : '1px solid rgba(0,0,0,0.1)',
                                                    boxShadow: edgeHoverColor === color.value ? '0 0 0 3px #4b5563, 0 0 8px rgba(75, 85, 99, 0.4)' : 'none',
                                                    transition: 'all 0.15s ease',
                                                }}
                                                onClick={() => setEdgeHoverColor(color.value)}
                                                onMouseEnter={(e) => {
                                                    if (edgeHoverColor !== color.value) {
                                                        e.currentTarget.style.transform = 'scale(1.15)';
                                                    }
                                                }}
                                                onMouseLeave={(e) => {
                                                    if (edgeHoverColor !== color.value) {
                                                        e.currentTarget.style.transform = 'scale(1)';
                                                    }
                                                }}
                                            />
                                        </Tooltip>
                                    ))}
                                </div>
                            </Menu.Dropdown>
                        </Menu>
                    </div>

                    {/* Sync Mode Switch */}
                    <div className={styles.syncModeSwitch}>
                        <span className={`${styles.syncLabel} ${syncMode ? styles.active : ''}`}>
                            Sync Mode
                        </span>
                        <Switch
                            checked={syncMode}
                            onChange={(event) => setSyncMode(event.currentTarget.checked)}
                            color="blue"
                            size="md"
                            onLabel={<IconBolt size={14} />}
                            offLabel=""
                        />
                        {syncMode && (
                            <Badge color="blue" variant="light" className={styles.badge}>
                                LIVE
                            </Badge>
                        )}
                    </div>

                    {/* Dark Mode Toggle */}
                    <Tooltip label={isDarkMode ? 'Light Mode' : 'Dark Mode'}>
                        <ActionIcon
                            variant="default"
                            size="lg"
                            onClick={() => setDarkMode(!isDarkMode)}
                        >
                            {isDarkMode ? <IconSun size={20} /> : <IconMoon size={20} />}
                        </ActionIcon>
                    </Tooltip>
                </div>
            </div>

            {/* Main Content */}
            <div className={styles.mainContent} ref={containerRef}>
                {/* Canvas Area */}
                <div className={styles.canvasWrapper} id="erd-canvas">
                    <ERDCanvas
                        onExportPNG={handleExportPNG}
                        onExportJSON={handleExportJSON}
                    />
                </div>

                {/* Resize Handle */}
                <div
                    className={styles.resizeHandle}
                    onMouseDown={handleMouseDown}
                />

                {/* Editor Panel */}
                <div className={styles.editorWrapper} style={{ width: editorWidth }}>
                    <SchemaEditor />
                </div>
            </div>
        </div>
    );
};

const DBTool: React.FC = () => {
    const { isDarkMode } = useDBToolStore();

    return (
        <MantineProvider
            forceColorScheme={isDarkMode ? 'dark' : 'light'}
        >
            <ReactFlowProvider>
                <DBToolContent />
            </ReactFlowProvider>
        </MantineProvider>
    );
};

export default DBTool;
