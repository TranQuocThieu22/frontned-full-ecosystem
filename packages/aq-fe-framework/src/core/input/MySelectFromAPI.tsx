import { useMyReactQuery } from '@/hooks';
import { IBaseEntity } from '@/interfaces';
import { MyApiResponse } from '@/shared/lib/createBaseApi';
import { ComboboxItem } from '@mantine/core';
import { QueryKey, UseQueryOptions } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { MySelect, MySelectProps } from './MySelect';

export interface MySelectFromAPIProps<IRes extends IBaseEntity, IBody = any> extends MySelectProps {
    queryKey?: QueryKey;
    axiosFn?: () => Promise<AxiosResponse<MyApiResponse<IRes[]>, IBody>>;
    labelWithCode?: boolean;
    queryOptions?: Partial<UseQueryOptions<IRes[], Error>>;
    getOptionLabel?: (item: IRes) => string;
    setObjectData?: (item: IRes | undefined) => void;
    autoSelectFirstItem?: boolean;
}


export function MySelectFromAPI<IRes extends IBaseEntity, IBody = any>({
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
    const query = useMyReactQuery<IRes[], IBody>({ queryKey, axiosFn, options: { ...queryOptions } });
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
            const firstValue = firstItem.id?.toString() ?? '';
            const firstLabel = getLabel(firstItem);

            onChange?.(firstValue, { value: firstValue, label: firstLabel });
            setObjectData?.(firstItem);
            hasAutoSelected.current = true;
        }
    }, [autoSelectFirstItem, query.data, value, getLabel, onChange, setObjectData]);

    return (
        <MySelect
            isLoading={query.isLoading}
            isError={query.isError}
            data={options}
            onChange={handleChange}
            value={value}
            {...rest}
        />
    );
}
