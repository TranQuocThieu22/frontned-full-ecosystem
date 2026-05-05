'use client'
import { MyActionIconDelete } from "aq-fe-framework/components";
export default function F12_2_1DeleteNewCurriculum({ suggestionCode }: { suggestionCode: string }) {
  return (
    <MyActionIconDelete
      contextData={suggestionCode}
      onSubmit={() => {
        console.log("Xoá chương trình học mới với mã đề xuất :", suggestionCode);
      }}
    />
  );
}