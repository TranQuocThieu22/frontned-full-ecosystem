# DBTool - Quick Start Guide

## 🚀 Installation (1 minute)

```bash
cd apps/base-app
pnpm add @xyflow/react dagre @types/dagre html-to-image @monaco-editor/react
pnpm dev
```

Navigate to: **http://localhost:3099/dbtool**

---

## 📋 What You Get

✅ **Interactive ERD Canvas** - Drag & drop tables, zoom, pan  
✅ **JSON Schema Editor** - Edit schema with Monaco Editor  
✅ **Two-Way Sync** - Connect nodes to update JSON or edit JSON to update graph  
✅ **Auto Layout** - One-click hierarchical arrangement  
✅ **Dark Mode** - Full theme support  
✅ **Export** - PNG images & JSON files  
✅ **Undo/Redo** - Full history (50 states)

---

## 🎯 Core Workflow

### 1. View Default Schema
Opens with a sample Course/Department/Student schema

### 2. Edit Schema (Method A: JSON Editor)
```json
{
  "User": {
    "id": "int pk",
    "name": "string",
    "email": "string",
    "roleId": "ref Role.id"
  },
  "Role": {
    "id": "int pk",
    "name": "string"
  }
}
```
Click **Apply Changes** → See diagram update

### 3. Edit Schema (Method B: Visual)
- Toggle **Sync Mode ON**
- Drag from node handle to another node
- Edge created → JSON updates automatically
- Delete edge → JSON updates

### 4. Arrange & Export
- Click **Auto Layout** for clean arrangement
- Export PNG for documentation
- Export JSON for backup

---

## 🔧 Key Components

| Component | Purpose |
|-----------|---------|
| `DBTool.tsx` | Main container with header & dark mode |
| `ERDCanvas.tsx` | React Flow canvas with controls |
| `SchemaEditor.tsx` | Monaco JSON editor panel |
| `TableNode.tsx` | Custom table visualization |
| `dbToolStore.ts` | Zustand state management |

---

## 📝 JSON Schema Syntax

```
"fieldName": "type [pk] [ref Table.field]"
```

**Examples:**
- `"id": "int pk"` → Primary key
- `"name": "string"` → Regular field  
- `"userId": "ref User.id"` → Foreign key

---

## 🎨 Features Breakdown

### Sync Mode OFF (Default)
- Drag nodes freely
- No connection editing
- Changes via JSON only
- Good for: Viewing, arranging

### Sync Mode ON
- Create relationships by connecting
- Delete edges to remove FKs
- Live JSON updates
- Good for: Schema design

---

## 📦 File Structure

```
DBTool/
├── components/        # React components
├── stores/           # Zustand store
├── types/            # TypeScript interfaces
├── utils/            # Parsers & utilities
├── styles/           # CSS modules
└── consts/           # Sample data
```

---

## 🐛 Quick Troubleshooting

**Nodes not showing?**  
→ Check console for errors, verify dependencies installed

**Can't connect nodes?**  
→ Enable Sync Mode toggle

**Export not working?**  
→ Check browser download permissions

**Dark mode issues?**  
→ Clear cache, restart dev server

---

## 🎓 Learn More

- Full documentation: `README.md`
- Installation help: `INSTALL.md`
- Schema examples: `consts/schema.json`

---

## 💡 Pro Tips

1. **Use Auto Layout** after adding many tables
2. **Format JSON** before applying to catch syntax errors
3. **Export frequently** to save your work
4. **Sync Mode OFF** for presentations (prevents accidental edits)
5. **MiniMap** helps navigate large schemas

---

## 🎯 Common Use Cases

### Database Design
1. Start with entities
2. Add fields with types
3. Define relationships with `ref`
4. Export as documentation

### Reverse Engineering
1. Paste existing schema JSON
2. Auto-layout for clarity
3. Export PNG for team

### Teaching/Presentations
1. Load example schema
2. Turn Sync Mode OFF
3. Present with drag & zoom
4. Dark mode for better visibility

---

**Ready to build?** Open `/dbtool` and start designing! 🎉
