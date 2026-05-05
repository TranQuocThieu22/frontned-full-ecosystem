# DBTool - ERD Builder

A comprehensive Entity-Relationship Diagram (ERD) builder with JSON-driven schema management, built with React Flow and TypeScript.

## Features

### 🎨 Interactive Canvas
- **Custom Table Nodes**: Visual representation of database tables with fields
- **Field Type Indicators**: 
  - 🔑 Primary Key (yellow key icon)
  - 🔗 Foreign Key (blue link icon)
  - • Regular fields
- **Drag & Drop**: Move tables freely on the canvas
- **Zoom & Pan**: Navigate large diagrams easily
- **MiniMap**: Quick navigation overview

### 🔄 Two-Way Sync
- **Sync Mode OFF**: 
  - Manually drag and arrange nodes
  - Changes only save via JSON editor
  - Read-only canvas connections
  
- **Sync Mode ON**: 
  - Live two-way synchronization
  - Create relationships by connecting nodes
  - Delete edges to update schema
  - Automatic JSON updates

### 📝 Schema Editor
- **Monaco Editor**: Full-featured JSON editing with syntax highlighting
- **Real-time Validation**: Instant feedback on schema errors
- **Format Support**: Auto-format JSON with one click
- **Apply Changes**: Update diagram from JSON

### 🎯 Auto Layout
- **Dagre Algorithm**: Automatic hierarchical layout
- **Smart Positioning**: Optimized node placement
- **Relationship Clarity**: Clear edge routing

### 💾 Export Options
- **Export PNG**: Save diagram as high-quality image
- **Export JSON**: Download schema file
- **2x Resolution**: Crisp exports at double pixel ratio

### 🌓 Dark Mode
- Full dark theme support
- Persistent theme selection
- Applies to all components

### ⏮️ Undo/Redo
- Full history tracking (last 50 states)
- Keyboard shortcuts support
- Visual indicators for available actions

## JSON Schema Format

```json
{
  "TableName": {
    "fieldName": "type [pk] [ref OtherTable.field]",
    "id": "int pk",
    "name": "string",
    "foreignId": "ref OtherTable.id"
  }
}
```

### Field Definition Syntax
- **Type**: `int`, `string`, `boolean`, `date`, etc.
- **Primary Key**: Add `pk` after type
- **Foreign Key**: Use `ref TableName.fieldName` format

### Example Schema
```json
{
  "Course": {
    "id": "int pk",
    "name": "string",
    "credit": "int",
    "departmentId": "ref Department.id"
  },
  "Department": {
    "id": "int pk",
    "name": "string"
  }
}
```

## Architecture

### File Structure
```
DBTool/
├── components/
│   ├── DBTool.tsx          # Main container component
│   ├── ERDCanvas.tsx        # React Flow canvas
│   ├── SchemaEditor.tsx     # Monaco JSON editor
│   └── TableNode.tsx        # Custom node component
├── stores/
│   └── dbToolStore.ts       # Zustand state management
├── types/
│   └── schema.ts            # TypeScript interfaces
├── utils/
│   ├── schemaParser.ts      # JSON ↔ Graph conversion
│   ├── layoutUtils.ts       # Auto-layout with dagre
│   └── exportUtils.ts       # PNG/JSON export
├── styles/
│   ├── DBTool.module.css
│   ├── ERDCanvas.module.css
│   ├── SchemaEditor.module.css
│   └── TableNode.module.css
└── index.ts
```

### Tech Stack
- **React Flow (@xyflow/react)**: Canvas and node management
- **Monaco Editor**: Code editing
- **Dagre**: Graph layout algorithm
- **html-to-image**: Canvas export
- **Zustand**: State management
- **Mantine UI**: Component library
- **TypeScript**: Type safety

## Usage

### Access the Tool
Navigate to `/dbtool` in your application.

### Basic Workflow

1. **View Default Schema**
   - Opens with Course/Department example
   - Nodes are auto-positioned

2. **Edit Schema**
   - Use Monaco Editor on right panel
   - Format JSON with Format button
   - Click "Apply Changes" to update diagram

3. **Arrange Diagram**
   - Drag nodes to desired positions
   - Use Auto Layout for automatic arrangement
   - Zoom and pan as needed

4. **Enable Sync Mode** (Optional)
   - Toggle Sync Mode switch
   - Connect nodes to create relationships
   - Delete edges to remove relationships
   - Changes auto-update JSON

5. **Export**
   - Save as PNG for documentation
   - Download JSON for backup

### Keyboard Shortcuts
- **Ctrl/Cmd + Z**: Undo
- **Ctrl/Cmd + Shift + Z**: Redo (when redo is available)

## Component Props

### DBTool
Main component - no props required. Self-contained.

### ERDCanvas
```typescript
interface ERDCanvasProps {
  onAutoLayout: () => void;
  onExportPNG: () => void;
  onExportJSON: () => void;
}
```

### SchemaEditor
No props - uses global store.

### TableNode
```typescript
interface TableNodeData {
  table: ParsedTable;
}
```

## Store API

```typescript
// Access store
const {
  schema,          // Current database schema
  nodes,           // React Flow nodes
  edges,           // React Flow edges
  syncMode,        // Sync enabled/disabled
  isDarkMode,      // Dark theme enabled/disabled
  setSchema,       // Update schema
  setSyncMode,     // Toggle sync mode
  setDarkMode,     // Toggle dark mode
  undo,            // Undo last change
  redo,            // Redo change
  canUndo,         // Check if undo available
  canRedo,         // Check if redo available
  pushHistory,     // Save current state to history
} = useDBToolStore();
```

## Extending

### Add Custom Field Types
Edit `parseFieldDefinition` in `utils/schemaParser.ts`:
```typescript
// Add custom type handling
if (type === 'uuid') {
  // Custom logic
}
```

### Customize Node Appearance
Edit `TableNode.tsx` and `TableNode.module.css`:
```typescript
// Add custom styling or icons
{field.customProperty && <CustomIcon />}
```

### Add More Export Formats
Add to `utils/exportUtils.ts`:
```typescript
export function exportToSQL(schema: DatabaseSchema) {
  // Generate SQL DDL
}
```

## Troubleshooting

### Nodes not appearing
- Check browser console for errors
- Verify schema JSON is valid
- Ensure all dependencies are installed

### Sync mode not working
- Check that sync mode toggle is ON
- Verify you're using source/target handles
- Look for edge creation in React Flow

### Export failing
- Ensure canvas element has correct ID
- Check browser permissions for downloads
- Verify html-to-image is installed

## Future Enhancements

- [ ] SQL DDL export
- [ ] Import from existing database
- [ ] Table/field inline editing
- [ ] Relationship cardinality notation
- [ ] Column constraints (NOT NULL, UNIQUE)
- [ ] Index visualization
- [ ] Schema versioning
- [ ] Collaborative editing
- [ ] Custom themes
- [ ] Multiple diagram support

## License

Part of the base-app project.
