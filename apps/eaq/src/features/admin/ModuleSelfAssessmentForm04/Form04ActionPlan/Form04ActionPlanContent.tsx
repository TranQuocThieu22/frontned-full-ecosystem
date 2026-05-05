"use client";

import { service_EAQAction } from "@/shared/APIs/service_EAQAction";
import { service_EAQSelfAssessment } from "@/shared/APIs/service_EAQSelfAssessment";
import { ActionIcon, Button, Flex } from "@mantine/core";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { MRT_ColumnDef } from "mantine-react-table";
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState, } from "react";
import Form04ActionPlanDeleteActionPlan from "./Form04ActionPlanDeleteActionPlan";
import { IForm04ActionPlanRowHistoryViewModel } from "./interface";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";

export type Form04ActionPlanContentRef = {
  submit: () => Promise<void>;
  setStatus: (status: number) => void;
};

interface Form04ActionPlanContentProps {
  eaqSelfAssessmentId: number;
  initialActionPlan?: IForm04ActionPlanRowHistoryViewModel[];
  eaqPhaseId: number;
  eaqTaskDetailId: number;
  editMode?: boolean;
}

const targetOptions = [
  { value: "Khắc phục điểm tồn tại", label: "Khắc phục điểm tồn tại" },
  { value: "Phát huy điểm mạnh", label: "Phát huy điểm mạnh" },
];

