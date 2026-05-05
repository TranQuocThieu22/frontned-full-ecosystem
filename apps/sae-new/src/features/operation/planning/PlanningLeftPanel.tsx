"use client";

import PlanningCreateUpdateAcademicYear from "@/features/operation/planning/PlanningCreateUpdateAcademicYear";
import {
    AcademicYear,
    AcademicYearStateEnum,
    AcademicYearStateColor,
    AcademicYearStateLabel,
} from "@/shared/interfaces/AcademicYear";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { CustomCardPanel } from "@aq-fe/core-ui/shared/components/layout/CustomCardPanel/CustomCardPanel";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { Box, Divider, Flex, ScrollArea, Text } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";

interface PlanningLeftPanelProps {
    academicYears: AcademicYear[];
    selectedId?: string;
    onSelectRowAction: (id: string) => void;
}

export function PlanningLeftPanel({
    academicYears,
    selectedId,
    onSelectRowAction,
}: PlanningLeftPanelProps) {
    const [searchKw, setSearchKw] = useState("");
    const [stateFilter, setStateFilter] = useState<string | null>(null);

    const filtered = academicYears.filter((ay) => {
        const matchKw =
            !searchKw ||
            ay.name?.toLowerCase().includes(searchKw.toLowerCase()) ||
            ay.code?.toLowerCase().includes(searchKw.toLowerCase());
        const matchState = !stateFilter || ay.state === Number(stateFilter);
        return matchKw && matchState;
    });

    return (
        <Box
            style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* Header */}
            <Box mb="md">
                <Flex justify="space-between" align="center" mb="md">
                    <Text fw="bold" size="xl">
                        Danh sách năm học
                    </Text>
                    <PlanningCreateUpdateAcademicYear />
                </Flex>
                <CustomTextInput
                    placeholder="Tìm mã, tên năm học..."
                    leftSection={<IconSearch size={16} />}
                    radius="sm"
                    value={searchKw}
                    onChange={(e) => setSearchKw(e.target.value)}
                    mb="md"
                />
                <CustomSelect
                    placeholder="Tất cả trạng thái"
                    radius="sm"
                    clearable
                    value={stateFilter}
                    onChange={setStateFilter}
                    data={Object.entries(AcademicYearStateLabel).map(([value, label]) => ({
                        value,
                        label,
                    }))}
                />
            </Box>

            <Divider color="var(--mantine-color-gray-3)" />

            {/* List */}
            <ScrollArea style={{ flex: 1 }}>
                {filtered.map((ay) => (
                    <Box key={ay.id}>
                        <CustomCardPanel
                            title={ay.name ?? "—"}
                            code={ay.code}
                            state={
                                ay.state
                                    ? {
                                        label: AcademicYearStateLabel[ay.state],
                                        color: AcademicYearStateColor[ay.state],
                                    }
                                    : undefined
                            }
                            description={`${ay.semesterCount ?? 0} học kỳ`}
                            selected={ay.id === selectedId}
                            onClick={() => ay.id && onSelectRowAction(ay.id)}
                        />
                        <Divider color="var(--mantine-color-gray-2)" />
                    </Box>
                ))}
            </ScrollArea>
        </Box>
    );
}
