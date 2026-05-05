import { service_commonNotification } from "@/api/services/service_commonNotification";
import { CommonNotification } from "@/interfaces/commonNotification";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { useForm } from "@mantine/form";
import InformationTab from "./InformationTab";
import RecipientListTab from "./RecipientListTab";
import { CustomTabs } from "@aq-fe/core-ui/shared/components/navigation/CustomTabs/CustomTabs";

export default function SendNotificationCreateButton() {
  const form = useForm<CommonNotification>({
    initialValues: {
      code: "",
      name: "",
      content: "",
      isMandatory: false,
      userNotifications: [],
      recipientType: 2,
    },
    validate: {
      code: (value) => (value ? null : "Không được để trống"),
      name: (value) => (value ? null : "Không được để trống"),
      content: (value) => (value ? null : "Không được để trống"),
    },
  });

  return (
    <CustomButtonCreateUpdate
      modalProps={{
        title: "Thông báo",
        size: "80vw",
      }}
      form={form}
      onSubmit={(values) => {
        return service_commonNotification.create(values);
      }}
    >
      <CustomTabs
        defaultValue={"Thông tin chung"}
        tabs={[
          { label: "Thông tin chung", children: <InformationTab form={form} /> },
          { label: "Danh sách người nhận", children: <RecipientListTab form={form} /> },
        ]}
      />
    </CustomButtonCreateUpdate>
  );
}
