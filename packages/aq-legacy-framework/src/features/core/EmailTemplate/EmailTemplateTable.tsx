import { emailTemplateService } from "@aq-fe/aq-legacy-framework/shared/APIs/emailTemplateService";
import { CustomDataTable } from "@aq-fe/aq-legacy-framework/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { useLegacyReactQuery } from "@aq-fe/aq-legacy-framework/shared/hooks/core/useLegacyReactQuery";
import { EmailTemplate } from "@aq-fe/aq-legacy-framework/shared/interfaces/EmailTemplate";
import { usePermissionStore } from "@aq-fe/aq-legacy-framework/shared/stores/usePermissionStore";
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
  const storePermission = usePermissionStore();
  const mailTemplateQuery = useLegacyReactQuery({
    queryKey: ["mailTemplates"],
    axiosFn: () => emailTemplateService.getAll(),
  });

  const columns = useMemo<MRT_ColumnDef<EmailTemplate>[]>(
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
    <CustomFieldset title="Danh sách mẫu Mail thông báo">
      <CustomDataTable
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
          <CustomCenterFull>
            <EmailTemplateCreateUpdateButton emailTemplateEnum={emailTemplateEnum} initValue={row.original} />
            <MailTemplateDeleteButton values={row.original} />
          </CustomCenterFull>
        )}
      />
    </CustomFieldset>
  );
}
