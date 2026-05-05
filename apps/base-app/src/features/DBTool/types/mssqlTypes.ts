// MS SQL Server Data Types
export const MSSQL_DATA_TYPES = {
    // Exact Numerics
    bigint: { category: 'Exact Numerics', description: '8-byte integer' },
    int: { category: 'Exact Numerics', description: '4-byte integer' },
    smallint: { category: 'Exact Numerics', description: '2-byte integer' },
    tinyint: { category: 'Exact Numerics', description: '1-byte integer' },
    bit: { category: 'Exact Numerics', description: 'Boolean (0 or 1)' },
    decimal: { category: 'Exact Numerics', description: 'Fixed precision and scale' },
    numeric: { category: 'Exact Numerics', description: 'Fixed precision and scale' },
    money: { category: 'Exact Numerics', description: 'Monetary data' },
    smallmoney: { category: 'Exact Numerics', description: 'Monetary data (small)' },

    // Approximate Numerics
    float: { category: 'Approximate Numerics', description: 'Floating point number' },
    real: { category: 'Approximate Numerics', description: 'Floating point number (small)' },

    // Date and Time
    date: { category: 'Date and Time', description: 'Date only' },
    datetime: { category: 'Date and Time', description: 'Date and time' },
    datetime2: { category: 'Date and Time', description: 'Date and time (extended)' },
    datetimeoffset: { category: 'Date and Time', description: 'Date and time with timezone' },
    smalldatetime: { category: 'Date and Time', description: 'Date and time (small)' },
    time: { category: 'Date and Time', description: 'Time only' },

    // Character Strings
    char: { category: 'Character Strings', description: 'Fixed-length string' },
    varchar: { category: 'Character Strings', description: 'Variable-length string' },
    text: { category: 'Character Strings', description: 'Variable-length string (large)' },

    // Unicode Character Strings
    nchar: { category: 'Unicode Strings', description: 'Fixed-length Unicode string' },
    nvarchar: { category: 'Unicode Strings', description: 'Variable-length Unicode string' },
    ntext: { category: 'Unicode Strings', description: 'Variable-length Unicode string (large)' },

    // Binary Strings
    binary: { category: 'Binary Strings', description: 'Fixed-length binary data' },
    varbinary: { category: 'Binary Strings', description: 'Variable-length binary data' },
    image: { category: 'Binary Strings', description: 'Variable-length binary data (large)' },

    // Other Data Types
    uniqueidentifier: { category: 'Other', description: 'GUID/UUID' },
    xml: { category: 'Other', description: 'XML data' },
    json: { category: 'Other', description: 'JSON data' },
    geography: { category: 'Spatial', description: 'Geographic spatial data' },
    geometry: { category: 'Spatial', description: 'Geometric spatial data' },
    hierarchyid: { category: 'Other', description: 'Hierarchical data' },
    sql_variant: { category: 'Other', description: 'Variable type' },
    timestamp: { category: 'Other', description: 'Unique row version' },
    rowversion: { category: 'Other', description: 'Unique row version' },
    cursor: { category: 'Other', description: 'Cursor reference' },
    table: { category: 'Other', description: 'Table variable' },
};

export type MSSQLDataType = keyof typeof MSSQL_DATA_TYPES;

/**
 * Get color for data type based on category
 */
export function getTypeColor(type: string): string {
    const normalizedType = type.toLowerCase();
    const typeInfo = MSSQL_DATA_TYPES[normalizedType as MSSQLDataType];

    if (!typeInfo) return '#6B7280'; // gray-500 for unknown types

    switch (typeInfo.category) {
        case 'Exact Numerics':
        case 'Approximate Numerics':
            return '#10B981'; // green-500
        case 'Date and Time':
            return '#3B82F6'; // blue-500
        case 'Character Strings':
        case 'Unicode Strings':
            return '#F59E0B'; // amber-500
        case 'Binary Strings':
            return '#8B5CF6'; // violet-500
        case 'Spatial':
            return '#EC4899'; // pink-500
        case 'Other':
            return '#6366F1'; // indigo-500
        default:
            return '#6B7280'; // gray-500
    }
}

/**
 * Check if a type is a valid MS SQL type
 */
export function isValidMSSQLType(type: string): boolean {
    return type.toLowerCase() in MSSQL_DATA_TYPES;
}

/**
 * Get type info
 */
export function getTypeInfo(type: string) {
    const normalizedType = type.toLowerCase();
    return MSSQL_DATA_TYPES[normalizedType as MSSQLDataType];
}
