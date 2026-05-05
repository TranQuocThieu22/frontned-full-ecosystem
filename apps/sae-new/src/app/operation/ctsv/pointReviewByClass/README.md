# pointReviewByClass — Feature Documentation

> Xem & điều chỉnh điểm rèn luyện (ĐRL) của sinh viên trong một lớp.
> GVCN duyệt / từ chối từng SV, chỉnh sửa điểm con (tiêu chí), và ghi nhận xét.

---

## File Structure

```
pointReviewByClass/
├── page.tsx                              ← Entry. Hardcoded classId prop.
├── Feat_PointReviewByClass.tsx          ← Two-column layout shell
│
├── usePointReviewByClass.ts              ← ALL state + data logic (single hook)
│
├── types.ts                             ← CriterionScore, StudentAssessment,
│                                          Classification, STATE_CONFIG, …
├── constants.ts (→ shared/)              ← getScoreColor, getInitials,
│                                          formatDate, formatShortDate,
│                                          scoreDeltaColor, scoreDeltaSign,
│                                          ACTIVITY_TYPE_CONFIG, ACTION_COLORS
├── colors.ts  (→ shared/)               ← Design token palette C.*
│
├── StudentListPanel.tsx                 ← Left sidebar: filter / sort / student rows
├── AssessmentDetailPanel.tsx            ← Right panel: hero + tabs (criteria / history / activities)
├── ActionFooter.tsx                     ← Sticky bottom bar: score summary + actions
├── ConfirmApproveModal.tsx               ← Confirm dialog before approve
├── RejectModal.tsx                       ← Reject dialog with reason input
├── EmptyState.tsx                        ← Shown when no student is selected
│
└── components/
    ├── DisciplineBanner.tsx              ← Warning banner if student has discipline record
    ├── ActivitiesTab.tsx                 ← Tab: recognised extracurricular activities
    ├── AuditLogTab.tsx                   ← Tab: history of score submit/approve/reject
    ├── CriteriaGroup.tsx                ← Collapsible Điều (parent) + its tiêu chí children
    └── CriterionChildRow.tsx             ← Editable row for one tiêu chí

SAE shared/
├── shared/apis/pointReviewService.ts    ← API service stubs (swap for real axios later)
└── shared/apis/pointReviewMockData.ts  ← Mock students (8 entries, all 15 criteria)
```

---

## Architecture

### Option A — Two Separate APIs

```
pointReviewService
  ├── getStudentsByClass(classId)   ← List API  (lightweight summary)
  └── getStudentDetail(assessId)   ← Detail API (full criteria + activities + audit)
            │
            ▼
usePointReviewByClass(classId)     ← TanStack Query hooks
  ├── studentList[]                ← listQuery data (sidebar, filter, sort, counts)
  ├── selectedDetail               ← detailQuery data (right panel — lazy, only on select)
  ├── draftScores{}                ← Local edits keyed by criterionId
  ├── draftComment                 ← GVCN comment (local)
  ├── draftRejectReason            ← Reject reason (local)
  │
  ├── filteredStudents[]           ← Filtered + sorted computed from studentList
  ├── totalDraftScore              ← Sum of leaf children (no double-count)
  ├── draftClassification          ← Auto-classified from totalDraftScore
  │
  └── handlers (useMutation → invalidate listQuery on success)
      ├── handleSaveDraft()       → PUT /point-review/{id}/draft
      ├── handleApprove()         → PUT /point-review/{id}/approve
      └── handleReject()          → PUT /point-review/{id}/reject
            ↓
Feat_PointReviewByClass            ← Two-column layout
  ├── <StudentListPanel />         ← Passes filteredStudents + filter/sort props
  ├── selectedDetail
  │   ? <AssessmentDetailPanel />  ← Passes detail + draft props
  │   : <EmptyState />
  ├── <ActionFooter />             ← Score summary + Save / Trả lại / Trình duyệt
  ├── <ConfirmApproveModal />
  └── <RejectModal />
```

