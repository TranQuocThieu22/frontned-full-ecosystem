// src/modules-features/admin/lpoa7imbik/F_lpoa7imbik_Delete.tsx
'use client';

import { MyActionIconDelete } from "aq-fe-framework/components";

export default function F_lpoa7imbik_Delete({ maTuyenXe }: { maTuyenXe: string }) {
    return (
        <>
            <MyActionIconDelete onSubmit={() => { }} contextData={maTuyenXe} />
        </>
    );
}