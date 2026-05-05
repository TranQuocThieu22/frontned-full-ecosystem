import { departmentService } from "@aq-fe/core-ui/shared/APIs/departmentService";
import { CustomButtonSafeDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonSafeDeleteList";
import { Department } from "@aq-fe/core-ui/shared/interfaces/Department";
import { MRT_TableInstance } from "mantine-react-table";

interface Props {
  values: Department[];
  table: MRT_TableInstance<Department>;
}

export default function DepartmentDeleteList({ table, values }: Props) {
  return (
    <CustomButtonSafeDeleteList
      count={values.length}
      buttonProps={{
        disabled: values?.length === 0,
      }}
      onSuccess={() => table.resetRowSelection()}
      onSubmit={() => {
        return departmentService.safeDeleteList(values);
      }}
    />
  );
}
