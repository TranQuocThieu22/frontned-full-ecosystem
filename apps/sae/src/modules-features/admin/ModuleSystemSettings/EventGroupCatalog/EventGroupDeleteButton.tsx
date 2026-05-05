"use client"

import { service_eventGroup } from "@/api/services/service_eventGroup";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";

export default function EventGroupDeleteButton({ code, id }: { code: string; id: number }) {
  return (
    <CustomActionIconDelete
      onSubmit={async () =>
        await service_eventGroup.delete(id)
      }
      contextData={code}
    />
  );
}
