import {
    Combobox,
    Flex,
    InputBase,
    InputBaseProps,
    Text,
    useCombobox,
} from "@mantine/core";
import { IconCircle } from "@tabler/icons-react";
import { useState } from "react";
import { useLegacyReactQuery } from "@aq-fe/aq-legacy-framework/shared/hooks/core/useLegacyReactQuery";
import { BaseEntity } from "@aq-fe/aq-legacy-framework/shared/interfaces/BaseEntity";

export interface CustomComboboxAPIProps<IRes extends BaseEntity>
    extends InputBaseProps {
    query: ReturnType<typeof useLegacyReactQuery<IRes[], any>>;
    defaultValue?: number;
    onChange?: (value?: number, item?: IRes) => void;
    getLabel?: (item: IRes) => string;
    enableColorView?: boolean;
}

export function CustomComboboxAPI<
    IRes extends BaseEntity & { color?: string }
>({
    query,
    defaultValue,
    onChange,
    getLabel,
    enableColorView,
    label,
    ...rest
}: CustomComboboxAPIProps<IRes>) {
    const combobox = useCombobox({
        onDropdownClose: () => {
            combobox.resetSelectedOption();
            setSearch("");
        },
    });

    const [selectedId, setSelectedId] = useState<number | undefined>(
        defaultValue
    );
    const [search, setSearch] = useState("");

    const selectedItem = query.data?.find(
        (item) => item.id === selectedId
    );

    const filteredData = query.data?.filter((item) => {
        const labelText = getLabel
            ? getLabel(item)
            : `${item.code} - ${item.name}`;

        return labelText.toLowerCase().includes(search.toLowerCase());
    });

    const options = filteredData?.map((item) => (
        <Combobox.Option key={item.id} value={item.id!.toString()}>
            <Flex gap="xs" align="center">
                {enableColorView && (
                    <IconCircle size={14} fill={item.color} color={item.color} />
                )}
                <Text>
                    {getLabel
                        ? getLabel(item)
                        : `${item.code} - ${item.name}`}
                </Text>
            </Flex>
        </Combobox.Option>
    ));

    return (
        <Combobox
            store={combobox}
            onOptionSubmit={(val) => {
                const id = Number(val);
                const item = query.data?.find((x) => x.id === id);

                setSelectedId(id);
                onChange?.(id, item);
                combobox.closeDropdown();
            }}
        >
            <Combobox.Target>
                <InputBase
                    label={label}
                    component="button"
                    type="button"
                    rightSection={<Combobox.Chevron />}
                    onClick={() => combobox.toggleDropdown()}
                    {...rest}
                >
                    {selectedItem ? (
                        <Flex gap="xs" align="center">
                            {enableColorView && (
                                <IconCircle
                                    fill={selectedItem.color}
                                    color={selectedItem.color}
                                />
                            )}
                            <Text truncate>
                                {getLabel
                                    ? getLabel(selectedItem)
                                    : `${selectedItem.code} - ${selectedItem.name}`}
                            </Text>
                        </Flex>
                    ) : (
                        <Text c="dimmed">Chọn giá trị</Text>
                    )}
                </InputBase>
            </Combobox.Target>

            <Combobox.Dropdown>
                <Combobox.Search
                    value={search}
                    onChange={(e) => setSearch(e.currentTarget.value)}
                    placeholder="Tìm kiếm..."
                />

                <Combobox.Options>
                    {options?.length ? (
                        options
                    ) : (
                        <Combobox.Empty>Không có dữ liệu</Combobox.Empty>
                    )}
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
}
