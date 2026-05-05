import { Group, Select } from "@mantine/core";

// Giá trị người dùng chọn (value field của Select)
export type FilterValue = {
    formula?: string;
    content?: string;
    clo?: string;
    tool?: string;
};

// Từng filter có mảng {label, value}
type Option = { label: string; value: string };

interface FilterGroupSharedProps {
    data: {
        formOptions: Option[];
        contentOptions: Option[];
        cloOptions: Option[];
        toolOptions: Option[];
    };
    value: FilterValue;
    onChange: (newValue: Partial<FilterValue>) => void;
}

export function FilterGroupShared({ data, value, onChange }: FilterGroupSharedProps) {
    return (
        <Group grow>
            <Select
                label="Hình thức đánh giá"
                data={data.formOptions}
                value={value.formula}
                onChange={(v) => onChange({ formula: v || "" })}
                placeholder="Chọn hình thức"
            />
            <Select
                label="Nội dung đánh giá"
                data={data.contentOptions}
                value={value.content}
                onChange={(v) => onChange({ content: v || "" })}
                placeholder="Chọn nội dung"
            />
            <Select
                label="CLO - Môn học"
                data={data.cloOptions}
                value={value.clo}
                onChange={(v) => onChange({ clo: v || "" })}
                placeholder="Chọn CLO"
            />
            <Select
                label="Công cụ đánh giá"
                data={data.toolOptions}
                value={value.tool}
                onChange={(v) => onChange({ tool: v || "" })}
                placeholder="Chọn công cụ"
            />
        </Group>
    );
}
