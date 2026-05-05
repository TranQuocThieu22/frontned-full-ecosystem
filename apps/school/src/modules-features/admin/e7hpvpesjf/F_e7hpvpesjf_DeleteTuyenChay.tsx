// src/modules-features/admin/e7hpvpesjf/F_e7hpvpesjf_DeleteTuyenChay.tsx
'use client';

import { MyActionIconDelete } from "aq-fe-framework/components";

interface F_e7hpvpesjf_DeleteTuyenChayProps {
    id: number;
    onDelete: (id: number) => void;
}

export default function F_e7hpvpesjf_DeleteTuyenChay({ id, onDelete }: F_e7hpvpesjf_DeleteTuyenChayProps) {
    return (
        <MyActionIconDelete
            onSubmit={() => onDelete(id)}
            contextData={String(id)}
        />
    );
}