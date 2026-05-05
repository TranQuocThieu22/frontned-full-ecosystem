'use client'
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import F_w9e9qi813x_AddRoom from "@/features/admin/w9e9qi813x/F_w9e9qi813x_AddRoom";
import F_w9e9qi813x_Delete from "@/features/admin/w9e9qi813x/F_w9e9qi813x_Delete";
import { examService } from "@/shared/APIs/examService";
import { Exam } from "@/shared/interfaces/exam";
import { ExamAddress } from "@/shared/interfaces/examAdress";
import { CustomColumnDef, CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Group, Select } from "@mantine/core";
import { useMemo, useState } from "react";

export default function ExamOrganizationDepartmentTable() {
  const [selectedExamId, setSelectedExamId] = useState<number | null>(null);

  const examsQuery = useCustomReactQuery<Exam[], unknown, Exam[]>({
    queryKey: ["examOrganization_exams"],
    axiosFn: () => examService.getAll(),
  });

  const examAddressQuery = useCustomReactQuery<ExamAddress[], unknown, ExamAddress[]>({
    queryKey: ["examOrganization_addresses", selectedExamId],
    axiosFn: () =>
      examService.getExamAddress({
        examId: selectedExamId?.toString(),
      }),
    options: {
      enabled: !!selectedExamId,
    },
  });

  const columns = useMemo<CustomColumnDef<ExamAddress>[]>(() => [
    {
      header: "Mã phòng",
      accessorKey: "address.code",
    },
    {
      header: "Tên phòng",
      accessorKey: "address.name",
    },
    {
      header: "Chi nhánh",
      accessorKey: "branch.name",
    },
    {
      header: "Dãy",
      accessorKey: "address.block",
    },
    {
      header: "Sức chứa học",
      accessorKey: "address.capacity",
    },
    {
      header: "Sức chứa thi",
      accessorKey: "address.testCapacity",
    },
    {
      header: "Tính chất phòng",
      accessorKey: "address.roomType.name",
    },
  ], []);

  const data = Array.isArray(examAddressQuery.data) ? examAddressQuery.data : [];

  return (
    <CustomFieldset title="Phòng tổ chức thi">
      <Group mb="md">
        <Select
          w={320}
          label="Khóa thi"
          placeholder="Chọn khóa thi"
          data={
            examsQuery.data?.map((item) => ({
              value: item.id?.toString() ?? "",
              label: `${item.code ?? ""} - ${item.name ?? ""}`,
            })) ?? []
          }
          value={selectedExamId?.toString() ?? null}
          onChange={(value) => {
            const parsed = value ? parseInt(value, 10) : null;
            setSelectedExamId(parsed);
          }}
        />
      </Group>

      <CustomDataTable
        enableRowNumbers
        columns={columns}
        data={data}
        state={{ isLoading: examAddressQuery.isLoading }}
        renderTopToolbarCustomActions={() => (
          <Group>
            <F_w9e9qi813x_AddRoom examAdressInit={data} examId={selectedExamId} />
          </Group>
        )}
        renderRowActions={({ row }) => (
          <MyCenterFull>
            <F_w9e9qi813x_Delete data={row.original} />
          </MyCenterFull>
        )}
      />
    </CustomFieldset>
  );
}

