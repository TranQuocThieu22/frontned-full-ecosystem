import { CLOService } from "@/shared/APIs/CLOService";
import { MyButtonDeleteList } from "aq-fe-framework/components";

export default function CLODeleteList({ values }: { values: any }) {
  return (
    <MyButtonDeleteList
      buttonProps={{
        disabled: values.length === 0
      }}
      contextData={values.map((item: any) => item.code).join(", ")}
      onSubmit={() => CLOService.deleteList(values)}
    />
  )
}
