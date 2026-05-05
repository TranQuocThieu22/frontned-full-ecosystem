"use client";

import { Box, Paper, Text, Title } from "@mantine/core";

export function ActivityEmptyState() {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ margin: "0 auto" }}
    >
      <circle cx="40" cy="40" r="38" fill="#F3F0EA" />
      <rect x="24" y="28" width="32" height="6" rx="3" fill="#D4C9BC" />
      <rect x="24" y="38" width="24" height="6" rx="3" fill="#E8E2D9" />
      <rect x="24" y="48" width="16" height="6" rx="3" fill="#D4C9BC" />
      <circle cx="56" cy="22" r="10" fill="#F0A500" opacity="0.3" />
    </svg>
  );
}
