# DBTool Installation Guide

## Prerequisites

Make sure you're in the base-app directory:
```bash
cd apps/base-app
```

## Step 1: Install Dependencies

Run the following command to install all required packages:

```bash
pnpm add @xyflow/react dagre @types/dagre html-to-image @monaco-editor/react
```

### Package Details

- **@xyflow/react** (latest): React Flow library for building node-based UIs
- **dagre**: Graph layout library for auto-arrangement
- **@types/dagre**: TypeScript definitions for dagre
- **html-to-image**: Export canvas to PNG
- **@monaco-editor/react**: Monaco Editor (VS Code's editor) for JSON editing

## Step 2: Verify Installation

Check that the packages are added to `package.json`:

```json
{
  "dependencies": {
    "@xyflow/react": "^12.x.x",
    "@monaco-editor/react": "^4.x.x",
    "dagre": "^0.8.x",
    "html-to-image": "^1.x.x"
  },
  "devDependencies": {
    "@types/dagre": "^0.7.x"
  }
}
```

## Step 3: Run the Application

Start the development server:

```bash
pnpm dev
```

## Step 4: Access DBTool

Open your browser and navigate to:
```
http://localhost:3099/dbtool
```

## File Structure Created

```
src/features/DBTool/
├── components/
│   ├── DBTool.tsx              ✅ Main container
│   ├── ERDCanvas.tsx            ✅ React Flow canvas
│   ├── SchemaEditor.tsx         ✅ Monaco editor
│   └── TableNode.tsx            ✅ Custom node
├── stores/
│   └── dbToolStore.ts           ✅ Zustand store
├── types/
│   └── schema.ts                ✅ TypeScript types
├── utils/
│   ├── schemaParser.ts          ✅ Schema conversion
│   ├── layoutUtils.ts           ✅ Auto-layout
│   └── exportUtils.ts           ✅ Export utilities
├── styles/
│   ├── DBTool.module.css        ✅ Main styles
│   ├── ERDCanvas.module.css     ✅ Canvas styles
│   ├── SchemaEditor.module.css  ✅ Editor styles
│   └── TableNode.module.css     ✅ Node styles
├── consts/
│   └── schema.json              ✅ Sample schema
├── index.ts                     ✅ Feature exports
└── README.md                    ✅ Documentation
```

## Troubleshooting

### Issue: "Module not found: @xyflow/react"
**Solution**: Run `pnpm install` in the base-app directory

### Issue: "Cannot find module 'dagre'"
**Solution**: Ensure all dependencies are installed:
```bash
pnpm add dagre @types/dagre
```

### Issue: Dark mode not working
**Solution**: Check that Mantine's color scheme is properly configured

### Issue: Export PNG not working
**Solution**: 
1. Verify html-to-image is installed
2. Check browser console for errors
3. Ensure the canvas element has the correct ID

### Issue: Monaco Editor not loading
**Solution**: 
1. Check network tab for CDN loading
2. Verify @monaco-editor/react is installed
3. Clear browser cache

## Features to Test

1. ✅ Load default schema
2. ✅ Edit JSON in Monaco Editor
3. ✅ Apply changes to update diagram
4. ✅ Drag nodes around canvas
5. ✅ Toggle Sync Mode
6. ✅ Connect nodes (in Sync Mode)
7. ✅ Delete edges (in Sync Mode)
8. ✅ Auto Layout button
9. ✅ Export PNG
10. ✅ Export JSON
11. ✅ Toggle Dark Mode
12. ✅ Undo/Redo functionality
13. ✅ Zoom and Pan
14. ✅ MiniMap navigation

## Next Steps

### Customize Default Schema
Edit `src/features/DBTool/stores/dbToolStore.ts`:
```typescript
const defaultSchema: DatabaseSchema = {
  // Your custom schema here
};
```

### Add to Navigation
Update your app's navigation to include a link to `/dbtool`

### Customize Styling
Modify the CSS modules in `styles/` directory to match your design system

### Add Keyboard Shortcuts
Extend `ERDCanvas.tsx` to add custom shortcuts:
```typescript
useEffect(() => {
  const handleKeyboard = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === 'z') {
      undo();
    }
  };
  window.addEventListener('keydown', handleKeyboard);
  return () => window.removeEventListener('keydown', handleKeyboard);
}, [undo]);
```

## Production Build

Before deploying:

```bash
pnpm build
```

Ensure no TypeScript errors and all builds successfully.

## Support

For issues or questions:
1. Check the README.md in DBTool directory
2. Review TypeScript errors in IDE
3. Check browser console for runtime errors
4. Verify all dependencies are installed

## Performance Tips

- Large schemas (>50 tables): Consider pagination or filtering
- Enable only necessary React Flow features
- Use memo for custom nodes (already implemented)
- Debounce schema updates in sync mode if needed

Enjoy building your ERD diagrams! 🎉
