"use client";
import {
  MyActionIconDelete,
} from "aq-fe-framework/components";

interface Props{
  id?: number | null;
  code: string;
}

export default function FeeDeclarationDeleteButton({
  id,
  code,
}: Props ) {
  return (
    <MyActionIconDelete
      // title="Xác nhận xóa đơn giá"
      contextData={code}
      onSubmit={id ? () => {} : () => {}}
    />
  );
}