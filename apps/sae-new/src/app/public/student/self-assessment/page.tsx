"use client";

import Head from "next/head";
import { Box, Group, Text } from "@mantine/core";
import { useSelfAssessment } from "./shared/useSelfAssessment";
import { C, GLOBAL_CSS, STATE_CONFIG } from "./shared/constants";
import SelfAssessmentTable from "./components/SelfAssessmentTable";

export default function SelfAssessmentPage() {
    const hook = useSelfAssessment();

    return (
        <>
            {/* Font + global CSS — scoped to self-assessment only */}
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <style>{GLOBAL_CSS}</style>

            {/* ── Root wrapper — applies Roboto to all children ── */}
            <Box className="sae-root">

                {/* ── Page Header (mirrors HTML .topbar) ── */}
                <Box
                px={24}
                py={16}
                style={{
                    background: C.surface,
                    borderBottom: `1px solid ${C.border}`,
                }}
                >
                <Group justify="space-between" wrap="wrap" gap={12}>
                    {/* Left: title + breadcrumb */}
                    <Box>
                        <Text
                            size="lg"
                            fw={700}
                            style={{
                                color: C.navy,
                                fontFamily: "inherit",
                                lineHeight: 1.2,
                            }}
                        >
                            Tự đánh giá điểm rèn luyện
                        </Text>
                        <Text size="xs" style={{ color: C.text3, marginTop: 4 }}>
                            {hook.assessment?.semesterName ?? "Học kỳ 1"}&nbsp;
                            {hook.assessment?.academicYear ?? "2025–2026"}&nbsp;·&nbsp;
                        </Text>
                    </Box>

                    {/* Right: deadline chip + state badge */}
                    <Group gap={8}>
                        <Box
                            px={10}
                            py={5}
                            style={{
                                background: C.surface3,
                                border: `1px solid ${C.border}`,
                                borderRadius: 6,
                                fontSize: 12,
                                color: C.text2,
                                fontWeight: 500,
                            }}
                        >
                            ⏰ Hạn nộp: 30/01/2026
                        </Box>
                        {hook.assessment && (
                            <Box
                                px={10}
                                py={5}
                                style={{
                                    background:
                                        STATE_CONFIG[hook.assessment.state]?.bg ?? C.surface3,
                                    color:
                                        STATE_CONFIG[hook.assessment.state]?.color ?? C.text2,
                                    border: `1px solid ${STATE_CONFIG[hook.assessment.state]?.color ?? C.border}30`,
                                    borderRadius: 6,
                                    fontSize: 11,
                                    fontWeight: 700,
                                    letterSpacing: "0.04em",
                                }}
                            >
                                {STATE_CONFIG[hook.assessment.state]?.label ??
                                    hook.assessment.state}
                            </Box>
                        )}
                    </Group>
                </Group>
            </Box>

            {/* ── Alert box (mirrors HTML .alert-warning) ── */}
            <Box
                mx={24}
                mt={16}
                px={16}
                py={12}
                style={{
                    background: '#FFF8DE',
                    border: `1px solid ${C.amberBorder}`,
                    borderRadius: 8,
                }}
            >
                <Text size="sm" style={{ color: "#92400e", lineHeight: 1.5 }}>
                    ⚠️&nbsp;
                    <strong>Lưu ý:</strong> Điểm tự đánh giá chỉ là đề xuất.
                    GVCN có quyền điều chỉnh khi duyệt cấp lớp.

                </Text>
            </Box>

            {/* ── Discipline warning (BR-03) ── */}
            {hook.assessment?.discipline &&
                hook.assessment.discipline.level !== "Không" && (
                    <Box
                        mx={24}
                        mt={12}
                        px={16}
                        py={12}
                        style={{
                            background: '#FFF8DE',
                            border: `1px solid ${C.dangerBorder}`,
                            borderRadius: 8,
                        }}
                    >
                        <Text size="sm" style={{ color: C.danger, lineHeight: 1.5 }}>
                            ⚠️&nbsp;
                            <strong>
                                Cảnh báo kỷ luật [{hook.assessment.discipline.level}]
                            </strong>
                            {/* {hook.assessment.discipline.note
                                ? ` — ${hook.assessment.discipline.note}`
                                : ""} */}
                            .&nbsp;
                            Xếp loại tối đa bị giới hạn ở{" "}
                            <strong>Trung bình</strong> theo Quy chế ĐRL (BR-03).
                        </Text>
                    </Box>
                )}

            {/* ── Main form area ── */}
            <Box px={24} py={16}>
                <SelfAssessmentTable {...hook} />
            </Box>

            </Box>
        </>
    );
}
