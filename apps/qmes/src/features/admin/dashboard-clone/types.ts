import type { Icon as TablerIcon } from "@tabler/icons-react";

export type Tile = {
  code: number;
  title: string;
  achieved: number;
  total: number;
  percent: number;            // avg criteriaProgress (fallback pass%)
  Icon: TablerIcon;
  items: any[];               // criteria list (theo dữ liệu của bạn)
  hasIssues: boolean;
};

export type FilterStatus = "all" | "done" | "todo";

// Tối thiểu để utils type được
export interface MockBucket {
  categoryCode: number;
  criteria?: any[];
}
