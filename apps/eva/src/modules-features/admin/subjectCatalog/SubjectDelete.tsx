import { subjectService } from "@/shared/APIs/subjectService";
import { MyActionIconDelete } from "aq-fe-framework/components";

export default function SubjectDelete({ code, id }: { code: string, id: number }) {
  return <MyActionIconDelete contextData={code} onSubmit={async () => subjectService.delete(id)} />;
} 