### Component Hierarchy

```
Feat_PointReviewByClass
├── <StudentListPanel>
│   └── <StudentRow />            ← per student (inline)
│
├── selectedDetail ? <AssessmentDetailPanel> : <EmptyState />
    ├── Hero Header               ← avatar, name, state badge, self-score card
    ├── <Tabs>
    │   ├── Tab: criteria         ← Điểm & Tiêu chí
    │   │   ├── <DisciplineBanner />
    │   │   ├── Classification Summary (self vs GVCN adjusted score)
    │   │   ├── Reject reason box
    │   │   ├── <CriteriaGroup /> × N
    │   │   │   └── <CriterionChildRow /> × M
    │   │   └── Comment textarea
    │   ├── Tab: history
    │   │   └── <AuditLogTab />
    │   └── Tab: activities
    │       └── <ActivitiesTab />
    │
    └── <ActionFooter />          ← outside tabs — sticky bottom bar
```

---

## Key Design Decisions

### 1. Two-Level Nested Criteria (Điều → Tiêu chí)

Each `CriterionScore` has a `parentId`:

| `parentId` | Meaning | Example |
|---|---|---|
| `null` | Điều (parent) | `C1` — "Điều I – Ý thức chấp hành" |
| `"C1"` | Tiêu chí (child) | `"1.1"` — "Tuân thủ nội quy" |

**Rules:**
- Parent rows are **never independently editable** — score is always computed from children.
- Collapsible via Mantine `<Collapse>`. Chevron hides and click is disabled when no children.
- Parent score = sum of its children's effective scores.

**All 15 criteria (5 parents + 10 children):**

| ID | Code | Name | Max | Parent |
|---|---|---|---|---|
| C1 | C1 | Điều I – Ý thức chấp hành nội quy, quy chế | 25 | null |
| C1.1 | 1.1 | Tuân thủ nội quy, quy chế của trường, khoa, lớp | 15 | C1 |
| C1.2 | 1.2 | Tham gia sinh hoạt lớp, các buổi học | 10 | C1 |
| C2 | C2 | Điều II – Học tập và nghiên cứu khoa học | 20 | null |
| C2.1 | 2.1 | Kết quả học tập (điểm học phần) | 12 | C2 |
| C2.2 | 2.2 | Nghiên cứu khoa học, sáng tạo | 8 | C2 |
| C3 | C3 | Điều III – Công tác cán bộ lớp và Hội sinh viên | 15 | null |
| C3.1 | 3.1 | Cán bộ lớp, Chi đoàn | 10 | C3 |
| C3.2 | 3.2 | Tham gia Hội sinh viên | 5 | C3 |
| C4 | C4 | Điều IV – Tinh thần tham gia các hoạt động NXKH | 20 | null |
| C4.1 | 4.1 | Tham gia các hoạt động ngoại khóa, phong trào | 12 | C4 |
| C4.2 | 4.2 | Điểm hoạt động được công nhận | 8 | C4 |
| C5 | C5 | Điều V – Tình nguyện, phong trào, đạo đức lối sống | 20 | null |
| C5.1 | 5.1 | Hoạt động tình nguyện | 10 | C5 |
| C5.2 | 5.2 | Đạo đức, lối sống, quan hệ cộng đồng | 10 | C5 |

### 2. How `effectiveScores` Works

For every criterion, `effectiveScores[id]` holds the score to display:

```
effectiveScores[id] =
  draftScores[id]          ← if GVCN has edited it locally
  ?? teacherScore          ← if backend already recorded a GVCN score
  ?? selfScore             ← fall back to student's own self-assessment
```

### 3. How `totalDraftScore` is Computed

Only leaf children are summed — never double-counts parents.

