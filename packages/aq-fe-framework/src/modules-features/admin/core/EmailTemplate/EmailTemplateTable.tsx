import { emailTemplateService } from "@/APIs/emailTemplateService";
import { MyCenterFull, MyDataTable, MyFieldset } from "@/components";
import { useMyReactQuery } from "@/hooks";
import { IEmailTemplate } from "@/interfaces/IEmailTemplate";
import { useStore_Permission } from "@/stores";
import { Group } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import EmailTemplateButtonImport from "./EmailTemplateButtonImport";
import { EmailTemplateCreateUpdateButton } from "./EmailTemplateCreateUpdateButton";
import { MailTemplateDeleteButton } from "./EmailTemplateDeleteButton";
import EmailTemplateDeleteListButton from "./EmailTemplateDeleteListButton";
import EmailTemplateExport from "./EmailTemplateExport";

export type emailTemplateEnum = {
  emailTemplateEnum: Record<number, string>;
};


export function EmailTemplateTable({ emailTemplateEnum }: emailTemplateEnum) {
  const storePermission = useStore_Permission();
  const mailTemplateQuery = useMyReactQuery({
    queryKey: ["mailTemplates"],
    axiosFn: () => emailTemplateService.getAll(),
  });

  const columns = useMemo<MRT_ColumnDef<IEmailTemplate>[]>(
    () => [

      {
        header: "Tiêu đề thông báo",
        accessorKey: "name",
      },
      {
        header: "Loại hành động",
        accessorKey: "type",
        accessorFn(originalRow) {
          return emailTemplateEnum[originalRow.type || 0] || "";
        },
      },
    ],
    []
  );
  return (
    <MyFieldset title="Danh sách mẫu Mail thông báo">
      <MyDataTable
        isLoading={mailTemplateQuery.isLoading}
        isError={mailTemplateQuery.isError}
        columns={columns}
        data={mailTemplateQuery.data || []}
        enableRowSelection={true}
        enableRowNumbers={true}
        renderTopToolbarCustomActions={({ table }) => {
          const selectedRows =
            table.getSelectedRowModel().flatRows.map((item) => item.original) || [];
          return (
            <Group>
              {storePermission.state?.currentPermissionPage?.isCreate && (
                <>
                  <EmailTemplateCreateUpdateButton emailTemplateEnum={emailTemplateEnum} />
                  <EmailTemplateButtonImport emailTemplateEnum={emailTemplateEnum} />
                </>
              )}
              {storePermission.state?.currentPermissionPage?.isExport && (
                <EmailTemplateExport
                  emailTemplateEnum={{ emailTemplateEnum }}
                  table={table} />
              )}
              <EmailTemplateDeleteListButton values={selectedRows} />
            </Group>
          );
        }}
        renderRowActions={({ row }) => (
          <MyCenterFull>
            <EmailTemplateCreateUpdateButton emailTemplateEnum={emailTemplateEnum} initValue={row.original} />
            <MailTemplateDeleteButton values={row.original} />
          </MyCenterFull>
        )}
      />
    </MyFieldset>
  );
}
