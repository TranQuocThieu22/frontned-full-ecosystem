import { departmentService } from "@aq-fe/core-ui/shared/APIs/departmentService";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";

export default function DepartmentDelete({ values }: { values: BaseEntity }) {
  return (
    <CustomActionIconDelete
      contextData={values?.code}
      onSubmit={async () => {
        return departmentService.delete(values.id!);
      }}
    ></CustomActionIconDelete>
  );
}
