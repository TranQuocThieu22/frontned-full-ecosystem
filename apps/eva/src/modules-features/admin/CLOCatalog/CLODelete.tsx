import { CLOService } from "@/shared/APIs/CLOService";
import { MyActionIconDelete } from "aq-fe-framework/components";

export default function CLODelete({ code, id }: { code: string, id: number }) {
  return <MyActionIconDelete contextData={code} onSubmit={() => CLOService.delete(id)} />
}