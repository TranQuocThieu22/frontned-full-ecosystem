import { emailTemplateService } from "@/APIs/emailTemplateService";
import { MyButtonDeleteList } from "@/components/Button/ButtonCRUD/MyButtonDeleteList/MyButtonDeleteList";

export default function EmailTemplateDeleteListButton({ values }: { values: any }) {
  return (
    <MyButtonDeleteList
      count={values.length}
      onSubmit={() => emailTemplateService.deleteList(values)}
    />
  );
}
