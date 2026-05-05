"use client";

import { IComment } from "@/shared/interfaces/comment/IComment";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo } from "react";
import { service_EAQComment } from "@/shared/APIs/service_EAQComment";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Stack } from "@mantine/core";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";
import {
  CustomButtonCreateUpdate
} from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";

export default function ShareExternalAssessmentEvaluate({
  taskDetailId,
  selfAssessmentType,
  eaqSelfAssessmentId,
  enableCreateButton = false,
  isUpdate = false,
  maxHeight = "322px",
  minHeight = "322px",
}: {
  taskDetailId: number;
  selfAssessmentType: number;
  eaqSelfAssessmentId?: number;
  enableCreateButton?: boolean;
  isUpdate?: boolean;
  maxHeight?: number | string;
  minHeight?: number | string;
}) {
  const queryClient = useQueryClient();
  const CommentQuery = useCustomReactQuery({
    queryKey: ["CommentQuery", selfAssessmentType],
    axiosFn: async () => {
      const response = await service_EAQComment.getCommentsByTaskDetailIds({
        eaqTaskDetailIds: [taskDetailId],
        isExternal: true,
      });
      // Lọc comments theo selfAssessmentType từ prop
      const filteredComments =
        response.data?.data?.filter(
          (comment: IComment) => comment.selfAssessmentType === selfAssessmentType
        ) ?? [];

      return {
        ...response,
        data: {
          ...response.data,
          data: filteredComments,
        },
      };
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: async (commentId: number) => {
      return service_EAQComment.delete(commentId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["CommentQuery", selfAssessmentType],
      });
      queryClient.invalidateQueries({
        queryKey: ["CommentQueryContainer", taskDetailId],
      });
    },
  });

  const columns = useMemo<MRT_ColumnDef<IComment>[]>(
    () => [
      { header: "Nội dung đề cập", accessorKey: "content" },
      { header: "Nhận xét và yêu cầu hiệu chỉnh", accessorKey: "commentDetail", size: 300 },
    ],
    []
  );

  return (
    <CustomFieldset title="Nội dung nhận xét">
      <CustomDataTable
        columns={columns}
        data={CommentQuery.data || []}
        initialState={{
          columnSizing: { "mrt-row-actions": 60 },
        }}
        mantineTableContainerProps={{
          style: { maxHeight: maxHeight, minHeight: minHeight, overflowY: "auto" },
        }}
        renderRowActions={({ row }) => {
          return (
            <CustomCenterFull>
              {isUpdate && (
                <CreateUpdateCommentButton
                  eaqSelfAssessmentId={eaqSelfAssessmentId ?? 0}
                  selfAssessmentType={selfAssessmentType}
                  taskDetailId={taskDetailId}
                  data={row.original}
                />
              )}
              <CustomActionIconDelete
                contextData={row.index + 1 + " "} //ép kiểu string
                onSubmit={() => {
                  deleteCommentMutation.mutate(row.original.id ?? 0);
                }}
              />
            </CustomCenterFull>
          );
        }}
        renderTopToolbarCustomActions={({ table }) => {
          if (enableCreateButton) {
            return (
              <CreateUpdateCommentButton
                eaqSelfAssessmentId={eaqSelfAssessmentId ?? 0}
                selfAssessmentType={selfAssessmentType}
                taskDetailId={taskDetailId}
              />
            );
          }
          return null;
        }}
      />
    </CustomFieldset>
  );
}

export function CreateUpdateCommentButton({
  eaqSelfAssessmentId,
  taskDetailId,
  selfAssessmentType,
  data,
  disabled = false,
  initialContent,
}: {
  eaqSelfAssessmentId: number;
  taskDetailId: number;
  selfAssessmentType: number;
  data?: IComment;
  disabled?: boolean;
  initialContent?: string;
}) {
  const disc = useDisclosure(false);
  const [_, { close }] = disc;
  const queryClient = useQueryClient();

  const form = useForm<IComment>({
    initialValues: {
      content: data?.content || initialContent || "",
      commentDetail: data?.commentDetail || "",
      eaqSelfAssessmentId: eaqSelfAssessmentId ?? -1,
      selfAssessmentType: selfAssessmentType,
      isExternal: true,
    },
    validate: {
      content: (value) => (value && value.trim() ? null : "Vui lòng nhập nội dung đề cập"),
      commentDetail: (value) =>
        value && value.trim() ? null : "Vui lòng nhập nhận xét và yêu cầu hiệu chỉnh",
    },
  });

  useEffect(() => {
    if (!data) {
      form.setFieldValue("content", initialContent || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialContent, data]);

  const handleSave = () => {
    const validation = form.validate();
    if (validation.hasErrors) {
      return false;
    }

    const payload = {
      ...form.values,
      eaqSelfAssessmentId: eaqSelfAssessmentId,
      selfAssessmentType: selfAssessmentType,
      isExternal: true,
    };

    if (data) {
      return service_EAQComment.update({
        ...data,
        ...payload,
      });
    }

    return service_EAQComment.create(payload);
  };

  return (
    <CustomButtonCreateUpdate
      form={form}
      modalProps={{
        size: "70%",
        title: !data ? "Thêm nhận xét" : "Cập nhật nhận xét",
      }}
      buttonProps={{
        children: "Thêm nhận xét",
        disabled: disabled,
      }}
      isUpdate={!!data}
      onSubmit={() => handleSave()}
      disclosure={disc}
      useMyReactMutationProps={{
        successNotification: !data ? "Thêm nhận xét thành công!" : "Cập nhật nhận xét thành công!",
        options: {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["CommentQuery", selfAssessmentType],
            });
            queryClient.invalidateQueries({
              queryKey: ["CommentQueryContainer", taskDetailId],
            });
            close();
          }
        }
      }}
    >
      <Stack gap="md">
        <CustomTextArea
          {...form.getInputProps("content")}
          label="Nội dung đề cập"
          minRows={1}
          maxRows={6}
          placeholder="Nhập nội dung đề cập"
        />
        <CustomTextArea
          {...form.getInputProps("commentDetail")}
          label="Nhận xét và yêu cầu hiệu chỉnh"
          minRows={8}
          maxRows={8}
          placeholder="Nhập nhận xét và yêu cầu hiệu chỉnh"
        />
      </Stack>
    </CustomButtonCreateUpdate>
  );
}
