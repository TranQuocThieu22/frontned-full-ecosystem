import { useMyReactQuery } from "@/hooks";
import { IBaseEntity } from "@/interfaces";
import { useEffect } from "react";
import { MySelect, MySelectProps } from "../input/MySelect";

export interface CustomSelectAPIProps<IRes extends IBaseEntity>
    extends Omit<MySelectProps, "onChange" | "data" | "value"> {
    query: ReturnType<typeof useMyReactQuery<IRes[], any>>;
    value?: number; // ❌ bỏ null
    onChange?: (value?: number, item?: IRes) => void; // ❌ chỉ trả về IRes | undefined
    autoSelectFirst?: boolean;
    getLabel?: (item: IRes) => string;
}

export function CustomSelectAPI<IRes extends IBaseEntity>({
    query,
    value,
    onChange,
    autoSelectFirst = false,
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
        if (autoSelectFirst && !value && query.data.length > 0) {
            onChange?.(query.data[0].id!, query.data[0]);
        }
    }, [autoSelectFirst, query.data, value, onChange]);

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
        <MySelect
            isLoading={query.isLoading}
            isError={query.isError}
            data={options}
            value={value ? value.toString() : undefined}
            onChange={handleChange}
            {...rest}
        />
    );
}
