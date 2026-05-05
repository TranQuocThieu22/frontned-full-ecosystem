import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { Dispatch, ReactNode, SetStateAction } from "react";

interface SingleSelectionFieldProps<T extends BaseEntity> {
    label?: string;
    loading?: boolean;
    renderModal: (handleSelect?: (item?: T) => void) => ReactNode;
    itemLabelFormatFn?: (item?: T) => string;
    readOnly?: boolean;
    selectedItem?: T;
    setSelectedItem: Dispatch<SetStateAction<T | undefined>>;
    onChange?: (selected?: T) => void;
    error?: ReactNode;
}

export default function SingleSelectionField<T extends BaseEntity>({
    label,
    loading,
    renderModal,
    itemLabelFormatFn,
    readOnly,
    selectedItem,
    setSelectedItem,
    onChange,
    error,
}: SingleSelectionFieldProps<T>) {
    const defaultLabel = "dữ liệu";
    const selectLabel = label ?? defaultLabel;
    const selectPlaceholder = label ? `Chọn ${label.toLowerCase()}` : `Chọn ${defaultLabel}`;

    const handleSelect = (item?: T) => {
        if (!item) {
            setSelectedItem(undefined);
            onChange?.(undefined);
            return;
        }
        setSelectedItem(item);
        onChange?.(item);
    };

    const singleValue = selectedItem?.id?.toString() ?? null;
    const singleData = singleValue
        ? [{
            value: singleValue,
            label: itemLabelFormatFn?.(selectedItem) ?? "",
        }]
        : [];

    return (
        <CustomSelect
            label={selectLabel}
            placeholder={selectPlaceholder}
            isLoading={loading}
            data={singleData}
            value={singleValue}
            searchable={false}
            readOnly={readOnly}
            size="md"
            styles={{
                input: {
                    fontWeight: readOnly ? 700 : 400,
                    color: readOnly ? "#000" : undefined,
                },
            }}
            error={error}
            onChange={(value) => {
                if (!value) {
                    handleSelect(undefined);
                }
            }}

            rightSectionPointerEvents="auto"
            rightSection={
                !readOnly &&
                (
                    <div style={{ display: "flex", alignItems: "center" }}>
                        {renderModal?.(handleSelect)}
                    </div>
                )
            }
        />
    );
}
