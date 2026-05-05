"use client";
import { MyFlexColumn } from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { Accordion, Alert, Blockquote, Skeleton } from "@mantine/core";

import { MyCenterFull } from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";

import { documentAttributeService } from "@/APIs/documentAttributeService";
import { documentService } from "@/APIs/documentService";
import { MyButtonViewFileAPI } from "@/core";
import { useMyReactQuery } from "@/hooks";
import { IDocument } from "@/interfaces";
import { colorsObject } from "@/shared/consts/colorsObject";
import { utils_date } from "@/utils-v2";
import { IconBug } from "@tabler/icons-react";
import { F_formTemplateDocs_Delete } from "./F_formTemplateDocs_Delete";
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

  const documentAttributeQuery = useMyReactQuery({
    queryKey: ["F_formTemplateDocs_Read" + FormTypeId],
    axiosFn: () => documentAttributeService.GetByType(FormTypeId)
  })

  useEffect(() => {
    if (documentAttributeQuery.data && documentAttributeQuery.data.length > 0) {
      const firstItemId = documentAttributeQuery.data[0].id?.toString();
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
      <MyFlexColumn>
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
      </MyFlexColumn>
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


  const documentQuery = useMyReactQuery({
    queryKey: ["SF2_3Read" + id],
    axiosFn: () => documentService.GetByDocumentAttribute(id)
  })
  const columns = useMemo<MRT_ColumnDef<IDocument>[]>(
    () => [
      {
        header: "Số quy định",
        accessorKey: "decisionCode",
      },
      {
        header: "Ngày ban hành",
        accessorFn: (row) =>
          utils_date.toDDMMYYYY(new Date(row.promulgateDate!)),
      },
      {
        header: "Tên tài liệu",
        accessorKey: "name",
      },
      {
        header: "File",
        accessorFn: (row) => {
          return (
            <MyCenterFull>
              <MyButtonViewFileAPI filePath={row.path} />
            </MyCenterFull>
          );
        },
      },
    ],
    []
  );
  if (documentQuery.isLoading) return "Loading...";
  if (documentQuery.isError) return "Error!";
  return (
    <Skeleton mt={10} visible={documentQuery.isLoading} >
      <Accordion.Item key={id.toString()} value={id.toString()}>
        <Accordion.Control>{name}</Accordion.Control>
        <Accordion.Panel>
          <MyDataTable
            isLoading={documentQuery.isLoading}
            isError={documentQuery.isError}
            columns={columns}
            data={documentQuery.data || []}
            renderRowActions={({ row }) => (
              <MyCenterFull>
                <F_formTemplateDocs_Update
                  FormTypeId={FormTypeId}
                  values={row.original!}
                />
                <F_formTemplateDocs_Delete
                  id={row.original.id!}
                  contextData={row.original.decisionCode!}
                />
              </MyCenterFull>
            )}
          />
        </Accordion.Panel>
      </Accordion.Item>
    </Skeleton>

  );
}
