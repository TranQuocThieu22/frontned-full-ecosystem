import { departmentService } from "@aq-fe/aq-legacy-framework/shared/APIs/departmentService";
import { CustomActionIconSafeDelete } from "@aq-fe/aq-legacy-framework/shared/components/button/CustomActionIconSafeDelete";
import { BaseEntity } from "@aq-fe/aq-legacy-framework/shared/interfaces/BaseEntity";

export default function DepartmentDelete({ value }: { value: BaseEntity }) {
  return (
    <CustomActionIconSafeDelete
      contextData={value?.code}
      onSubmit={async () => {
        return departmentService.safeDelete(value);
      }}
    />
  );
}
