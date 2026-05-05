import {List} from "@mantine/core";
import {IconPoint, IconPointFilled} from "@tabler/icons-react";
import React from "react";

export const const_notHaveDataYet = "Chưa có dữ liệu"
export const const_minListItemWidth = 300

interface MyCustomListColumnProps<T> {
    data?: T[] | null;
    getKey?: (item: T, index: number) => string | number;
    children: (item: T, index: number) => React.ReactNode;
    noDataText?: string;
}

export function MyCustomListColumn<T>({
    data,
    getKey = (item: any, index) => item?.id ?? index,
    children,
    noDataText = "Chưa có dữ liệu",
}: MyCustomListColumnProps<T>) {
    return (
        <List size="sm" my={5} spacing="xs" center icon={<IconPointFilled />} >
            {data && data.length > 0 ? (
                data.map((item, index) => {
                    const key = getKey(item, index);
                    const content = children(item, index);

                    if (content !== undefined && content !== null) {
                        return (
                            <List.Item flex={1} key={key}>
                                {content}
                            </List.Item>
                        );
                    }

                    return (
                        <List.Item flex={1} key={key} icon={<IconPoint />}>
                            {noDataText}
                        </List.Item>
                    );
                })
            ) : (
                <List.Item icon={<IconPoint />}>{noDataText}</List.Item>
            )}
        </List>
    );
}
