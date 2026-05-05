import { Node, Edge } from '@xyflow/react';
import { DatabaseSchema, ParsedTable, ParsedField } from '../types/schema';

// Import TableNodeData type
export interface TableNodeData extends Record<string, unknown> {
    table: ParsedTable;
}

/**
 * Parse a field definition string into a structured object
 * Examples:
 *   "int pk" -> { type: "int", isPrimaryKey: true }
 *   "ref Department.id" -> { type: "ref", reference: { table: "Department", field: "id" } }
 */
export function parseFieldDefinition(fieldDef: string): {
    type: string;
    isPrimaryKey: boolean;
    isForeignKey: boolean;
    reference?: { table: string; field: string };
} {
    const parts = fieldDef.trim().split(/\s+/);
    const type = parts[0];
    const isPrimaryKey = parts.includes('pk');

    let isForeignKey = false;
    let reference: { table: string; field: string } | undefined;

    if (type === 'ref' && parts.length > 1) {
        isForeignKey = true;
        const refParts = parts[1].split('.');
        if (refParts.length === 2) {
            reference = {
                table: refParts[0],
                field: refParts[1],
            };
        }
    }

    return {
        type: type === 'ref' ? 'foreign_key' : type,
        isPrimaryKey,
        isForeignKey,
        reference,
    };
}

/**
 * Parse a database schema into an array of tables with fields
 */
export function parseSchema(schema: DatabaseSchema): ParsedTable[] {
    return Object.entries(schema).map(([tableName, fields]) => {
        const parsedFields: ParsedField[] = Object.entries(fields).map(([fieldName, fieldDef]) => {
            const parsed = parseFieldDefinition(fieldDef);
            return {
                name: fieldName,
                ...parsed,
            };
        });

        return {
            name: tableName,
            fields: parsedFields,
        };
    });
}

/**
 * Convert database schema to React Flow nodes and edges
 */
export function schemaToNodesAndEdges(
    schema: DatabaseSchema,
    existingNodes?: Node[],
    edgeColor: string = '#3b82f6'
): { nodes: Node<TableNodeData>[]; edges: Edge[] } {
    const tables = parseSchema(schema);
    const edges: Edge[] = [];

    // Create a map of existing node positions
    const existingPositions = new Map<string, { x: number; y: number }>();
    if (existingNodes) {
        existingNodes.forEach(node => {
            existingPositions.set(node.id, node.position);
        });
    }

    // Create nodes for each table
    const nodes: Node<TableNodeData>[] = tables.map((table, index) => {
        const nodeId = table.name;

        // Use existing position if available, otherwise calculate a grid position
        const position = existingPositions.get(nodeId) || {
            x: (index % 3) * 300 + 50,
            y: Math.floor(index / 3) * 250 + 50,
        };

        return {
            id: nodeId,
            type: 'tableNode',
            position,
            data: { table },
        };
    });

    // Create edges for foreign key relationships
    tables.forEach(table => {
        table.fields.forEach(field => {
            if (field.isForeignKey && field.reference) {
                edges.push({
                    id: `${table.name}-${field.name}-${field.reference.table}`,
                    source: table.name,
                    target: field.reference.table,
                    sourceHandle: `${table.name}-${field.name}-source`,
                    targetHandle: `${field.reference.table}-${field.reference.field}-target`,
                    type: 'smoothstep',
                    animated: true,
                    label: field.name,
                    style: { stroke: edgeColor, strokeWidth: 2 },
                    labelStyle: { fill: '#1f2937', fontWeight: 700, fontSize: 13 },
                    labelBgStyle: { fill: 'white', fillOpacity: 0.95 },
                    labelBgPadding: [8, 4] as [number, number],
                    labelBgBorderRadius: 4,
                });
            }
        });
    });

    return { nodes, edges };
}

/**
 * Convert React Flow nodes and edges back to database schema
 */
export function nodesToSchema(nodes: Node[], edges: Edge[]): DatabaseSchema {
    const schema: DatabaseSchema = {};

    // Create a map of edges by source node
    const edgesBySource = new Map<string, Edge[]>();
    edges.forEach(edge => {
        const existing = edgesBySource.get(edge.source) || [];
        existing.push(edge);
        edgesBySource.set(edge.source, existing);
    });

    nodes.forEach(node => {
        const table = node.data.table as ParsedTable;
        const fields: { [key: string]: string } = {};

        // Get edges originating from this table
        const tableEdges = edgesBySource.get(node.id) || [];
        const edgeFieldMap = new Map<string, Edge>();

        tableEdges.forEach(edge => {
            if (edge.label) {
                edgeFieldMap.set(edge.label, edge);
            }
        });

        table.fields.forEach(field => {
            let fieldDef = field.type;

            if (field.isPrimaryKey) {
                fieldDef += ' pk';
            }

            // Check if this field has a corresponding edge
            const edge = edgeFieldMap.get(field.name);
            if (edge && edge.target) {
                // This is a foreign key - update to ref format
                fieldDef = `ref ${edge.target}.id`;
            }

            fields[field.name] = fieldDef;
        });

        schema[table.name] = fields;
    });

    return schema;
}

// Layout is now in layoutUtils.ts
export { getLayoutedElements } from './layoutUtils';