// src/modules-features/admin/e7hpvpesjf/F_e7hpvpesjf_DeleteBaoTri.tsx
'use client';

import { MyActionIconDelete } from "aq-fe-framework/components";

interface F_e7hpvpesjf_DeleteBaoTriProps {
  id: number;
  onDelete: (id: number) => void;
}

export default function F_e7hpvpesjf_DeleteBaoTri({ id, onDelete }: F_e7hpvpesjf_DeleteBaoTriProps) {
  return (
    <MyActionIconDelete
      onSubmit={() => onDelete(id)}
      contextData={String(id)}
    />
  );
}