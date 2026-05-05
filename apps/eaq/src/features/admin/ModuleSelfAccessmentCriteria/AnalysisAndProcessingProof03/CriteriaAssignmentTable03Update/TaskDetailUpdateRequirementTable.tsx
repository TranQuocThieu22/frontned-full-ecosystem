"use client";
import { service_EAQEvaluationPlan } from "@/shared/APIs/service_EAQEvaluationPlan";
import { ITaskDetailRequirement } from "@/shared/interfaces/requirement/ITaskDetailRequirement";
import { ITaskDetail } from "@/shared/interfaces/task/ITaskDetail";
import { Group, Text } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import { cleanTDRequirementsAndEvidences } from "./shared/CleanTDRequirements";
import TaskDetailUpdateRequirementDeleteButton from "./TaskDetailUpdateRequirementDeleteButton";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";


export default function TaskDetailUpdateRequirementTable({
  values,
}: {
  values?: ITaskDetail;
}) {
  const [isResetRowAllowed, setIsResetRowAllowed] = useState(true);
  const [editedTDRequirements, setTDRequirements] = useState<ITaskDetailRequirement[]>([]);
  // const [originalTDRequirements, setOriginalTDRequirements] = useState<ITaskDetailRequirement[]>([]);

  useEffect(() => {
    let requirements = values?.eaqTaskDetailRequirements;

    if (!requirements || (requirements && requirements.length === 0)) {
      return;
    }

    // If there are unsaved changes, do not overwrite
    if (isResetRowAllowed) {
      setTDRequirements(requirements);

      // Deep clone each object
      // setOriginalTDRequirements(requirements.map((row) => ({ ...row })));
    }
  }, [values]);

  const updateMutation = useCustomReactMutation({
    axiosFn: (values: ITaskDetail) =>
      service_EAQEvaluationPlan.UpdateTaskDetailAnalysisStatus(values),
    mutationType: "update",
  });

  const handleResetRow = (rowIndex: number) => {
    // const originalRow = originalTDRequirements.find((row) => row.id === id);
    // if (!originalRow) return;
    setIsResetRowAllowed(false);

    setTDRequirements((prev) => {
      const updated = [...prev];

      updated[rowIndex] = {
        ...updated[rowIndex],
        ["collectionQuestion"]: "",
        ["collectionNeed"]: "",
        ["collectionWhere"]: "",
        ["collectionMethod"]: "",
      };



      return updated;
    });
  };

  const handleInputCollectionFieldChanged = (
    field: keyof ITaskDetailRequirement,
    value: string | null | undefined,
    rowIndex: number
  ) => {
    const sanitized = value || null;

    setIsResetRowAllowed(false);

    setTDRequirements((prev) => {
      const updated = [...prev];

      // const index = updated.findIndex((item) => item.id === row.id);

      // updated[index] = {
      //   ...updated[index],
      //   [field]: sanitized ?? undefined,
      // };

      updated[rowIndex] = {
        ...updated[rowIndex],
        [field]: sanitized ?? undefined,
      };
      return updated;
    });
  };

  const handleSaveTDRequirements = async (
    TDRequirements: ITaskDetailRequirement[]
  ) => {
    if (!values) return;

    const newTaskDetail: ITaskDetail = {
      ...values,
      eaqTaskDetailRequirements: TDRequirements,
    };

    const updatedTaskDetail = cleanTDRequirementsAndEvidences(newTaskDetail);
    setIsResetRowAllowed(true);
    updateMutation.mutate(updatedTaskDetail);
  };

  const columns = useMemo<MRT_ColumnDef<ITaskDetailRequirement>[]>(
    () => [
      {
        header: "Mã yêu cầu",
        accessorKey: "eaqRequirement.code",
        accessorFn(originalRow) {
          return (
            <CustomCenterFull>
              <Text>{originalRow.eaqRequirement?.code}</Text>
            </CustomCenterFull>
          );
        },
      },
      {
        header: "Yêu cầu",
        size: 300,
        accessorKey: "eaqRequirement.name",
        accessorFn(originalRow) {
          return (
            <CustomCenterFull>
              <Text>{originalRow.eaqRequirement?.name}</Text>
            </CustomCenterFull>
          );
        },
      },
      {
        header: "Các câu hỏi đặt ra (Mốc chuẩn tham chiếu)",
        accessorKey: "collectionQuestion",
        size: 400,
        Cell: ({ row }) => {

          return (
            <CustomTextArea
              key={`cq-${row.original.id}-${row.original.collectionQuestion ?? ""}`}
              pt={5}
              pb={5}
              minRows={5}
              maxRows={5}
              placeholder="Câu hỏi đặt ra"
              defaultValue={row.original.collectionQuestion || ""}
              onBlur={(event) =>
                handleInputCollectionFieldChanged(
                  "collectionQuestion",
                  event.target.value,
                  row.index
                )
              }
            />
          );
        },
      },
      {
        header: "Cần thu thập",
        accessorKey: "collectionNeed",
        size: 300,
        Cell: ({ row }) => {
          return (
            <CustomTextArea
              key={`cn-${row.original.id}-${row.original.collectionNeed ?? ""}`}
              pt={5}
              pb={5}
              minRows={5}
              maxRows={5}
              placeholder="Cần thu thập"
              defaultValue={row.original.collectionNeed || ""}
              onBlur={(event) =>
                handleInputCollectionFieldChanged(
                  "collectionNeed",
                  event.target.value,
                  row.index
                )
              }
            />
          );
        },
      },
      {
        header: "Nơi thu thập",
        size: 300,
        accessorKey: "collectionWhere",
        Cell: ({ row }) => {
          return (
            <CustomTextArea
              key={`cw-${row.original.id}-${row.original.collectionWhere ?? ""}`}
              pt={5}
              pb={5}
              minRows={5}
              maxRows={5}
              placeholder="Nơi thu thập"
              defaultValue={row.original.collectionWhere || ""}
              onBlur={(event) =>
                handleInputCollectionFieldChanged(
                  "collectionWhere",
                  event.target.value,
                  row.index
                )
              }
            />
          );
        },
      },
      {
        header: "Phương pháp thu thập",
        accessorKey: "collectionMethod",
        size: 300,
        Cell: ({ row }) => {
          return (
            <CustomTextArea
              key={`cm-${row.original.id}-${row.original.collectionMethod ?? ""}`}
              pt={5}
              pb={5}
              minRows={5}
              maxRows={5}
              placeholder="Phương pháp thu thập"
              defaultValue={row.original.collectionMethod || ""}
              onBlur={(evant) =>
                handleInputCollectionFieldChanged(
                  "collectionMethod",
                  evant.target.value,
                  row.index
                )
              }
            />
          );
        },
      },
    ],
    [values]
  );

  return (
    <CustomFieldset title="Danh sách yêu cầu">
      <CustomFlexColumn>
        <CustomDataTable
          enableRowSelection
          enableRowNumbers={false}
          data={editedTDRequirements || []}
          columns={columns}
          renderRowActions={({ row }) => (
            <CustomCenterFull>
              <TaskDetailUpdateRequirementDeleteButton
                code={row.original.eaqRequirement?.code ?? ""}
                onClick={() => handleResetRow(row.index)}
              />
            </CustomCenterFull>
          )}
          renderTopToolbarCustomActions={() => (
            <Group>
              <CustomButton
                loading={updateMutation.isPending}
                disabled={updateMutation.isPending}
                ml={10}
                w={"150px"}
                color="green"
                actionType="save"
                onClick={() => handleSaveTDRequirements(editedTDRequirements)}
              >
                Lưu
              </CustomButton>
            </Group>
          )}
        />
      </CustomFlexColumn>
    </CustomFieldset>
  );
}
