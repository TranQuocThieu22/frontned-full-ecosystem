import { departmentService } from "@aq-fe/core-ui/shared/APIs/departmentService";
import { CustomActionIconSafeDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconSafeDelete";
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";

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
