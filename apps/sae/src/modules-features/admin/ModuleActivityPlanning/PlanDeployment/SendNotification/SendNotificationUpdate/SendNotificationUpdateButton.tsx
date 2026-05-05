import { service_commonNotification } from "@/api/services/service_commonNotification";
import { CommonNotification } from "@/interfaces/commonNotification";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import InformationTab from "./InformationTab";
import RecipientListTab from "./RecipientListTab";
import { CustomTabs } from "@aq-fe/core-ui/shared/components/navigation/CustomTabs/CustomTabs";

interface IProps {
  value: CommonNotification;
}
export default function SendNotificationUpdateButton({ value }: IProps) {
  const form = useForm<CommonNotification>({
    initialValues: value,
    validate: {
      code: (value) => (value ? null : "Không được để trống"),
      name: (value) => (value ? null : "Không được để trống"),
      content: (value) => (value ? null : "Không được để trống"),
    },
  });
  useEffect(() => {
    if (value) {
      form.setValues({
        ...value,
      });
    }
  }, [value]);
  return (
    <CustomButtonCreateUpdate
      isUpdate
      actionIconProps={{
        disabled: value.isSendMail
      }}
      onSubmit={async (values: CommonNotification) => {
        return await service_commonNotification.update(values);
      }}
      modalProps={{
        title: "Chi tiết thông báo",
        size: "80vw",
      }}
      form={form}
    >
      <CustomTabs
        defaultValue={"Thông tin chung"}
        tabs={[
          {
            label: "Thông tin chung",
            children: <InformationTab form={form} />,
          },
          {
            label: "Danh sách người nhận",
            children: <RecipientListTab form={form} values={value} />,
          },
        ]}
      />
    </CustomButtonCreateUpdate>
  );
}
