import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Button, Text, Alert, ActionIcon, Tooltip } from '@mantine/core';
import { IconCode, IconDeviceFloppy, IconAlertCircle, IconRefresh, IconWand } from '@tabler/icons-react';
import { useDBToolStore } from '../stores/dbToolStore';
import { DatabaseSchema } from '../types/schema';
import { getSchemaById, getSchemaNameById } from '../services/schemaService';
import styles from '../styles/SchemaEditor.module.css';

const SchemaEditor: React.FC = () => {
    const { schema, setSchema, isDarkMode, pushHistory, selectedSchemaFile } = useDBToolStore();
    const [editorValue, setEditorValue] = useState('');
    const [error, setError] = useState<string | null>(null);

    // Sync schema to editor
    useEffect(() => {
        setEditorValue(JSON.stringify(schema, null, 2));
    }, [schema]);

    const handleEditorChange = (value: string | undefined) => {
        if (value !== undefined) {
            setEditorValue(value);
            setError(null);
        }
    };

    const handleSave = () => {
        try {
            const parsedSchema = JSON.parse(editorValue) as DatabaseSchema;

            // Validate schema structure
            if (typeof parsedSchema !== 'object' || parsedSchema === null) {
                throw new Error('Schema must be an object');
            }

            for (const [tableName, fields] of Object.entries(parsedSchema)) {
                if (typeof fields !== 'object' || fields === null) {
                    throw new Error(`Table "${tableName}" must have an object of fields`);
                }

                for (const [fieldName, fieldDef] of Object.entries(fields)) {
                    if (typeof fieldDef !== 'string') {
                        throw new Error(
                            `Field "${fieldName}" in table "${tableName}" must be a string definition`
                        );
                    }
                }
            }

            setSchema(parsedSchema);
            pushHistory();
            setError(null);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Invalid JSON';
            setError(errorMessage);
        }
    };

    const handleFormat = () => {
        try {
            const parsed = JSON.parse(editorValue);
            setEditorValue(JSON.stringify(parsed, null, 2));
            setError(null);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Invalid JSON';
            setError(errorMessage);
        }
    };

    const handleReload = async () => {
        const freshSchema = await getSchemaById(selectedSchemaFile);
        if (freshSchema) {
            setSchema(freshSchema);
            setEditorValue(JSON.stringify(freshSchema, null, 2));
            pushHistory();
            setError(null);
        }
    };

    return (
        <div className={styles.editorPanel}>
            <div className={styles.editorHeader}>
                <Text className={styles.editorTitle}>
                    <IconCode size={20} />
                    Schema Editor
                </Text>
                <div className={styles.actions}>
                    <Tooltip label="Format JSON">
                        <ActionIcon
                            size="lg"
                            variant="light"
                            onClick={handleFormat}
                        >
                            <IconWand size={18} />
                        </ActionIcon>
                    </Tooltip>
                    <Tooltip label={`Reload from ${getSchemaNameById(selectedSchemaFile)}`}>
                        <ActionIcon
                            size="lg"
                            variant="light"
                            color="cyan"
                            onClick={handleReload}
                        >
                            <IconRefresh size={18} />
                        </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Apply Changes">
                        <ActionIcon
                            size="lg"
                            variant="filled"
                            color="blue"
                            onClick={handleSave}
                        >
                            <IconDeviceFloppy size={18} />
                        </ActionIcon>
                    </Tooltip>
                </div>
            </div>

            {error && (
                <Alert
                    icon={<IconAlertCircle size={16} />}
                    color="red"
                    variant="light"
                    styles={{ root: { borderRadius: 0 } }}
                >
                    {error}
                </Alert>
            )}

            <div className={styles.editorContent} onKeyDown={(e) => e.stopPropagation()}>
                <Editor
                    height="100%"
                    defaultLanguage="json"
                    value={editorValue}
                    onChange={handleEditorChange}
                    theme={isDarkMode ? 'vs-dark' : 'light'}
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        lineNumbers: 'on',
                        scrollBeyondLastLine: false,
                        wordWrap: 'on',
                        automaticLayout: true,
                        tabSize: 2,
                        formatOnPaste: true,
                        formatOnType: true,
                    }}
                />
            </div>
        </div>
    );
};

export default SchemaEditor;
