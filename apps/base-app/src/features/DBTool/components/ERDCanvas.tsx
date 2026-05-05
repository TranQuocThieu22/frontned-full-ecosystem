import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    ReactFlow,
    Controls,
    Background,
    MiniMap,
    useNodesState,
    useEdgesState,
    addEdge,
    Connection,
    Node,
    Edge,
    Panel,
    BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Button, ActionIcon, Tooltip } from '@mantine/core';
import {
    IconLayoutGrid,
    IconFileExport,
    IconCamera,
    IconArrowBackUp,
    IconArrowForwardUp,
    IconEraser,
} from '@tabler/icons-react';
import { useDBToolStore } from '../stores/dbToolStore';
import { schemaToNodesAndEdges, nodesToSchema } from '../utils/schemaParser';
import TableNode from './TableNode';
import TableSearch from './TableSearch';
import { getLayoutedElements } from '../utils/layoutUtils';
import styles from '../styles/ERDCanvas.module.css';
import { ParsedTable } from '../types/schema';

export interface TableNodeData extends Record<string, unknown> {
    table: ParsedTable;
}

const nodeTypes = {
    tableNode: TableNode,
};
interface ERDCanvasProps {
    onExportPNG: () => void;
    onExportJSON: () => void;
}const ERDCanvas: React.FC<ERDCanvasProps> = ({
    onExportPNG,
    onExportJSON,
}) => {
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const [schemaVersion, setSchemaVersion] = useState(0);
    const {
        schema,
        nodes: storeNodes,
        edges: storeEdges,
        syncMode,
        edgeColor,
        edgeHoverColor,
        selectedTableIds,
        selectedFields,
        selectedEdgeIds,
        searchedTableIds,
        toggleEdgeSelection,
        clearAllHighlights,
        setNodes: setStoreNodes,
        setEdges: setStoreEdges,
        setSchema,
        undo,
        redo,
        canUndo,
        canRedo,
        pushHistory,
    } = useDBToolStore();

    const [nodes, setNodes, onNodesChange] = useNodesState<Node<TableNodeData>>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

    // Stringify schema to detect order changes (JSON.stringify preserves order)
    const schemaString = JSON.stringify(schema);

    // Initialize nodes and edges from schema
    useEffect(() => {
        const { nodes: newNodes, edges: newEdges } = schemaToNodesAndEdges(schema, nodes, edgeColor);
        setNodes(newNodes);
        setEdges(newEdges);
        setStoreNodes(newNodes);
        setStoreEdges(newEdges);
        setSchemaVersion(prev => prev + 1); // Force React Flow remount
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [schemaString]);

    // Update node z-index when searchedTableIds changes
    useEffect(() => {
        setNodes((currentNodes) => {
            return currentNodes.map((node) => {
                const isSearched = searchedTableIds.has(node.id);
                return {
                    ...node,
                    zIndex: isSearched ? 9999 : undefined,
                };
            });
        });
    }, [searchedTableIds, setNodes]);

    // Update edge styles when selectedTableIds or edgeColor changes
    useEffect(() => {
        setEdges((currentEdges) => {
            return currentEdges.map((edge) => {
                // Check if this edge is the selected edge (clicked)
                const isEdgeSelected = selectedEdgeIds.has(edge.id);

                // Check if edge is connected to any selected table
                const sourceColor = selectedTableIds.get(edge.source);
                const targetColor = selectedTableIds.get(edge.target);

                // Check if edge is connected to selected fields
                let fieldColor: string | undefined;
                selectedFields.forEach((fieldInfo, fieldId) => {
                    const parts = fieldId.split('.');
                    if (parts.length !== 2) return;
                    const tableName = parts[0]!;
                    const fieldName = parts[1]!;

                    // For FK fields, check if this edge originates from this field
                    const sourceHandle = edge.sourceHandle;
                    if (edge.source === tableName && sourceHandle && sourceHandle.includes(fieldName)) {
                        fieldColor = fieldInfo.color;
                    }
                    // For PK fields, check if this edge targets this field
                    const targetHandle = edge.targetHandle;
                    if (edge.target === tableName && targetHandle && targetHandle.includes(fieldName)) {
                        fieldColor = fieldInfo.color;
                    }
                });

                // Priority: selected edge > field color > table color > default
                if (isEdgeSelected) {
                    return {
                        ...edge,
                        style: {
                            stroke: edgeHoverColor,
                            strokeWidth: 3,
                            strokeDasharray: '0',
                        },
                        animated: true,
                    };
                }

                const highlightColor = fieldColor || sourceColor || targetColor;

                if (highlightColor) {
                    return {
                        ...edge,
                        style: {
                            stroke: highlightColor,
                            strokeWidth: fieldColor ? 4 : 3, // Thicker for field highlights
                        },
                        animated: true,
                    };
                }

                // Keep default appearance for non-highlighted edges
                return {
                    ...edge,
                    style: {
                        stroke: edgeColor,
                        strokeWidth: 2,
                    },
                    animated: true,
                };
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedTableIds, selectedFields, selectedEdgeIds, edgeColor, edgeHoverColor]);

    // Sync nodes to store when they change
    useEffect(() => {
        setStoreNodes(nodes);
    }, [nodes, setStoreNodes]);

    // Sync edges to store when they change
    useEffect(() => {
        setStoreEdges(edges);
    }, [edges, setStoreEdges]);

    // Handle new connection
    const onConnect = useCallback(
        (params: Connection) => {
            if (!syncMode) {
                // In non-sync mode, don't allow new connections
                return;
            }

            const newEdge = {
                ...params,
                type: 'smoothstep',
                animated: true,
                style: { stroke: '#3b82f6', strokeWidth: 2 },
            };

            setEdges((eds) => addEdge(newEdge, eds));

            // Update schema when in sync mode
            if (syncMode && params.source && params.target) {
                const updatedSchema = nodesToSchema(nodes, [...edges, newEdge as Edge]);
                setSchema(updatedSchema);
                pushHistory();
            }
        },
        [syncMode, nodes, edges, setEdges, setSchema, pushHistory]
    );

    // Handle edge deletion
    const onEdgesDelete = useCallback(
        (deletedEdges: Edge[]) => {
            if (syncMode) {
                const remainingEdges = edges.filter(
                    (edge) => !deletedEdges.find((de) => de.id === edge.id)
                );
                const updatedSchema = nodesToSchema(nodes, remainingEdges);
                setSchema(updatedSchema);
                pushHistory();
            }
        },
        [syncMode, nodes, edges, setSchema, pushHistory]
    );

    // Handle node drag end - update schema in sync mode
    const onNodeDragStop = useCallback(() => {
        if (syncMode) {
            pushHistory();
        }
    }, [syncMode, pushHistory]);

    // Handle edge click
    const onEdgeClick = useCallback(
        (_event: React.MouseEvent, edge: Edge) => {
            // Toggle edge selection: if already selected, deselect; otherwise select this edge
            toggleEdgeSelection(edge.id);
        },
        [toggleEdgeSelection]
    );

    // Handle auto layout
    const handleAutoLayout = useCallback(() => {
        const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
            nodes,
            edges,
            'TB'
        );
        setNodes(layoutedNodes);
        setEdges(layoutedEdges);
        pushHistory();
    }, [nodes, edges, setNodes, setEdges, pushHistory]);
    return (
        <div
            className={styles.erdCanvas}
            ref={reactFlowWrapper}
            style={{
                '--edge-hover-color': edgeHoverColor,
            } as React.CSSProperties}
        >
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onEdgesDelete={onEdgesDelete}
                onNodeDragStop={onNodeDragStop}
                onEdgeClick={onEdgeClick}
                nodeTypes={nodeTypes}
                defaultEdgeOptions={{
                    type: 'smoothstep',
                    animated: true,
                }}
                fitView
                attributionPosition="bottom-left"
                nodesDraggable={true}
                nodesConnectable={syncMode}
                elementsSelectable={true}
            >
                <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
                <Controls />
                <MiniMap
                    nodeStrokeWidth={3}
                    zoomable
                    pannable
                    style={{ background: 'rgba(255, 255, 255, 0.9)' }}
                />

                <Panel position="top-left" className={styles.controlPanel}>
                    <div className={styles.buttonGroup}>
                        <Tooltip label="Undo">
                            <ActionIcon
                                variant="subtle"
                                onClick={undo}
                                disabled={!canUndo()}
                                size="lg"
                            >
                                <IconArrowBackUp size={18} />
                            </ActionIcon>
                        </Tooltip>

                        <Tooltip label="Redo">
                            <ActionIcon
                                variant="subtle"
                                onClick={redo}
                                disabled={!canRedo()}
                                size="lg"
                            >
                                <IconArrowForwardUp size={18} />
                            </ActionIcon>
                        </Tooltip>
                    </div>

                    <div className={styles.buttonGroup}>
                        <Tooltip label="Clear All Highlights">
                            <ActionIcon
                                variant="light"
                                onClick={clearAllHighlights}
                                disabled={selectedTableIds.size === 0 && selectedFields.size === 0 && searchedTableIds.size === 0}
                                size="lg"
                                color="red"
                            >
                                <IconEraser size={18} />
                            </ActionIcon>
                        </Tooltip>
                    </div>

                    <div className={styles.buttonGroup}>
                        <Tooltip label="Auto Layout">
                            <Button
                                leftSection={<IconLayoutGrid size={18} />}
                                onClick={handleAutoLayout}
                                variant="light"
                                size="sm"
                            >
                                Auto Layout
                            </Button>
                        </Tooltip>
                    </div>                    <div className={styles.buttonGroup}>
                        <Tooltip label="Export PNG">
                            <ActionIcon
                                variant="light"
                                onClick={onExportPNG}
                                size="lg"
                            >
                                <IconCamera size={18} />
                            </ActionIcon>
                        </Tooltip>

                        <Tooltip label="Export JSON">
                            <ActionIcon
                                variant="light"
                                onClick={onExportJSON}
                                size="lg"
                            >
                                <IconFileExport size={18} />
                            </ActionIcon>
                        </Tooltip>
                    </div>
                </Panel>

                <Panel position="top-right">
                    <TableSearch />
                </Panel>
            </ReactFlow>
        </div>
    );
};

export default ERDCanvas;
