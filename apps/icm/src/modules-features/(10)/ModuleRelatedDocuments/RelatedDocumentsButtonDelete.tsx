"use client";
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";
import { IRelatedDocuments } from "./interface/RelatedDocumentsViewModel";

export default function RelatedDocumentsButtonDelete({
  RelatedDocuments,
}: {
  RelatedDocuments: IRelatedDocuments;
}) {
  return (
    <MyActionIconDelete
      contextData={RelatedDocuments.ipCode}
      onSubmit={() => { }}
    ></MyActionIconDelete>
  );
}
