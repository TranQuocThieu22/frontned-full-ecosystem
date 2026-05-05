export interface FieldDefinition {
    type: string;
    isPrimaryKey?: boolean;
    reference?: {
        table: string;
        field: string;
    };
}

export interface TableSchema {
    [fieldName: string]: string;
}

export interface DatabaseSchema {
    [tableName: string]: TableSchema;
}

export interface ParsedField {
    name: string;
    type: string;
    isPrimaryKey: boolean;
    isForeignKey: boolean;
    reference?: {
        table: string;
        field: string;
    };
}

export interface ParsedTable {
    name: string;
    fields: ParsedField[];
}

export interface TablePosition {
    x: number;
    y: number;
}

export interface TablePositions {
    [tableName: string]: TablePosition;
}
