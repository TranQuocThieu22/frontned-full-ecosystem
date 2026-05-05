"use client";

import { useEvidenceTypeStore } from "./useEvidenceTypeStore";
import { Grid } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { useDebouncedValue } from "@mantine/hooks";
import { useEffect, useState } from "react";

export default function EvidenceTypeFilterPanel() {
  const [searchValue, setSearchValue] = useState("");
  const [debounced] = useDebouncedValue(searchValue, 300);
  const setProperty = useEvidenceTypeStore((s) => s.setProperty);

  useEffect(() => {
    setProperty("searchKey", debounced);
  }, [debounced, setProperty]);

  return (
    <CustomFieldset title="Điều kiện lọc">
      <Grid>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <CustomTextInput
            label="Từ khóa tìm kiếm"
            placeholder="Tìm kiếm theo mã, tên..."
            leftSection={<IconSearch size={16} />}
            value={searchValue}
            onChange={(e) => setSearchValue(e.currentTarget.value)}
          />
        </Grid.Col>
      </Grid>
    </CustomFieldset>
  );
}
