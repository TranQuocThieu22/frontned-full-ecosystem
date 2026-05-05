import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { MultiSelect, MultiSelectProps } from "@mantine/core";
import { SafeOmitType } from "../../types/safeOmitType";

export interface CustomSelectMultipleAPIProps<IRes extends BaseEntity>
    extends SafeOmitType<MultiSelectProps, "onChange" | "data" | "value" | "defaultValue" | "label"> {
    label?: string
    query: ReturnType<typeof useCustomReactQuery<IRes[], any>>;
    value?: number[];
    defaultValue?: number[]
    onChange?: (value?: number[], item?: IRes[]) => void;
    getLabel?: (item: IRes) => string;
}

export function CustomSelectMultipleAPI<IRes extends BaseEntity>({
    label,
    query,
    value,
    onChange,
    defaultValue,
    getLabel,
    ...rest
}: CustomSelectMultipleAPIProps<IRes>) {
    const options =
        query.data?.map((item) => ({
            label: getLabel ? getLabel(item) : `${item.code} - ${item.name}`,
            value: item.id?.toString()!,
        })) ?? [];


    const handleChange = (selectedIds?: string[]) => {
        if (!selectedIds) {
            onChange?.(undefined, undefined);
            return;
        }
        const selectedItems = query.data?.filter(item =>
            selectedIds.includes(item.id!.toString())
        );
        onChange?.(selectedIds.map(Number), selectedItems);
    };

    return (
        <MultiSelect
            data={options}
            value={value ? value.map(String) : undefined}
            onChange={handleChange}
            defaultValue={defaultValue?.map(String)}
            label={label}
            placeholder={`Chọn ${label?.toLowerCase()}`}
            searchable
            {...rest}
        />
    );
}
