"use client";
import { documentAttributeService } from "@aq-fe/core-ui/shared/APIs/documentAttributeService";
import { documentService } from "@aq-fe/core-ui/shared/APIs/documentService";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { CustomButtonViewFileAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomButtonViewFileAPI";
import { colorsObject } from "@aq-fe/core-ui/shared/consts/object/colorsObject";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Document } from "@aq-fe/core-ui/shared/interfaces/Document";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { Accordion, Alert, Blockquote, Skeleton } from "@mantine/core";
import { IconBug } from "@tabler/icons-react";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import { F_formTemplateDocs_Create } from "./F_formTemplateDocs_Create";
import { F_formTemplateDocs_Delete } from "./F_formTemplateDocs_Delete";
import { F_formTemplateDocs_DeleteList } from "./F_formTemplateDocs_DeleteList";
import F_formTemplateDocs_Export from "./F_formTemplateDocs_Export";
import F_formTemplateDocs_Import from "./F_formTemplateDocs_Import";
import { F_formTemplateDocs_Update } from "./F_formTemplateDocs_Update";
interface I {
  documentType?: number;
  id?: number;
  code?: string;
  name?: string;
  concurrencyStamp?: string;
  isEnabled?: boolean;
}

export function F_formTemplateDocs_Read({ FormTypeId }: { FormTypeId: number }) {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const documentAttributeQuery = useCustomReactQuery({
    queryKey: ["F_formTemplateDocs_Read" + FormTypeId],
    axiosFn: () => documentAttributeService.GetByType(FormTypeId)
  })

  useEffect(() => {
    if (documentAttributeQuery.data && documentAttributeQuery.data.length > 0) {
      const firstItemId = documentAttributeQuery.data[0]?.id?.toString();
      if (firstItemId && !openItems.includes(firstItemId)) {
        setOpenItems([firstItemId]);
      }
    }
  }, [documentAttributeQuery.data]);

  if (documentAttributeQuery.data?.length == 0)
    return <Blockquote color="yellow">Chưa có loại văn bản</Blockquote>;
  if (documentAttributeQuery.isError)
    return <Alert icon={<IconBug />} color={'red'} title="Có lỗi xảy ra!" m={'md'} />

  return (
    <Skeleton h={500} visible={documentAttributeQuery.isLoading}>
      <CustomFlexColumn>
        <Accordion
          variant="separated"
          radius="sm"
          styles={{
            item: {
              backgroundColor: colorsObject.mantineBackgroundTertiary,
            }
          }}
          value={openItems}
          onChange={setOpenItems}
          multiple
        >
          {documentAttributeQuery.data?.map((item, idx) => (
            <SubRead
              key={idx}
              name={item.name!}
              id={item.id!}
              FormTypeId={FormTypeId}
            />
          ))}
        </Accordion>
      </CustomFlexColumn>
    </Skeleton >
  );
}

function SubRead({
  name,
  id,
  FormTypeId,
}: {
  name: string;
  id: number;
  FormTypeId: number;
}) {


  const documentQuery = useCustomReactQuery({
    queryKey: ["SF2_3Read" + id],
    axiosFn: () => documentService.GetByDocumentAttribute(id)
  })
  const columns = useMemo<MRT_ColumnDef<Document>[]>(
    () => [
      {
        header: "Số quy định",
        accessorKey: "decisionCode",
      },
      {
        header: "Ngày ban hành",
        accessorFn: (row) =>
          dateUtils.toDDMMYYYY(new Date(row.promulgateDate!)),
      },
      {
        header: "Tên tài liệu",
        accessorKey: "name",
      },
      {
        header: "File",
        accessorFn: (row) => {
          return (
            <CustomCenterFull>
              <CustomButtonViewFileAPI filePath={row.path} />
            </CustomCenterFull>
          );
        },
      },
    ],
    []
  );

  return (
    <Skeleton mt={10} visible={documentQuery.isLoading} >
      <Accordion.Item key={id.toString()} value={id.toString()}>
        <Accordion.Control>{name}</Accordion.Control>
        <Accordion.Panel>
          <CustomDataTable
            isLoading={documentQuery.isLoading}
            isError={documentQuery.isError}
            columns={columns}
            data={documentQuery.data || []}
            renderTopToolbarCustomActions={({ table }) => (
              <CustomCenterFull>
                <F_formTemplateDocs_Create FormTypeId={FormTypeId} documentAttributeId={id} />
                <F_formTemplateDocs_Import
                  FormTypeId={FormTypeId}
                  documentAttributeId={id}
                />
                <F_formTemplateDocs_Export table={table} />
                <F_formTemplateDocs_DeleteList
                  values={table.getSelectedRowModel().rows.map((row) => row.original)}
                />
              </CustomCenterFull>
            )}
            renderRowActions={({ row }) => (
              <CustomCenterFull>
                <F_formTemplateDocs_Update
                  FormTypeId={FormTypeId}
                  values={row.original!}
                />
                <F_formTemplateDocs_Delete
                  id={row.original.id!}
                  contextData={row.original.decisionCode!}
                />
              </CustomCenterFull>
            )}
            enableRowSelection
          />
        </Accordion.Panel>
      </Accordion.Item>
    </Skeleton>

  );
}
