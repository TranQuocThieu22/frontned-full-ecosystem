"use client";
import { service_standard } from "@/api/services/service_standard";
import { Standard } from "@/interfaces/standard";
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Group } from "@mantine/core";
import { useMemo } from "react";
import EvaluationScoreButtonDelete from "./EvaluationScoreButtonDelete";
import EvaluationScoreButtonDeleteList from "./EvaluationScoreButtonDeleteList";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import { notifications } from "@mantine/notifications";
import EvaluationScoreButtonCreateUpdate from "./EvaluationScoreButtonCreateUpdate";

export default function EvaluationScoreTable() {
  type Item = { maxPoint?: number };

  const standardQuery = useCustomReactQuery({
    queryKey: ["EvaluationScoreTable_Read_Standard_GetAll"],
    axiosFn: () => service_standard.getAll(),
  });


  const columns = useMemo<CustomColumnDef<Standard>[]>(
    () => [
      {
        header: "Mã nhóm",
        accessorKey: "code",
        importFieldProps: {
          isRequired: true,
          isUnique: true
        }
      },
      {
        header: "Tên nhóm",
        accessorKey: "name",
        size: 500,
        importFieldProps: {
          isRequired: true
        }
      },
      {
        header: "Giới hạn điểm tối đa",
        accessorKey: "maxPoint",
        importFieldProps: {
          isRequired: true,
          parseType: 'number'
        }
      },
      {
        header: "Ghi chú",
        accessorKey: "note",
        importFieldProps: {}
      },
    ],
    []
  );
  const validateTotalPoint = (
    existingData: Item[],
    finalValues: Item[]
  ): boolean => {
    const currentTotal = existingData.reduce(
      (sum, item) => sum + (item.maxPoint ?? 0),
      0
    );
    const importPoint = finalValues.reduce(
      (sum, item) => sum + (item.maxPoint ?? 0),
      0
    );
    return currentTotal + importPoint <= 100;
  };

  const handleSubmit = (value: Standard[]) => {
    if (!validateTotalPoint(standardQuery?.data ?? [], value)) {
      notifications.show({
        title: 'Có lỗi xảy ra!',
        message: 'Tổng điểm vượt quá 100',
        color: 'red',
      });
      return false;
    }
    return service_standard.createOrUpdateList(value);
  }
  return (
    <CustomFieldset title="Khung điểm đánh giá">
      <CustomFlexColumn>
        <CustomDataTableAPI
          columns={columns}
          query={standardQuery}
          exportProps={{
            fileName: 'Export danh sách khung điểm đánh giá'
          }}
          buttonImportProps={{
            onSubmit: handleSubmit,
            fileName: 'Cấu trúc import khung điểm đánh giá'
          }}
          renderTopToolbarCustomActions={({ table }) => {
            const selectedRows =
              table.getSelectedRowModel().flatRows.map((item) => item.original) ||
              [];
            return (
              <Group>
                <EvaluationScoreButtonCreateUpdate />
                <EvaluationScoreButtonDeleteList values={selectedRows} />
              </Group>
            );
          }}

          renderRowActions={({ row }) => {
            return (
              <CustomCenterFull>
                <EvaluationScoreButtonCreateUpdate values={row.original} />
                <EvaluationScoreButtonDelete
                  code={row.original.code!}
                  id={row.original.id!}
                />
              </CustomCenterFull>
            );
          }}
          enableRowSelection={true}
          enableRowNumbers={true}
        />
      </CustomFlexColumn>
    </CustomFieldset>
  );
}
