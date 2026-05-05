"use client";
import {
  MyActionIconDelete,
} from "aq-fe-framework/components";

interface Props{
  id?: number | null;
  code: string;
}

export default function StudentGradingDeleteButton({
  id,
  code,
}: Props ) {
  return (
    <MyActionIconDelete
      // title="Xác nhận xóa cấp độ"
      contextData={code}
      onSubmit={id ? () => {} : () => {}}
    />
  );
}