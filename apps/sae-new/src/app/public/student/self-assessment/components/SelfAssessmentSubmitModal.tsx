"use client";

import { Box, Button, Divider, Group, Text, Image } from "@mantine/core";
import { UseDisclosureReturnValue } from "@mantine/hooks";
import { useEffect, useState } from "react";
import CustomModal from "@aq-fe/core-ui/shared/components/overlays/CustomModal";
import { C, CLASSIFICATION_CONFIG, DIEU_COLORS } from "../shared/constants";
import type { Classification } from "@/shared/consts/classification";
import type { CriterionWithSub } from "@/shared/APIs/studentSelfAssessmentService";

const COUNTDOWN_SECONDS = 5;

interface Props {
  disclosure: UseDisclosureReturnValue;
  totalScore: number;
  classification: Classification;
  scores: Record<string, number>;
  criteria: CriterionWithSub[];
  loading: boolean;
  onConfirm: () => void;
}

export default function SelfAssessmentSubmitModal({
  disclosure,
  totalScore,
  classification,
  scores,
  criteria,
  loading,
  onConfirm,
}: Props) {
  const cfg = CLASSIFICATION_CONFIG[classification] ?? { color: "#6b7280", bg: "#f3f4f6", label: classification };

  // Countdown — starts when modal opens, resets when modal closes
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);
  const [countingDown, setCountingDown] = useState(false);

  const isOpened = disclosure[0];

  useEffect(() => {
    if (!isOpened) {
      setCountdown(COUNTDOWN_SECONDS);
      setCountingDown(false);
      return;
    }
    setCountdown(COUNTDOWN_SECONDS);
    setCountingDown(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpened]);

  useEffect(() => {
    if (!countingDown) return;
    if (countdown <= 0) {
      setCountingDown(false);
      return;
    }
    const timer = setTimeout(() => setCountdown((n) => n - 1), 1000);
    return () => clearTimeout(timer);
  }, [countingDown, countdown]);

  const canConfirm = !loading && countdown <= 0;

  return (
    <CustomModal disclosure={disclosure} title="Xác nhận nộp tự đánh giá">
      {/* Warning */}
      <Box
        mb={16}
        p={12}
        style={{
          background: C.amberBg,
          border: `1px solid ${C.amberBorder}`,
          borderRadius: 8,
        }}
      >
        <Text size="sm" fw={700} style={{ color: C.amber, marginBottom: 4 }}>
          ⚠️ Lưu ý: Thao tác này không thể hoàn tác (BR-04)
        </Text>
        <Text size="xs" style={{ color: C.text2, lineHeight: 1.5 }}>
          Sau khi nộp, bạn sẽ{" "}
          <strong>không thể chỉnh sửa</strong> điểm tự đánh giá.
          Phiếu sẽ được chuyển đến GVCN để duyệt cấp lớp.
        </Text>
      </Box>

      {/* Score summary */}
      <Box
        mb={12}
        p={12}
        style={{
          background: C.navyPale,
          borderRadius: 8,
          border: `1px solid ${C.navy}30`,
        }}
      >
        <Group justify="space-between" align="center">
          <Box>
            <Text size="xs" style={{ color: C.text3, marginBottom: 2 }}>
              Tổng điểm
            </Text>
            <Text fw={800} style={{ color: C.navy, lineHeight: 1, fontSize: 32 }}>
              {totalScore}
              <Text
                component="span"
                size="md"
                fw={400}
                style={{ color: C.text3 }}
              >
                /100
              </Text>
            </Text>
          </Box>
          <Box
            px={16}
            py={6}
            style={{
              background: cfg.bg,
              borderRadius: 6,
              border: `1px solid ${cfg.color}40`,
            }}
          >
            <Text size="sm" fw={700} style={{ color: cfg.color }}>
              {cfg.label}
            </Text>
          </Box>
        </Group>
      </Box>

      {/* Per-Điều breakdown */}
      <Box mb={16}>
        <Text
          size="xs"
          fw={600}
          mb={8}
          style={{
            color: C.text2,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          Chi tiết từng Điều
        </Text>
        {criteria.map((c, i) => {
          const colors = DIEU_COLORS[c.code] ?? { dot: C.teal };
          const val = c.subCriteria && c.subCriteria.length > 0
            ? c.subCriteria.reduce((s, sub) => s + (scores[sub.id] ?? 0), 0)
            : (scores[c.id] ?? 0);
          return (
            <Group
              key={c.id}
              justify="space-between"
              py={5}
              style={{
                borderBottom: i < criteria.length - 1 ? `1px solid ${C.border}` : "none",
              }}
            >
              <Group gap={6}>
                <Box
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: colors.dot,
                    flexShrink: 0,
                  }}
                />
                <Text size="sm" fw={500} style={{ color: C.text2 }}>
                  {c.code} — {c.name}
                </Text>
              </Group>
              <Text
                size="sm"
                fw={700}
                style={{ color: val > c.maxScore ? C.danger : colors.dot }}
              >
                {val}/{c.maxScore}
              </Text>
            </Group>
          );
        })}
      </Box>



      <Divider mb={16} color={C.border} />

      <Text size="xs" mb={16} style={{ color: C.text2, lineHeight: 1.6 }}>
        Tôi xác nhận rằng điểm tự đánh giá trên là chính xác và đồng ý không
        thể chỉnh sửa sau khi nộp.
      </Text>

      <Group grow>
        <Button
          variant="light"
          radius="md"
          size="md"
          fw={700}
          disabled={loading}
          onClick={disclosure[1].close}
          styles={{
            root: {
              border: `1px solid ${C.border2}`,
              color: C.text1,
              background: C.surface,
              fontFamily: "inherit",
            },
          }}
        >
          Hủy
        </Button>
        <Button
          radius="md"
          size="md"
          fw={700}
          disabled={!canConfirm}
          onClick={onConfirm}
          style={{
            background: canConfirm ? C.teal : C.text3,
            color: C.white,
            fontFamily: "inherit",
            transition: "background 0.2s",
          }}
        >
          {loading
            ? "Đang nộp..."
            : countdown > 0
              ? `Chờ ${countdown}s…`
              : "✓ Xác nhận nộp"}
        </Button>
      </Group>
    </CustomModal>
  );
}