```ts
selectedDetail.criteria
  .filter(c => {
    if (c.parentId !== null) return true;           // child: always include
    const hasChildren = selectedDetail.criteria.some(
      child => child.parentId === c.id
    );
    return !hasChildren;                            // orphan parent: include
  })
  .reduce((sum, c) => sum + Math.max(0, Math.min(effectiveScores[c.id] ?? c.selfScore, c.maxScore)), 0)
```

### 4. Orphan Parent Handling

A Điều with no children (orphan parent) is included in the total using its own score.

### 5. Draft → Submit Flow

```
Student submits self-score
  → state: "Pending Class Approval"
  → GVCN edits draftScores locally (not persisted yet)
  → GVCN clicks "Trình duyệt", "Lưu nháp", or "Trả lại"

Lưu nháp    → persists teacherScore + comment, state unchanged
Trình duyệt → persists teacherScore + comment, state → "Pending Faculty Approval"
Trả lại     → persists rejectReason, state → "Rejected"
```

After approve or reject, auto-advances to the next pending student.

### 6. Discipline Blocking (BR-05)

If a student has discipline level **"Cảnh cáo"**, GVCN cannot assign ≥ "Khá":

- The Approve button is **disabled** (not just warned) when blocked.
- A warning banner appears in `ActionFooter`.
- The block is advisory — the backend still enforces it.

---

## Color Token System (`shared/colors.ts`)

All colors live in a single shared object:

```ts
export const C = {
  navy: "#1A2744",
  navyLight: "#2D4270",
  navyPale: "#EEF1F8",
  orange: "#D4623B",
  orangeLight: "#FDF0EC",
  green: "#2D7D46",
  greenLight: "#EEF7F1",
  amberBg: "#FEF9EC",
  amberText: "#B8810A",
  red: "#C0392B",
  redLight: "#FEF0EE",
  purple: "#7C3AED",
  purpleLight: "#F3EEFF",
  // ... and more
} as const;
```

**Usage:**

```ts
// Inside style={{ }} objects — bare property access
<Box style={{ background: C.neutralCard }}>

// In JSX attributes — curly braces required
<Badge color={C.navy}>

// In config objects — bare property access
export const STATE_CONFIG = {
  Approved: { color: C.green, bg: C.greenLight, border: C.green }
};
```

---

## Connecting to Real API

All API stubs live in **`shared/apis/pointReviewService.ts`**.
Each function has a `// ── Replace with real API call ──` comment.

### List API — `getStudentsByClass`

```ts
getStudentsByClass: (classId, params) => {
  // ── Replace with real API call ──
  return axiosInstance.get<CustomAPIResponse<StudentListItem[]>>(
    `${CONTROLLER}/class/${classId}/students`,
    { params }
  );
},
```

### Detail API — `getStudentDetail`

```ts
getStudentDetail: (assessmentId) => {
  // ── Replace with real API call ──
  return axiosInstance.get<CustomAPIResponse<StudentAssessment>>(
    `${CONTROLLER}/${assessmentId}`
  );
},
```

### Mutations

```ts
saveDraft: (assessmentId, body) => {
  // ── Replace with real API call ──
  return axiosInstance.put(`${CONTROLLER}/${assessmentId}/draft`, body);
},
```

### Backend Contract

| Method | Endpoint | Body |
|---|---|---|
| GET | `/point-review/class/{classId}/students` | `?state=Pending Class Approval` |
| GET | `/point-review/{assessmentId}` | — |
| PUT | `/point-review/{assessmentId}/draft` | `{ draftScores, draftComment }` |
| PUT | `/point-review/{assessmentId}/approve` | `{ draftScores, draftComment }` |
| PUT | `/point-review/{assessmentId}/reject` | `{ rejectReason }` |

---

## Types

### `CriterionScore`

```ts
interface CriterionScore {
  id: string;                          // "C1", "C2", "1.1", "2.1", …
  code: string;                        // display code e.g. "C1", "1.1"
  name: string;                        // display name
  maxScore: number;                    // maximum possible score for this criterion
  selfScore: number;                   // student's self-assessment
  teacherScore: number | null;         // GVCN's recorded score (null = not yet reviewed)
  parentId: string | null;             // null = Điều (parent); string = tiêu chí (child)
}
```

