import { useLegacyReactQuery } from "@aq-fe/aq-legacy-framework/shared/hooks/core/useLegacyReactQuery";
import { BaseEntity } from "@aq-fe/aq-legacy-framework/shared/interfaces/BaseEntity";
import { useEffect } from "react";
import { SafeOmitType } from "@aq-fe/core-ui/shared/types/safeOmitType";
import { CustomSelect, CustomSelectProps } from "@aq-fe/core-ui/shared/components/input/CustomSelect";

export interface CustomSelectAPIProps<IRes extends BaseEntity>
    extends SafeOmitType<CustomSelectProps, "onChange" | "data" | "value" | "defaultValue"> {
    query: ReturnType<typeof useLegacyReactQuery<IRes[], any>>;
    value?: number; // ❌ bỏ null
    defaultValue?: number
    onChange?: (value?: number, item?: IRes) => void; // ❌ chỉ trả về IRes | undefined
    autoSelectFirst?: boolean;
    defaultSelectCondition?: (item: IRes) => boolean;
    getLabel?: (item: IRes) => string;
}

export function CustomSelectAPI<IRes extends BaseEntity>({
    query,
    value,
    onChange,
    autoSelectFirst = false,
    defaultSelectCondition,
    defaultValue,
    getLabel,
    ...rest
}: CustomSelectAPIProps<IRes>) {
    const options =
        query.data?.map((item) => ({
            label: getLabel ? getLabel(item) : `${item.code} - ${item.name}`,
            value: item.id?.toString()!,
        })) ?? [];

    // Tự chọn giá trị đầu tiên nếu bật autoSelectFirst
    useEffect(() => {
        if (!query.data) return
        if (!autoSelectFirst) return
        if (!value && query.data.length > 0) {
            onChange?.(query.data[0]?.id!, query.data[0]);
        }
    }, [autoSelectFirst, query.data, value, onChange]);

    useEffect(() => {
        if (!query.data) return;
        if (value) return;
        if (!defaultSelectCondition) return
        let itemToSelect: IRes | undefined;
        itemToSelect = query.data.find(defaultSelectCondition);
        if (itemToSelect) {
            onChange?.(itemToSelect.id!, itemToSelect);
        }
    }, [defaultSelectCondition, query.data, value, onChange]);

    // ✅ Khi chọn option, trả về object hoặc undefined
    const handleChange = (selectedId?: string | null) => {
        if (!selectedId) {
            onChange?.(undefined, undefined);
            return;
        }
        const item = query.data?.find((x) => x.id === Number(selectedId));
        onChange?.(Number(selectedId), item); // selectedItem có thể là undefined
    };

    return (
        <CustomSelect
            isLoading={query.isLoading}
            isError={query.isError}
            data={options}
            value={value ? value.toString() : null}
            onChange={handleChange}
            defaultValue={defaultValue?.toString()}
            {...rest}
        />
    );
}
