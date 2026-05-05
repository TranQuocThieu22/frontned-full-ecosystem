import React, { memo } from 'react';
import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import { IconKey, IconLink, IconTable } from '@tabler/icons-react';
import { ParsedTable, ParsedField } from '../types/schema';
import { getTypeColor } from '../types/mssqlTypes';
import { useDBToolStore } from '../stores/dbToolStore';
import styles from '../styles/TableNode.module.css';
import { TableNodeData } from './ERDCanvas';

const TableNode = ({ data, selected, id }: NodeProps<Node<TableNodeData>>) => {
    const { table } = data as TableNodeData;
    const { selectedTableIds, toggleTableSelection, selectedFields, toggleFieldSelection, searchedTableIds } = useDBToolStore();

    const highlightColor = selectedTableIds.get(id as string);
    const isHighlighted = highlightColor !== undefined;
    const isSearched = searchedTableIds.has(id as string);

    const handleTableClick = (e: React.MouseEvent) => {
        // Only toggle table selection if clicking on header or background, not fields
        if ((e.target as HTMLElement).closest(`.${styles.fieldRow}`)) {
            return;
        }
        toggleTableSelection(id as string);
    };

    const handleFieldClick = (e: React.MouseEvent, fieldName: string) => {
        e.stopPropagation();
        toggleFieldSelection(table.name, fieldName);
    };

    return (
        <div
            className={`${styles.tableNode} ${selected ? styles.selected : ''} ${isHighlighted ? styles.highlighted : ''} ${isSearched ? styles.searched : ''}`}
            onClick={handleTableClick}
            style={{
                cursor: 'pointer',
                borderColor: isHighlighted ? highlightColor : isSearched ? '#facc15' : undefined,
                boxShadow: isHighlighted ? `0 4px 16px ${highlightColor}80` : isSearched ? '0 4px 16px #facc1580' : undefined,
            }}
        >
            {/* Top handle for incoming connections */}
            <Handle
                type="target"
                position={Position.Top}
                className={styles.handle}
            />

            {/* Table header */}
            <div className={styles.tableHeader}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <IconTable size={16} />
                    <span>{table.name}</span>
                </div>
            </div>

            {/* Table fields */}
            <div className={styles.tableBody}>
                {table.fields.map((field: ParsedField, index: number) => {
                    const fieldId = `${table.name}.${field.name}`;
                    const fieldHighlight = selectedFields.get(fieldId);
                    const isFieldHighlighted = fieldHighlight !== undefined;

                    return (
                        <div
                            key={index}
                            className={styles.fieldRow}
                            style={{
                                position: 'relative',
                                backgroundColor: isFieldHighlighted ? `${fieldHighlight.color}20` : undefined,
                                cursor: (field.isPrimaryKey || field.isForeignKey) ? 'pointer' : 'default',
                            }}
                            onClick={(e) => (field.isPrimaryKey || field.isForeignKey) && handleFieldClick(e, field.name)}
                        >
                            {/* Left handle for target connections (for PK fields being referenced) */}
                            {field.isPrimaryKey && (
                                <Handle
                                    type="target"
                                    position={Position.Left}
                                    id={`${table.name}-${field.name}-target`}
                                    className={styles.fieldHandle}
                                    style={{ left: -8, top: '50%' }}
                                />
                            )}
                            {/* Right handle for source connections (for FK fields) */}
                            {field.isForeignKey && (
                                <Handle
                                    type="source"
                                    position={Position.Right}
                                    id={`${table.name}-${field.name}-source`}
                                    className={styles.fieldHandle}
                                    style={{ right: -8, top: '50%' }}
                                />
                            )}
                            {field.isPrimaryKey && (
                                <IconKey size={14} className={`${styles.fieldIcon} ${styles.pk}`} />
                            )}
                            {field.isForeignKey && (
                                <IconLink size={14} className={`${styles.fieldIcon} ${styles.fk}`} />
                            )}
                            {!field.isPrimaryKey && !field.isForeignKey && (
                                <span className={styles.fieldIcon}>•</span>
                            )}
                            <span className={styles.fieldName}>{field.name}</span>
                            <span
                                className={styles.fieldType}
                                style={{
                                    color: getTypeColor(field.type),
                                    fontWeight: 600
                                }}
                            >
                                {field.type}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Bottom handle for outgoing connections */}
            <Handle
                type="source"
                position={Position.Bottom}
                className={styles.handle}
            />

            {/* Left and right handles */}
            <Handle
                type="target"
                position={Position.Left}
                className={styles.handle}
            />
            <Handle
                type="source"
                position={Position.Right}
                className={styles.handle}
            />
        </div>
    );
};

export default memo(TableNode);