function Form04ActionPlanContentInternal(
  { eaqSelfAssessmentId, initialActionPlan, eaqPhaseId, eaqTaskDetailId, editMode }: Form04ActionPlanContentProps,
  ref: React.Ref<Form04ActionPlanContentRef>
) {
  const inputRefs = useRef<Record<string, Record<string, any>>>({});
  const [actionPlan, setActionPlan] = useState<IForm04ActionPlanRowHistoryViewModel[]>([]);
  const [selfAssessmentId, setSelfAssessmentId] = useState<number>(eaqSelfAssessmentId ?? 0);
  const statusRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    setActionPlan(initialActionPlan ?? []);
  }, [initialActionPlan]);

  useEffect(() => {
    setSelfAssessmentId(eaqSelfAssessmentId ?? 0);
  }, [eaqSelfAssessmentId]);

  const addRowData = useMemo<IForm04ActionPlanRowHistoryViewModel>(
    () => ({
      target: "",
      detail: "",
      unit: "",
      actionTime: "",
      note: "",
      isAddRow: true,
    }),
    []
  );

  const updateActionPlan = useCallback(
    (rowIndex: number, field: keyof IForm04ActionPlanRowHistoryViewModel, value: string) => {
      const updatedActionPlan = actionPlan.map((item, index) =>
        index === rowIndex ? { ...item, [field]: value } : item
      );
      setActionPlan(updatedActionPlan);
    },
    [actionPlan]
  );

  const handleAdd = useCallback(() => {
    const newRow: IForm04ActionPlanRowHistoryViewModel = {
      target: "",
      detail: "",
      unit: "",
      actionTime: "",
      note: "",
    };
    setActionPlan([...actionPlan, newRow]);
  }, [actionPlan]);

  const handleDeleteNewRow = useCallback(
    (rowIndex: number) => {
      const newActionPlan = actionPlan.filter((_, index) => index !== rowIndex);

      Object.keys(inputRefs.current).forEach((key) => {
        if (key.startsWith(`${rowIndex}-`)) {
          delete inputRefs.current[key];
        }
      });

      const newRefs: Record<string, any> = {};
      Object.entries(inputRefs.current).forEach(([key, ref]) => {
        const [refRowIndex, field] = key.split("-");
        const refIndex = parseInt(refRowIndex!);
        if (refIndex > rowIndex) {
          newRefs[`${refIndex - 1}-${field}`] = ref;
        } else if (refIndex < rowIndex) {
          newRefs[key] = ref;
        }
      });
      inputRefs.current = newRefs;

      setActionPlan(newActionPlan);
    },
    [actionPlan]
  );

  useImperativeHandle(ref, () => ({
    setStatus: (status: number) => {
      statusRef.current = status;
    },
    submit: async () => {
      let ensureSelfAssessmentId = selfAssessmentId;
      if (!ensureSelfAssessmentId || ensureSelfAssessmentId === 0) {
        const res = await service_EAQSelfAssessment.create({
          eaqPhaseId,
          selfAssessmentType: 4,
          name: "Báo cáo tự đánh giá",
          note: "",
          status: statusRef.current,
          eaqTaskDetailId: eaqTaskDetailId,
        } as any);
        ensureSelfAssessmentId =
          (res as any)?.data?.data?.id ?? (res as any)?.data?.id ?? (res as any)?.id ?? 0;
        setSelfAssessmentId(ensureSelfAssessmentId);
      } else if (typeof statusRef.current === "number") {
        await service_EAQSelfAssessment.createOrUpdateList([
          {
            id: ensureSelfAssessmentId,
            selfAssessmentType: 4,
            status: statusRef.current,
            eaqPhaseId,
            name: "Báo cáo tự đánh giá",
            note: "",
            isEnabled: true,
            eaqTaskDetailId: eaqTaskDetailId,
          },
        ]);
      }

      const actionDataList = actionPlan
        .filter((row) => !row.isAddRow)
        .map((row) => {
          const data: any = {
            target: row.target ?? "",
            detail: row.detail ?? "",
            unit: row.unit ?? "",
            actionTime: row.actionTime ?? "",
            note: row.note ?? "",
            eaqSelfAssessmentId: ensureSelfAssessmentId,
            isEnabled: true,
          };
          if (row.id) data.id = row.id;
          return data;
        });

      if (actionDataList.length === 0) return;
      await service_EAQAction.createOrUpdateList(actionDataList);
    },
  }));

  const tableData = useMemo(() => [...actionPlan, addRowData], [actionPlan, addRowData]);

  const columns = useMemo<MRT_ColumnDef<IForm04ActionPlanRowHistoryViewModel>[]>(
    () => [
      {
        header: "Mục tiêu",
        accessorKey: "target",
        size: 250,
        Cell: ({ row }) => {
          if (row.original.isAddRow) {
            return (
              <Button
                leftSection={<IconPlus size={16} />}
                variant="outline"
                size="sm"
                onClick={handleAdd}
                fullWidth
                disabled={!editMode}
              >
                Thêm
              </Button>
            );
          }

          return (
            <CustomSelect
              defaultValue={row.original.target || ""}
              onChange={(value) => updateActionPlan(row.index, "target", value || "")}
              data={targetOptions}
              placeholder="Chọn mục tiêu"
              readOnly={!editMode}
            />
          );
        },
      },
      {
        header: "Nội dung chi tiết",
        accessorKey: "detail",
        size: 300,
        Cell: ({ row }) => {
          if (row.original.isAddRow) return "";

          return (
            <CustomTextArea
              key={`detail-${row.index}-${row.original.detail}`}
              defaultValue={row.original.detail || ""}
              onBlur={(event) => updateActionPlan(row.index, "detail", event.currentTarget.value)}
              placeholder="Nhập nội dung chi tiết"
              autosize
              minRows={1}
              maxRows={4}
              readOnly={!editMode}
            />
          );
        },
      },
      {
        header: "Đơn vị; Người thực hiện",
        accessorKey: "unit",
        Cell: ({ row }) => {
          if (row.original.isAddRow) return "";

          return (
            <CustomTextInput
              key={`action-${row.index}-${row.original.action}`}
              defaultValue={row.original.unit || ""}
              onBlur={(event) => updateActionPlan(row.index, "unit", event.currentTarget.value)}
              placeholder="Nhập đơn vị/người thực hiện"
              readOnly={!editMode}
            />
          );
        },
      },
      {
        header: "Thời gian thực hiện hoặc hoàn thành",
        accessorKey: "actionTime",
        Cell: ({ row }) => {
          if (row.original.isAddRow) return "";

          return (
            <CustomTextInput
              key={`actionTime-${row.index}-${row.original.actionTime}`}
              defaultValue={row.original.actionTime || ""}
              onBlur={(event) =>
                updateActionPlan(row.index, "actionTime", event.currentTarget.value)
              }
              placeholder="Nhập thời gian"
              readOnly={!editMode}
            />
          );
        },
      },
      {
        header: "Ghi chú",
        accessorKey: "note",
        Cell: ({ row }) => {
          if (row.original.isAddRow) return "";

          return (
            <CustomTextInput
              key={`note-${row.index}-${row.original.note}`}
              defaultValue={row.original.note || ""}
              onBlur={(event) => updateActionPlan(row.index, "note", event.currentTarget.value)}
              placeholder="Ghi chú"
              readOnly={!editMode}
            />
          );
        },
      },
    ],
    [handleAdd, updateActionPlan]
  );

  const renderRowActions = useCallback(
    ({ row }: { row: any }) => {
      if (row.original.isAddRow || !editMode) return "";
      const hasId = Boolean(row.original.id);
      if (hasId) {
        return (
          <CustomCenterFull>
            <Form04ActionPlanDeleteActionPlan
              id={row.original.id}
              code={String(row.original.detail)}
            />
          </CustomCenterFull>
        );
      }
      return (
        <CustomCenterFull>
          <ActionIcon color="red" variant="subtle" onClick={() => handleDeleteNewRow(row.index)}>
            <IconTrash />
          </ActionIcon>
        </CustomCenterFull>
      );
    },
    [handleDeleteNewRow]
  );

  return (
    <Flex direction={"column"} style={{ width: "100%" }} title="Nội dung báo cáo hiện tại">
      <CustomDataTable
        data={tableData}
        columns={columns}
        initialState={{
          columnSizing: {
            "mrt-row-numbers": 60,
          },
        }}
        mantineTableContainerProps={{
          style: { height: "300px", overflowY: "auto" },
        }}
        renderRowActions={renderRowActions}
      />
    </Flex>
  );
}

const Form04ActionPlanContent = React.memo(
  forwardRef<Form04ActionPlanContentRef, Form04ActionPlanContentProps>(
    Form04ActionPlanContentInternal
  ),
  (prevProps, nextProps) => {
    return (
      prevProps.eaqSelfAssessmentId === nextProps.eaqSelfAssessmentId &&
      prevProps.eaqPhaseId === nextProps.eaqPhaseId &&
      JSON.stringify(prevProps.initialActionPlan) === JSON.stringify(nextProps.initialActionPlan)
    );
  }
);

export default Form04ActionPlanContent;
