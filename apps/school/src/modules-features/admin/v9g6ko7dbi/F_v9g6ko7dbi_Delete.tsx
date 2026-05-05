// src/modules-features/admin/v9g6ko7dbi/F_v9g6ko7dbi_Delete.tsx
'use client';

import { MyActionIconDelete } from "aq-fe-framework/components";

export default function F_v9g6ko7dbi_Delete({ maSuKien }: { maSuKien: string }) {
    return (
        <>
            <MyActionIconDelete onSubmit={() => { }} contextData={maSuKien} />
        </>
    );
}