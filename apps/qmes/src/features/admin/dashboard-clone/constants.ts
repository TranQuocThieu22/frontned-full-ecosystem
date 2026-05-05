import type { Icon as TablerIcon } from "@tabler/icons-react";
import {
  IconBook,
  IconSchool,
  IconFlask,
  IconBuilding,
  IconCloudComputing,
  IconShieldCheck,
  IconGridDots,
  IconHierarchy3,
  IconWorldCheck,
  IconMoodCheck
} from "@tabler/icons-react";

export const CATEGORY_NAMES: Record<number, string> = {
  1: "Chương trình đào tạo",
  2: "Phương pháp giảng dạy",
  3: "Nghiên cứu khoa học",
  4: "Cơ sở vật chất",
  5: "Chuyển đổi số",
  6: "Hợp tác quốc tế",
  7: "Quản lý & điều hành",
  8: "HSSV & hỗ trợ",
  9: "Khác",
};

export const CATEGORY_ICONS: Record<number, TablerIcon> = {
  1: IconBook,
  2: IconSchool,
  3: IconFlask,
  4: IconBuilding,
  5: IconCloudComputing,
  6: IconWorldCheck,
  7: IconHierarchy3,
  8: IconMoodCheck,
  9: IconGridDots,
};
