import PointReviewActivityListItem from '@/app/operation/ctsv/pointReview/components/PointReviewActivityListItem';
import { C } from '@/app/operation/ctsv/pointReview/shared/pointReview.constants';
import type { ActivityApiItem } from '@/shared/interfaces/ActivityStudent';
import { CustomTextInput } from '@aq-fe/core-ui/shared/components/input/CustomTextInput';
import { Box, ScrollArea, Divider, Text } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import React from 'react'

export default function PointReviewLeftPanel({
    activities,
    selectedId,
    onSelect,
    searchKw,
    onSearchChange,
}: {
    activities: ActivityApiItem[];
    selectedId: string | null;
    onSelect: (id: string) => void;
    searchKw: string;
    onSearchChange: (kw: string) => void;
}) {
    return (
        <Box
            style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                background: C.white,
                borderRight: `1px solid ${C.neutralBorder}`,
                animation: "slideInLeft 0.3s ease both",
            }}
        >
            {/* Header */}
            <Box
                px="md"
                py="md"
                style={{
                    borderBottom: `1px solid ${C.neutralBorder}`,
                    background: C.neutralBg,
                }}
            >
                <Text
                    size="xs"
                    fw={700}
                    style={{
                        color: C.navy,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        fontFamily: "'Roboto', sans-serif",
                        marginBottom: 10,
                    }}
                >
                    Danh sách hoạt động
                </Text>
                <CustomTextInput
                    placeholder='Tìm kiếm hoạt động'
                    leftSection={<IconSearch size={14} color={C.textMuted} />}
                    size="xs"
                    radius="sm"
                    value={searchKw}
                    onChange={(e) => onSearchChange(e.target.value)}
                    styles={{
                        input: {
                            background: C.white,
                            border: `1px solid ${C.neutralBorder}`,
                            color: C.navy,
                            fontFamily: "'Roboto', sans-serif",
                            "&::placeholder": { color: C.textMuted },
                        },
                    }}
                />
            </Box>

            {/* Activity list */}
            <ScrollArea style={{ flex: 1 }}>
                {activities?.map((activity) => (
                    <Box key={activity.id}>
                        <PointReviewActivityListItem
                            activity={activity}
                            selected={activity.id === selectedId}
                            onClick={() => onSelect(activity.id)}
                        />
                        <Divider color={C.neutralDivider} />
                    </Box>
                ))}
            </ScrollArea>
        </Box>
    );
}
