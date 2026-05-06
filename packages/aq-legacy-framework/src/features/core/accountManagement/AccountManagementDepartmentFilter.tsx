'use client'

import { departmentService } from "@aq-fe/aq-legacy-framework/shared/APIs/departmentService";
import CustomSearchableSelect from "@aq-fe/aq-legacy-framework/shared/components/input/CustomSearchableSelect";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { useLegacyReactQuery } from "@aq-fe/aq-legacy-framework/shared/hooks/core/useLegacyReactQuery";
import { Department } from "@aq-fe/aq-legacy-framework/shared/interfaces/Department";
import { textUtils } from "@aq-fe/core-ui/shared/utils/textUtils";
import { useDebouncedValue } from "@mantine/hooks";
import { useState } from "react";

interface AccountManagementDepartmentFilterProps {
    value: Department | undefined;
    onChange: (department: Department | undefined) => void;
}

export function AccountManagementDepartmentFilter({ value, onChange }: AccountManagementDepartmentFilterProps) {
    const departmentPageSize = 20;
    const [departmentCurrentPage, setDepartmentCurrentPage] = useState(1);
    const [departmentSearchInput, setDepartmentSearchInput] = useState("");
    const [debouncedDepartmentSearch] = useDebouncedValue(
        textUtils.isNullOrEmpty(departmentSearchInput) ? undefined : departmentSearchInput,
        500
    );

    const departmentQuery = useLegacyReactQuery<Department[]>({
        queryKey: ["Departments", debouncedDepartmentSearch, departmentCurrentPage, departmentPageSize],
        axiosFn: () => departmentService.getAllDepartments({
            pageNumber: departmentCurrentPage,
            pageSize: departmentPageSize,
            searchValue: debouncedDepartmentSearch,
        }),
        options: { refetchOnWindowFocus: false }
    });

    return (
        <CustomFieldset title="Lọc nâng cao">
            <CustomSearchableSelect
                label="Lọc đơn vị công tác"
                placeholder="Nhập mã hoặc tên đơn vị để tìm kiếm..."
                w={"50%"}
                maw={680}
                query={departmentQuery}
                value={value ?? null}
                config={{
                    getValue: (dept) => dept.id?.toString() ?? '',
                    getLabel: (dept) => `${dept.code} - ${dept.name}`,
                    searchInput: departmentSearchInput,
                    setSearchInput: setDepartmentSearchInput,
                    currentPage: departmentCurrentPage,
                    setCurrentPage: setDepartmentCurrentPage,
                    debouncedSearch: debouncedDepartmentSearch ?? "",
                }}
                onChange={(item) => onChange(item ?? undefined)}
            />
        </CustomFieldset>
    );
}