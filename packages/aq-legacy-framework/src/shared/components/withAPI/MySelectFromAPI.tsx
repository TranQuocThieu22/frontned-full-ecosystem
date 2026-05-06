
import { ComboboxItem } from '@mantine/core';
import { QueryKey, UseQueryOptions } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useCustomReactQuery } from '@aq-fe/aq-legacy-framework/shared/hooks/useCustomReactQuery';
import { BaseEntity } from '@aq-fe/aq-legacy-framework/shared/interfaces/BaseEntity';
import { CustomApiResponse } from '@aq-fe/aq-legacy-framework/shared/libs/core/createBaseApi';
import { CustomSelect, CustomSelectProps } from '@aq-fe/core-ui/shared/components/input/CustomSelect';
/**
 * @deprecated Component này không xài nữa nha mấy ní
 * Vui lòng dùng `CustomButtonSelectAPI` thay thế.
 */
export interface MySelectFromAPIProps<IRes extends BaseEntity, IBody = any> extends CustomSelectProps {
    queryKey?: QueryKey;
    axiosFn?: () => Promise<AxiosResponse<CustomApiResponse<IRes[]>, IBody>>;
    labelWithCode?: boolean;
    queryOptions?: Partial<UseQueryOptions<IRes[], Error>>;
    getOptionLabel?: (item: IRes) => string;
    setObjectData?: (item: IRes | undefined) => void;
    autoSelectFirstItem?: boolean;
}

/**
 * @deprecated Component này không xài nữa nha mấy ní
 * Vui lòng dùng `CustomButtonSelectAPI` thay thế.
 */
export function MySelectFromAPI<IRes extends BaseEntity, IBody = any>({
    queryKey,
    axiosFn,
    labelWithCode,
    getOptionLabel,
    onChange,
    value,
    setObjectData,
    autoSelectFirstItem,
    queryOptions,
    ...rest
}: MySelectFromAPIProps<IRes, IBody>) {
    const query = useCustomReactQuery<IRes[]>({
        queryKey: queryKey || [],
        serviceFn: axiosFn as any,
        ...queryOptions
    });
    const hasAutoSelected = useRef(false);

    // ✅ Fix warning: getLabel chỉ tạo lại khi getOptionLabel hoặc labelWithCode  thay đổi
    const getLabel = useCallback(
        (item: IRes) =>
            getOptionLabel?.(item) ??
            (labelWithCode ? `${item.code} - ${item.name}` : item.name ?? ''),
        [getOptionLabel, labelWithCode]
    );

    const options = useMemo<ComboboxItem[]>(() => {
        return (
            query.data?.map((item) => ({
                value: item.id?.toString() ?? '',
                label: getLabel(item),
            })) ?? []
        );
    }, [query.data, getLabel]);

    const handleChange = (value: string | null, option: ComboboxItem) => {
        onChange?.(value, option);

        if (setObjectData) {
            const selected = query.data?.find((item) => item.id?.toString() === value);
            setObjectData(selected);
        }
    };

    useEffect(() => {
        if (
            autoSelectFirstItem &&
            !hasAutoSelected.current &&
            query.data?.length &&
            (value === undefined || value === null || value === '')
        ) {
            const firstItem = query.data[0];
            const firstValue = firstItem?.id?.toString() ?? '';
            const firstLabel = getLabel(firstItem!);

            onChange?.(firstValue, { value: firstValue, label: firstLabel });
            setObjectData?.(firstItem);
            hasAutoSelected.current = true;
        }
    }, [autoSelectFirstItem, query.data, value, getLabel, onChange, setObjectData]);

    return (
        <CustomSelect
            isLoading={query.isLoading}
            isError={query.isError}
            data={options}
            onChange={handleChange}
            value={value}
            {...rest}
        />
    );
}