### `StudentAssessment`

```ts
interface StudentAssessment {
  assessmentId: string;
  studentId: string;
  studentName: string;
  studentCode: string;
  className: string;
  state: AssessmentState;
  totalSelfScore: number;
  totalTeacherScore: number | null;
  proposedClassification: Classification;
  teacherClassification: Classification | null;
  submittedAt: string;                        // ISO date string
  criteria: CriterionScore[];
  auditLog: AuditEntry[];
  disciplineRecord: DisciplineRecord | null;
  recognisedActivities: RecognisedActivity[];
  comment: string | null;
  rejectReason: string | null;
}
```

### `AssessmentState`

```ts
type AssessmentState =
  | "Draft"
  | "Pending Class Approval"
  | "Pending Faculty Approval"
  | "Pending University Approval"
  | "Approved"
  | "Rejected";
```

### `Classification`

```ts
type Classification = "Xuất sắc" | "Tốt" | "Khá" | "Trung bình" | "Yếu" | "Kém";
```

---

## Classification Thresholds

| Classification | Min Score |
|---|---|
| Xuất sắc | 90 |
| Tốt | 80 |
| Khá | 65 |
| Trung bình | 50 |
| Yếu | 30 |
| Kém | 0 |

`draftClassification` is derived from `totalDraftScore` using these thresholds.

---

## Mock Data (`shared/apis/pointReviewMockData.ts`)

8 mock students covering all states and edge cases:

| Student | State | Score | Special |
|---|---|---|---|
| Nguyễn Thị Mai Anh | Pending Class Approval | 84 | Normal |
| Trần Văn Minh | Pending Class Approval | 61 | Normal |
| Lê Hoàng Phúc | Pending Class Approval | 95 | Excellent score |
| Phạm Thị Thu Hà | Pending Class Approval | 74 | Discipline: Cảnh cáo |
| Đặng Minh Tuấn | Rejected | 55 | Has `rejectReason` |
| Ngô Thị Lan Anh | Pending Class Approval | 78 | Normal |
| Bùi Quang Huy | Pending Class Approval | 42 | Discipline: Khiển trách |
| Vũ Thị Hương Giang | Pending Class Approval | 88 | Normal |

Each student has all 15 criteria (5 parents + 10 children). `teacherScore` is `null` for all criteria in mock data (not yet reviewed).

---

## `usePointReviewByClass` Interface

The hook exposes a flat `PointReviewByClassState` object. Key shapes:

```ts
// Data
studentList: StudentListItem[];
selectedDetail: StudentAssessment | null;

// Selection + filter / sort
selectedId: string | null;
filterState: FilterState;   // AssessmentState | "all"
sortField: SortField;       // "studentName" | "totalSelfScore" | "submittedAt" | "state"
sortDir: SortDir;           // "asc" | "desc"
searchKw: string;

// Computed
filteredStudents: StudentListItem[];
totalDraftScore: number;
draftClassification: Classification;
canApprove: boolean;        // true only when selectedDetail.state === "Pending Class Approval"
canReject: boolean;         // canApprove && !!draftRejectReason.trim()
hasScoreChanges: boolean;   // any criterion differs from teacherScore

// Actions
setSelectedId, setFilterState, setSortField, setSortDir, setSearchKw,
setDraftScore, setDraftComment, setDraftRejectReason,
openApproveModal, closeApproveModal,
openRejectModal, closeRejectModal,
handleApprove, handleReject, handleSaveDraft
```

---

## `classId` Source

Currently hardcoded in `page.tsx` as `"D20CNTT1"`. Replace with one of:

- `useParams()` — from URL `/admin/pointReviewByClass/:classId`
- Auth context — the logged-in GVCN's assigned class
