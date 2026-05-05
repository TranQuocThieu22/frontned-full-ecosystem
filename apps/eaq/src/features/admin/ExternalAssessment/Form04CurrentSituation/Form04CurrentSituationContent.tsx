import { ISelfAssessment } from "@/shared/interfaces/selfAssessment/ISelfAssessment";
import { IEvidenceUsageHistories } from "@/shared/interfaces/selfAssessment/IEvidenceUsageHistories";
import { Badge, Grid } from "@mantine/core";
import { IconClockCheck, IconClockX } from "@tabler/icons-react";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import Form04CurrentSituationDetail from "./Form04CurrentSituationDetail";
import CutomTypography from "../CustomTypography";
import ShareExternalAssessmentEvaluate from "../ShareExternalAssessmentEvaluate";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";

export default function Form04CurrentSituationContent({
  value: defaultValue,
  taskDetailId,
  selfAssessmentId,
}: {
  value?: ISelfAssessment;
  taskDetailId: number;
  selfAssessmentId: number;
}) {
  const [value, setValue] = useState<ISelfAssessment>(defaultValue ?? {});

  useEffect(() => {
    setValue(defaultValue ?? {});
  }, [defaultValue]);

  const filteredEvidenceData = useMemo(() => {
    return defaultValue?.eaqEvidenceUsageHistories ?? [];
  }, [defaultValue?.eaqEvidenceUsageHistories]);

  const columns = useMemo<MRT_ColumnDef<IEvidenceUsageHistories>[]>(
    () => [
      {
        header: "Mã minh chứng báo cáo",
        accessorKey: "reportName",
      },
      {
        header: "Mã minh chứng",
        accessorKey: "code",
      },
      {
        header: "Tên minh chứng",
        accessorKey: "name",
      },
      {
        header: "Trạng thái hiệu lực",
        accessorKey: "status",
        Cell: ({ row }) => {
          const effectiveTo = row.original.eaqEvidenceCurrentVersion?.expiredDate;

          const currentDate = new Date();
          const toDate = effectiveTo ? new Date(effectiveTo) : null;
          const isLate = !toDate || currentDate > toDate;

          return (
            <Badge
              w="100%"
              h={25}
              leftSection={isLate ? <IconClockX size={16} /> : <IconClockCheck size={16} />}
              variant="light"
              color={isLate ? "red" : "green"}
              radius="md"
              fw={700}
            >
              {isLate ? "Hết hạn" : "Còn hiệu lực"}
            </Badge>
          );
        },
      },
    ],
    []
  );

  return (
    <Grid columns={12}>
      <Grid.Col span={{ base: 12, md: 6 }}>
        <CustomFieldset mb={10} title="Nội dung báo cáo hiện tại">
          <CutomTypography
            h="300px"
            htmlContent={value.description ?? ""}
            selfAssessmentId={selfAssessmentId}
            selfAssessmentType={1}
          />
        </CustomFieldset>
        <CustomFieldset title="Danh sách minh chứng">
          <CustomDataTable
            columns={columns}
            data={filteredEvidenceData}
            enableRowNumbers={false}
            mantineTableContainerProps={{
              style: { height: "192px", overflowY: "auto" },
            }}
            initialState={{
              columnSizing: { "mrt-row-actions": 60 },
            }}
            renderRowActions={({ row }) => {
              return (
                <CustomCenterFull>
                  <Form04CurrentSituationDetail
                    evidence={row.original}
                  />
                </CustomCenterFull>
              );
            }}
          />
        </CustomFieldset>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6 }}>
        <ShareExternalAssessmentEvaluate
          taskDetailId={taskDetailId}
          selfAssessmentType={1}
          maxHeight="558px"
          minHeight="558px"
        />
      </Grid.Col>
    </Grid>
  );
}
