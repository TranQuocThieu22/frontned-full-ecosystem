import { emailTemplateService } from "@aq-fe/core-ui/shared/APIs/emailTemplateService";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";

export default function EmailTemplateDeleteListButton({ values }: { values: any }) {
  return (
    <CustomButtonDeleteList
      count={values.length}
      onSubmit={() => emailTemplateService.deleteList(values)}
    />
  );
}
