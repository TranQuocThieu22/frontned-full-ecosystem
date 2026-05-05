import { emailTemplateService } from "@aq-fe/core-ui/shared/APIs/emailTemplateService";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomRichTextEditor } from "@aq-fe/core-ui/shared/components/input/CustomRichTextEditor";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { EmailTemplate } from "@aq-fe/core-ui/shared/interfaces/EmailTemplate";
import { EmailVariable } from "@aq-fe/core-ui/shared/interfaces/EmailVariable";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { Badge, Button, Grid, Stack, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo } from "react";

interface Props {
  emailTemplateEnum: Record<number, string>;
  initValue?: EmailTemplate
};

const getDefaultBodyFortype1 = () => {
  return ``;
};

// Helper function to get the first enum value as default
const getDefaultEnumValue = (enumObject: Record<number, string>): number => {
  const keys = Object.keys(enumObject).map(key => parseInt(key, 10)).filter(key => !isNaN(key));
  return keys.length > 0 ? Math.min(...keys) : 1;
};

export function EmailTemplateCreateUpdateButton({ initValue, emailTemplateEnum }: Props) {
  const defaultEnumValue = useMemo(() => getDefaultEnumValue(emailTemplateEnum), [emailTemplateEnum]);
  const dics = useDisclosure()
  const form = useForm<EmailTemplate>({
    initialValues: initValue
      ? initValue
      : {
        order: 1,
        body: getDefaultBodyFortype1(),
        type: defaultEnumValue,
        aqModuleId: 1,
        name: "",
        code: "",
      },
    validate: {
      name: (value) => (value ? null : "Không được để trống!"),
      body: (value) => (value ? null : "Không được để trống!"),
    },
  });

  const mailTemplateQuery = useCustomReactQuery({
    queryKey: ["mailTemplates_CreateUpdateButton"],
    axiosFn: () => emailTemplateService.getAll(),
    options: {
      enabled: dics[0]
    }
  });

  // FIX 1: Include type in queryKey to cache different types separately
  // FIX 2: Only enable when modal is open AND type exists
  const mailVariableQuery = useCustomReactQuery({
    queryKey: ["mailVariables", form.values.type],
    axiosFn: () => emailTemplateService.GetEmailVariables(form.values.type),
    options: {
      enabled: dics[0] && !!form.values.type,
      staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    }
  });

  const columns = useMemo<MRT_ColumnDef<EmailVariable>[]>(
    () => [
      {
        header: "Dữ liệu động",
        accessorKey: "code",
        Cell({ row }) {
          return (
            <>
              <Stack gap={4}>
                <Text>{row.original.name}</Text>
                <Badge variant="default" color="gray" size="lg" radius="md">{`{${row.original.code}}`}</Badge>
              </Stack>
            </>
          )
        },
        size: 240,
        minSize: 32,
      },
    ],
    []
  );

  const handleInsertVariable = (variableCode: string) => {
    const current = form.values.body || '<p></p>';
    const variableToInsert = `{${variableCode}}`;
    if (current.includes('<p>') && current.includes('</p>')) {
      const paragraphs = current.split('</p>');

      if (paragraphs.length > 1) {
        const lastParagraphIndex = paragraphs.length - 2;
        paragraphs[lastParagraphIndex] += ` ${variableToInsert}`;
        const newContent = paragraphs.slice(0, -1).join('</p>') + '</p>';

        form.setFieldValue('body', newContent);
      } else {
        const insertPosition = current.lastIndexOf('</p>');

        if (insertPosition > 0) {
          const beforeClosing = current.slice(0, insertPosition);
          const afterClosing = current.slice(insertPosition);
          const newContent = beforeClosing + ` ${variableToInsert}` + afterClosing;
          form.setFieldValue('body', newContent);
        } else {
          const newContent = current + ` ${variableToInsert}`;
          form.setFieldValue('body', newContent);
        }
      }
    } else {
      const cleanContent = current.replace(/<[^>]*>/g, '');
      const newContent = `<p>${cleanContent} ${variableToInsert}</p>`;
      form.setFieldValue('body', newContent);
    }
  };

  useEffect(() => {
    if (!initValue) return;

    form.setInitialValues({
      ...initValue,
    });
    form.setValues({
      ...initValue,
    });
  }, [initValue]);

  // FIX 3: Remove the manual refetch - React Query will handle it automatically
  // with the updated queryKey that includes the type
  useEffect(() => {
    // Manual refetch removed - React Query handles this via queryKey change
  }, [form.values.type]);

  return (
    <CustomButtonCreateUpdate
      disclosure={dics}
      scrollAreaAutosizeProps={{
        h: "auto",
      }}
      modalProps={{
        size: '1640px',
        title: initValue ? "Cập nhật đề xuất" : "Chi tiết đề xuất",
      }}
      useCustomReactMutationProps={{
        successNotification: initValue ? "Cập nhật thành công" : "Tạo thành công",
      }}
      onSubmit={async (values) => {
        form.clearFieldError('type');

        if (!initValue) {
          const existingTemplate = (mailTemplateQuery.data || []).find(
            template => template.type === values.type
          );

          if (existingTemplate) {
            const typeName = emailTemplateEnum[values.type || 0] || `Type ${values.type}`;
            const errorMessage = `Loại hành động "${typeName}" đã tồn tại. Chỉ được tạo 1 Template trong 1 loại hành động.`;

            form.setFieldError('type', errorMessage);
            notifications.show({
              title: 'Lỗi tạo template',
              message: errorMessage,
              color: 'red',
              autoClose: 5000,
            });

            throw new Error(errorMessage);
          }
        }

        try {
          if (initValue) {
            return await emailTemplateService.update(values);
          } else {
            const codes = (mailTemplateQuery.data || [])
              .filter((item) => item.code != null && item.code !== "")
              .map((item) => parseInt(item.code as string, 10))
              .filter((num) => !isNaN(num));

            const maxCode = codes.length > 0 ? Math.max(...codes) : 0;
            const newCode = maxCode + 1;

            return await emailTemplateService.create({
              ...values,
              code: newCode.toString(),
            });
          }
        } catch (error: any) {
          throw error;
        }
      }}
      form={form}
      isUpdate={!!initValue}
    >
      <CustomTextInput error={form.errors.name} label="Tiêu đề" {...form.getInputProps("name")} />
      <CustomSelect
        error={form.errors.type}
        data={converterUtils.enumToSelectOptions(emailTemplateEnum)}
        label="Loại hành động"
        value={form?.values?.type?.toString() || ""}
        onChange={(value) => {
          const newtype = parseInt(value || "0");
          form.setFieldValue("type", newtype);
          setTimeout(() => {
            if (newtype === 1) {
              form.setFieldValue('body', getDefaultBodyFortype1());
            } else {
              form.setFieldValue('body', '<p></p>');
            }
          }, 0);
        }}
        clearable={false}
      />
      <CustomFieldset
        title="Nội dung thông báo"
      >
        <Grid gutter="12">
          <Grid.Col span={{ base: 5, md: 6, lg: 7, xl: 8 }}>
            <CustomRichTextEditor
              richTextEditorContentProps={{
                h: "70vh",
                mah: "70vh"
              }}
              scrollAreaAutosizeProps={{
                h: "70vh",
                mah: "70vh"
              }}
              value={form.values.body || ""}
              onChange={(value) => form.setFieldValue("body", value)}
              inputWrapperProps={{ error: form.errors.body }}
            />

          </Grid.Col>
          <Grid.Col
            span={{ base: 7, md: 6, lg: 5, xl: 4 }}>
            <CustomDataTable
              enableTopToolbar={false}
              enableBottomToolbar={true}
              layoutMode="grid"
              columns={columns}
              data={mailVariableQuery.data || []}
              initialState={{
                pagination: { pageIndex: 0, pageSize: 10 },
              }}
              displayColumnDefOptions={{
                "mrt-row-actions": {
                  header: "Thao tác",
                  minSize: 100
                },
                "mrt-row-numbers": {
                  Header(props) {
                    return (
                      <>
                        STT
                      </>
                    )
                  },
                  size: 56,
                  Cell(props) {
                    return (
                      <>
                        <CustomCenterFull>{props.cell.row.index + 1}</CustomCenterFull>
                      </>
                    )
                  },
                },
              }}
              renderRowActions={({ row }: { row: any }) => (
                <CustomCenterFull>
                  <Button
                    size="compact-md"
                    variant="filled"
                    color="blue.8"
                    onClick={() => {
                      return handleInsertVariable(row.original.code);
                    }}
                  >
                    Sử dụng
                  </Button>
                </CustomCenterFull>
              )}
              mantineBottomToolbarProps={{
                h: { base: 110, xl: 84 },
              }}
            />
          </Grid.Col>
        </Grid>
      </CustomFieldset>
    </CustomButtonCreateUpdate>
  );
}
