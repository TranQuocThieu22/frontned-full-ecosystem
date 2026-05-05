import { ISubject, subjectService } from "@/shared/APIs/subjectService";
import { MyButtonDeleteList } from "aq-fe-framework/components";

export default function SubjectDeleteList({ values }: { values: ISubject[] }) {
  return (
    <MyButtonDeleteList
      buttonProps={{
        disabled: values.length === 0
      }}
      contextData={values.map(item => item.code).join(", ")}
      onSubmit={() => subjectService.deleteList(values)}
    />
  )
}