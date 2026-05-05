"use client";

import { service_account } from "@/api/services/service_account";
import { service_faculty } from "@/api/services/service_faculty";
import { service_ranking } from "@/api/services/service_ranking";
import { KEYVALUE_COLORS } from "@/constants/key-value/color";
import { StudentList } from "@/interfaces/account";
import { StudentRankingHistoryByStudent } from "@/interfaces/ranking";
import useS_Shared_ActivityPlan from "@/shared/features/ActivityPlan/useS_Shared_ActivityPlan";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { Grid, Paper, Text } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";

import { MRT_ColumnDef, MRT_RowSelectionState } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import EvaluationScoreboardSummaryButtonModal from "./EvaluationScoreboardSummaryButtonModal";
import { CustomButtonPrintTablePDF } from "@aq-fe/core-ui/shared/components/button/CustomButtonPrintTablePDF";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";

export default function EvaluationScoreboardSummaryTable() {
  const activityPlanStore = useS_Shared_ActivityPlan();

  const permissionStore = usePermissionStore();
  const [selectedFacultyId, setSelectedFacultyId] = useState<number | undefined>(undefined);
  const [searchText, setSearchText] = useState<string>("");
  const [debouncedSearch] = useDebouncedValue(searchText, 500);
  const [studentIdSelection, setStudentIdSelection] = useState<MRT_RowSelectionState>({});

  const queryFaculty = useCustomReactQuery({
    queryKey: ["faculty"],
    axiosFn: () => service_faculty.getAll(),
    options: {
      refetchOnWindowFocus: false,
    },
  });

  const queryStudentList = useCustomReactQuery({
    queryKey: ["students", selectedFacultyId, debouncedSearch],
    axiosFn: () =>
      service_account.getStudentList({
        facultyId: selectedFacultyId,
        name: debouncedSearch,
      }),
    options: {
      refetchOnWindowFocus: false,
    },
  });

  const selectedStudent = useMemo(() => {
    const selectedStudentKey = Object.keys(studentIdSelection)[0];
    const selectedStudentId = selectedStudentKey ? Number(selectedStudentKey) : undefined;
    return queryStudentList.data?.find((student) => student.id === selectedStudentId);
  }, [queryStudentList.data, studentIdSelection]);

  const queryHistoryByStudent = useCustomReactQuery({
    queryKey: [
      "F_d78ab2hfsq_Read_RankingHistoryByStudent",
      activityPlanStore.state.ActivityPlan?.id,
      selectedStudent?.id,
    ],
    axiosFn: () => {
      return service_ranking.getHistoryByStudent({
        activityPlanId: activityPlanStore.state.ActivityPlan?.id ?? 0,
        studentId: selectedStudent?.id ?? 0,
      });
    },
    options: {
      enabled: !!selectedStudent?.id,
      refetchOnWindowFocus: false,
    },
  });

  // Auto select toàn trường
  useEffect(() => {
    if (queryFaculty.data && queryFaculty.data.length > 0) {
      const allSchoolFaculty = queryFaculty.data.find((faculty) => faculty.name === "Toàn Trường");
      if (allSchoolFaculty) {
        setSelectedFacultyId(allSchoolFaculty.id); // Automatically select "Toàn Trường"
      } else if (!selectedFacultyId) {
        setSelectedFacultyId(queryFaculty.data[0]?.id);
      }
    }
  }, [queryFaculty.data]);

  // Automatically select the first student when the student list is loaded
  useEffect(() => {
    if (
      queryStudentList.data &&
      queryStudentList.data.length > 0 &&
      Object.keys(studentIdSelection).length === 0
    ) {
      const firstStudentId = queryStudentList.data[0]?.id?.toString();
      if (firstStudentId) {
        setStudentIdSelection({ [firstStudentId]: true });
      }
    }
  }, [queryStudentList.data, studentIdSelection]);

  // Extract unique standardOrder values from the latest API response
  const uniqueStandardOrders = useMemo(() => {
    const orders = new Set<number>();
    queryHistoryByStudent.data?.forEach((record) => {
      record.standardPoints?.forEach((point) => {
        if (point.standardOrder != null) {
          orders.add(point.standardOrder);
        }
      });
    });
    return Array.from(orders).sort((a, b) => a - b); // Sort for consistent column order
  }, [queryHistoryByStudent.data]);

  const columnStudentList = useMemo<MRT_ColumnDef<StudentList>[]>(
    () => [
      { header: "Mã sinh viên", accessorKey: "code" },
      { header: "Tên sinh viên", accessorKey: "fullName" },
      { header: "Khoa", accessorKey: "facultyName" },
    ],
    [queryStudentList.data]
  );

  // Dynamically generate columns based on the latest API response
  const columnHistoryByStudent = useMemo<MRT_ColumnDef<StudentRankingHistoryByStudent>[]>(() => {
    // Base columns that are always present
    const baseColumns: MRT_ColumnDef<StudentRankingHistoryByStudent>[] = [
      { header: "Năm học học kỳ", accessorKey: "activityPlanName" },
      { header: "Tổng điểm", accessorKey: "studentRankingPoint" },
      { header: "Xếp loại", accessorKey: "rateName" },
    ];

    // Dynamic columns for each unique standardOrder (e.g., Điều 1, Điều 2, ...)
    const dynamicColumns: MRT_ColumnDef<StudentRankingHistoryByStudent>[] =
      uniqueStandardOrders.map((order) => ({
        header: `Điều ${order}`,
        size: 50,
        accessorFn: (row) => {
          const standardPoint = row.standardPoints?.find(
            (point) => point.standardOrder === order
          )?.standardPoint;
          return <CustomCenterFull>{standardPoint ?? ""}</CustomCenterFull>;
        },
      }));

    // Column for viewing details
    const detailColumn: MRT_ColumnDef<StudentRankingHistoryByStudent> = {
      header: "Xem Bảng điểm",
      accessorKey: "viewDetails",
      Cell: ({ row }) => (
        <CustomCenterFull>
          <EvaluationScoreboardSummaryButtonModal
            // student={selectedStudent}//
            student={selectedStudent as any}
            historyByStudent={row.original}
          />
        </CustomCenterFull>
      ),
    };

    return [...baseColumns, ...dynamicColumns, detailColumn];
  }, [uniqueStandardOrders]);

  // Transform data for printing to include dynamic standardPoint fields
  const printData = useMemo(() => {
    return (
      queryHistoryByStudent.data?.map((record) => {
        const dynamicFields = uniqueStandardOrders.reduce((acc, order) => {
          const standardPoint = record.standardPoints?.find(
            (point) => point.standardOrder === order
          )?.standardPoint;
          return { ...acc, [`standardPoint_${order}`]: standardPoint ?? "" };
        }, {});
        return { ...record, ...dynamicFields };
      }) ?? []
    );
  }, [queryHistoryByStudent.data, uniqueStandardOrders]);

  // Configure printConfig with dynamic fields
  const printConfig = useMemo(
    () => ({
      fields: [
        { header: "Năm học học kỳ", fieldName: "activityPlanName" },
        { header: "Tổng điểm", fieldName: "studentRankingPoint" },
        { header: "Xếp loại", fieldName: "rateName" },
        ...uniqueStandardOrders.map((order) => ({
          header: `Điều ${order}`,
          fieldName: `standardPoint_${order}`,
        })),
      ],
      title: `Đợt đánh giá của sinh viên: ${selectedStudent?.fullName ?? ""}`,
      showRowNumbers: true,
    }),
    [uniqueStandardOrders, selectedStudent?.fullName]
  );

  const renderFilterBar = () => {
    return (
      <Paper p={10} style={{ borderRadius: 10 }}>
        <Grid gutter="md">
          <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
            <CustomSelect
              data={queryFaculty.data?.map((faculty) => ({
                value: faculty.id?.toString() ?? "",
                label: faculty.name?.toString() ?? "",
              }))}
              clearable={false}
              label="Khoa"
              placeholder="Chọn khoa"
              value={selectedFacultyId ? selectedFacultyId.toString() : ""}
              onChange={(value) => setSelectedFacultyId(value ? Number(value) : undefined)}
              renderOption={(item) => {
                const facultyId = item.option.value;
                const faculty = queryFaculty.data?.find(
                  (faculty) => faculty.id?.toString() === facultyId
                );
                return (
                  <CustomFlexColumn gap="0">
                    <Text>{faculty?.name}</Text>
                    <Text fw="bold">{faculty?.code}</Text>
                  </CustomFlexColumn>
                );
              }}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
            <CustomTextInput
              label="Sinh viên"
              placeholder="Nhập mã hoặc tên sinh viên"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Grid.Col>
        </Grid>
      </Paper>
    );
  };
  const renderStudentList = () => {
    return (
      <CustomDataTable
        isLoading={queryStudentList.isLoading}
        isError={queryStudentList.isError}
        columns={columnStudentList}
        data={queryStudentList.data || []}
        enableMultiRowSelection={false}
        enableRowSelection={true}
        positionToolbarAlertBanner={"none"}
        getRowId={(row) => (row.id ? row.id.toString() : "")}
        mantineTableBodyRowProps={({ row }) => ({
          onClick: row.getToggleSelectedHandler(),
          style: {
            cursor: "pointer",
            backgroundColor: row.getIsSelected()
              ? KEYVALUE_COLORS.mantineBackgroundBlueLight
              : KEYVALUE_COLORS.mantineBackgroundPrimary,
          },
        })}
        onRowSelectionChange={setStudentIdSelection}
        state={{ rowSelection: studentIdSelection }}
      />
    );
  };
  const renderHistoryByStudent = () => {
    if (!selectedStudent) return null;

    return (
      <CustomFieldset title={`Đợt đánh giá của sinh viên: ${selectedStudent?.fullName ?? ""}`}>
        <CustomDataTable
          isLoading={queryHistoryByStudent.isLoading}
          isError={queryHistoryByStudent.isError}
          renderTopToolbarCustomActions={(table) => (
            <>
              {permissionStore.state.currentPermissionPage?.isPrint && (
                <CustomButtonPrintTablePDF printConfig={printConfig} data={printData}>
                  In
                </CustomButtonPrintTablePDF>
              )}
            </>
          )}
          columns={columnHistoryByStudent}
          data={queryHistoryByStudent.data || []}
          initialState={{
            columnPinning: {
              right: ["viewDetails"],
            },
          }}
        />
      </CustomFieldset>
    );
  };

  return (
    <CustomFlexColumn>
      {renderFilterBar()}
      {renderStudentList()}
      {renderHistoryByStudent()}
    </CustomFlexColumn>
  );
}
