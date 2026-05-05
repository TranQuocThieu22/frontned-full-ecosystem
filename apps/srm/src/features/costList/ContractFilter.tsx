"use client";

import { academicYearService } from "@/shared/APIs/academicYearService";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomDateInput } from "@aq-fe/core-ui/shared/components/input/CustomDateInput";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Card, Grid, Group, Radio } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";

interface ContractFilterProps {
  onFilter: (filterData: {
    academicYearId?: number;
    startDate?: string;
    endDate?: string;
  }) => void;
  isLoading?: boolean;
}

export default function ContractFilter({ onFilter, isLoading = false }: ContractFilterProps) {
  const [filterType, setFilterType] = useState<"academicYear" | "dateRange" | "all">("academicYear");
  const [selectedAcademicYear, setSelectedAcademicYear] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [hasAutoFiltered, setHasAutoFiltered] = useState(false);

  const academicYearStore = useAcademicYearStore();

  const academicYear = useCustomReactQuery({
    queryKey: ["academicYear"],
    axiosFn: () => academicYearService.getAll(),
  });

  const academicYearSelectData = useMemo(() => {
    const data = academicYear.data?.map(item => ({
      value: item.id?.toString() ?? "",
      label: item.name ?? ""
    })) ?? [];

    return data;
  }, [academicYear.data]);

  useEffect(() => {
    if (academicYearStore.state.academicYear?.id && !selectedAcademicYear) {
      setSelectedAcademicYear(academicYearStore.state.academicYear.id.toString());
    }
    else if (!academicYearStore.state.academicYear?.id && !selectedAcademicYear && academicYear.data && academicYear.data.length > 0) {
      setSelectedAcademicYear(academicYear.data[0]?.id?.toString() ?? "");
    }
  }, [academicYearStore.state.academicYear?.id, selectedAcademicYear, academicYear.data]);

  // Tự động lọc khi selectedAcademicYear được set lần đầu hoặc khi chọn "all"
  useEffect(() => {
    if (filterType === "all" && !hasAutoFiltered) {
      onFilter({});
      setHasAutoFiltered(true);
    } else if (selectedAcademicYear && filterType === "academicYear" && !hasAutoFiltered) {
      const filterData = {
        academicYearId: parseInt(selectedAcademicYear || "0"),
      };
      onFilter(filterData);
      setHasAutoFiltered(true);
    }
  }, [selectedAcademicYear, filterType, hasAutoFiltered]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleFilter = () => {
    if (filterType === "all") {
      // Liệt kê tất cả hợp đồng - gửi body rỗng
      onFilter({});
    } else if (filterType === "academicYear") {
      // Lọc theo năm học
      const filterData = {
        academicYearId: parseInt(selectedAcademicYear || "0"),
      };
      onFilter(filterData);
    } else {
      // Lọc theo thời gian hợp đồng
      const filterData = {
        startDate: startDate ? startDate.toISOString().split('T')[0] : undefined,
        endDate: endDate ? endDate.toISOString().split('T')[0] : undefined,
      };
      onFilter(filterData);
    }
  };

  return (
    <Card shadow="sm" p="md" mb="md">
      <Card.Section inheritPadding py="xs">
        <Radio.Group
          value={filterType}
          onChange={(value) => {
            setFilterType(value as "academicYear" | "dateRange" | "all");
            setHasAutoFiltered(false); // Reset auto filter flag when changing filter type
          }}
        >
          <Group>
            <Radio value="academicYear" label="Liệt kê hợp đồng theo năm" />
            <Radio value="dateRange" label="Liệt kê hợp đồng theo ngày" />
            <Radio value="all" label="Liệt kê tất cả hợp đồng" />
          </Group>
        </Radio.Group>
      </Card.Section>

      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }}>
          {filterType === "all" ? (
            null
          ) : filterType === "academicYear" ? (
            <Grid align="end">
              <Grid.Col span={{ base: 12, md: 6 }}>
                <CustomSelect
                  label="Năm học"
                  placeholder="Chọn năm học"
                  data={academicYearSelectData}
                  value={selectedAcademicYear}
                  onChange={setSelectedAcademicYear}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'end' }}>
                  <CustomButton
                    onClick={handleFilter}
                    loading={isLoading}
                    actionType="find"
                  >
                    Lọc
                  </CustomButton>
                </div>
              </Grid.Col>
            </Grid>
          ) : (
            <Grid align="end">
              <Grid.Col span={{ base: 12, md: 4 }}>
                <CustomDateInput
                  label="Từ ngày hợp đồng"
                  placeholder="Chọn ngày bắt đầu"
                  value={startDate}
                  onChange={(date) => setStartDate(date ? new Date(date) : null)}
                  clearable
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <CustomDateInput
                  label="Đến ngày thanh lý"
                  placeholder="Chọn ngày kết thúc"
                  value={endDate}
                  onChange={(date) => setEndDate(date ? new Date(date) : null)}
                  clearable
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'end' }}>
                  <CustomButton
                    onClick={handleFilter}
                    loading={isLoading}
                    actionType="find"
                  >
                    Lọc
                  </CustomButton>
                </div>
              </Grid.Col>
            </Grid>
          )}
        </Grid.Col>
      </Grid>
    </Card>
  );
}
