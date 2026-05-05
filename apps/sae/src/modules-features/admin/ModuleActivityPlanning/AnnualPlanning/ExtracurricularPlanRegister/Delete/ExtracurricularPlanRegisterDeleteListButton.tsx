import { service_event } from "@/api/services/service_event";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";
import { Tooltip } from "@mantine/core";

export default function ExtracurricularPlanRegisterDeleteListButton({
  values,
  loading,
  noPermission
}: {
  values: any;
  loading?: boolean
  noPermission?: boolean
}) {

  const renderButtonModal = () => {
    return (
      <CustomButtonDeleteList
        loading={loading}
        contextData={values.map((item: any) => item.code).join(", ")}
        onSubmit={() => service_event.deleteList(values)}
      />
    )
  }

  return (
    noPermission && values.length !== 0
      ? (
        <Tooltip label="Hành động không thể thực hiện do có dòng được chọn vượt quá quyền hạn của bạn">
          {renderButtonModal()}
        </Tooltip>
      ) : (
        renderButtonModal()
      )
  );
}
