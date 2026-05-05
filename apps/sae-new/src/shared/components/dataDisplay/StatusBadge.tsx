"use client";

/**
 * StatusBadge — generic status badge component.
 * Used across: pointReview, pointReviewByClass, RLVersion, activityView.
 *
 * @example
 * // Simple usage
 * <StatusBadge label="Đã duyệt" config={CLASSIFICATION_CONFIG["Tốt"]} />
 *
 * // With overrides
 * <StatusBadge label="Draft" config={STATE_CONFIG.draft} size="xs" radius="md" />
 */

import { Badge } from "@mantine/core";
import { FONT_WEIGHT } from "../../consts/font/font";

interface StatusBadgeProps {
    /** Display label */
    label: string;
    /** Color config from domain-specific CONFIG */
    config: { bg: string; color: string; border?: string };
    /** Badge size — defaults to "sm" */
    size?: "xs" | "sm" | "md" | "lg";
    /** Badge border-radius — defaults to "sm" */
    radius?: "sm" | "md";
}

export function StatusBadge({
    label,
    config,
    size = "sm",
    radius = "sm",
}: StatusBadgeProps) {
    return (
        <Badge
            size={size}
            radius={radius}
            variant="default"
            style={{
                background: config.bg,
                color: config.color,
                border: config.border
                    ? `1px solid ${config.border}`
                    : `1px solid ${config.color}30`,
                fontWeight: FONT_WEIGHT.SEMIBOLD,
            }}
        >
            {label}
        </Badge>
    );
}
