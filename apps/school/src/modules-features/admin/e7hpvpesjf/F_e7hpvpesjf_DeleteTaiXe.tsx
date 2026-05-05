// src/modules-features/admin/e7hpvpesjf/F_e7hpvpesjf_DeleteTaiXe.tsx
'use client';

import { MyActionIconDelete } from "aq-fe-framework/components";

interface F_e7hpvpesjf_DeleteTaiXeProps {
    id: number;
    onDelete: (id: number) => void;
}

export default function F_e7hpvpesjf_DeleteTaiXe({ id, onDelete }: F_e7hpvpesjf_DeleteTaiXeProps) {
    return (
        <MyActionIconDelete
            onSubmit={() => onDelete(id)}
            contextData={String(id)}
        />
    );
}