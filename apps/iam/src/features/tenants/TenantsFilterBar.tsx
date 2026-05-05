"use client"

import { TenantStatusEnum, TenantStatusLabel } from "@aq-fe/aq-core-framework/shared/interfaces/Tenant"
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect"
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput"
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils"
import { Button, SimpleGrid } from "@mantine/core"
import { useForm } from "@mantine/form"
import { IconSearch } from "@tabler/icons-react"

export interface TenantFilter {
    keyword?: string
    status?: string
}

export default function TenantsFilterBar({
    onSearch,
    initialValues,
}: {
    onSearch: (values: TenantFilter) => void
    initialValues?: TenantFilter
}) {
    const form = useForm<TenantFilter>({
        initialValues: initialValues ?? { keyword: "", status: "" },
    })

    return (
        <form
            onSubmit={form.onSubmit((v) => onSearch(v))}
            onReset={() => form.reset()}
        >
            <SimpleGrid cols={{ base: 1, md: 4 }}>
                <CustomTextInput
                    label="Tìm kiếm"
                    placeholder="Mã tenant hoặc tên hiển thị"
                    {...form.getInputProps("keyword")}
                />
                <CustomSelect
                    label="Trạng thái"
                    placeholder="Tất cả"
                    data={[
                        { value: "", label: "Tất cả" },
                        ...converterUtils.mapEnumToSelectData(TenantStatusEnum, TenantStatusLabel),
                    ]}
                    {...form.getInputProps("status")}
                />
                <Button type="submit" leftSection={<IconSearch size={16} />} mt={24}>
                    Tìm kiếm
                </Button>
                <Button type="reset" variant="subtle" mt={24}>
                    Xóa bộ lọc
                </Button>
            </SimpleGrid>
        </form>
    )
}
