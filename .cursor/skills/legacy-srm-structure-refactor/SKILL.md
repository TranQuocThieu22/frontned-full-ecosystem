---
name: legacy-srm-structure-refactor
description: Refactors legacy AQ/Next.js projects to follow SRM/core-ui conventions: app route + module at same folder level, one-level module folders, module-prefixed component names, replace custom components with core-ui (CustomButtonCreateUpdate, CustomDataTable/CustomDataTableAPI), use deleteFn/deleteListFn instead of bespoke delete components, and enforce UI-only from @mantine/* or @aq-fe/core-ui (no src/components or aq-fe-framework imports). Use when standardizing old codebases or when the user mentions SRM structure, core-ui migration, refactor legacy modules, or replacing internal components.
---

# Legacy SRM Structure Refactor

Skill này giúp refactor **các dự án cũ** về đúng chuẩn **SRM + AQ core-ui**, ưu tiên tính đồng nhất cấu trúc thư mục, quy ước đặt tên, và tái sử dụng component/hook sẵn có thay vì tự dựng lại.

---

## Khi nào dùng skill này

Dùng skill này khi:

- User yêu cầu “refactor dự án cũ theo SRM”, “chuẩn hóa structure”, “đồng bộ theo core-ui”.
- Bạn thấy cấu trúc route/module bị lồng nhiều cấp, hoặc module bị chia nhỏ theo kiểu `ModuleX/CRUD/...`.
- Code đang dùng nhiều component tự tạo trong `src/components` hoặc `packages/aq-fe-framework` (custom table, custom modal create/update, custom delete modal, …) thay vì core-ui.
- Màn hình dạng CRUD list (table + create/update + delete single/bulk) là chính.

Nếu module không dùng `@aq-fe/core-ui` hoặc không theo phong cách SRM, dùng refactor chung thay vì skill này.

---

## Quy ước bắt buộc (SRM-style)

### 1) Page và module cùng “1 cấp level” (không lồng route theo nhóm thừa)

**Đúng:**

- `src/app/admin/courseList/`
- `src/modules-features/admin/courseList/` (hoặc `src/features/courseList/` tùy dự án)

**Sai:**

- `src/app/admin/list/courseList/`
- `src/modules-features/ModuleCourse/CRUD/`

**Cách refactor:**

- Dời route về dạng `app/admin/<moduleName>/page.tsx`.
- Dời module về dạng `modules-features/admin/<moduleName>/` (hoặc `features/<moduleName>/`).
- `page.tsx` chỉ import component chính của module (thường là `...Table`) và render.

---

### 2) Module phải là 1 folder “phẳng” (one-level folder)

Trong 1 module, **không** chia thêm cấp `Table/`, `Form/`, `CRUD/`, `components/` nếu không thực sự cần.

**Mục tiêu:** Nhìn vào 1 folder là thấy toàn bộ file của feature.

Ví dụ trong `courseList/`:

- `CourseListTable.tsx`
- `CourseListCreateUpdate.tsx` (hoặc tên tương đương theo core-ui)
- `CourseListImportButton.tsx` (nếu có)
- `interfaces.ts` hoặc `Interfaces/Interfaces.ts` (nếu dự án đang dùng kiểu đó; ưu tiên `interfaces.ts` ngay trong module hoặc `shared/interfaces`)

---

### 3) Đặt tên component theo “tiền tố module”

Rule: **mọi component trong module phải bắt đầu bằng tên module** (PascalCase).

Ví dụ module `courseList`:

- `CourseListTable.tsx`
- `CourseListCalculatePoint.tsx`
- `CourseListCreateUpdate.tsx`
- `CourseListFilters.tsx` (nếu có)

**Không** đặt kiểu chung chung: `Table.tsx`, `CreateModal.tsx`, `UpdateForm.tsx`.

---

## Chuẩn hóa component theo core-ui (ưu tiên thay vì tự tạo)

### 4) UI component: chỉ dùng `@mantine/*` hoặc `@aq-fe/core-ui`

**Quy tắc bắt buộc:** Không import UI component từ `src/components`, `src/shared/components`, hoặc `aq-fe-framework` nếu Mantine hoặc `@aq-fe/core-ui` đã có sẵn.

**Ưu tiên theo thứ tự:**

1. `@aq-fe/core-ui` — wrapper chuẩn dự án (CustomDataTable, CustomButtonCreateUpdate, CustomPageContent, …)
2. `@mantine/core`, `@mantine/charts`, `@mantine/form`, … — component UI gốc

**Không dùng:**

- `src/components/...` (Button, Modal, Table, StatCard, Chart wrapper nội bộ, …)
- `aq-fe-framework/components/...`

**Ngoại lệ:** Chỉ import từ `src/components` hoặc `aq-fe-framework` khi component đó **không có equivalent** trong Mantine hay `@aq-fe/core-ui`, và phải ghi chú lý do.

---

### 5) Loại bỏ component create/update tự dựng → dùng `CustomButtonCreateUpdate`

**Mục tiêu:** Không tạo “CreateModal”, “UpdateModal”, “CreateForm”, “UpdateForm” riêng nếu chỉ phục vụ CRUD chuẩn.

**Refactor guideline:**

- Gộp create + update vào 1 component theo module prefix, ví dụ: `CourseListCreateUpdate.tsx`.
- Dùng `CustomButtonCreateUpdate` để:
  - mở modal
  - render form fields
  - submit qua mutation (thường chỉ cần `onSubmit` gọi service)

**Khi nào vẫn tách riêng?**

- Form cực phức tạp, nhiều bước, hoặc logic khác biệt mạnh giữa create và update. Khi đó vẫn giữ prefix: `CourseListCreate.tsx`, `CourseListUpdate.tsx`.

---

### 6) Ưu tiên `CustomDataTable` / `CustomDataTableAPI`

**Nguyên tắc chọn:**

- Có sẵn `data[]` trong memory → `CustomDataTable`
- Data lấy từ API qua query → `CustomDataTableAPI`

**Refactor guideline:**

- Thay các bảng tự tạo / wrapper cũ bằng `CustomDataTable` hoặc `CustomDataTableAPI`.
- Truyền `columns` theo chuẩn core-ui.
- Hạn chế tự implement pagination/sorting/filter nếu core-ui đã hỗ trợ.

---

### 7) Delete single/bulk: dùng `deleteFn`, `deleteListFn` thay vì tạo component riêng

**Mục tiêu:** Không tạo các component kiểu `CourseListDeleteButton`, `CourseListDeleteModalContent` nếu chỉ là delete chuẩn.

**Refactor guideline (với `CustomDataTableAPI`):**

- Truyền thẳng:
  - `deleteFn={service.delete}`
  - `deleteListFn={service.deleteListIds}` (hoặc hàm tương đương)
- **Không cần tạo thêm** `deleteSoft`, `deleteListSoft` chỉ để “đủ props” cho bảng.
  - Chỉ tạo hàm riêng khi backend **thực sự** dùng endpoint soft-delete khác `delete`/`deleteListIds`.
- Nếu cần confirm/custom message: ưu tiên cấu hình props của core-ui (nếu có) thay vì dựng modal riêng.

---

## Workflow refactor cho 1 module legacy

Khi refactor 1 module list CRUD:

1. **Chuẩn hóa đường dẫn** theo rule page/module cùng level.
2. **Flatten module folder** (1 cấp) và rename file theo module prefix.
3. **Thay create/update**: gộp vào `XxxCreateUpdate.tsx` dùng `CustomButtonCreateUpdate`.
4. **Thay table**: chuyển sang `CustomDataTableAPI` (hoặc `CustomDataTable`) và đưa actions vào đúng chỗ:
   - `renderTopToolbarCustomActions`: nút create/import/export
   - `renderRowActions`: update/delete theo row
5. **Đổi delete flow**: bỏ component delete custom, dùng `deleteFn/deleteListFn`.
6. **Dọn imports**: thay toàn bộ import từ `src/components` và `aq-fe-framework/components` bằng `@mantine/*` hoặc `@aq-fe/core-ui`. Chỉ giữ lại nếu không có equivalent.
7. **Kiểm tra nhanh**:
   - build/lint TS ở các file vừa đổi
   - chạy màn hình: list hiển thị, create/update submit OK, delete single/bulk OK

---

## Quick checklist (dùng khi review PR/refactor)

- [ ] `src/app/admin/<module>/page.tsx` (không có cấp trung gian `list/` hoặc `crud/`)
- [ ] Module nằm ở `src/modules-features/**/<module>/` hoặc `src/features/<module>/` và **1 cấp folder**
- [ ] File/component trong module đều có prefix `ModuleName...`
- [ ] UI component chỉ dùng `@mantine/*` hoặc `@aq-fe/core-ui` (không import từ `src/components` hay `aq-fe-framework`)
- [ ] Create/Update dùng `CustomButtonCreateUpdate` (không tự tạo modal/form CRUD chuẩn)
- [ ] Table dùng `CustomDataTable` hoặc `CustomDataTableAPI`
- [ ] Delete single/bulk dùng `deleteFn` + `deleteListFn` (không component delete custom)

