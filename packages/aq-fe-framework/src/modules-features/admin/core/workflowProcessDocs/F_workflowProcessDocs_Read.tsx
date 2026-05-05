"use client";
import { MyFlexColumn } from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { Accordion, Alert, Blockquote, Skeleton } from "@mantine/core";

import { documentAttributeService } from "@/APIs/documentAttributeService";
import { documentService } from "@/APIs/documentService";
import { MyCenterFull } from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useMyReactQuery } from "@/hooks";
import { colorsObject } from "@/shared/consts/colorsObject";
import { IconBug } from "@tabler/icons-react";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import { MyButtonViewFileAPI } from "../../../../core/withAPI/MyButtonViewFileAPI";
import { utils_date } from "../../../../utils-v2";
import { F_workflowProcessDocs_Delete } from "./F_workflowProcessDocs_Delete";
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

  const documentAttributeQuery = useMyReactQuery({
    queryKey: ["F_workflowProcessDocs_Read" + WorkflowTypeId],
    axiosFn: () => documentAttributeService.GetByType(WorkflowTypeId)
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
      </MyFlexColumn>
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
  const documentQuery = useMyReactQuery({
    queryKey: ["F_workflowProcessDocs_Read" + id],
    axiosFn: () => documentService.GetByDocumentAttribute(id)
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
                <F_workflowProcessDocs_Update
                  WorkflowTypeId={WorkflowTypeId}
                  values={row.original!}
                />
                <F_workflowProcessDocs_Delete
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
