import {Criterion} from "./types";
import {ScoreFrameworkVersionStateEnum} from "@/shared/consts/enum/ScoreFrameworkVersionStateEnum";


export const STATE_CONFIG: Record<
  ScoreFrameworkVersionStateEnum,
  { label: string; color: string; bg: string; dot: string }
> = {
  [ScoreFrameworkVersionStateEnum.Draft]: { label: "Nháp", color: "#B8810A", bg: "#FEF9EC", dot: "#B8810A" },
  [ScoreFrameworkVersionStateEnum.Published]: {
    label: "Đang hoạt động",
    color: "#2D7D46",
    bg: "#EEF7F1",
    dot: "#2D7D46",
  },

  [ScoreFrameworkVersionStateEnum.Archived]: { label: "Đã lưu trữ", color: "#6B7280", bg: "#F3F4F6", dot: "#9CA3AF" },
};

// ─── Default Criteria ────────────────────────

export const DEFAULT_CRITERIA: Criterion[] = [
  {
    id: "new-1",
    code: "C1",
    name: "Ý thức học tập",
    maxScore: 30,
    children: [],
    _isNew: true,
  },
  {
    id: "new-2",
    code: "C2",
    name: "Chấp hành nội quy",
    maxScore: 25,
    children: [],
    _isNew: true,
  },
  {
    id: "new-3",
    code: "C3",
    name: "Hoạt động phong trào",
    maxScore: 20,
    children: [],
    _isNew: true,
  },
  {
    id: "new-4",
    code: "C4",
    name: "Công dân & cộng đồng",
    maxScore: 15,
    children: [],
    _isNew: true,
  },
  {
    id: "new-5",
    code: "C5",
    name: "Phẩm chất & quan hệ",
    maxScore: 10,
    children: [],
    _isNew: true,
  },
];

export const MAX_TOTAL = 100;


