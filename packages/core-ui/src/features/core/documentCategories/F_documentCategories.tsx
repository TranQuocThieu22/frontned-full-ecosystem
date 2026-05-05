import { CustomTabs } from "@aq-fe/core-ui/shared/components/navigation/CustomTabs/CustomTabs";
import { F_documentCategories_Read } from "./F_documentCategories_Read";

type DocumentTypes = {
  Security: number;
  Refinement: number;
  Guideline: number;
  Regulations: number;
  Workflow: number;
  Form: number;
};

// bỏ object này vào dự án vào paste prop để dùng
// const const_object_documentTypes = {
//     Security: 1,
//     Refinement: 2,
//     Guideline: 3,
//     Regulations: 4,
//     Workflow: 5,
//     Form: 6,
// };
interface Props {
  documentTypes: DocumentTypes;
}

export function F_documentCategories({ documentTypes }: Props) {
  return (
    <CustomTabs
      tabs={[
        {
          label: "1. Văn bản quy định",
          children: <F_documentCategories_Read documentType={documentTypes.Regulations} />,
        },
        {
          label: "2. Quy trình xử lý công việc",
          children: <F_documentCategories_Read documentType={documentTypes.Workflow} />,
        },
        {
          label: "3. Danh mục biểu mẫu",
          children: <F_documentCategories_Read documentType={documentTypes.Form} />,
        },
      ]}
    />
  );
}
