'use client'
import { service_document } from "@/api/services/service_document";
import { KEYVALUE_DOCUMENT_TYPES } from "@/constants/key-value/documentTypes";
import { Accordion, Text } from "@mantine/core";
import {
  MRT_ColumnDef
} from "mantine-react-table";
import { useMemo } from "react";
import { Document } from "@aq-fe/core-ui/shared/interfaces/Document";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCheckbox } from "@aq-fe/core-ui/shared/components/input/CustomCheckbox";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";

export default function ProcedureListTable() {
  const Q_Document = useCustomReactQuery({
    queryKey: ["document.GetByType"],
    axiosFn: () => service_document.getByType(KEYVALUE_DOCUMENT_TYPES.Workflow)
  })

  const documentGroups = useMemo(() => {
    if (!Q_Document.data) return {};

    return Q_Document.data.reduce((groups, document) => {
      const key = document.documentAttributeId || 0;
      if (!groups[key]) {
        groups[key] = {
          name: document.documentAttributeName || 'Khác',
          documents: []
        };
      }
      groups[key].documents.push(document);
      return groups;
    }, {} as Record<number, { name: string, documents: Document[] }>);
  }, [Q_Document.data]);

  const documentAttributeIds = useMemo(() => {
    return Object.keys(documentGroups).map(Number);
  }, [documentGroups]);

  const accordionDefaultValue = useMemo(() => {
    if (!documentAttributeIds.length) return [];
    return documentAttributeIds.map(id => id.toString());
  }, [documentAttributeIds]);

  // Handle loading state
  if (Q_Document.isLoading) return "Đang tải dữ liệu..."

  // Handle error state
  if (Q_Document.isError) return "Có lỗi xảy ra!"

  // Don't show anything when the list is empty (Requirement 1)
  if (!Q_Document.data || Q_Document.data.length === 0) {
    return null;
  }

  return (
    <CustomFieldset title="Danh mục quy trình">
      <CustomFlexColumn>
        <Accordion
          defaultValue={accordionDefaultValue}
          multiple
        >
          {documentAttributeIds.map((attributeId) => (
            <DocumentSubTable
              key={attributeId}
              attributeName={documentGroups[attributeId]?.name ?? ''}
              documents={documentGroups[attributeId]?.documents ?? []}
              attributeId={attributeId}
            />
          ))}
        </Accordion>
      </CustomFlexColumn>
    </CustomFieldset>
  )
}

function DocumentSubTable({ attributeName, documents, attributeId }: { attributeName: string, documents: Document[], attributeId: number }) {
  const columns = useMemo<MRT_ColumnDef<Document>[]>(() => [
    { accessorKey: "name", header: "Tên tài liệu", enableSorting: true },
    {
      accessorKey: "isCycleCheck",
      header: "Rà soát định kỳ",
      enableSorting: true,
      Cell: ({ row }) => (
        <CustomCenterFull>
          <CustomCheckbox
            checked={row.original.isCycleCheck ? row.original.isCycleCheck : false}
            readOnly
          />
        </CustomCenterFull>
      ),
    },
  ], []);

  return (
    <Accordion.Item value={attributeId.toString()}>
      <Accordion.Control>{attributeName}</Accordion.Control>
      <Accordion.Panel>
        {!documents || documents.length === 0 ? (
          <Text ta="center" c="dimmed" fs="italic">
            Không có dữ liệu!
          </Text>
        ) : (
          <CustomDataTable
            enableRowSelection={false}
            data={documents}
            columns={columns}
          // renderRowActions={({ row }) => {
          //   return (
          //     <CustomCenterFull>
          //todo coi lại cái này
          //       <CustomButtonViewPDF id={row.original.id} isActionIcon />
          //       <CustomActionIconDownloadPDF pdfLink='' />
          //     </CustomCenterFull>
          //   );
          // }}
          />
        )}
      </Accordion.Panel>
    </Accordion.Item>
  )
}
