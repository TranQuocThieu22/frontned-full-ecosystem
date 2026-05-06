import { emailTemplateService } from "@aq-fe/aq-legacy-framework/shared/APIs/emailTemplateService";
import { CustomButtonDeleteList } from "@aq-fe/aq-legacy-framework/shared/components/button/CustomButtonDeleteList";

export default function EmailTemplateDeleteListButton({ values }: { values: any }) {
  return (
    <CustomButtonDeleteList
      count={values.length}
      onSubmit={() => emailTemplateService.deleteList(values)}
    />
  );
}
