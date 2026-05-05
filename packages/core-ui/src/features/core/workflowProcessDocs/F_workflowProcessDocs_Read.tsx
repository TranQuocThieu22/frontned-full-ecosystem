"use client";
import { documentAttributeService } from "@aq-fe/core-ui/shared/APIs/documentAttributeService";
import { documentService } from "@aq-fe/core-ui/shared/APIs/documentService";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { CustomButtonViewFileAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomButtonViewFileAPI";
import { colorsObject } from "@aq-fe/core-ui/shared/consts/object/colorsObject";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { Accordion, Alert, Blockquote, Skeleton } from "@mantine/core";
import { IconBug } from "@tabler/icons-react";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import { F_workflowProcessDocs_Create } from "./F_workflowProcessDocs_Create";
import { F_workflowProcessDocs_Delete } from "./F_workflowProcessDocs_Delete";
import { F_workflowProcessDocs_DeleteList } from "./F_workflowProcessDocs_DeleteList";
import F_workflowProcessDocs_Export from "./F_workflowProcessDocs_Export";
import F_workflowProcessDocs_Import from "./F_workflowProcessDocs_Import";
import { F_workflowProcessDocs_Update } from "./F_workflowProcessDocs_Update";
interface I {
  documentType?: number;
  id?: number;
  code?: string;
  name?: string;
  concurrencyStamp?: string;
  isEnabled?: boolean;
}

export function F_workflowProcessDocs_Read({
  WorkflowTypeId,
}: {
  WorkflowTypeId: number;
}) {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const documentAttributeQuery = useCustomReactQuery({
    queryKey: ["F_workflowProcessDocs_Read" + WorkflowTypeId],
    axiosFn: () => documentAttributeService.getByType(WorkflowTypeId)
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
              backgroundColor: colorsObject.mantineBackgroundTertiary
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
              WorkflowTypeId={WorkflowTypeId}
            />
          ))}
        </Accordion>
      </CustomFlexColumn>
    </Skeleton>
  );
}

function SubRead({
  name,
  id,
  WorkflowTypeId,
}: {
  name: string;
  id: number;
  WorkflowTypeId: number;
}) {

  // const documentQuery = useQuery<I[]>({
  //   queryKey: ["SubRead" + id],
  //   queryFn: async () => {
  //     const result = await baseAxios.get(
  //       `/Document/GetByDocumentAttribute?id=${id}`
  //     );
  //     return result.data.data;
  //   },
  // });
  const documentQuery = useCustomReactQuery({
    queryKey: ["F_workflowProcessDocs_Read" + id],
    axiosFn: () => documentService.getByDocumentAttribute(id)
  })
  const columns = useMemo<MRT_ColumnDef<I>[]>(
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
                <F_workflowProcessDocs_Create WorkflowTypeId={WorkflowTypeId} documentAttributeId={id} />
                <F_workflowProcessDocs_Import
                  WorkflowTypeId={WorkflowTypeId}
                  documentAttributeId={id}
                />
                <F_workflowProcessDocs_Export table={table} />
                <F_workflowProcessDocs_DeleteList
                  values={table.getSelectedRowModel().rows.map((row) => row.original)}
                />
              </CustomCenterFull>
            )}
            renderRowActions={({ row }) => (
              <CustomCenterFull>
                <F_workflowProcessDocs_Update
                  WorkflowTypeId={WorkflowTypeId}
                  values={row.original!}
                />
                <F_workflowProcessDocs_Delete
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
interface I {
  path?: string;
  orderBy?: number;
  documentType?: number;
  promulgateDate?: Date;
  decisionCode?: string;
  departmentName?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  conclusion?: string;
  note?: string;
  documentAttributeId?: number;
  documentAttributeName?: string;
  isCycleCheck?: boolean;
  meetingDate?: Date;
  fileDetail?: {
    fileBase64String?: string;
    fileExtension?: string;
    fileName?: string;
  };
  id?: number;
  code?: string;
  name?: string;
  concurrencyStamp?: string;
  isEnabled?: boolean;
  ngayChinhSua?: Date;
  nguoiChinhSua?: string;
}
