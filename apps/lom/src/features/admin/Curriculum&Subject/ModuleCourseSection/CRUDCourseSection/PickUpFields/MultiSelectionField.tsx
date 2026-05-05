import { MultiSelect } from "@mantine/core";
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { Dispatch, SetStateAction, ReactNode } from "react";

interface MultiSelectionFieldProps<T extends BaseEntity> {
    label?: string;
    renderModal: (handleSelect?: (item?: T[]) => void) => ReactNode;
    itemLabelFormatFn?: (item?: T) => string;
    selectedItems: T[];
    setSelectedItems: Dispatch<SetStateAction<T[]>>;
    onChange?: (selected: T[]) => void;
    error?: ReactNode;
}

export default function MultiSelectionField<T extends BaseEntity>({
    label,
    renderModal,
    itemLabelFormatFn,
    selectedItems,
    setSelectedItems,
    onChange,
    error,
}: MultiSelectionFieldProps<T>) {
    const defaultLabel = "dữ liệu";
    const selectLabel = label ?? defaultLabel;
    const selectPlaceholder = label ? `Chọn ${label.toLowerCase()}` : `Chọn ${defaultLabel}`;

    const handleSelect = (items?: T[]) => {
        const nextSelection = items ?? [];
        setSelectedItems(nextSelection);
        onChange?.(nextSelection);
    };

    const handleMultiChange = (ids: string[]) => {
        // MultiSelect here is readOnly and only contains already-selected items.
        // When a chip is removed, Mantine gives the remaining ids, so we just keep those.
        const nextSelection = ids.length
            ? selectedItems.filter((item) => {
                const id = item.id?.toString();
                return id ? ids.includes(id) : false;
            })
            : [];
        setSelectedItems(nextSelection);
        onChange?.(nextSelection);
    };

    const selectedData = selectedItems
        .map((item) => ({
            value: item.id?.toString() ?? "",
            label: itemLabelFormatFn?.(item) ?? "",
        }))
        .filter((option) => option.value);

    const selectedValues = selectedData.map((item) => item.value);

    return (
        <MultiSelect
            label={selectLabel}
            placeholder={selectedItems.length != 0 ? "" : selectPlaceholder}
            data={selectedData}
            value={selectedValues}
            clearable
            searchable={false}
            size="md"
            error={error}
            onChange={handleMultiChange}
            rightSectionPointerEvents="auto"
            rightSection={
                <div style={{ display: "flex", alignItems: "center" }}>
                    {renderModal?.(handleSelect)}
                </div>
            }
        />
    );
}
