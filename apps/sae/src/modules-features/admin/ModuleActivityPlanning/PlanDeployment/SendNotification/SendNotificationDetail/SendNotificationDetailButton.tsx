import { CommonNotification } from "@/interfaces/commonNotification";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconEye } from "@tabler/icons-react";
import { useEffect } from "react";
import InformationTab from "./InformationTab";
import { CustomTabs } from "@aq-fe/core-ui/shared/components/navigation/CustomTabs/CustomTabs";

interface IProps {
  value: CommonNotification;
}
export default function SendNotificationDetailButton({ value }: IProps) {
  const disc = useDisclosure();
  const form = useForm<CommonNotification>({
    initialValues: value,
    validate: {},
  });

  useEffect(() => {
    if (value) {
      form.setValues({
        ...value,
      });
    }
  }, [value]);
  return (
    <CustomButtonModal
      isActionIcon
      modalProps={{
        title: "Chi tiết thông báo",
        size: "80vw",
      }}
      actionIconProps={{
        children: <IconEye size={16} />,
      }}
      disclosure={disc}
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
            children: <InformationTab form={form} />,
          },
        ]}
      />
    </CustomButtonModal>
  );
}
