import { create } from 'zustand';
import { Node, Edge } from '@xyflow/react';
import { DatabaseSchema } from '../types/schema';

interface HistoryState {
    schema: DatabaseSchema;
    nodes: Node[];
    edges: Edge[];
}

interface DBToolStore {
    // Schema and data
    schema: DatabaseSchema;
    nodes: Node[];
    edges: Edge[];

    // UI state
    syncMode: boolean;
    isDarkMode: boolean;
    selectedSchemaFile: string;
    edgeColor: string;
    edgeHoverColor: string;
    selectedTableIds: Map<string, string>; // tableId -> highlight color
    selectedFields: Map<string, { tableName: string; fieldName: string; color: string }>; // fieldId -> field info
    selectedEdgeIds: Set<string>; // Selected edge IDs
    searchedTableIds: Set<string>; // tables found by search

    // History for undo/redo
    history: HistoryState[];
    historyIndex: number;

    // Actions
    setSchema: (schema: DatabaseSchema) => void;
    setNodes: (nodes: Node[]) => void;
    setEdges: (edges: Edge[]) => void;
    setSyncMode: (enabled: boolean) => void;
    setDarkMode: (enabled: boolean) => void;
    setSelectedSchemaFile: (fileId: string) => void;
    setEdgeColor: (color: string) => void;
    setEdgeHoverColor: (color: string) => void;
    toggleTableSelection: (tableId: string) => void;
    clearTableSelection: () => void;
    toggleFieldSelection: (tableName: string, fieldName: string) => void;
    clearAllHighlights: () => void;
    toggleEdgeSelection: (edgeId: string) => void;
    addSearchedTable: (tableId: string) => void;
    removeSearchedTable: (tableId: string) => void;
    clearSearchedTables: () => void;

    // Undo/Redo
    undo: () => void;
    redo: () => void;
    canUndo: () => boolean;
    canRedo: () => boolean;
    pushHistory: () => void;
}

export const useDBToolStore = create<DBToolStore>((set, get) => ({
    // Initial state
    schema: {},
    nodes: [],
    edges: [],
    syncMode: false,
    isDarkMode: false,
    selectedSchemaFile: '', // Will be set when manifest loads
    edgeColor: '#3b82f6', // Default blue
    edgeHoverColor: '#10b981', // Default green
    selectedTableIds: new Map(),
    selectedFields: new Map(),
    selectedEdgeIds: new Set(),
    searchedTableIds: new Set(),
    history: [],
    historyIndex: -1,

    // Actions
    setSchema: (schema) => {
        set({ schema });
        if (get().syncMode) {
            get().pushHistory();
        }
    },

    setNodes: (nodes) => set({ nodes }),

    setEdges: (edges) => set({ edges }),

    setSyncMode: (enabled) => set({ syncMode: enabled }),

    setDarkMode: (enabled) => set({ isDarkMode: enabled }),

    setSelectedSchemaFile: (fileId) => set({ selectedSchemaFile: fileId }),

    setEdgeColor: (color) => set({ edgeColor: color }),

    setEdgeHoverColor: (color) => set({ edgeHoverColor: color }),

    toggleTableSelection: (tableId) => {
        const currentSelected = get().selectedTableIds;
        const newSelected = new Map(currentSelected);

        if (newSelected.has(tableId)) {
            // Deselect if already selected
            newSelected.delete(tableId);
        } else {
            // Select with a new color (rotate through colors)
            const highlightColors = [
                '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16',
                '#22c55e', '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9',
                '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef',
                '#ec4899', '#f43f5e', '#fb923c', '#fbbf24', '#4ade80'
            ];
            const colorIndex = newSelected.size % highlightColors.length;
            newSelected.set(tableId, highlightColors[colorIndex]);
        }

        set({ selectedTableIds: newSelected });
    },

    clearTableSelection: () => set({ selectedTableIds: new Map() }),

    toggleFieldSelection: (tableName, fieldName) => {
        const currentSelected = get().selectedFields;
        const newSelected = new Map(currentSelected);
        const fieldId = `${tableName}.${fieldName}`;

        if (newSelected.has(fieldId)) {
            newSelected.delete(fieldId);
        } else {
            // Use distinct colors for field highlights (different from table colors)
            const fieldColors = [
                '#8b5cf6', '#ec4899', '#f97316', '#22c55e', '#0ea5e9', '#eab308',
                '#a855f7', '#ef4444', '#14b8a6', '#f59e0b', '#6366f1', '#f43f5e',
                '#84cc16', '#3b82f6', '#d946ef', '#06b6d4', '#10b981', '#fb923c',
                '#fbbf24', '#4ade80'
            ];
            const colorIndex = newSelected.size % fieldColors.length;
            newSelected.set(fieldId, { tableName, fieldName, color: fieldColors[colorIndex] });
        }

        set({ selectedFields: newSelected });
    },

    clearAllHighlights: () => set({ selectedTableIds: new Map(), selectedFields: new Map(), selectedEdgeIds: new Set(), searchedTableIds: new Set() }),

    toggleEdgeSelection: (edgeId) => {
        const currentSelected = get().selectedEdgeIds;
        const newSelected = new Set(currentSelected);

        if (newSelected.has(edgeId)) {
            newSelected.delete(edgeId);
        } else {
            newSelected.add(edgeId);
        }

        set({ selectedEdgeIds: newSelected });
    },

    addSearchedTable: (tableId) => {
        const current = get().searchedTableIds;
        const newSet = new Set(current);
        newSet.add(tableId);
        set({ searchedTableIds: newSet });
    },

    removeSearchedTable: (tableId) => {
        const current = get().searchedTableIds;
        const newSet = new Set(current);
        newSet.delete(tableId);
        set({ searchedTableIds: newSet });
    },

    clearSearchedTables: () => set({ searchedTableIds: new Set() }),

    // History management
    pushHistory: () => {
        const { schema, nodes, edges, history, historyIndex } = get();
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push({ schema, nodes, edges });
        set({
            history: newHistory.slice(-50), // Keep last 50 states
            historyIndex: newHistory.length - 1
        });
    },

    undo: () => {
        const { history, historyIndex } = get();
        if (historyIndex > 0) {
            const prevState = history[historyIndex - 1];
            set({
                schema: prevState.schema,
                nodes: prevState.nodes,
                edges: prevState.edges,
                historyIndex: historyIndex - 1,
            });
        }
    },

    redo: () => {
        const { history, historyIndex } = get();
        if (historyIndex < history.length - 1) {
            const nextState = history[historyIndex + 1];
            set({
                schema: nextState.schema,
                nodes: nextState.nodes,
                edges: nextState.edges,
                historyIndex: historyIndex + 1,
            });
        }
    },

    canUndo: () => get().historyIndex > 0,

    canRedo: () => get().historyIndex < get().history.length - 1,
}));
