import { topicService } from "@/shared/APIs/topicService";
import { MyActionIconDelete } from "aq-fe-framework/components";

export default function TopicDelete({ code, id }: { code: string, id: number }) {
  return <MyActionIconDelete contextData={code} onSubmit={() => topicService.delete(id)} />
}