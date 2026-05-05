import { service_commonNotification } from "@/api/services/service_commonNotification";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";
interface Props {
  code?: string
  id?: number
  isSendMail?: boolean
}
export default function SendNotificationDeleteButton({ code, id, isSendMail }: Props) {
  return (
    <CustomActionIconDelete
      actionIconProps={{
        disabled: isSendMail
      }}
      contextData={code}
      onSubmit={async () => await service_commonNotification.delete(id ?? 0)}
    />
  );
}
