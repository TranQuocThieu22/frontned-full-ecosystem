// src/modules-features/admin/lpoa7imbik/F_lpoa7imbik_DeleteLichTrinh.tsx
'use client';

import { MyActionIconDelete } from "aq-fe-framework/components";

interface F_lpoa7imbik_DeleteLichTrinhProps {
    id: number;
    code: string;
    onDelete: (id: number) => void;
}

export default function F_lpoa7imbik_DeleteLichTrinh({ id, code, onDelete }: F_lpoa7imbik_DeleteLichTrinhProps) {
    return (
        <MyActionIconDelete
            onSubmit={() => onDelete(id)}
            contextData={code}
        />
    );
}