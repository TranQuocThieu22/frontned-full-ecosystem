import { DatabaseSchema } from '../types/schema';

// Schema file configuration (loaded at runtime)
export interface SchemaFile {
    id: string;
    name: string;
    path: string;
}

// Schema files loaded from manifest
let SCHEMA_FILES_CACHE: SchemaFile[] = [];

// Load schema manifest from public folder
export async function loadSchemaManifest(): Promise<SchemaFile[]> {
    if (SCHEMA_FILES_CACHE.length > 0) {
        console.log('[schemaService] Returning cached manifest:', SCHEMA_FILES_CACHE);
        return SCHEMA_FILES_CACHE;
    }

    try {
        const url = '/schemas/index.json?t=' + Date.now();
        console.log('[schemaService] Fetching manifest from:', url);
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to load schema manifest');

        const data = await response.json();
        console.log('[schemaService] Manifest data:', data);
        SCHEMA_FILES_CACHE = data.schemas || [];
        console.log('[schemaService] Cached manifest:', SCHEMA_FILES_CACHE);
        return SCHEMA_FILES_CACHE;
    } catch (error) {
        console.error('[schemaService] Error loading schema manifest:', error);
        return [];
    }
}

// Get cached schema files (call loadSchemaManifest first)
export function getSchemaFiles(): SchemaFile[] {
    return SCHEMA_FILES_CACHE;
}

// Cache for loaded schemas
const schemaCache = new Map<string, { schema: DatabaseSchema; timestamp: number }>();

// Clear cache to force reload
export function clearSchemaCache(): void {
    SCHEMA_FILES_CACHE = [];
    schemaCache.clear();
}
const CACHE_DURATION = 0; // 0 = always fresh (no caching)

// Load schema dynamically from public folder
export async function getSchemaById(id: string): Promise<DatabaseSchema | undefined> {
    const schemaFiles = await loadSchemaManifest();
    const schemaFile = schemaFiles.find(file => file.id === id);
    if (!schemaFile) return undefined;

    // Check cache
    const cached = schemaCache.get(id);
    if (cached && CACHE_DURATION > 0 && Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.schema;
    }

    try {
        // Fetch fresh from server with cache busting
        const response = await fetch(`${schemaFile.path}?t=${Date.now()}`);
        if (!response.ok) throw new Error(`Failed to load schema: ${response.statusText}`);

        const schema = await response.json();

        // Update cache
        schemaCache.set(id, { schema, timestamp: Date.now() });

        return schema;
    } catch (error) {
        console.error(`Error loading schema ${id}:`, error);
        return undefined;
    }
}

// Load default schema
export async function getDefaultSchema(): Promise<DatabaseSchema> {
    const defaultId = await getDefaultSchemaId();
    const schema = await getSchemaById(defaultId);
    return schema || {};
}

export async function getDefaultSchemaId(): Promise<string> {
    const schemaFiles = await loadSchemaManifest();
    return schemaFiles[0]?.id || 'LOM';
}

export function getSchemaNameById(id: string): string {
    const schemaFile = SCHEMA_FILES_CACHE.find(file => file.id === id);
    return schemaFile?.name || id;
}
